import { Link } from 'react-router-dom'

export default function PromoCard({ promo }) {
  return (
    <Link
      to={`/promo/${promo.id}`}
      className="group bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-neon-purple/50 transition-all hover:shadow-lg hover:shadow-neon-purple/10"
    >
      <div className="relative h-44 bg-dark-surface overflow-hidden">
        {promo.image_url ? (
          <img
            src={promo.image_url}
            alt={promo.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🎉
          </div>
        )}
        {promo.is_exclusive && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-neon-purple to-neon-cyan text-white text-xs font-bold px-3 py-1 rounded-full">
            Exclusif
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-neon-cyan bg-neon-cyan/10 px-2 py-1 rounded-full">
          {promo.category_icon ? `${promo.category_icon} ` : ''}{promo.category || 'Sans categorie'}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-neon-purple transition-colors">
          {promo.title}
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          {promo.merchants?.name || 'Marchand'}
        </p>
        {promo.end_date && (
          <p className="mt-2 text-sm text-gray-500">
            Jusqu'au {new Date(promo.end_date).toLocaleDateString('fr-FR')}
          </p>
        )}
      </div>
    </Link>
  )
}
