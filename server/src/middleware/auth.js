import jwt from 'jsonwebtoken'

function getJwtSecret() {
  return process.env.JWT_SECRET || 'dev-secret-change-me'
}

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Authentification requise' })
  }

  try {
    const payload = jwt.verify(token, getJwtSecret())
    req.user = { id: payload.sub, email: payload.email }
    next()
  } catch {
    return res.status(401).json({ error: 'Token invalide ou expiré' })
  }
}

export function signToken(user) {
  return jwt.sign(
    { email: user.email },
    getJwtSecret(),
    { subject: user.id, expiresIn: '7d' }
  )
}
