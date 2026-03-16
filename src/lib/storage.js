import { supabase, insertToDatabase, updateInDatabase, deleteFromDatabase } from './supabase'

// localStorage keys
const STORAGE_KEYS = {
  quotes: 'ztrack_quotes',
  ventures: 'ztrack_ventures',
  transactions: 'ztrack_transactions',
  deadlines: 'ztrack_deadlines',
  achievements: 'ztrack_achievements',
  revenue_entries: 'ztrack_revenue_entries',
}

// Local storage helpers with Supabase sync
export async function getLocalData(table) {
  const key = STORAGE_KEYS[table]
  if (!key) return []

  try {
    const stored = localStorage.getItem(key)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.warn(`[ZTrack] Failed to parse ${table} from localStorage:`, e)
    return []
  }
}

export async function saveLocalData(table, data) {
  const key = STORAGE_KEYS[table]
  if (!key) return false

  try {
    localStorage.setItem(key, JSON.stringify(data))
    
    // Try to sync with Supabase if available
    if (supabase) {
      console.log(`[v0] Syncing ${table} to Supabase...`)
      // In a real app, you'd implement a sync strategy here
    }
    
    return true
  } catch (error) {
    console.error(`[v0] Error saving ${table}:`, error)
    return false
  }
}

export async function addItem(table, item) {
  const data = await getLocalData(table)
  const newItem = {
    ...item,
    id: item.id || Date.now(),
    createdAt: item.createdAt || new Date().toISOString(),
  }
  data.push(newItem)
  await saveLocalData(table, data)
  
  // Also try to sync to Supabase
  if (supabase) {
    try {
      await insertToDatabase(table, [newItem])
    } catch (e) {
      console.log(`[v0] Supabase sync failed for ${table}, using local storage only`)
    }
  }
  
  return newItem
}

export async function updateItem(table, id, updates) {
  const data = await getLocalData(table)
  const index = data.findIndex(item => item.id === id)
  
  if (index !== -1) {
    data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() }
    await saveLocalData(table, data)
    
    // Also try to sync to Supabase
    if (supabase) {
      try {
        await updateInDatabase(table, id, data[index])
      } catch (e) {
        console.log(`[v0] Supabase sync failed for ${table}, using local storage only`)
      }
    }
    
    return data[index]
  }
  return null
}

export async function deleteItem(table, id) {
  const data = await getLocalData(table)
  const filtered = data.filter(item => item.id !== id)
  await saveLocalData(table, filtered)
  
  // Also try to sync to Supabase
  if (supabase) {
    try {
      await deleteFromDatabase(table, id)
    } catch (e) {
      console.log(`[v0] Supabase sync failed for ${table}, using local storage only`)
    }
  }
  
  return true
}
