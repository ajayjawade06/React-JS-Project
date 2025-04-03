import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { SunIcon, MoonIcon, Squares2X2Icon, HomeIcon } from '@heroicons/react/24/outline'

const Layout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  )
  const location = useLocation()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600">Task Manager</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6 text-gray-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 min-h-screen shadow-sm">
          <nav className="mt-5 px-2">
            <Link
              to="/"
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/') 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <HomeIcon className="mr-4 h-6 w-6" />
              Dashboard
            </Link>
            <Link
              to="/board"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/board')
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Squares2X2Icon className="mr-4 h-6 w-6" />
              Task Board
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout