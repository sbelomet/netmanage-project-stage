import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'client_memberships'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.unique(['user_id', 'client_id'])

      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')

      table.integer('client_id').unsigned().notNullable()
      table.foreign('client_id').references('clients.id').onDelete('CASCADE')

      table.integer('role_id').unsigned().notNullable()
      table.foreign('role_id').references('roles.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
