import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import * as bcrypt from "bcryptjs";
import GoogleProvider from 'next-auth/providers/google'

const googleId = process.env.GOOGLE_CLIENT_ID
const googleSecret = process.env.GOOGLE_CLIENT_SECRET

console.log(googleId)

if (!googleId || !googleSecret) {
    throw new Error('Google id or secret not found');
}

export const authOptions: NextAuthOptions = {

    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auths/login'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const normalizedEmail = credentials.email.toLowerCase();

                const existingUser = await db.user.findUnique({
                    where: { email: normalizedEmail }
                });
                // console.log('user:', existingUser)
                if (!existingUser) {
                    // throw new Error("L'utilisateur n'existe pas");
                    console.log('user no found')
                    return null;
                }

                // Vérifiez d'abord si credentials.password est null
                if (credentials.password === null) {
                    // Gérez cette situation, par exemple en lançant une erreur ou en retournant null
                    throw new Error("Le mot de passe est null");
                }
                if (existingUser && existingUser.password) {
                    const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
                    if (!passwordMatch) {
                        // throw new Error("Le mot de passe est incorrect");
                        console.log('password incorrect')
                        return null;
                    }
                }
                // Si tout est correct, renvoyez un objet utilisateur
                return {
                    id: existingUser.id,
                    email: existingUser.email,
                    name: existingUser.name,
                    image: existingUser.image
                }
            }
        }),
        GoogleProvider({
            clientId: googleId,
            clientSecret: googleSecret,
        })
    ],
    // definir le callback jwt , session
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    name: user.name,
                }
            }
            return token;
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                }
            }
        }
    }

}