import { Router } from 'express'
import { getQuestions, createQuestionRequest } from '../controlles/question.controller.js'

const router = Router()

router.post('/', createQuestionRequest)
router.get('/', getQuestions)

export default router
