import { db } from "$lib/db";
import { redirect } from "@sveltejs/kit";


export const load = async (events) => {
    const session = await events.locals.auth();
     
    if (session) {
        const regType = await db.user.findFirst({
            where: {
                email: session.user.email
            },
            select: {
                registerType: true
            }
        });

        return {
            props: {
                regType: regType?.registerType
            }
        }

    }
    
}

export const actions = {
    createRegistration: async (events) => {
        const session = await events.locals.auth();
        const email = session.user.email;
        console.log(email);
        const data = await events.request.formData();
        const registerType = data.get("registerType");

        await db.user.upsert({
            where: {
                email: email
            },
            update: {
                registerType: registerType
            },
            create: {
                email: email,
                registerType: registerType
            }
        })
    }
	// createRegistration: async ({ request }) => {
    //     const data = await request.formData();
    //     const email = data.get("email");
    //     const registerType = data.get("registerType");

    //     await db.user.create({
    //         data: {
    //             email: email,
    //             registerType: registerType
    //         }
    //     })
	// }
};
