import { Router } from 'express'
import { createUsersReq, getUsersReq } from '../controlles/user.cotroller.js'

const routerUser = Router()

routerUser.post('/', createUsersReq)
routerUser.get('/', getUsersReq)

export default routerUser