<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import { page } from '$app/stores';
</script>

<div
	class="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
>
	<div class="mx-auto max-w-md text-center">
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">ลงทะเบียนสำเร็จแล้ว :)</h1>

		<h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
		</h1>

		<p class="p-4 text-muted-foreground">
            ลงทะเบียนสำเร็จแล้ว ขอบคุณที่ให้ความสนใจ กรุณาติดตามสถานะการลงทะเบียนของคุณผ่านหน้า "ติดตามสถานะการลงทะเบียน"
		</p>
		<a href="/register/status">
			<Button>ติดตามสถานะ</Button>
		</a>
	</div>
</div>
