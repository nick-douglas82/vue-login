import { PrismaClient } from "@prisma/client"

type UserObject = {
    email: string,
    passwordhash: string,
    name: string
}

export const getUserByEmail = async (email: string) => {
    const prisma = new PrismaClient()
    return await prisma.user.findFirst({
        where: {
            email: email
        }
    })
}

export const updateUser = async (email: string, userObject: UserObject) => {
    const prisma = new PrismaClient()
    return await prisma.user.update({
        data: {
            ...userObject
        },
        where: {
            email: email
        }
    })
}

export const createNewUser = async (email: string, passwordhash: string, name: string) => {
    const prisma = new PrismaClient()
    return await prisma.user.create({
        data: {
            email,
            passwordhash,
            name,
            password: '' // TEMPORARY!
        },
    })
}

export const deleteUser = async (email: string) => {
    const prisma = new PrismaClient()
    return await prisma.user.delete({
        where :{
            email
        },
    })
}