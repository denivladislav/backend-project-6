// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .get('/users/:id/edit', { name: 'editUser' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      if (req.user.id !== Number(req.params.id)) {
        req.flash('error', i18next.t('flash.accessError'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      const user = await app.objection.models.user.query().findById(req.params.id);
      reply.render('/users/edit', { user });
      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })
    .patch('/users/:id', async (req, reply) => {
      try {
        const patchForm = await app.objection.models.user.fromJson(req.body.data);
        const user = await app.objection.models.user.query().findById(req.params.id);

        await user.$query().patch(patchForm);

        req.flash('info', i18next.t('flash.users.edit.success'));
        reply.redirect('/users');
        return reply;
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.edit.error'));
        req.body.data.id = req.params.id;
        reply.render('users/edit', { user: req.body.data, errors: data });
        return reply;
      }
    })
    .delete('/users/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      if (req.user.id !== Number(req.params.id)) {
        req.flash('error', i18next.t('flash.accessError'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      try {
        await app.objection.models.user.query().deleteById(req.params.id);
        req.logout();
        req.flash('info', i18next.t('flash.users.delete.success'));
        reply.redirect(app.reverse('users'));
      } catch (error) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        reply.redirect(app.reverse('users'));
      }

      return reply;
    });
};
