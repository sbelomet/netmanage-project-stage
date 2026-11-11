import { PostSchema } from '#database/schema'
import { hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Comment from '#models/comment'
import User from '#models/user'

export default class Post extends PostSchema {
    /**
     * A post has many comments
     */
    @hasMany(() => Comment)
    declare comments: HasMany<typeof Comment>

    /**
     * A post belongs to a user
     */
    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>
}