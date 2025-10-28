/// <reference types="jest" />

import { z } from "zod";
import DymoAPI from "../src/dymo-api.js";

const dymoRootClient = new DymoAPI({
    rootApiKey: process.env.DYMO_ROOT_TEST_API_KEY
});

describe("isValidEmail", () => {
    it("The email is valid", async () => {
        const userSchema = z.object({
            email: dymoRootClient.emailSchema(),
            username: z.string().min(3),
            age: z.number().int().min(0)
        });

        const result = await userSchema.parseAsync({
            email: "build-10-28-2025@tpeoficial.com",
            username: "build",
            age: 10
        });

        expect(result).toEqual({
            email: "build-10-28-2025@tpeoficial.com",
            username: "build",
            age: 10
        });
    });

    it("The email is invalid because it is fraudulent", async () => {
        const userSchema = z.object({
            email: dymoRootClient.emailSchema(),
            username: z.string().min(3),
            age: z.number().int().min(0)
        });

        await expect(
            userSchema.parseAsync({
                email: "riceg58076@dwakm.com",
                username: "build",
                age: 10
            })
        ).rejects.toThrow("Invalid email");
    });
});