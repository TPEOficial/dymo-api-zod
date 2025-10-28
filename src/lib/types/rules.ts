import type { EmailValidatorRules } from "dymo-api";
import { NegativePhoneRules, NegativeSensitiveInfoRules } from "./data-verifier";

type Mode = "LIVE" | "DRY_RUN";

export interface PhoneValidatorRules {
    mode?: Mode;
    deny: NegativePhoneRules[];
}

export interface SensitiveInfoRules {
    mode?: Mode;
    deny: NegativeSensitiveInfoRules[];
}

// -------------------- DYMO MAIN CLIENT RULES -------------------- //
export interface Rules {
    email?: EmailValidatorRules;
    phone?: PhoneValidatorRules;
    sensitiveInfo?: SensitiveInfoRules;
}