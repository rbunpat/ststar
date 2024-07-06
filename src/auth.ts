
import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import Discord from "@auth/sveltekit/providers/discord"
import GitHub from "@auth/sveltekit/providers/github"
 
export const { handle, signIn } = SvelteKitAuth({
  trustHost: true,
  providers: [Google, Discord, GitHub],
}) 