import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from './api/user.api.js'
import { login } from './store/slice/authSlice.js'
import Navbar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

const RootLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser()
      .then((user) => { if (user) dispatch(login(user)) })
      .catch(() => {})
  }, [dispatch])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
