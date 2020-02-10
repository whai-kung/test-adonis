'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TweetsSchema extends Schema {
  up () {
    this.create('tweets', (table) => {
      table.increments()
      table.integer('author_id').unsigned().references('id').inTable('users')
      table.integer('owner_id').unsigned().references('id').inTable('users')
      table.string('body')
      table.boolean('is_retweet')
      table.timestamps()
    })
  }

  down () {
    this.drop('tweets')
  }
}

module.exports = TweetsSchema
