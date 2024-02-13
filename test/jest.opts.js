// eslint-disable-next-line no-undef
module.exports = {
  "roots": [
    "<rootDir>/../src"
  ],
  "transform": {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }]
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "testEnvironment": 'node'
}
