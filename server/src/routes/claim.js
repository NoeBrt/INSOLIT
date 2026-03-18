import { Router } from 'express'
import { ageCheck } from '../middleware/ageCheck.js'
import { claimPromo } from '../controllers/claimController.js'

const router = Router()

router.post('/', ageCheck, claimPromo)

export default router
