export const up = (knex) => (
  knex.schema.table('users', (table) => {
    table.string('lastname')
  })
);

export const down = (knex) => knex.schema.table('users', (table) => table.dropColumn('lastname'));
