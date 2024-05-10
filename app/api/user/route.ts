import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { userSchema } from "@/src/lib/shemas";


// Shema de validation zod 



export async function POST(req: NextRequest) {
    const body = await req.json();
    
    try {
        const { name, email, password } = userSchema.parse(body);
    
        if (req.method !== 'POST') {
            return NextResponse.json({ user: null, message: 'Méthode non autorisée' }, { status: 404 });
        }
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ user: null, message: 'Un utilisateur avec cet email existe déjà.' }, { status: 409 });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        const normaliseEmail = email.toLowerCase();
        // Créez un nouvel utilisateur
        const newUser = await db.user.create({
            data: {
                name,
                email:normaliseEmail,
                password: hashedPassword,
            },
        });

        Reflect.deleteProperty(newUser, 'password');
        console.log('user created')
        // Retournez l'utilisateur créé
        return NextResponse.json({ user: newUser, message: 'Compte crée avec succes.' }, { status: 201 });
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ user: null, message: error.errors}, { status: 500 });
    }
}


