import { Todo } from "@/lib/drizzle";
import TodoItem from "./TodoItem";

const getData = async () => {
    try {
        const res = await fetch("http://127.0.0.1:3000/api/todo", {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) {
            throw new Error("Failed to fetch the data")
        };
        const result = await res.json()
        return result
    } catch (err) {
        console.log(err)
    }
}

const TodoList = async () => {

    const res: { data: Todo[] } = await getData();


    return (

        <div className="max-h-[350px]  mb-4  overflow-y-auto h-[72%] 
        scrollbar-thumb-secondary px-4  scrollbar-track-transparent scrollbar-thin scrollbar-rounded">
            {
                res.data.map((item: Todo) => {
                    return (
                        < TodoItem id={item.id} task={item.task} key={item.id} />
                    )
                })
            }

        </div >
    )
}

export default TodoList
