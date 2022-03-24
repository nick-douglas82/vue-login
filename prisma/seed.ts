import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const nick = await prisma.user.create({
        data: {
            name: 'Nick',
            email: 'test@test.com',
            password: 'Formula1',
            passwordhash: '$2a$10$V/fQddKfdOe84kPKDUJPxuv4RYieKzwjjpw0PJHIGhC1W0KPsIa0O'
        }
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())