import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"

export function render(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => vars[key] ?? match)
}

export function scaffold(sourceDir, targetDir, vars) {
  if (existsSync(targetDir) && readdirSync(targetDir).length > 0) {
    throw new Error(`target directory is not empty: ${targetDir}`)
  }
  copyDir(sourceDir, targetDir, vars)
}

function copyDir(from, to, vars) {
  mkdirSync(to, { recursive: true })
  for (const entry of readdirSync(from)) {
    const source = join(from, entry)
    const dest = join(to, entry)
    if (statSync(source).isDirectory()) {
      copyDir(source, dest, vars)
    } else {
      writeFileSync(dest, render(readFileSync(source, "utf8"), vars))
    }
  }
}
