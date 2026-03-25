import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const PARIS_CENTER = [48.8566, 2.3522]

const FILTERS = [
  { key: 'all', label: '✨ Toutes' },
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

function getFilterType(promo) {
  const category = (promo.category || '').toLowerCase()

  if (category === 'food') return 'restaurants'
  if (category === 'mode' || category === 'beaute' || category === 'beauté' || category === 'tech') {
    return 'cadeaux'
  }

  return 'activites'
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
  const [activeFilter, setActiveFilter] = useState('all')
  const [promos, setPromos] = useState([])

  useEffect(() => {
    fetch('/api/promos')
      .then((res) => res.json())
      .then((data) => {
        setPromos(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        setPromos([])
      })
  }, [])

  const allMarkers = useMemo(() => {
    const validPromos = promos.filter(
      (promo) => Number.isFinite(promo.latitude) && Number.isFinite(promo.longitude)
    )

    if (validPromos.length > 0) {
      return validPromos.map((promo) => {
        const type = getFilterType(promo)
        return {
          id: promo.id,
          promoId: promo.id,
          lat: promo.latitude,
          lng: promo.longitude,
          type,
          emoji: promo.category_icon || EMOJI_BY_TYPE[type] || '🎉',
          name: promo.title,
          merchant: promo.merchants?.name || 'Marchand',
          category: promo.category || 'Offre',
        }
      })
    }

    return buildDenseMarkers()
  }, [promos])

  const visibleMarkers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allMarkers.filter((marker) => {
      let filterMatch = true

      if (activeFilter !== 'all') {
        filterMatch =
          activeFilter === 'activites'
            ? marker.type === 'activites' || marker.type === 'nightlife'
            : marker.type === activeFilter
      }

      const queryMatch = !q || marker.name.toLowerCase().includes(q)
      return filterMatch && queryMatch
    })
  }, [allMarkers, activeFilter, query])

  return (
    <div className="h-[calc(100dvh-5rem)] md:h-[calc(100dvh-4rem)] w-full bg-[#0d0e14] text-white flex flex-col overflow-hidden">
      <header className="px-4 pt-4 pb-3 shrink-0 md:max-w-7xl md:mx-auto md:w-full md:px-6 lg:px-8">
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

      <main className="relative flex-1 min-h-0 px-4 pb-4 md:px-6 lg:px-8">
        <div className="h-full overflow-hidden rounded-2xl border border-[#2a2d3d] shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
          <MapContainer
            center={visibleMarkers[0] ? [visibleMarkers[0].lat, visibleMarkers[0].lng] : PARIS_CENTER}
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
              >
                <Popup>
                  <div className="min-w-45">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{marker.emoji}</span>
                      <p className="font-semibold text-sm text-[#111827]">{marker.category}</p>
                    </div>
                    <p className="font-semibold text-[#111827] mb-1">{marker.name}</p>
                    <p className="text-xs text-gray-600 mb-3">{marker.merchant}</p>
                    {marker.promoId && (
                      <Link
                        to={`/promo/${marker.promoId}`}
                        className="inline-flex items-center rounded-md bg-[#ff2e9c] px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Voir la promo
                      </Link>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
    </div>
  )
}
