// Apartado de la autenticacion
// Registrar un nuevo usuario a la base de datos
// Logica de Negocio
import { Auth } from '../interfaces/auth.interface'
import { User } from '../interfaces/user.interface'
import UserModel from '../models/user'
import { encrypt, verified } from '../utils/bcrypt.handle'
import { generateToken } from '../utils/jwt.handle'

const registerNewUser = async ({ email, password, name }: User) => {
  const checkIs = await UserModel.findOne({ email })
  if (checkIs) return 'AlREADY_USER'
  const passHash = await encrypt(password) //TODO 1234567

  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    name,
  })
  return registerNewUser
}

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email })
  if (!checkIs) return 'NOT FOUND USER'

  const passwordHash = checkIs.password // Todo el encriptado
  const isCorrect = await verified(password, passwordHash)

  if (!isCorrect) return 'PASSWORD INCORRECT'

  const token = generateToken(checkIs.email)
  console.log(token)

  const data = {
    user: checkIs,
    token,
  }
  return data
}

export { loginUser, registerNewUser }
