// @ts-check

export const up = (knex) => (
  knex.schema.createTable('task_labels', (table) => {
    table.increments('id').primary();
    table.integer('label_id');
    table.integer('task_id');
  })
);

export const down = (knex) => knex.schema.dropTable('task_labels');
