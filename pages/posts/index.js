import Link from 'next/link'
import posts from '../../data/posts'
import PostLink from '../../components/PostLink'

export default function PostsPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <div className="space-y-3">
        {posts.map(p => (
          <PostLink key={p.id} post={p} />
        ))}
      </div>

      <p className="mt-6">
        <Link href="/">← Back to Home</Link>
      </p>
    </main>
  )
}
