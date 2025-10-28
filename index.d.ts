export interface ConfigurationOptions {
    rootApiKey?: string;
    apiKey?: string;
    local?: boolean;
    rules?: {
        email: {
            mode: Mode;
            deny: string[];
        };
        phone: {
            mode: Mode;
            deny: string[];
        };
        sensitiveInfo: {
            mode: Mode;
            deny: string[];
        };
    };
}

type Mode = "LIVE" | "DRY_RUN";

//@ts-ignore
declare module "dymo-api" {
    class DymoAPI {
        private rootApiKey: string | null;
        private apiKey: string | null;
        private tokensResponse: { root: boolean; api: boolean; } | null;
        private lastFetchTime: Date | null;
        private rules?: {
            email: {
                mode: Mode;
                deny: string[];
            };
            phone: {
                mode: Mode;
                deny: string[];
            };
            sensitiveInfo: {
                mode: Mode;
                deny: string[];
            };
        };
        private local: boolean;
        constructor(configuration?: ConfigurationOptions);
        initializeTokens(): Promise<void>;

        // Data Validation.
        isValidEmail(data: any): Promise<any>;

        // Data Protection.
        isValidPwd(data: any): Promise<any>;
    }

    export default DymoAPI;
}