export default [
  { ignores: ["node_modules/**"] },
  {
    files: ["**/*.js"],
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
    },
  },
]
