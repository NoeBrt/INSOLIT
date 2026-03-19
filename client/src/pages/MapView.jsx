import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const PARIS_CENTER = [48.8566, 2.3522]

const FILTERS = [
  { key: 'restaurants', label: '🍔 Restaurants' },
  { key: 'cadeaux', label: '🎁 Cadeaux' },
  { key: 'activites', label: '🎱 Activités' },
]

const EMOJI_BY_TYPE = {
  restaurants: '🍔',
  cadeaux: '💈',
  activites: '🎱',
  nightlife: '🍸',
}

function buildDenseMarkers() {
  const markers = []
  const rings = [
    { radius: 0.012, count: 20 },
    { radius: 0.02, count: 24 },
    { radius: 0.028, count: 20 },
    { radius: 0.04, count: 14 },
  ]

  const types = ['restaurants', 'activites', 'nightlife', 'cadeaux']

  let idx = 0
  for (const ring of rings) {
    for (let i = 0; i < ring.count; i++) {
      const angle = (2 * Math.PI * i) / ring.count
      const lat = PARIS_CENTER[0] + Math.sin(angle) * ring.radius
      const lng = PARIS_CENTER[1] + Math.cos(angle) * ring.radius * 1.45
      const type = types[idx % types.length]
      const emoji = EMOJI_BY_TYPE[type]
      markers.push({
        id: `${ring.radius}-${i}`,
        lat,
        lng,
        type,
        emoji,
        name: type === 'restaurants' ? 'Burger insolite' : type === 'cadeaux' ? 'Barbier premium' : type === 'nightlife' ? 'Soiree cocktail' : 'Activite urbaine',
      })
      idx++
    }
  }

  // Outer suburban markers for Nanterre / Saint-Denis / Creteil / etc.
  markers.push(
    { id: 'nanterre', lat: 48.8924, lng: 2.2066, type: 'activites', emoji: '🎱', name: 'Nanterre Fun' },
    { id: 'stdenis', lat: 48.9362, lng: 2.3574, type: 'restaurants', emoji: '🍔', name: 'Saint-Denis Food' },
    { id: 'creteil', lat: 48.7904, lng: 2.4556, type: 'nightlife', emoji: '🍸', name: 'Creteil Night' },
    { id: 'boulogne', lat: 48.8397, lng: 2.2399, type: 'cadeaux', emoji: '💈', name: 'Boulogne Style' },
    { id: 'montreuil', lat: 48.8638, lng: 2.4485, type: 'restaurants', emoji: '🍔', name: 'Montreuil Burger' }
  )

  return markers
}

const iconCache = new Map()
function getPinIcon(emoji) {
  if (iconCache.has(emoji)) {
    return iconCache.get(emoji)
  }

  const icon = L.divIcon({
    className: 'insolit-pin-wrapper',
    html: `<div class="insolit-pin"><span>${emoji}</span></div>`,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
  })

  iconCache.set(emoji, icon)
  return icon
}

export default function MapView() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('restaurants')
  const allMarkers = useMemo(() => buildDenseMarkers(), [])

  const visibleMarkers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allMarkers.filter((marker) => {
      const filterMatch =
        activeFilter === 'activites'
          ? marker.type === 'activites' || marker.type === 'nightlife'
          : marker.type === activeFilter
      const queryMatch = !q || marker.name.toLowerCase().includes(q)
      return filterMatch && queryMatch
    })
  }, [allMarkers, activeFilter, query])

  return (
    <div className="h-screen w-full bg-[#0d0e14] text-white flex flex-col overflow-hidden">
      <header className="px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl font-black tracking-tight text-[#ff2e9c]">insolit</h1>
          <button className="text-2xl text-[#ff2e9c]" aria-label="Favoris">
            ❤
          </button>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex : Burger, soirée..."
          className="w-full rounded-2xl bg-[#191b26] border border-[#2a2d3d] px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#ff2e9c]"
        />

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.key
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#ff2e9c] border-[#ff2e9c] text-white'
                    : 'bg-[#1a1d2a] border-[#2f3346] text-gray-300'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      </header>

      <main className="relative flex-1 min-h-0">
        <MapContainer
          center={PARIS_CENTER}
          zoom={11}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {visibleMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={getPinIcon(marker.emoji)}
            />
          ))}
        </MapContainer>
      </main>

      <nav className="shrink-0 bg-[#0d0f16] border-t border-[#212436] px-2 py-2">
        <div className="grid grid-cols-3 gap-1 text-center text-xs">
          <Link to="/" className="flex flex-col items-center py-1 text-gray-400">
            <span className="text-lg">🎟️</span>
            <span>Offres</span>
          </Link>

          <div className="flex flex-col items-center py-1 text-[#ff2e9c]">
            <span className="text-lg">📍</span>
            <span>Carte</span>
          </div>

          <Link to="/account" className="flex flex-col items-center py-1 text-gray-400">
            <span className="text-lg">👤</span>
            <span>Compte</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
