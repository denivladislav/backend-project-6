// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, async (req, reply) => {
      const status = new app.objection.models.status();
      reply.render('statuses/new', { status });
      return reply;
    })
    .get('/statuses/:id/edit', { name: 'editStatus' }, async (req, reply) => {
      const status = await app.objection.models.status.query().findById(req.params.id);
      reply.render('/statuses/edit', { status });
      return reply;
    })
    .post('/statuses', async (req, reply) => {
      const status = new app.objection.models.status();
      status.$set(req.body.data);

      try {
        const validStatus = await app.objection.models.status.fromJson(req.body.data);
        await app.objection.models.status.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status, errors: data });
      }

      return reply;
    })
    .patch('/statuses/:id', async (req, reply) => {
      try {
        const patchForm = await app.objection.models.status.fromJson(req.body.data);
        const status = await app.objection.models.status.query().findById(req.params.id);

        await status.$query().patch(patchForm);

        req.flash('info', i18next.t('flash.statuses.edit.success'));
        reply.redirect(app.reverse('statuses'));
        return reply;
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        req.body.data.id = req.params.id;
        reply.render('statuses/edit', { status: req.body.data, errors: data });
        return reply;
      }
    })
    .delete('/statuses/:id', async (req, reply) => {
      const associatedTask = await app.objection.models.task
        .query()
        .findOne({ statusId: req.params.id });

      if (associatedTask) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        return reply.redirect(app.reverse('statuses'));
      }

      try {
        await app.objection.models.status.query().deleteById(req.params.id);
        req.flash('info', i18next.t('flash.statuses.delete.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (error) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        reply.redirect(app.reverse('statuses'));
      }

      return reply;
    });
};
