import { createUsers } from "../services/user.services.js";
import { getUsers } from "../services/user.services.js";

export const getUsersReq = async (req, res) => {
    try{
        const data = await getUsers()
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({
            error: 'Error, the server could not retrieve the users'
        })
    }
}

export const createUsersReq = async (req, res) => {
    const { user_name, email, password, user_status, id_language, id_level } = req.body

    const missingFields = []
    if (user_name === undefined || user_name === null || String(user_name).trim() === '') missingFields.push('user_name')
    if (email === undefined || email === null || String(email).trim() === '') missingFields.push('email')
    if (password === undefined || password === null || String(password).trim() === '') missingFields.push('password')

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: 'Error submitting user, you must complete all fields',
            missingFields
        })
    }
        try{
            const newUser = await createUsers(
                user_name,
                email,
                password,
                user_status,
                id_language,
                id_level
            )
            res.status(201).json({
                message: 'The user was created successfully.',
                ...newUser
            })
        }catch (error){
            console.error('Error creating user', error)
            res.status(500).json({error: error.message})
        }
    
}
