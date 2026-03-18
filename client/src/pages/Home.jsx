import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-2xl">
        <h1 className="text-6xl sm:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple bg-clip-text text-transparent">
            INSOLIT
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-2">
          Les bons plans les plus <span className="text-neon-cyan font-semibold">insolites</span> pour les moins de 26 ans.
        </p>
        <p className="text-gray-500 mb-10">
          Food, expériences, mode, tech... Profite d'offres exclusives réservées à ta génération.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity"
            >
              Voir les bons plans
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity"
              >
                Rejoindre INSOLIT
              </Link>
              <Link
                to="/login"
                className="border border-dark-border text-gray-300 px-8 py-4 rounded-xl text-lg hover:border-neon-purple/50 transition-colors"
              >
                Se connecter
              </Link>
            </>
          )}
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          {[
            { icon: '🔥', label: 'Promos exclusives' },
            { icon: '⚡', label: 'Mises à jour quotidiennes' },
            { icon: '🎯', label: '-26 ans uniquement' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-3xl mb-2">{item.icon}</p>
              <p className="text-sm text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
