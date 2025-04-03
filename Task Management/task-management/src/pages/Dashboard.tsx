import React from 'react'
import { motion } from 'framer-motion'
import {
  ChartPieIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'

// Mock data - will be replaced with actual data from store
const stats = [
  { name: 'Total Tasks', value: '12', icon: ChartPieIcon },
  { name: 'In Progress', value: '5', icon: ClockIcon },
  { name: 'Completed', value: '7', icon: CheckCircleIcon },
]

const Dashboard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <button className="btn-primary flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Tasks */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
      >
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Recent Tasks
        </h2>
        <div className="space-y-4">
          {/* Mock tasks - will be replaced with actual data */}
          {[1, 2, 3].map((task) => (
            <div
              key={task}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-primary-500" />
                <span className="text-sm text-gray-900 dark:text-white">
                  Task {task}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                2 days ago
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Priority Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Priority Distribution
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500 dark:text-gray-400">
                High
              </span>
              <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-1/3" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500 dark:text-gray-400">
                Medium
              </span>
              <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-1/2" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500 dark:text-gray-400">
                Low
              </span>
              <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-1/4" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Upcoming Deadlines
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((deadline) => (
              <div
                key={deadline}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-sm text-gray-900 dark:text-white">
                  Task Deadline {deadline}
                </span>
                <span className="text-sm text-red-500">Tomorrow</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard