import { supabase } from '../lib/supabase.js'
import { isUnder26 } from '../utils/age.js'

/**
 * Middleware that verifies the user is under 26 years old.
 * Expects req.user to be populated by requireAuth middleware.
 */
export async function ageCheck(req, res, next) {
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Authentification requise' })
  }

  const { data: profile, error } = await supabase
    .from('users')
    .select('birth_date')
    .eq('id', userId)
    .single()

  if (error || !profile) {
    return res.status(404).json({ error: 'Profil introuvable' })
  }

  if (!isUnder26(profile.birth_date)) {
    return res.status(403).json({ error: 'Accès réservé aux moins de 26 ans' })
  }

  next()
}
