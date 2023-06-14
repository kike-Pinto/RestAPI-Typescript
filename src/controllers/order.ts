import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { JwtPayload } from 'jsonwebtoken'
import { RequestExt } from '../interfaces/req-ext'

// interface RequestExt extends Request {
//   user?: string | JwtPayload
// }

const getItems = (req: RequestExt, res: Response) => {
  try {
    res.send({
      data: 'ESTO SOLO LO VE LAS PERSONAS CON SESSION / JWT',
      user: req.user,
    })
  } catch (error) {
    handleHttp(res, 'ERROR GET ITEMS')
  }
}

export { getItems }
