'use client'

import { useState } from 'react'

interface SearchResult {
  id: string
  title: string
  description: string
  location: string
  price: number
  similarity: number
}

export default function ApartmentSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/search-elastic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      })

      const data = await response.json()

      setResults(data.results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mx-auto max-w-4xl p-4'>
      <div className='mb-6'>
        <label htmlFor='search' className='mb-2 block text-lg font-medium'>
          Describe your ideal apartment
        </label>
        <textarea
          id='search'
          className='min-h-[120px] w-full rounded-lg border p-4 shadow-sm'
          placeholder='Example: We are a family of 5 looking for a 2-bedroom apartment near Sevan Lake...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className='mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300'
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {results?.length > 0 && (
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Search Results</h2>
          {results.map((result, index) => (
            <div key={index} className='rounded-lg border p-4 shadow-sm'>
              <h3 className='text-lg font-medium'>{result.title}</h3>
              <p className='text-gray-600'>{result.description}</p>
              <div className='mt-2 flex justify-between'>
                <span className='text-gray-500'>{result.location}</span>
                <span className='font-medium'>${result.price}/month</span>
              </div>
              <div className='mt-1 text-sm text-gray-500'>Match score: {Math.round(result.similarity * 100)}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
