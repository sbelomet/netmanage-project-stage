import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'
import PostTransformer from '#transformers/post_transformer'

export default class PostsController {
    async index({ inertia }: HttpContext) {
        const posts = await Post.query()
            .preload('user')
            .orderBy('createdAt', 'desc')

        return inertia.render('posts/index', {
            posts: PostTransformer.transform(posts),
        })
    }
}