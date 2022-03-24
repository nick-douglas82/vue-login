import { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'
import { updateUser } from '../../_utils/api'
import { getAuthTokenFromHeader } from '../../_utils/auth'

export default async (request: VercelRequest, response: VercelResponse) => {
    if (!request.query || !request.query.email) {
        response.status(422).json('Email param not supplied')
    }

    const token = getAuthTokenFromHeader(request)
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!payload || typeof payload === 'string') {
        return;
    }

    if (!request.body || Object.keys(request.body).length === 0) {
        response.status(422).json('No params passed to then update')
    }

    try {
        const user = await updateUser(<string>request.query.email, request.body)

        if (!user) {
            response.status(422).json('There has been an error, please try again.')
        }

        response.status(200).json({ user })
    } catch (error) {
        console.log(error)
    }

}