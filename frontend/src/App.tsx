import { useState } from 'react'

interface ReputationData {
  ens: string;
  address: string;
  daoVotes: number;
  poaps: Array<{
    name: string;
    eventId: string;
    date: string;
  }>;
  githubContributions: {
    totalCommits: number;
    repositories: number;
    pullRequests: number;
  };
}

function App() {
  const [ensName, setEnsName] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ReputationData | null>(null)

  const handleSearch = async () => {
    if (!ensName) return
    
    setLoading(true)
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setData({
        ens: ensName,
        address: '0x1234...5678',
        daoVotes: 15,
        poaps: [
          { name: 'ETHGlobal London', eventId: '1', date: '2024-03-15' },
          { name: 'DevCon 2023', eventId: '2', date: '2023-10-20' },
          { name: 'ETHDenver 2024', eventId: '3', date: '2024-02-25' }
        ],
        githubContributions: {
          totalCommits: 347,
          repositories: 12,
          pullRequests: 28
        }
      })
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

        {/* Results */}
        {data && (
          <div className="mt-16">
            {/* Profile Header */}
            <div className="rounded-lg bg-gray-800/50 p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-2xl text-indigo-400">
                    {data.ens.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{data.ens}</h2>
                  <p className="text-gray-400">{data.address}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* DAO Activity */}
              <div className="rounded-lg bg-gray-800/50 p-6">
                <h3 className="text-lg font-medium text-gray-200 mb-4">DAO Activity</h3>
                <div className="flex items-baseline">
                  <p className="text-4xl font-bold text-white">{data.daoVotes}</p>
                  <p className="ml-2 text-sm text-gray-400">votes cast</p>
                </div>
              </div>

              {/* POAPs */}
              <div className="rounded-lg bg-gray-800/50 p-6">
                <h3 className="text-lg font-medium text-gray-200 mb-4">POAPs</h3>
                <div className="space-y-3">
                  {data.poaps.map(poap => (
                    <div key={poap.eventId} className="flex items-center justify-between">
                      <span className="text-indigo-400">{poap.name}</span>
                      <span className="text-sm text-gray-400">{poap.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Activity */}
              <div className="rounded-lg bg-gray-800/50 p-6">
                <h3 className="text-lg font-medium text-gray-200 mb-4">GitHub Activity</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Commits</p>
                    <p className="text-2xl font-bold text-white">{data.githubContributions.totalCommits}</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Repositories</p>
                      <p className="text-xl font-semibold text-white">{data.githubContributions.repositories}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Pull Requests</p>
                      <p className="text-xl font-semibold text-white">{data.githubContributions.pullRequests}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && (
          <div className="mt-16 text-center text-gray-400">
            Enter an ENS name to see their reputation data
          </div>
        )}
      </div>
    </div>
  )
}

export default App