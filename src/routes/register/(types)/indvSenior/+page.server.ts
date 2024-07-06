import { db } from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (events) => {
    const session = await events.locals.auth();
     
    if (session) {
        const details = await db.user.findFirst({
            where: {
                email: session.user.email
            }
        });

        if (details?.confirmed) {
            return redirect(307, "/register/success")
        }

        return {
            props: {
                details
            }
        }

    }
    
}

export const actions = {
    saveProgress: async (events) => {
        const data = await events.request.formData();
        const session = await events.locals.auth();
        const email = session.user.email;
        const stageName = data.get("stageName");
        const members = data.get("members");
        const contactInfo = data.get("contactInfo");
        const instruments = data.get("instruments");
        const songName = data.get("songName");
        const videoUrl = data.get("videoUrl");

        await db.user.update({
            where: {
                email: email
            },
            data: {
                stageName: stageName,
                members: members,
                contactInfo: contactInfo,
                instruments: instruments,
                songName: songName,
                videoUrl: videoUrl
            }
        })
    },
    saveImage: async (events) => {
        const data = await events.request.formData();
        const session = await events.locals.auth();
        const email = session.user.email;
        const image = data.get("imageUrl");
        console.log(image);

        await db.user.update({
            where: {
                email: email
            },
            data: {
                imageUrl: image
            }
        })
    },
    confirmDetails: async (events) => {
        const session = await events.locals.auth();
        const email = session.user.email;

        await db.user.update({
            where: {
                email: email
            },
            data: {
                confirmed: true
            }
        })

        return redirect(307, "/register/success")
    }
}