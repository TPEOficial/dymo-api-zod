/// <reference types="jest" />

import DymoAPI from "../src/dymo-api.js";

const dymoRootClient = new DymoAPI({
    rootApiKey: process.env.DYMO_ROOT_TEST_API_KEY
});

describe("isValidPhone", () => {
    it("The phone is valid", async () => {
        const schema = dymoRootClient.phoneSchema();

        const result = await schema.parseAsync("+34617509462");
        expect(result).toBe("+34617509462");
    });
});

describe("isValidPhone", () => {
    it("The phone is invalid because it is fraudulent", async () => {
        const schema = dymoRootClient.phoneSchema();
        await expect(schema.parseAsync("+34602322057")).rejects.toThrow("Invalid phone");
    });
});

describe("isValidPhone", () => {
    it("The phone is invalid because it is invalid", async () => {
        const schema = dymoRootClient.phoneSchema();
        await expect(schema.parseAsync("Dymo")).rejects.toThrow("Invalid phone");
    });
});