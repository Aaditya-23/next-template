/** @type {import("prettier").Config} */

module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  jsxSingleQuote: true,
  singleQuote: true,
  semi: false,
  endOfLine: 'lf',
  trailingComma: 'es5',
}
