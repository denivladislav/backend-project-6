// @ts-check

// import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.objection.models.task.query();
      reply.render('tasks/index', { tasks });
      return reply;
    }).get('/tasks/new', { name: 'newTask' }, (req, reply) => {
      const task = new app.objection.models.task();
      reply.render('tasks/new', { task });
    });
};
