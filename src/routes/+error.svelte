<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import { page } from '$app/stores';
</script>

<div class="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-md text-center">
        {#if $page.status === 404}
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                ¯\_(ツ)_/¯
            </h1>
        {:else if $page.status === 500}
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                (╯°□°)╯︵ ┻━┻
            </h1>
        {:else}
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                (╯°□°)╯︵ ┻━┻
            </h1>
        {/if}

		<h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
			{$page.status}
			{$page.error?.message}
		</h1>

        {#if $page.status === 404}
            <p class="text-muted-foreground p-4">
                It looks like you’ve wandered off track. Try heading back to the homepage, or grab a coffee ☕ and give it another shot!
            </p>
        {:else if $page.status === 500}
            <p class="text-muted-foreground p-4">
                Something went wrong on our end, but don't worry—our team is on it! In the meantime, why not take a quick break and try refreshing the page?
            </p>
        {:else}
            <p class="text-muted-foreground p-4">
                Oops! Something went wrong, but don’t worry—we’re on it like a squirrel on a nut! 🐿️ Try refreshing the page or grab a coffee ☕, and if the problem persists, contact our support team.
            </p>
        {/if}
        <a href="/register">
            <Button>Back to Homepage</Button>
        </a>
	</div>
</div>
