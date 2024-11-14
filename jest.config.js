module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src", "<rootDir>/tests"],
    testMatch: ["**/*.test.ts", "**/*.spec.ts"],
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  };