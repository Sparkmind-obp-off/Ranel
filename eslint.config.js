import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "qa-artifacts/**"] },
  ...tseslint.configs.recommended,
  { files: ["*.cjs"], languageOptions: { globals: { module: "readonly" } } },
  {
    files: ["tests/**/*.mjs"],
    languageOptions: { globals: { URL: "readonly", Request: "readonly" } },
  },
);
