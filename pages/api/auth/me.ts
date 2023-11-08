import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { prisma } from "db";

const me = async (req: NextApiRequest, res: NextApiResponse) => {
    const bearerToken = req.headers["authorization"] as string;

    if (!bearerToken) return res.status(401).json({ success: false, message: "Unauthorized request" });
    const token = bearerToken.split(" ")[1];

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jose.jwtVerify(token, secret);
    } catch (e) {
        return res.status(401).json({ success: false, message: "Unauthorized request" });
    }

    const payload = jwt.decode(token) as { email: string };

    if (!payload.email) return res.status(401).json({ success: false, message: "Unauthorized request" });

    const user = await prisma.userModel.findUnique({
        where: {
            email: payload.email
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
        }
    });

    if (!user) return res.status(401).json({ success: false, message: "Unauthorized request" });

    return res.json({
        success: true,
        userInfo: {
            id: user?.id,
            email: user?.email,
            firstName: user?.first_name,
            lastName: user?.last_name,
        }
    });
}

export default me;