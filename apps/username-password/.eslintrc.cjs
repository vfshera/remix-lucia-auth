/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ["!**/.server", "!**/.client"],

  // Base config
  extends: ["eslint:recommended"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: { alwaysTryTypes: true },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        "no-console": "warn",
        "no-unused-vars": "off",
        "import/no-unresolved": "off", // to be removed
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            vars: "all",
            args: "all",
            ignoreRestSiblings: false,
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/consistent-type-imports": "warn",
        "padding-line-between-statements": [
          "warn",
          { blankLine: "always", prev: "*", next: ["return", "export"] },
          {
            blankLine: "always",
            prev: ["const", "let", "var", "block-like", "export"],
            next: "*",
          },
          {
            blankLine: "always",
            prev: ["const", "let", "var", "block-like", "export"],
            next: ["const", "let", "var", "block-like", "export"],
          },
        ],
      },
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
