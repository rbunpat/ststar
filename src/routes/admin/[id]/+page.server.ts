import { db } from "$lib/db";

export const load = async (events) => {
    const bruh = await db.user.findFirst({
        where: {
            id: events.params.id
        }
    })


    return {
        props: {
            bruh
        }
    }
    
}