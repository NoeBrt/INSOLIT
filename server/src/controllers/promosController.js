import { supabase } from '../lib/supabase.js'

function parsePoint(pointValue) {
  if (!pointValue || typeof pointValue !== 'string') {
    return { latitude: null, longitude: null }
  }

  const match = pointValue.match(/^\(([-\d.]+),([-\d.]+)\)$/)
  if (!match) {
    return { latitude: null, longitude: null }
  }

  // PostgreSQL point stores x,y. We use x=longitude and y=latitude.
  const longitude = Number.parseFloat(match[1])
  const latitude = Number.parseFloat(match[2])

  return { latitude, longitude }
}

function normalizePromo(promo) {
  const coords = parsePoint(promo.merchants?.coordinates)
  const category = promo.merchants?.categories

  return {
    ...promo,
    category: category?.label ?? null,
    category_icon: category?.icon ?? null,
    latitude: coords.latitude,
    longitude: coords.longitude,
  }
}

export async function getAllPromos(req, res) {
  const { category } = req.query

  const query = supabase
    .from('promos')
    .select('*, merchants(name, address, coordinates, categories(label, icon))')
    .order('end_date', { ascending: true, nullsFirst: false })

  const { data, error } = await query

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const normalized = (data ?? []).map(normalizePromo)
  const filtered = category
    ? normalized.filter((promo) => promo.category === category)
    : normalized

  res.json(filtered)
}

export async function getPromoById(req, res) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('promos')
    .select('*, merchants(name, address, coordinates, categories(label, icon))')
    .eq('id', id)
    .single()

  if (error) {
    return res.status(404).json({ error: 'Promo introuvable' })
  }

  res.json(normalizePromo(data))
}
