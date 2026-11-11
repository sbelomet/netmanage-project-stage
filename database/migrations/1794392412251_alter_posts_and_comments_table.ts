import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    /**
     * Add user_id to posts table
     */
    this.schema.alterTable('posts', (table) => {
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })

    /**
     * Add user_id and post_id to comments table
     */
    this.schema.alterTable('comments', (table) => {
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')

      table.integer('post_id').unsigned().notNullable()
      table.foreign('post_id').references('posts.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable('posts', (table) => {
      table.dropForeign(['user_id'])
      table.dropColumn('user_id')
    })

    this.schema.alterTable('comments', (table) => {
      table.dropForeign(['user_id'])
      table.dropForeign(['post_id'])
      table.dropColumn('user_id')
      table.dropColumn('post_id')
    })
  }
}