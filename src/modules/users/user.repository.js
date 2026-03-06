import { pool } from '../../config/db.config.js'


export const getUsers = async () =>{
    const query = `
    select * from "user"`
    try {
        const response = await pool.query(query);
        return response.rows
    }catch(error){
        console.log(`Error, data could not be found`)
        throw error
    }
}


export const createUsers = async (user_name, email, password, user_status, id_language, id_level) => {
    const query = `
    INSERT INTO "user"
    (User_name, email, password, user_status, id_language, id_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [user_name, email, password, user_status, id_language, id_level];

    try {
        const response = await pool.query(query, values);
        return response.rows[0];
    } catch (error) {
        console.error(`error: user not created: ${error}`);
        throw error;
    }
}


export const loginUserQuery = async (l_login, l_password)=>{
    const query = `
    SELECT validate_login($1, $2) AS is_valid
    `
    const values = [l_login, l_password]

    try {
        const response = await pool.query(query, values)
        return Boolean(response.rows[0]?.is_valid)
    }catch (error){
        console.error(`error, data cannot be accessed`);
        throw error;
    }
}
