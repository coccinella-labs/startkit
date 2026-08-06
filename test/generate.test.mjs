import assert from "node:assert/strict"
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { after, before, describe, it } from "node:test"
import { fileURLToPath } from "node:url"
import { render, scaffold } from "../src/generate.mjs"

const templateDir = join(dirname(fileURLToPath(import.meta.url)), "..", "template")

describe("render", () => {
  it("substitutes placeholders", () => {
    assert.equal(render("name: {{name}}", { name: "mylib" }), "name: mylib")
  })

  it("leaves unknown placeholders untouched", () => {
    assert.equal(render("{{missing}}", {}), "{{missing}}")
  })
})

describe("scaffold", () => {
  let workdir
  before(() => {
    workdir = mkdtempSync(join(tmpdir(), "startkit-"))
  })
  after(() => {
    rmSync(workdir, { recursive: true, force: true })
  })

  it("copies the template and substitutes the package name", () => {
    const target = join(workdir, "mylib")
    scaffold(templateDir, target, {
      name: "mylib",
      description: "A minimal library starter.",
      repo: "https://github.com/org/mylib",
    })

    const manifest = JSON.parse(readFileSync(join(target, "package.json"), "utf8"))
    assert.equal(manifest.name, "mylib")
    assert.ok(existsSync(join(target, "src", "index.js")))
    assert.ok(existsSync(join(target, "test", "index.test.js")))
    assert.ok(existsSync(join(target, ".github", "workflows", "ci.yml")))
  })

  it("refuses a non-empty target directory", () => {
    const target = join(workdir, "occupied")
    const marker = join(target, "existing.txt")
    mkdirSync(target, { recursive: true })
    writeFileSync(marker, "x")
    assert.throws(() => scaffold(templateDir, target, { name: "x" }), /not empty/)
  })

  it("creates the target directory when missing", () => {
    const target = join(workdir, "nested", "lib")
    scaffold(templateDir, target, { name: "lib" })
    assert.ok(readdirSync(join(target, "src")).length > 0)
  })
})
