import { Router } from 'express'
import { createUsersReq, getUsersReq } from './user.controller.js'

const routerUser = Router()

routerUser.post('/', createUsersReq)
routerUser.get('/', getUsersReq)

export default routerUser
