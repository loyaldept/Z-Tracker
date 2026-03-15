import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[v0] Supabase credentials not found. Data will not persist.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to fetch data with fallback
export async function fetchFromDatabase(table, options = {}) {
  if (!supabase) {
    console.log(`[v0] Supabase not configured, skipping fetch for ${table}`)
    return []
  }

  try {
    let query = supabase.from(table).select('*')
    
    if (options.order) {
      query = query.order(options.order.by, { ascending: options.order.ascending !== false })
    }
    
    if (options.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error(`[v0] Database fetch error (${table}):`, error.message)
      return []
    }

    return data || []
  } catch (error) {
    console.error(`[v0] Unexpected error fetching ${table}:`, error)
    return []
  }
}

// Helper function to insert data
export async function insertToDatabase(table, records) {
  if (!supabase) {
    console.warn('[v0] Supabase not configured, cannot insert data')
    return null
  }

  try {
    const { data, error } = await supabase.from(table).insert(records).select()

    if (error) {
      console.error(`[v0] Database insert error (${table}):`, error.message)
      return null
    }

    return data
  } catch (error) {
    console.error(`[v0] Unexpected error inserting to ${table}:`, error)
    return null
  }
}

// Helper function to update data
export async function updateInDatabase(table, id, updates) {
  if (!supabase) {
    console.warn('[v0] Supabase not configured, cannot update data')
    return null
  }

  try {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select()

    if (error) {
      console.error(`[v0] Database update error (${table}):`, error.message)
      return null
    }

    return data
  } catch (error) {
    console.error(`[v0] Unexpected error updating ${table}:`, error)
    return null
  }
}

// Helper function to delete data
export async function deleteFromDatabase(table, id) {
  if (!supabase) {
    console.warn('[v0] Supabase not configured, cannot delete data')
    return false
  }

  try {
    const { error } = await supabase.from(table).delete().eq('id', id)

    if (error) {
      console.error(`[v0] Database delete error (${table}):`, error.message)
      return false
    }

    return true
  } catch (error) {
    console.error(`[v0] Unexpected error deleting from ${table}:`, error)
    return false
  }
}
