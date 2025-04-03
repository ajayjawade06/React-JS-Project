import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  PlusIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline'

// Mock data - will be replaced with actual data from store
const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    taskIds: ['task-1', 'task-2', 'task-3'],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    taskIds: ['task-4', 'task-5'],
  },
  completed: {
    id: 'completed',
    title: 'Completed',
    taskIds: ['task-6'],
  },
}

const initialTasks = {
  'task-1': {
    id: 'task-1',
    title: 'Research competitors',
    priority: 'high',
    dueDate: '2024-02-20',
  },
  'task-2': {
    id: 'task-2',
    title: 'Design new features',
    priority: 'medium',
    dueDate: '2024-02-22',
  },
  'task-3': {
    id: 'task-3',
    title: 'Update documentation',
    priority: 'low',
    dueDate: '2024-02-25',
  },
  'task-4': {
    id: 'task-4',
    title: 'Implement authentication',
    priority: 'high',
    dueDate: '2024-02-18',
  },
  'task-5': {
    id: 'task-5',
    title: 'Write unit tests',
    priority: 'medium',
    dueDate: '2024-02-21',
  },
  'task-6': {
    id: 'task-6',
    title: 'Setup project structure',
    priority: 'high',
    dueDate: '2024-02-15',
  },
}

const TaskBoard: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns)
  const [tasks] = useState(initialTasks)

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = columns[source.droppableId]
    const finish = columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      })
    } else {
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }

      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }

      setColumns({
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      })
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-high'
      case 'medium':
        return 'priority-medium'
      case 'low':
        return 'priority-low'
      default:
        return 'priority-medium'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Task Board
        </h1>
        <div className="flex space-x-4">
          <button className="btn-secondary flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5" />
            <span>Filter</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <ArrowsUpDownIcon className="h-5 w-5" />
            <span>Sort</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <PlusIcon className="h-5 w-5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="kanban-column">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {column.title}
              </h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {column.taskIds.map((taskId, index) => {
                      const task = tasks[taskId]
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              initial={false}
                              animate={
                                snapshot.isDragging
                                  ? { scale: 1.05 }
                                  : { scale: 1 }
                              }
                              className={`task-card ${
                                snapshot.isDragging ? 'shadow-lg' : ''
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {task.title}
                                </h3>
                                <span
                                  className={`${getPriorityClass(task.priority)}`}
                                >
                                  {task.priority}
                                </span>
                              </div>
                              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Due: {task.dueDate}
                              </div>
                            </motion.div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default TaskBoard