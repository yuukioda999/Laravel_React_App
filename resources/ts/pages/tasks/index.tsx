import React,{ useEffect,useState } from "react"
import axios from "axios"
import {useQuery} from "react-query"

type Task = {
    id: number
    title: string
    is_done: boolean
    created_at: Date
    updated_at: Date
}


const TaskPage: React.VFC = () => {

/*
    const [tasks, setTasks] = useState<Task[]>([])

    const getTasks = async () => {
        const {data} = await axios.get<Task[]>('api/tasks')
        console.log(data);
        setTasks(data);
    }

    useEffect(() =>{
        getTasks()
    })
*/

const {data:tasks,status} = useQuery('task',async () =>{
    const {data} = await axios.get<Task[]>('api/tasks')
    return data
});

if(status == 'loading'){
    return <div className="loder" />

}else if(status == 'error'){
    return <div className="align-center">データの読み込みに失敗しました</div>
}else if(!tasks || tasks.length <= 0 ){
    return <div className="align-center">登録されたTODOはありません</div>
}

  return (
    <div>
    <form className="input-form">
                <div className="inner">
                    <input type="text" className="input" placeholder="TODOを入力してください。" defaultValue="" />
                    <button className="btn is-primary">追加</button>
                </div>
            </form>
            <div className="inner">
                <ul className="task-list">
                    { tasks.map(task =>(
                        <li key={task.id}>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <div><span>{task.title}</span></div>
                        <button className="btn is-delete">削除</button>
                        </li>
                    ))}
                    
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <form><input type="text" className="input" defaultValue="編集中のTODO" /></form>
                        <button className="btn">更新</button>
                    </li>
                    <li className="done">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <div><span>実行したTODO</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <div><span>ゴミ捨て</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <div><span>掃除</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                </ul>
            </div>
            </div>
  )
}

export default TaskPage