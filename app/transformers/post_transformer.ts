import { BaseTransformer } from '@adonisjs/core/transformers'
import Post from '#models/post'
import UserTransformer from '#transformers/user_transformer'
import CommentTransformer from '#transformers/comment_transformer'

export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'url', 'summary', 'createdAt']),
      author: UserTransformer.transform(this.resource.user),
      comments: CommentTransformer.transform(this.whenLoaded(this.resource.comments))?.depth(2)
    }
  }
}