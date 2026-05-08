import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import posts from '../data/posts'
import PostLink from '../components/PostLink'

export default function Home() {
  const router = useRouter()
  const { q } = router.query
  const [search, setSearch] = useState(q || '')

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  function onSearch(e) {
    const value = e.target.value
    setSearch(value)
    router.replace({ pathname: '/', query: value ? { q: value } : {} }, undefined, { shallow: true })
  }

  const filtered = posts.filter(p => p.title.toLowerCase().includes((search || '').toLowerCase()))

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">ABC E-commerce — Posts</h1>

      <input
        value={search}
        onChange={onSearch}
        placeholder="Filter posts by title (updates query param)"
        className="border p-2 rounded w-full mb-4"
      />

      <section className="space-y-3">
        {filtered.map(post => (
          <PostLink key={post.id} post={post} />
        ))}
      </section>

      <p className="mt-6 text-sm text-gray-600">Try typing to filter — the URL updates using query parameters (shallow routing).</p>
    </main>
  )
}
