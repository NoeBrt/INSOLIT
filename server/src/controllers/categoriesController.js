import { supabase } from '../lib/supabase.js'

export async function getAllCategories(_req, res) {
  const { data, error } = await supabase
    .from('categories')
    .select('id, label, icon')
    .order('label', { ascending: true })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data ?? [])
}
