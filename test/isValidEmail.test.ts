/// <reference types="jest" />

import DymoAPI from "../src/dymo-api.js";

const dymoRootClient = new DymoAPI({
    rootApiKey: process.env.DYMO_ROOT_TEST_API_KEY
});

describe("isValidEmail", () => {
    it("The email is valid", async () => {
        const schema = dymoRootClient.emailSchema();

        const result = await schema.parseAsync("build-10-28-2025@tpeoficial.com");
        expect(result).toBe("build-10-28-2025@tpeoficial.com");
    });
});

describe("isValidEmail", () => {
    it("The email is invalid because it is fraudulent", async () => {
        const schema = dymoRootClient.emailSchema();
        await expect(schema.parseAsync("riceg58076@dwakm.com")).rejects.toThrow("Invalid email");
    });
});

const dymoRootWithRulesClient = new DymoAPI({
    rootApiKey: process.env.DYMO_ROOT_TEST_API_KEY,
    rules: {
        email: {
            deny: ["FREE_SUBDOMAIN"]
        }
    }
});

describe("isValidEmail", () => {
    it("The email is invalid because it is invalid", async () => {
        const schema = dymoRootWithRulesClient.emailSchema();
        await expect(schema.parseAsync("user@test.vercel.app")).rejects.toThrow("Invalid email");
    });
});