import type { LayoutServerLoad } from './$types';
import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();

	if (session) {
		const regType = await db.user.findFirst({
			where: {
				email: session.user.email
			},
			select: {
				registerType: true
			}
		});

		if (!regType?.registerType) {
			throw redirect(307, `/register`);
		} else {
            return {
                props: {
                    regType: regType.registerType
                }
            }
        }
	} else {
        throw redirect(307, `/register`);
    }
};
