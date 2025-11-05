/// <reference types="jest" />

import DymoAPI from "../src/dymo-api.js";

const dymoRootClient = new DymoAPI({
    rootApiKey: process.env.DYMO_ROOT_TEST_API_KEY
});

describe("isValidIP", () => {
    it("The IP is valid", async () => {
        const schema = dymoRootClient.ipSchema();

        const result = await schema.parseAsync("52.94.236.248");
        expect(result).toBe("52.94.236.248");
    });
});

describe("isValidIP", () => {
    it("The IP is invalid because it is fraudulent", async () => {
        const schema = dymoRootClient.ipSchema();
        await expect(schema.parseAsync("228.49.142.11")).rejects.toThrow("Invalid IP");
    });
});

describe("isValidIP", () => {
    it("The IP is invalid because it is invalid", async () => {
        const schema = dymoRootClient.ipSchema();
        await expect(schema.parseAsync("56.248")).rejects.toThrow("invalid_format");
    });
});