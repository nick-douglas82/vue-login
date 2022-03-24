import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (request: VercelRequest, response: VercelResponse) => {
  response.status(200).json([
    {
      name: 'Nick',
      age: 39,
    },
    {
      name: 'Stacey',
      age: 35,
    },
  ])
}
