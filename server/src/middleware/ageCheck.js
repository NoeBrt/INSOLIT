import { supabase } from '../lib/supabase.js'
import { isUnder26 } from '../utils/age.js'

/**
 * Middleware that verifies the user is under 26 years old.
 * Expects user_id in the request body or as a query parameter.
 */
export async function ageCheck(req, res, next) {
  const userId = req.body.user_id || req.query.user_id

  if (!userId) {
    return next()
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('date_of_birth')
    .eq('id', userId)
    .single()

  if (error || !profile) {
    return res.status(404).json({ error: 'Profil introuvable' })
  }

  if (!isUnder26(profile.date_of_birth)) {
    return res.status(403).json({ error: 'Accès réservé aux moins de 26 ans' })
  }

  next()
}
