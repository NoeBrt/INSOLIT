import { supabase } from '../lib/supabase.js'

export async function claimPromo(req, res) {
  const { user_id, promo_id } = req.body

  if (!user_id || !promo_id) {
    return res.status(400).json({ error: 'user_id et promo_id sont requis' })
  }

  // Check if already claimed
  const { data: existing } = await supabase
    .from('redemptions')
    .select('id')
    .eq('user_id', user_id)
    .eq('promo_id', promo_id)
    .single()

  if (existing) {
    return res.json({ message: 'Offre déjà utilisée', redemption: existing })
  }

  const { data, error } = await supabase
    .from('redemptions')
    .insert({ user_id, promo_id })
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json({ message: 'Offre enregistrée', redemption: data })
}
