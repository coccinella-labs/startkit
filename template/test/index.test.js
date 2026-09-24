import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { greet } from "../src/index.js"

describe("greet", () => {
  it("greets by name", () => {
    assert.equal(greet("coccinella-labs"), "Hello, coccinella-labs!")
  })
})
