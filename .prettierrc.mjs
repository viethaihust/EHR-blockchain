import { platform } from "os";

const isWin = platform() === "win32";

/** @type {import('prettier').Config} */
export default {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "avoid",
  htmlWhitespaceSensitivity: "ignore",
  printWidth: 80,
  plugins: ["prettier-plugin-tailwindcss"],
  endOfLine: isWin ? "crlf" : "lf",
  overrides: [
    {
      files: [
        // alphabetical order
        ".babelrc",
        ".czrc",
        ".eslintrc",
        ".gqlconfig",
        ".prettierrc",
        ".releaserc",
        ".stylelintrc",
        "*.code-workspace",
      ],
      options: { parser: "json" },
    },
    {
      files: [
        // alphabetical order
        "package.json",
        "package-lock.json",
        "*.md",
        "*.yml",
      ],
      options: { tabWidth: 2 },
    },
  ],
};
