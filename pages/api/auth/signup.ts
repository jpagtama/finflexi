import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@db/index' // this is retrieved from the generated prisma client in your prisma.ts file
import validator from "validator";  // will allow you to further verify the payload
import bcrypt from 'bcrypt'; // will encrypt the password. This is what we’re storing in the db
import * as jose from 'jose'; // module for JSON Object Signing and Encryption
import { setCookie } from 'cookies-next'; // Getting, setting and removing cookies with NEXT.JS

interface Errors {
    name: string;
    message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "POST") {
        const { email, password } = req.body;
        const errors: Errors[] = [];

        const validationSchema = [
            {
                name: "email",
                valid: validator.isEmail(email.trim()),
                errorMessage: "Please enter a valid email"
            },
            {
                name: "password",
                valid: validator.isStrongPassword(password),
                errorMessage: "Password must be at least 8 characters long, with at least 1 lowercase, uppercase, symbol, and number"
            },
        ]

        validationSchema.forEach(field => {
            if (!field.valid) {
                errors.push({ name: field.name, message: field.errorMessage });
            }
        });

        if (errors.length) return res.status(400).json({ success: false, errors: errors });

        const emailExists = await prisma.userModel.findUnique({
            where: { email: email.trim() }
        });

        if (emailExists) return res.status(401).json({
            success: false,
            errors: [
                { name: "email", message: "Unable to create new user with this email" }
            ]
        });

        // Criteria is fulfilled, let's store the new user into the DB
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.userModel.create({
            data: {
                email: email.trim(),
                password: hashedPassword
            }
        });

        if (!newUser) return res.status(500).json({ success: false, errors: [{ name: "", message: "We seem to have encountered a problem. Please try again later." }] });

        const alg = "HS256";
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new jose.SignJWT({ email: newUser.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret);

        // save the token to the client's cookies
        setCookie("jwt", token, { req, res, maxAge: 60 * 60 * 24 }); // 60sec * 60min * 24hrs (1 day)

        return res.status(200).json({
            success: true,
            userInfo: {
                id: newUser.id,
                firstName: newUser.first_name,
                lastName: newUser.last_name,
                email: newUser.email
            }
        });
    }
    else {
        return res.status(404).json({ success: false, errors: [{ name: "", message: "invalid method" }] });
    }
}

export default handler;