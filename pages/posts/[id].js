import { useRouter } from 'next/router'
import posts from '../../data/posts'

export default function PostPage() {
  const router = useRouter()
  const { id } = router.query

  const post = posts.find(p => String(p.id) === String(id))

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <article className="prose mb-6">{post.content}</article>

      <div className="space-x-2">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back to Home
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-100 rounded"
        >
          Go Back
        </button>
      </div>
    </main>
  )
}
