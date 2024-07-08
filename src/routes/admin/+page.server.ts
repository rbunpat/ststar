import { db } from "$lib/db";

export const load = async (events) => {
    const registrations =await db.user.findMany({
        where: {
            confirmed: true
        }
    });

    return {
        props: {
            registrations
        }
    }
    
}