<script lang="ts">
	export let data;
	import Button from '$lib/components/ui/button/button.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import LogOut from 'lucide-svelte/icons/log-out';
</script>

<div
	class="fixed left-0 right-0 top-0 z-50 mt-6 flex w-full flex-col flex-nowrap items-center justify-center"
>
	<div
		class="mx-auto flex max-w-screen-lg flex-wrap items-center justify-between rounded-2xl bg-pink-200 bg-opacity-40 p-4 backdrop-blur-md"
	>
		<a href="/" class="mr-5 flex items-center space-x-3 sm:mr-10 md:mr-96">
			<div class="">
				<Avatar.Root>
					<Avatar.Image src="/logo.jpg" alt="@ststar.challenge" />
					<Avatar.Fallback>ST</Avatar.Fallback>
				</Avatar.Root>
			</div>
			<span class="self-center whitespace-nowrap font-semibold dark:text-white md:text-2xl"
				>ST Star Challenge 16</span
			>
		</a>

		{#if data.session}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button>
						<Avatar.Root class="h-7 w-7 mr-2">
							<Avatar.Image src="{data.session?.user?.image}" alt="@ststar.challenge"/>
							<Avatar.Fallback>ST</Avatar.Fallback>
						</Avatar.Root>
						Menu
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<a href="/register">
							<DropdownMenu.Item>สมัคร</DropdownMenu.Item>
						</a>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item on:click={() => signOut()}>
							<LogOut class="mr-2 h-4 w-4" /> Sign Out</DropdownMenu.Item
						>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<Button on:click={() => signIn("google")}>สมัคร/เข้าสู่ระบบ</Button>
		{/if}
	</div>
</div>

<div class=" mt-36">
	<slot />
</div>

<footer class="mt-20 py-6">
	<div class="container flex items-center justify-between px-4 md:px-6">
		<p class="text-sm text-muted-foreground">© 2024 ST Star Challenge 16. All rights reserved.</p>
		<nav class="hidden items-center gap-4 md:flex">
			<a class="text-sm font-medium hover:text-primary" href="/privacy-policy"> Privacy Policy </a>
			<a class="text-sm font-medium hover:text-primary" href="/terms-of-service">
				Terms of Service
			</a>
		</nav>
	</div>
</footer>
