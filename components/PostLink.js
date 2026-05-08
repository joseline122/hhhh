import Link from 'next/link'

export default function PostLink({ post }) {
  return (
    <div className="p-3 border rounded hover:shadow">
      <Link href={`/posts/${post.id}`} className="text-lg font-medium text-blue-600 hover:underline">
        {post.title}
      </Link>
      <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
    </div>
  )
}
