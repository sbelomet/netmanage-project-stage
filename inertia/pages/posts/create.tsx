import { Form } from '@adonisjs/inertia/react'
import MarketingLayout from '~/layouts/marketing'

export default function PostsCreate() {
  return (
    <div className="form-container">
      <div>
        <h1>Share your creation</h1>
        <p>Share the URL and a short summary of your creation</p>
      </div>

      <div>
        <Form route="posts.store">
          {({ errors }) => (
            <>
              <div>
                <label htmlFor="title">Post title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title of your creation"
                  data-invalid={errors.title ? 'true' : undefined}
                />
                {errors.title && <div>{errors.title}</div>}
              </div>

              <div>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  placeholder="https://example.com/my-creation"
                  data-invalid={errors.url ? 'true' : undefined}
                />
                {errors.url && <div>{errors.url}</div>}
              </div>

              <div>
                <label htmlFor="summary">Short summary</label>
                <textarea
                  name="summary"
                  id="summary"
                  rows={4}
                  placeholder="Briefly describe what you are sharing"
                  data-invalid={errors.summary ? 'true' : undefined}
                />
                {errors.summary && <div>{errors.summary}</div>}
              </div>

              <div>
                <button type="submit" className="button">
                  Publish
                </button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}

PostsCreate.layout = [MarketingLayout]