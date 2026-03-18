import { supabase } from '../lib/supabase.js'

export async function getAllPromos(req, res) {
  const { category } = req.query

  let query = supabase
    .from('promos')
    .select('*, merchants(name, logo_url)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
}

export async function getPromoById(req, res) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('promos')
    .select('*, merchants(name, logo_url, address)')
    .eq('id', id)
    .single()

  if (error) {
    return res.status(404).json({ error: 'Promo introuvable' })
  }

  res.json(data)
}
