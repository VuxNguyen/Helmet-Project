import fs from "fs"
import path from "path"

const DB_DIR = path.join(process.cwd(), "src/data/db")

function filePath(filename: string): string {
  return path.join(DB_DIR, filename)
}

function readFile<T>(filename: string): T[] {
  const fp = filePath(filename)
  if (!fs.existsSync(fp)) return []
  const raw = fs.readFileSync(fp, "utf-8")
  return JSON.parse(raw) as T[]
}

function writeFile<T>(filename: string, data: T[]): void {
  const fp = filePath(filename)
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), "utf-8")
}

export function getAll<T>(filename: string): T[] {
  return readFile<T>(filename)
}

export function getById<T extends { id: string }>(
  filename: string,
  id: string,
): T | undefined {
  const items = readFile<T>(filename)
  return items.find((item) => item.id === id)
}

export function create<T extends { id: string }>(
  filename: string,
  item: T,
): T {
  const items = readFile<T>(filename)
  items.push(item)
  writeFile(filename, items)
  return item
}

export function update<T extends { id: string }>(
  filename: string,
  id: string,
  updates: Partial<T>,
): T | undefined {
  const items = readFile<T>(filename)
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return undefined
  items[index] = { ...items[index], ...updates }
  writeFile(filename, items)
  return items[index]
}

export function remove<T extends { id: string }>(
  filename: string,
  id: string,
): boolean {
  const items = readFile<T>(filename)
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return false
  items.splice(index, 1)
  writeFile(filename, items)
  return true
}

export function query<T>(
  filename: string,
  predicate: (item: T) => boolean,
): T[] {
  const items = readFile<T>(filename)
  return items.filter(predicate)
}
