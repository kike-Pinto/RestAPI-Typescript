import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt.handle'
import { JwtPayload } from 'jsonwebtoken'
import { RequestExt } from '../interfaces/req-ext'

//

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || ''
    const jwt = jwtByUser.split(' ').pop() //11
    const isUser = verifyToken(`${jwt}`) as { id: string }
    console.log(isUser)

    if (!isUser) {
      res.status(401)
      res.send('NO TIENES UN JWT VALIDO')
    } else {
      req.user = isUser
      // console.log({ jwtByUser })
      next()
    }
  } catch (error) {
    console.log({ error })
    res.status(400)
    res.send('SESSION NO VALIDADA')
  }
}

export { checkJwt }
