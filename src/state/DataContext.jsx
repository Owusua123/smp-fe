import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { seedData } from '../utils/seed.js'

const KEY = 'mvp_db'
const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [db, setDb] = useState(() => {
    const saved = localStorage.getItem(KEY)
    if (saved) return JSON.parse(saved)
    const seeded = seedData()
    localStorage.setItem(KEY, JSON.stringify(seeded))
    return seeded
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(db))
  }, [db])

  // Actions
  const addReview = (review) => {
    setDb(prev => ({ ...prev, reviews: [review, ...prev.reviews] }))
  }
  const removeReview = (id) => {
    setDb(prev => ({ ...prev, reviews: prev.reviews.filter(r => r.id !== id) }))
  }
  const updateUser = (id, patch) => {
    setDb(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, ...patch } : u) }))
  }
  const deleteUser = (id) => {
    setDb(prev => ({ 
      ...prev, 
      users: prev.users.filter(u => u.id !== id),
      reviews: prev.reviews.filter(r => r.userId !== id)
    }))
  }
  const upsertMarketer = (id, patch) => {
    setDb(prev => {
      const found = prev.marketers.find(m => m.id === id)
      if (found) {
        return { ...prev, marketers: prev.marketers.map(m => m.id === id ? { ...m, ...patch } : m) }
      }
      return { ...prev, marketers: [...prev.marketers, { id, ...patch }] }
    })
  }
  const toggleUserStatus = (id) => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u)
    }))
  }

  const value = useMemo(() => ({
    db, addReview, removeReview, updateUser, deleteUser, upsertMarketer, toggleUserStatus
  }), [db])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
