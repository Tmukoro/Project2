import { create } from "zustand";
import { persist } from "zustand/middleware";



const taskStore = create(persist((set)=>({
    tasks: [],

    addTask: (task)=>
        set((state)=>({
            tasks: [...state.tasks, {...task, id: Date.now(), status: 'Pending'}]
        })),

        toggleTaskStatus: (id, newStatus)=>
            set((state)=>({
                tasks: state.tasks.map(task=>
                    task.id === id ? {...task, status: newStatus} : task
                )
            })),

          removeTask: (id)=>
            set((state)=>({
                tasks: state.tasks.filter(task => task.id !== id)
            })) ,

}), {
     name: 'taskStorage'
}))

       


export default taskStore;