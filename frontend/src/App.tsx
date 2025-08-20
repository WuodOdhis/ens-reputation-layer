import { useState } from 'react'

function App() {
  const [ensName, setEnsName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!ensName) return
    
    setLoading(true)
    try {
      // Just log for now
      console.log('Searching for:', ensName)
      await new Promise(resolve => setTimeout(resolve, 1000))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            ENS Reputation Layer
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover the reputation behind any ENS name
          </p>
        </div>

        {/* Search Input */}
        <div className="mt-10 max-w-xl mx-auto">
          <div className="flex gap-x-4">
            <input
              type="text"
              value={ensName}
              onChange={(e) => setEnsName(e.target.value)}
              placeholder="Enter ENS name (e.g. vitalik.eth)"
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              onClick={handleSearch}
              disabled={loading || !ensName}
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="mt-16 text-center text-gray-400">
          Enter an ENS name to see their reputation data
        </div>
      </div>
    </div>
  )
}

export default App