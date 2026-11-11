import { InertiaProps } from '~/types'
import { Data } from '@generated/data'
import MarketingLayout from '~/layouts/marketing'

type PageProps = InertiaProps<{
  posts: Data.Post[]
}>

export default function PostsIndex(props: PageProps) {
  const { posts } = props

  return (
    <div className="container">
      <div className="posts-list-title">
        <h1>Posts</h1>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <h2>{post.title}</h2>

          <div className="post-meta">
            <div>By {post.author.fullName}</div>

            <span>.</span>
            <div>
              <a href={post.url} target="_blank" rel="noreferrer">
                {post.url}
              </a>
            </div>

            <span>.</span>
            <div>
              <a href={`/posts/${post.id}`}>View comments</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

PostsIndex.layout = [MarketingLayout]