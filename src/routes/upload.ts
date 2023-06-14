import { Router } from 'express'
import { getFile } from '../controllers/upload'
import multerMiddleware from '../middleware/file'
import { checkJwt } from '../middleware/session'

const router = Router()

router.post('/', checkJwt, multerMiddleware.single('myFile'), getFile)

export { router }
