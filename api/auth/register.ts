import { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createNewUser } from '../_utils/api';

export default async (request: VercelRequest, response: VercelResponse) => {
    // Get email and password and name from request
    const { email, password, name } = request.body

    if (!name || !email || !password) {
        response.status(422).json('Required fields are empty')
    }

    try {
        // Hash the given password
        const passwordHash = await bcrypt.hash(password, 10)

        const user = await createNewUser(email, passwordHash, name)

        // jwt.sign found user with the ACCESS_TOKEN_SECRET
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        // return response with access Token & User
        response.status(200).json({
            user,
            accessToken
        })
        
    } catch (error) {
        console.log(error)
    }
}