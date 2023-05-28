'use client'
import { NewTodo, Todo } from '@/lib/drizzle'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
function TodoItem({ id, task }: Todo) {
    const [disabled, setDisabled] = useState(true);
    const [newtask, setNewTask] = useState<NewTodo | null>({
        id: id,
        task: task
    });

    const { refresh } = useRouter();
    const handleDelete = async (e: any) => {
        e.preventDefault();
        try {
            if (id) {
                console.log(id)
                const body = JSON.stringify({ id: id });
                const res = await fetch("http://127.0.0.1:3000/api/todo", {
                    method: "DELETE",

                    body
                })
                console.log(res)
                refresh();

            }
        } catch (error) {
            console.log("error")
        }

    }

    const handleUpdate = async (e: any) => {
        setDisabled(false);
        e.preventDefault();
        try {
            if (newtask) {
                const res = await fetch("/api/todo", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: newtask.id,
                        task: newtask.task
                    }),

                })

                refresh();

            }
        } catch (error) {
            console.log("error")
        }

    }
    return (
        <div className="bg-gray-100 py-4 px-4 flex items-center justify-between shadow rounded-lg my-5">
            {/* Circle */}
            <div className="flex items-center gap-x-2">     <div className="h-3 w-3 bg-secondary rounded-full"></div>
                {/* Task Title */}
                <input type='text' onChange={(e) => setNewTask({ id, task: e.target.value })}

                    value={newtask?.task || ''} disabled={disabled} />
                {/* <p className="text-lg font-medium">{task}</p> */}
            </div>
            <button onClick={handleUpdate}> <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 text-right hover:scale-110 duration-300 
"text-red-600"}`} style={{ justifySelf: 'end' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg></button>
        </div>
    )
}

export default TodoItem