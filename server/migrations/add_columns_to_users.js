// @ts-check

export const up = (knex) => (
  knex.schema.table('users', (table) => {
    table.string('first_name');
  })
);

export const down = (knex) => knex.schema.table('users', (table) => table.dropColumn('first_name'));
