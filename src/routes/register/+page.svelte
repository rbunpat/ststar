<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	

	export let data;

	onMount(() => {
		if (data.props?.regType) {
			goto(`/register/${data.props.regType}`);
		}
	});
</script>

<div>
	{#if data.session && !data.props?.regType}
	<div class="flex flex-col items-center justify-center">
		<div class="text-2xl lg:text-3xl md:text-4xl font-bold text-center font-heading mb-10 p-4">
			เลือกประเภทการสมัครเข้าร่วมการแข่งขัน ST Star Challenge 16
		</div>
		<form action="?/createRegistration" method="POST">
			<RadioGroup.Root value="registerType">
				<RadioGroup.Input name="registerType" />
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="indvJunior" id="indvJunior" />
					<Label for="option-one"><h1 class="text-xl md:text-2xl">ร้องเดี่ยว ม.ต้น</h1></Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="indvSenior" id="indvSenior" />
					<Label for="option-two"><h1 class="text-xl md:text-2xl">ร้องเดี่ยว ม.ปลาย</h1></Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="band" id="band" />
					<Label for="option-two"><h1 class="text-xl md:text-2xl">วงดนตรี</h1></Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="coverDance" id="coverDance" />
					<Label for="option-two"><h1 class="text-xl md:text-2xl">Cover Dance</h1></Label>
				</div>
			</RadioGroup.Root>
			<input type="email" name="email" value={data.session.user?.email} hidden/>
			<Button type="submit" class="mt-4">ยืนยัน</Button>
		</form>
	</div>
	{:else if data.session && data.props?.regType}
		<h1>Loading...</h1>
	{:else}
		<div class="flex flex-col">
			<div class="w-full py-24 md:py-32 lg:py-40">
				<div class="container px-4 text-center text-primary md:px-6">
					<h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
						ST Star Challenge 16
					</h1>
					<p class="mt-4 text-lg md:text-xl lg:text-2xl">June 15th, 2024 | Suratthani School</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col">
			<div class="w-full py-24 md:py-32 lg:py-40">
				<div class="container px-4 text-center text-primary md:px-6">
					<h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
						ST Star Challenge 16
					</h1>
					<p class="mt-4 text-lg md:text-xl lg:text-2xl">June 15th, 2024 | Suratthani School</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col">
			<div class="w-full py-24 md:py-32 lg:py-40">
				<div class="container px-4 text-center text-primary md:px-6">
					<h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
						ST Star Challenge 16
					</h1>
					<p class="mt-4 text-lg md:text-xl lg:text-2xl">June 15th, 2024 | Suratthani School</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col">
			<div class="w-full py-24 md:py-32 lg:py-40">
				<div class="container px-4 text-center text-primary md:px-6">
					<h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
						ST Star Challenge 16
					</h1>
					<p class="mt-4 text-lg md:text-xl lg:text-2xl">June 15th, 2024 | Suratthani School</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col">
			<div class="w-full py-24 md:py-32 lg:py-40">
				<div class="container px-4 text-center text-primary md:px-6">
					<h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
						ST Star Challenge 16
					</h1>
					<p class="mt-4 text-lg md:text-xl lg:text-2xl">June 15th, 2024 | Suratthani School</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col">
			<div class="w-full py-24 md:py-32 lg:py-40">
				<div class="container px-4 text-center text-primary md:px-6">
					<h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
						ST Star Challenge 16
					</h1>
					<p class="mt-4 text-lg md:text-xl lg:text-2xl">June 15th, 2024 | Suratthani School</p>
				</div>
			</div>
		</div>
	{/if}
</div>
