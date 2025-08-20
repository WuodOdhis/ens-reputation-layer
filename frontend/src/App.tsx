import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useENS } from './hooks/useENS'

interface ReputationData {
  ens: string;
  daoVotes: number;
  poaps: string[];
  githubContributions: number;
}

function App() {
  const [ensName, setEnsName] = useState('')
  const { resolveENS, loading, error, profile } = useENS()
  const [reputationData, setReputationData] = useState<ReputationData | null>(null)

  const handleSearch = async () => {
    const ensProfile = await resolveENS(ensName);
    if (ensProfile) {
      // For now, we'll use mock data along with the real ENS resolution
      setReputationData({
        ens: ensProfile.name,
        daoVotes: 5,
        poaps: ["ETHCC2024", "DevCon7"],
        githubContributions: 120
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
              disabled={loading}
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>

        {/* Results */}
        {reputationData && profile && (
          <div className="mt-16 flow-root">
            <div className="rounded-lg bg-gray-800/50 px-6 py-8">
              <div className="flex items-center gap-4 mb-6">
                {profile.avatar && (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {reputationData.ens}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {profile.address}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* DAO Votes */}
                <div className="rounded-lg bg-gray-700/50 p-6">
                  <h3 className="text-lg font-medium text-gray-200">DAO Votes</h3>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {reputationData.daoVotes}
                  </p>
                </div>

                {/* POAPs */}
                <div className="rounded-lg bg-gray-700/50 p-6">
                  <h3 className="text-lg font-medium text-gray-200">POAPs</h3>
                  <div className="mt-2 space-y-1">
                    {reputationData.poaps.map((poap) => (
                      <span
                        key={poap}
                        className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/20 mr-2"
                      >
                        {poap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub Contributions */}
                <div className="rounded-lg bg-gray-700/50 p-6">
                  <h3 className="text-lg font-medium text-gray-200">
                    GitHub Contributions
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {reputationData.githubContributions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App