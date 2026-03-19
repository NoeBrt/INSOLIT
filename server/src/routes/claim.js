import { Router } from 'express'
import { ageCheck } from '../middleware/ageCheck.js'
import { requireAuth } from '../middleware/auth.js'
import { claimPromo } from '../controllers/claimController.js'

const router = Router()

router.post('/', requireAuth, ageCheck, claimPromo)

export default router
