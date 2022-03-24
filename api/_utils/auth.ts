import { VercelRequest } from '@vercel/node'

export const getAuthTokenFromHeader = (request: VercelRequest): string => {
  const authHeader = request.headers['authorization']
  return authHeader && authHeader.split(' ')[1]
}