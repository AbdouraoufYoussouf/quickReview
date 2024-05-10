import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        GOOGLE_CLIENT_ID : z.string( ),
        GOOGLE_CLIENT_SECRET : z.string( ),
    },


    clientPrefix: "PUBLIC_",

    client: {
        PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    },

    runtimeEnv: process.env,

    emptyStringAsUndefined: true,
});