import { z } from "zod";
import DymoAPI from "dymo-api";
import type { EmailValidatorRules } from "dymo-api";
import * as Interfaces from "./lib/types/interfaces";

class DymoAPIZod {
    private dymoAPIClient: DymoAPI;
    /**
     * @param {Object} options - Options to create the DymoAPI instance.
     * @param {string} [options.rootApiKey] - The root API key.
     * @param {string} [options.apiKey] - The API key.
     * @param {string} [options.baseUrl] - Whether to use a local server instead of the cloud server.
     * @description
     * This is the main class to interact with the Dymo API. It should be
     * instantiated with the root API key and the API key. The root API key is
     * used to fetch the tokens and the API key is used to authenticate the
     * requests.
     * @example
     * const dymoApi = new DymoAPI({
     *     rootApiKey: "6bfb7675-6b69-4f8d-9f43-5a6f7f02c6c5",
     *     apiKey: "dm_4c8b7675-6b69-4f8d-9f43-5a6f7f02c6c5"
     * });
     */
    constructor({
        rootApiKey = null,
        apiKey = null,
        baseUrl,
        rules = {}
    }: {
        rootApiKey?: string | null;
        apiKey?: string | null;
        baseUrl?: string;
        rules?: Interfaces.Rules;
    } = {}) {
        this.dymoAPIClient = new DymoAPI({
            rootApiKey,
            apiKey,
            baseUrl,
            rules
        });
    };

    /**
     * Validates the given email against the configured rules.
     *
     * This method requires either the root API key or the API key to be set.
     * If neither is set, it will throw an error.
     *
     * @param {string} [email] - Optional email address to validate.
     * @param {NegativeEmailRules[]} [rules] - Optional rules for validation. Some rules are premium features.
     * @important
     * **⚠️ NO_MX_RECORDS, HIGH_RISK_SCORE and NO_REACHABLE are [PREMIUM](https://docs.tpeoficial.com/docs/dymo-api/private/data-verifier) features.**
     * @returns {Promise<Interfaces.EmailValidatorResponse>} Resolves with the validation response.
     * @throws Will throw an error if validation cannot be performed.
     *
     * @example
     * const valid = await dymoClient.isValidEmail("user@example.com", { deny: ["FRAUD", "NO_MX_RECORDS"] });
     * 
     * @see [Documentation](https://docs.tpeoficial.com/docs/dymo-api/private/request-verifier)
     */
    async isValidEmail(
        email: Interfaces.EmailValidator,
        rules: EmailValidatorRules
    ): Promise<Interfaces.EmailValidatorResponse> {
        return await this.dymoAPIClient.isValidEmail(email, rules);
    };

    emailSchema() {
        return z.email().transform(async (v) => {
            const res = await this.dymoAPIClient.isValidEmail(v);
            if (!res.allow) throw new Error("Invalid email");
            return res.email || v;
        });
    };

    /**
     * Validates a password based on the given parameters.
     *
     * This method requires the password to be provided in the data object.
     * If the password is not provided, it will throw an error. The method
     * will validate the password against the following rules:
     *  - The password must be at least 8 characters long.
     *  - The password must be at most 32 characters long.
     *  - The password must contain at least one uppercase letter.
     *  - The password must contain at least one lowercase letter.
     *  - The password must contain at least one number.
     *  - The password must contain at least one special character.
     *  - The password must not contain any of the given banned words.
     *
     * @param {Object} data - The data to be sent.
     * @param {number} [data.min] - Minimum length of the password. Defaults to 8 if not provided.
     * @param {number} [data.max] - Maximum length of the password. Defaults to 32 if not provided.
     * @param {string} [data.email] - Optional email associated with the password.
     * @param {string} data.password - The password to be validated.
     * @param {string | string[]} [data.bannedWords] - The list of banned words that the password must not contain.
     * @returns {Promise<Interfaces.PasswordValidationResult>} A promise that resolves to the response from the server.
     * @throws Will throw an error if there is an issue with the password validation process.
     *
     * [Documentation](https://docs.tpeoficial.com/docs/dymo-api/public/password-validator)
     */
    async isValidPwd(data: Interfaces.IsValidPwdData): Promise<Interfaces.PasswordValidationResult> {
        return await this.dymoAPIClient.isValidPwd(data);
    };
};

export default DymoAPIZod;