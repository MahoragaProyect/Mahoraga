import { Router } from 'express'
import {createQuestionRequest, getQuestions} from '../controlles/question.controller.js'

const router = Router()

router.post('/', createQuestionRequest)
router.get('/', getQuestions)

export default router
