import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`
const router = Router()

/**
 * index.ts ['item','ts']
 * @returns
 * */

const cleanFileName = (filename: string) => {
  const file = filename.split('.').shift() //tenemos el archivo item.ts y devuelve item sin el .ts
  return file
}

readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename)
  if (cleanName !== 'index') {
    import(`./${cleanName}`).then((moduleRouter) => {
      console.log(`Se esta cargando la ruta..... /${cleanName}`)

      router.use(`/${cleanName}`, moduleRouter.router)
      // console.log(cleanName)
    })
  }
})

export { router }
