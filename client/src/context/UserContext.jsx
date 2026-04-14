import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('bhojaniq_profile')
    return saved ? JSON.parse(saved) : { goal: null, diet: null, budget: 150 }
  })
  const [lastResult, setLastResult] = useState(null)

  useEffect(() => {
    localStorage.setItem('bhojaniq_profile', JSON.stringify(profile))
  }, [profile])

  return (
    <UserContext.Provider value={{ profile, setProfile, lastResult, setLastResult }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
