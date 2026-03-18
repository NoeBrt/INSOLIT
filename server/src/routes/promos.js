import { Router } from 'express'
import { getAllPromos, getPromoById } from '../controllers/promosController.js'

const router = Router()

router.get('/', getAllPromos)
router.get('/:id', getPromoById)

export default router
