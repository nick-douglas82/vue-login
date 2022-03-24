import { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '../_utils/api';

export default async (request: VercelRequest, response: VercelResponse) => {
    // Get email and password from request
    const { email, password } = request.body

    try {
        // Search DB for email and return if found - if not return error
        const user = await getUserByEmail(email)

        if (!user) {
            response.status(401).json('Invalid email or password')
        }
        // Compare password of found user and given password using bcrypt.compare
        const isCorrectPassword = await bcrypt.compare(password, user.passwordhash);

        // if ok, continue - if not return error
        if (!isCorrectPassword) {
            response.status(401).json('Invalid email or password')
        }

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