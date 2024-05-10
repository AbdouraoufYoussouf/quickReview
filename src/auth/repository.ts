// methode async exportable pour verifier si un email exist

import { User } from "@prisma/client";
import { db } from "../lib/db";

// Déclaration de la fonction asynchrone avec le type de retour approprié
export const findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await db.user.findUnique({
        where: { email }
    });
    return user;
};

export const findUserById = async (userId: string): Promise<User | null> => {
    const user = await db.user.findUnique({
        where: { id: userId }
    });
    return user;
};
