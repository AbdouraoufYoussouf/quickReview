import * as z from "zod";

// shema user register validation
export const userSchema = z.object({
    name: z.string()
        .min(1, "Votre nom est obligatoire")
        .min(3, "Votre nom doit contenir au moins 3 caractères")
        .max(100, "Votre nom ne peut pas dépasser 100 caractères"),
    email: z.string()
        .email("Adresse e-mail invalide")
        .min(1, "L'adresse e-mail est obligatoire"),
    password: z.string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .max(50, "Le mot de passe ne peut pas dépasser 50 caractères")
});

export const registerUserSchema = z.object({
    name: z.string()
        .min(1, "Votre nom est obligatoire")
        .min(3, "Votre nom doit contenir au moins 3 caractères")
        .max(100, "Votre nom ne peut pas dépasser 100 caractères"),
    email: z.string()
        .email("Adresse e-mail invalide")
        .min(1, "L'adresse e-mail est obligatoire"),
    password: z.string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .max(50, "Le mot de passe ne peut pas dépasser 50 caractères"),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Le mot de passe ne correspond pas!',
    });