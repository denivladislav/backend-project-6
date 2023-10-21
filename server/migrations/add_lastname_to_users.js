// @ts-check

export const up = (knex) => (
  knex.schema.table('users', (table) => {
    table.string('last_name');
  })
);

export const down = (knex) => knex.schema.table('users', (table) => table.dropColumn('last_name'));
