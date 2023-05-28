import { NextRequest, NextResponse } from "next/server";
import { db, todoTable } from "@/lib/drizzle"
import { sql } from "@vercel/postgres"
import { eq } from "drizzle-orm";


export async function GET(request: NextRequest) {
    try {
        await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255));`

        const res = await db.select().from(todoTable);

        return NextResponse.json({ data: res })
    } catch (err) {
        console.log((err as { message: string }).message)
        return NextResponse.json({ message: "Somthing went wrong" })
    }
}

export async function POST(request: NextRequest) {
    const req = await request.json();
    try {
        if (req.task) {
            const res = await db.insert(todoTable).values({
                task: req.task,
            }).returning()

            console.log(res)


            return NextResponse.json({ message: "Data added successfully", data: res })
        } else {
            throw new Error("Task field is required")
        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })
    }
}
export async function PUT(request: NextRequest) {

    const req = await request.json();

    if (req.id) {

        const updateResult = await db.update(todoTable)
            .set({ task: req.task })
            .where(eq(todoTable.id, req.id))
            .returning({
                task: todoTable.task,
                id: todoTable.task
            })

        return NextResponse.json(updateResult);
    }

}
// export async function DELETE(request: NextRequest) {
//     const req = await request.json();
//     return NextResponse.json({ message: "asdasdasd", data: req })
//     // console.log(req)
//     // try {
//     //     if (req.id) {
//     //         const res = await db.delete(todoTable)
//     //             .where(eq(todoTable.id, req.id))

//     //         console.log(res)


//     //         return NextResponse.json({ message: "Data deleted successfully", data: res })
//     //     } else {
//     //         throw new Error("ID not found")
//     //     }
//     // } catch (error) {
//     //     return NextResponse.json({ message: (error as { message: string }).message })
//     // }
// }