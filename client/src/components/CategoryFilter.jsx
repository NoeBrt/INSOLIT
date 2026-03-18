const CATEGORIES = ['Tous', 'Food', 'Expérience', 'Mode', 'Tech', 'Beauté', 'Sport', 'Culture']

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat === 'Tous' ? null : cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            (cat === 'Tous' && !selected) || selected === cat
              ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white shadow-lg shadow-neon-purple/20'
              : 'bg-dark-card border border-dark-border text-gray-400 hover:border-neon-purple/50 hover:text-white'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
