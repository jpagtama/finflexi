import { prisma } from '@db/index'
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from 'bcrypt';
import { setCookie } from "cookies-next";
import * as jose from 'jose';

interface Errors {
    name: string;
    message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const errors: Errors[] = [];
        const { email, password } = req.body;

        const validationSchema = [
            {
                name: "email",
                valid: validator.isEmail(email),
                errorMessage: "Please enter a valid email"
            },
            {
                name: "password",
                valid: validator.isLength(password, { min: 1 }),
                errorMessage: "Please enter your password"
            }
        ]

        validationSchema.forEach(field => {
            if (!field.valid) errors.push({ name: field.name, message: field.errorMessage });
        })

        if (errors.length) return res.status(400).json({ success: false, errors });

        const user = await prisma.userModel.findUnique({
            where: {
                email
            }
        });

        if (!user) return res.status(401).json({ success: false, errors: [{ name: "email", message: "Email or password is invalid" }] });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ success: false, errors: [{ name: "email", message: "Email or password is invalid" }] });

        const alg = "HS256";
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new jose.SignJWT({ email: user.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret);

        // save the token to the client's cookies
        setCookie("jwt", token, { req, res, maxAge: 60 * 60 * 24 }); // 60sec * 60min * 24hrs (1 day)

        return res.status(200).json({
            success: true,
            userInfo: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            }
        });
    }

    return res.status(404).json({ success: false, errors: [{ name: "", message: "invalid method" }] });
}

export default handler;