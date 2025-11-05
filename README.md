# Official Dymo API Library for Zod

This library extends **Zod** with Dymo API validators for emails, IPs, phones, passwords, and more.
You can see the original library documentation [here](https://docs.tpeoficial.com/docs/dymo-api/getting-started/libraries?ch-pg=r-dm-node).

---

### Installation

Install the library in your project:

```bash
npm i @dymo-api/zod

# or

pnpm i @dymo-api/zod

# or

yarn add @dymo-api/zod
```

---

### Authenticating the Client with API Key

[Get your free API Key](https://tpe.li/new-api-key?ch-pg=gh-dmapi-node-rd-step)

```ts
import DymoAPIZod from "@dymo-api/zod";

const dymoClient = new DymoAPIZod({
   apiKey: "PRIVATE_TOKEN_HERE"
});
```

---

### Validating Email Using Zod Schema

With `@dymo-api/zod`, your email validation can now be used directly in a **Zod object**, including async validation with automatic normalization:

```ts
import { z } from "zod";
import DymoAPIZod from "@dymo-api/zod";

const dymoClient = new DymoAPIZod({ apiKey: "PRIVATE_TOKEN_HERE" });

const userSchema = z.object({
    email: dymoClient.emailSchema(),  // Dymo API validation + normalization
    username: z.string().min(3),
    age: z.number().int().min(0)
});

(async () => {
    const userData = {
        email: "build-10-28-2025@tpeoficial.com",
        username: "build",
        age: 10
    };

    const validatedUser = await userSchema.parseAsync(userData);

    console.log(validatedUser);
    /*
    {
      email: "build-10-28-2025@tpeoficial.com", // normalized by Dymo API
      username: "build",
      age: 10
    }
    */
})();
```

---

### Handling Invalid Emails

The schema will automatically throw an error if the email is considered fraudulent or invalid:

```ts
try {
    await userSchema.parseAsync({
        email: "riceg58076@dwakm.com",
        username: "build",
        age: 10
    });
} catch (err) {
    console.error("Validation failed:", err.errors);
    /*
    [
        { path: ["email"], message: "Invalid email" }
    ]
    */
}
```

---

### Async Validation Functions (Optional)

If you prefer not to use Zod, you can validate emails directly with async functions:

```ts
const result = await dymoClient.validateEmail("user@example.com");

if (!result.allow) {
    console.error("Email rejected by Dymo API:", result.reasons);
}
```

---

### Combining with Other Validators

You can also create schemas for IPs, phones, and passwords:

```ts
const userSchema = z.object({
    email: dymoClient.emailSchema(),
    ip: dymoClient.ipSchema(),
    phone: dymoClient.phoneSchema(),

    // Coming Soon.
    password: dymoClient.passwordSchema()
});
```

> [!IMPORTANT]
> All async validators require `parseAsync()` because they query the Dymo API.

---

💡 **Tip:** Using `DymoAPIZod` with Zod allows you to combine **real-time fraud checks** with **normal Zod validations** in a single schema.