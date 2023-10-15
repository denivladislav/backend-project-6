// @ts-check

import i18next from 'i18next';
import _ from 'lodash';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.objection.models.task.query();
      const formattedTasks = await Promise.all(tasks.map(req.getTaskData));
      reply.render('tasks/index', { tasks: formattedTasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      const task = new app.objection.models.task();
      const statuses = await app.objection.models.status.query();
      const executors = await app.objection.models.user.query();
      const labels = await app.objection.models.label.query();
      reply.render('tasks/new', {
        task, statuses, labels, executors,
      });
      return reply;
    })
    .get('/tasks/:id', { name: 'viewTask' }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id);
      const fortmattedTask = await req.getTaskData(task);
      reply.render('tasks/view', { task: fortmattedTask });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      const task = await app.objection.models.task.query().findById(req.params.id).withGraphFetched('labels');
      _.update(task, 'labels', (labels) => labels.map((label) => label.id));

      const executors = await app.objection.models.user.query();
      const statuses = await app.objection.models.status.query();
      const labels = await app.objection.models.label.query();
      reply.render('tasks/edit', {
        task,
        executors,
        statuses,
        labels,
      });
      return reply;
    })
    .post('/tasks', async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const task = new app.objection.models.task();
      const statuses = await app.objection.models.status.query();
      const executors = await app.objection.models.user.query();

      task.$set(req.body.data);

      try {
        const { statusId, executorId } = req.body.data;
        const validTask = await app.objection.models.task.fromJson({
          ...req.body.data,
          statusId: Number(statusId),
          executorId: Number(executorId),
          creatorId: Number(req.user.id),
        });
        const labelsIds = _.has(req.body.data, 'labels') ? [...req.body.data.labels] : [];
        await app.objection.models.task.transaction(async (trx) => {
          const labels = await app.objection.models.label.query(trx).findByIds(labelsIds);
          await app.objection.models.task.query(trx).upsertGraph(
            {
              ...validTask,
              labels,
            },
            { relate: true, unrelate: true, noUpdate: ['labels'] },
            // { relate: true, unrelate: true },
          );
        });
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task, statuses, executors, errors: error.data,
        });
      }

      return reply;
    })
    .patch('/tasks/:id', async (req, reply) => {
      const taskId = Number(req.params.id);
      const task = await app.objection.models.task.query().findById(taskId);
      const statuses = await app.objection.models.status.query();
      const executors = await app.objection.models.user.query();
      const labelsIds = _.has(req.body.data, 'labels') ? [...req.body.data.labels] : [];

      try {
        const { statusId, executorId } = req.body.data;
        const validTask = await app.objection.models.task.fromJson({
          ...req.body.data,
          statusId: Number(statusId),
          executorId: Number(executorId),
          creatorId: Number(req.user.id),
        });
        await app.objection.models.task.transaction(async (trx) => {
          const labels = await app.objection.models.label.query(trx).findByIds(labelsIds);
          await app.objection.models.task.query(trx).upsertGraph(
            {
              id: taskId,
              ...validTask,
              labels,
            },
            {
              relate: true,
              unrelate: true,
              noUpdate: ['labels'],
            },
          );
        });

        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data: errors }) {
        req.flash('error', i18next.t('flash.tasks.edit.error'));
        reply.render('tasks/edit', {
          task,
          executors,
          statuses,
          errors,
        });
      }
      return reply;
    })
    .delete('/tasks/:id', { name: 'deleteTask' }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id);

      if (task.creatorId !== req.user.id) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        return reply.redirect(app.reverse('tasks'));
      }

      await app.objection.models.task.query().deleteById(req.params.id);
      req.flash('info', i18next.t('flash.tasks.delete.success'));
      return reply.redirect(app.reverse('tasks'));
    });
};
