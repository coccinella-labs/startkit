#!/usr/bin/env node

import { fileURLToPath } from "node:url"
import { dirname, join, resolve } from "node:path"
import { scaffold } from "../src/generate.mjs"

const args = process.argv.slice(2)

if (args.includes("--help") || args.includes("-h")) {
  console.log("usage: startkit <name> [directory]")
  process.exit(0)
}

const name = args[0]
if (!name) {
  console.error("usage: startkit <name> [directory]")
  process.exit(1)
}

const description = "A minimal library starter."
const repo = `https://github.com/<your-org>/${name}`
const target = resolve(args[1] ?? name)
const templateDir = join(dirname(fileURLToPath(import.meta.url)), "..", "template")

try {
  scaffold(templateDir, target, { name, description, repo })
  console.log(`scaffolded ${name} in ${target}`)
  console.log(`next: cd ${target} && npm install`)
} catch (error) {
  console.error(`startkit: ${error.message}`)
  process.exit(1)
}
