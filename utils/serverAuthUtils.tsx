import { GetServerSidePropsContext } from "next";
import * as jose from 'jose';
import { prisma } from '@db/index';

type AuthInfo = {
    isLoggedIn: boolean,
    email: string | null,
    userId: string | null,
    firstName: string | null,
    lastName: string | null,
}

export const getUserAuthInfo = async (context: GetServerSidePropsContext): Promise<AuthInfo> => {
    interface UserToken {
        payload: {
            email: string;
            exp: number
        }
    }

    let email: string | null = null;
    let userId: string | null = null;
    let firstName: string | null = null;
    let lastName: string | null = null;

    const cookiesStore = context.req.cookies;
    let isLoggedIn = false;

    let userToken: UserToken | null = null;
    const jwt = cookiesStore.jwt;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        userToken = await jose.jwtVerify(String(jwt), secret);

        const user = await prisma.userModel.findUnique({
            where: {
                email: userToken.payload.email
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
            }
        });

        if (user) {
            isLoggedIn = true;
            email = user.email;
            userId = user.id;
            firstName = user.first_name;
            lastName = user.last_name;
        }
    } catch (e) {
        isLoggedIn = false;
    }

    return { isLoggedIn, email, userId, firstName, lastName };
}