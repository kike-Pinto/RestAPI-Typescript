// El controlador es el encargado de recibir y responder
import { Request, Response } from 'express'
import { registerNewUser, loginUser } from '../services/auth' // El controlador tiene que conectarse al servicio

const registerCtrl = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body)
  res.send(responseUser)
}

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body
  const responseUser = await loginUser({ email, password })

  if (responseUser === 'PASSWORD INCORRECT') {
    res.status(403)
    res.send(responseUser)
  } else {
    res.send(responseUser)
  }
}

export { loginCtrl, registerCtrl }
