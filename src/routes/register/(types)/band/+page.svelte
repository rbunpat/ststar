<script lang="ts">
	export let data;
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";

	//@ts-ignore
	import FilePond, { registerPlugin, supported } from 'svelte-filepond';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	import 'filepond/dist/filepond.css';
	import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
	import { goto } from '$app/navigation';

	let pond;
	let name = 'image';
	let imageUrl = '';
	let youtubeLinkAlert = false;

	let placeholderImageUrl: string | null = null;

	if (data.props?.details?.imageUrl) {
		placeholderImageUrl = `https://ststar-cdn.rachatat.com/${data.props.details.imageUrl}`;
	}

	registerPlugin(FilePondPluginImagePreview);

	let progressStatus = 'Saved';

	let stageName = data.props?.details?.stageName || '';
	let members = data.props?.details?.members || '';
	let contactInfo = data.props?.details?.contactInfo || '';
	let instruments = data.props?.details?.instruments || 'false,false,false,false,false,false,false,false,false,false';
	let videoUrl = data.props?.details?.videoUrl || '';
	let songName = data.props?.details?.songName || '';
	let instrumentsArray = instruments.split(',');

	//convert instruments string to array of booleans
	instrumentsArray = instrumentsArray.map((instrument) => instrument === 'true')

	export async function modifyInstrumentsArray(index: number) {
		console.log('index', index);
		instrumentsArray[index] = !instrumentsArray[index];
		instruments = instrumentsArray.join(',');
		saveProgress();
	}

	export async function confirmDetails(){
		if(!stageName || !contactInfo || !songName || !videoUrl) {
			alert('กรุณากรอกข้อมูลให้ครบถ้วน');
			return;
		}
		if (youtubeLinkAlert) {
			alert('กรุณาใส่ลิงก์วิดิโอ Youtube ให้ถูกต้อง');
			return;
		}
		const formData = new FormData();
		formData.append('confirm', 'true')
		const response = await fetch('?/confirmDetails', {
			method: 'POST',
			body: formData
		});

		if(response.ok) {
			goto('/register/success');
		}

	}

	export async function saveProgress() {
		progressStatus = 'Saving...';
		if(videoUrl && !videoUrl.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/)) {
			youtubeLinkAlert = true;
			return;
		}
		youtubeLinkAlert = false;
		const formData = new FormData();
		formData.append('stageName', stageName);
		formData.append('members', members);
		formData.append('contactInfo', contactInfo);
		formData.append('songName', songName);
		formData.append('instruments', instrumentsArray.join(','));
		formData.append('videoUrl', videoUrl);
		await fetch('?/saveProgress', {
			method: 'POST',
			body: formData
		});
		progressStatus = 'Saved';
	}

	export async function saveImage() {
		progressStatus = 'Saving...';
		const formData = new FormData();
		formData.append('imageUrl', imageUrl);
		const response = await fetch('?/saveImage', {
			method: 'POST',
			body: formData
		});
		progressStatus = 'Saved';
	}
</script>



<div class="flex flex-col items-center justify-center">
	<div class="text-2xl lg:text-3xl md:text-4xl font-bold text-center font-heading mb-10">
		สมัครเข้าร่วมการแข่งขัน ST Star Challenge 16
		ประเภทวงดนตรี
	</div>
	<form action="?/confirmDetails" method="POST" on:change={saveProgress} class="space-y-4 text-xl p-4">
		<div>
			<Label for="stageName">ชื่อทีม/วง</Label>
			<Input name="stageName" bind:value={stageName} required></Input>
		</div>

		<div class="grid w-full gap-1.5">
			<Label for="message-2">รายชื่อสมาชิก พร้อมตำแหน่งในวงดนตรี</Label>
			<Textarea placeholder="รายชื่อสมาชิก" id="message-2" bind:value={members} required />
			<p class="text-sm text-muted-foreground">
				ตัวอย่าง 40000 นายเอสที สตาร์ ม.6/9 เลขที่ 24 (ร้องนำ)
			</p>
		</div>

		<div>
			<Label for="stageName"
				>ช่องทางการติดต่ออื่น ๆ เช่น Facebook, Instagram และ LINE (ไม่จำกัดจำนวน)</Label
			>
			<Input name="stageName" bind:value={contactInfo} required></Input>
		</div>

		<div>
			<Label for="songName">เพลงที่ใช้ในการประกวด</Label>
			<Input name="songName" bind:value={songName} required></Input>
		</div>

		{#if placeholderImageUrl}
			<div>
				<Label for="image">ภาพถ่ายรวมสมาชิกทุกคนในวง</Label>
				<FilePond
					required
					onprocessfiles={saveImage}
					bind:this={pond}
					{name}
					files={[{ source: placeholderImageUrl, options: { type: 'local' } }]}
					server={{
						process: async function (fieldName, file, metadata, load, error, progress, abort) {
							const getPresignedUrlResponse = await fetch('/api/upload', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									fileName: file.name,
									fileType: file.type
								})
							});

							if (!getPresignedUrlResponse.ok) {
								console.error('Failed to get presigned URL');
							}

							const { presignedUrl, objectKey } = await getPresignedUrlResponse.json();

							const uploadToR2Response = await fetch(presignedUrl, {
								method: 'PUT',
								headers: {
									'Content-Type': file.type
								},
								body: file
							});

							imageUrl = objectKey;

							console.log(uploadToR2Response);

							load(objectKey);
						}
					}}
					allowMultiple={false}
				/>
			</div>
		{:else}
			<div>
				<FilePond
					required
					onprocessfiles={saveImage}
					bind:this={pond}
					{name}
					server={{
						process: async function (fieldName, file, metadata, load, error, progress, abort) {
							const getPresignedUrlResponse = await fetch('/api/upload', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									fileName: file.name,
									fileType: file.type
								})
							});

							if (!getPresignedUrlResponse.ok) {
								console.error('Failed to get presigned URL');
							}

							const { presignedUrl, objectKey } = await getPresignedUrlResponse.json();

							const uploadToR2Response = await fetch(presignedUrl, {
								method: 'PUT',
								headers: {
									'Content-Type': file.type
								},
								body: file
							});

							imageUrl = objectKey;

							console.log(uploadToR2Response);

							load(objectKey);
						}
					}}
					allowMultiple={false}
				/>
			</div>
		{/if}
		<div class="flex flex-col gap-4">

			<Label for="instrumentsCheckbox">เครื่องดนตรีที่ใช้</Label>

			<input type="text" name="instruments" id="instruments" value="{instrumentsArray}" hidden>

			{#each [
				{ name: 'ไมโครโฟนนักร้อง 1', value: instrumentsArray[0] },
				{ name: 'ไมโครโฟนนักร้อง 2', value: instrumentsArray[1]},
				{ name: 'กีต้าร์โปร่งไฟฟ้า 1', value: instrumentsArray[2] },
				{ name: 'กีต้าร์โปร่งไฟฟ้า 2', value: instrumentsArray[3] },
				{ name: 'กีต้าร์ไฟฟ้า 1', value: instrumentsArray[4] },
				{ name: 'กีต้าร์ไฟฟ้า 2', value: instrumentsArray[5] },
				{ name: 'เบสไฟฟ้า', value: instrumentsArray[6] },
				{ name: 'กลองชุดไฟฟ้า', value: instrumentsArray[7] },
				{ name: 'คาฮอง', value: instrumentsArray[8] },
				{ name: 'คีย์บอร์ด', value: instrumentsArray[9] }
			] as instrument, i}
				<div class="flex space-x-2 items-center" id="instrumentsCheckbox">
					<Checkbox id={instrument.name} name={instrument.name} bind:group={instruments} onCheckedChange={(e) => modifyInstrumentsArray(i)} checked={instrument.value} />
					<Label for={instrument.name}>{instrument.name}</Label>
				</div>
			{/each}
		</div>
		<div>
			<Label for="videoUrl">ลิงก์วิดิโอ Youtube (Pre-Audition)</Label>
			<Input name="videoUrl" bind:value={videoUrl} required></Input>
			{#if youtubeLinkAlert}
			<p class="mt-2 text-red-500">กรุณาใส่ลิงก์วิดิโอ Youtube ให้ถูกต้อง</p>
		{/if}
		</div>
		

		
		<AlertDialog.Root>
			<AlertDialog.Trigger><Button class="mt-4">ยืนยัน</Button></AlertDialog.Trigger>
			<AlertDialog.Content>
			  <AlertDialog.Header>
				<AlertDialog.Title>แน่ใจหรือไม่?</AlertDialog.Title>
				<AlertDialog.Description>
				  คุณแน่ใจหรือไม่ว่าต้องการยืนยันการสมัครเข้าร่วมการแข่งขัน ST Star Challenge 16 ประเภทวงดนตรี
				  เมื่อยืนยันแล้วจะไม่สามารถแก้ไขข้อมูลได้อีก
				</AlertDialog.Description>
			  </AlertDialog.Header>
			  <AlertDialog.Footer>
				<AlertDialog.Cancel>ยกเลิก</AlertDialog.Cancel>
				<AlertDialog.Action>
					<button on:click={confirmDetails} class="w-full">ยืนยัน</button>
				</AlertDialog.Action>
			  </AlertDialog.Footer>
			</AlertDialog.Content>
		  </AlertDialog.Root>
	</form>
</div>
