import { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'
import { deleteUser } from '../../_utils/api'
import { getAuthTokenFromHeader } from '../../_utils/auth'

export default async (request: VercelRequest, response: VercelResponse) => {
    // Get email from request
    const { email } = request.query

    if (!request.query || !email) {
        response.status(422).json('Email param not supplied')
    }

    try {
        const token = getAuthTokenFromHeader(request)
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!payload || typeof payload === 'string') {
            response.status(401).json('You must be signed in to delete an account!')
        }
    
        await deleteUser(<string>email)
        response.status(200).json('Account removed')
    } catch (error) {
        console.log(error)
    }
}