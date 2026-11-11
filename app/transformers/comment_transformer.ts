import { BaseTransformer } from '@adonisjs/core/transformers'
import Comment from '#models/comment'
import UserTransformer from '#transformers/user_transformer'

export default class CommentTransformer extends BaseTransformer<Comment> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'content', 'createdAt']),
      author: UserTransformer.transform(this.resource.user),
    }
  }
}