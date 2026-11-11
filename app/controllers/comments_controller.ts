import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { createCommentValidator } from '#validators/comment'


export default class CommentsController {
    /**
     * Handle the form submission for creating a new comment
     */
    async store({ request, auth, params, response }: HttpContext) {
        // Validate the comment content
        const payload = await request.validateUsing(createCommentValidator)

        // Create the comment and associate it with the post and user
        await Comment.create({
            ...payload,
            postId: params.id,
            userId: auth.user!.id,
        })

        // Redirect ack to the post page
        return response.redirect().back()
    }
}