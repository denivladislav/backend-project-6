export const up = (knex) => (
  knex.schema.table('users', (table) => {
    table.string('firstname')
  })
);

export const down = (knex) => knex.schema.table('users', (table) => table.dropColumn('firstname'));
