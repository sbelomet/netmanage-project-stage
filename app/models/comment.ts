import { CommentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Post from '#models/post'
import User from '#models/user'

export default class Comment extends CommentSchema {
    /** 
     * A comment belongs to a post
     */
    @belongsTo(() => Post)
    declare post: BelongsTo<typeof Post>

    /**
     * A comment belongs to a user
     */
    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>
}