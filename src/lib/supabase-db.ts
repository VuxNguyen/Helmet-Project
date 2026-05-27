import { supabase } from "./supabase"

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

/**
 * Generic helper functions for Supabase CRUD operations.
 * These replace the old json-db.ts synchronous file-based operations.
 */

export async function getAll<T>(
  table: string,
  options?: {
    orderBy?: { column: string; ascending?: boolean }
    limit?: number
  },
): Promise<T[]> {
  let query = supabase.from(table).select("*")

  if (options?.orderBy) {
    query = query.order(options.orderBy.column, {
      ascending: options.orderBy.ascending ?? true,
    })
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error(`Error fetching from ${table}:`, error)
    return []
  }

  return (data as T[]) || []
}

export async function getById<T extends { id: string }>(
  table: string,
  id: string,
): Promise<T | null> {
  const { data, error } = await supabase.from(table).select("*").eq("id", id).maybeSingle()

  if (error) {
    console.error(`Error fetching ${table} by id:`, error)
    return null
  }

  return data as T | null
}

export async function getBySlug<T>(
  table: string,
  slug: string,
): Promise<T | null> {
  const { data, error } = await supabase.from(table).select("*").eq("slug", slug).maybeSingle()

  if (error) {
    console.error(`Error fetching ${table} by slug:`, error)
    return null
  }

  return data as T | null
}

export async function create<T>(
  table: string,
  item: Record<string, unknown>,
): Promise<T | null> {
  const { data, error } = await supabase.from(table).insert(item).select().single()

  if (error) {
    console.error(`Error creating in ${table}:`, error)
    return null
  }

  return data as T
}

export async function update<T>(
  table: string,
  id: string,
  updates: Record<string, unknown>,
): Promise<T | null> {
  const { data, error } = await supabase.from(table).update(updates).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating ${table}:`, error)
    return null
  }

  return data as T
}

export async function remove(
  table: string,
  id: string,
): Promise<boolean> {
  const { error } = await supabase.from(table).delete().eq("id", id)

  if (error) {
    console.error(`Error deleting from ${table}:`, error)
    return false
  }

  return true
}

export async function query<T>(
  table: string,
  column: string,
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "like" | "ilike" | "in",
  value: JsonValue,
): Promise<T[]> {
  let query = supabase.from(table).select("*")

  switch (operator) {
    case "eq":
      query = query.eq(column, value)
      break
    case "neq":
      query = query.neq(column, value)
      break
    case "gt":
      query = query.gt(column, value as number)
      break
    case "gte":
      query = query.gte(column, value as number)
      break
    case "lt":
      query = query.lt(column, value as number)
      break
    case "lte":
      query = query.lte(column, value as number)
      break
    case "like":
      query = query.like(column, value as string)
      break
    case "ilike":
      query = query.ilike(column, value as string)
      break
    case "in":
      query = query.in(column, value as string[])
      break
  }

  const { data, error } = await query

  if (error) {
    console.error(`Error querying ${table}:`, error)
    return []
  }

  return (data as T[]) || []
}

