import React from "react"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"

const TaskPage: React.VFC = () => {
    
  return (
    <div>
        <TaskInput />
        <TaskList />
    </div>
  )

}

export default TaskPage