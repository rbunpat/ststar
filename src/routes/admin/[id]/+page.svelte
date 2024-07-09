<!-- <script>
    export let data;

    //format data into a more readable format

</script>

<h1>id: {data.props.bruh?.id}</h1>
<h1>stageName: {data.props.bruh?.stageName}</h1>
<img src="https://ststar-cdn.rachatat.com/{data.props.bruh?.imageUrl}" alt="">
<h1>{data.props.bruh?.registerType}</h1>
<h1>{data.props.bruh?.members}</h1>
<h1>{data.props.bruh?.contactInfo}</h1>
<h1>{data.props.bruh?.instruments}</h1>
<h1>{data.props.bruh?.videoUrl}</h1>
<h1>{data.props.bruh?.songName}</h1>
<h1>{data.props.bruh?.createdAt}</h1>
<h1>{data.props.bruh?.updatedAt}</h1>
<h1>{data.props.bruh?.confirmed}</h1> -->

<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Label from '$lib/components/ui/label/label.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { onMount } from 'svelte';

	function extractVideoID(url: string) {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match && match[7].length == 11) {
			return match[7];
		} else {
			alert('Could not extract video ID.');
		}
	}

	export let data;

	export let videoId = extractVideoID(data.props.bruh?.videoUrl);
	//turn instruments string into array
	let instrumentsArray = data.props.bruh?.instruments.split(',');
	instrumentsArray = instrumentsArray.map((instrument) => instrument === 'true');

	let instrumentNameArray = [
		'ไมโครโฟนนักร้อง 1',
		'ไมโครโฟนนักร้อง 2',
		'กีต้าร์โปร่งไฟฟ้า 1',
		'กีต้าร์โปร่งไฟฟ้า 2',
		'กีต้าร์ไฟฟ้า 1',
		'กีต้าร์ไฟฟ้า 2',
		'เบสไฟฟ้า',
		'กลองชุดไฟฟ้า',
		'คาฮอง',
		'คีย์บอร์ด'
	];

	let instrumentsArrayWithNames = instrumentsArray.map((instrument, index) => {
		return {
			name: instrumentNameArray[index],
			value: instrument
		};
	});

	onMount(() => {
		Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

	});
</script>

<div class="items-cente flex justify-center">
	<div class="grid max-w-6xl gap-4 p-4 md:grid-cols-3 md:gap-10">
		<div class="md:col-span-2">
			<Card.Root>
				<Card.Header>
					<Card.Title>Details</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="grid gap-6">
						<div class="grid gap-3">
							<Label for="name">ชื่อทีม/วง</Label>
							<h1>{data.props.bruh?.stageName}</h1>
						</div>
						<div class="grid gap-3">
							<Label for="description">รายชื่อสมาชิก</Label>
							<h1>{data.props.bruh?.members}</h1>
						</div>
						<div class="grid gap-3">
							<Label for="description">ช่องทางการติดต่อ</Label>
							<h1>{data.props.bruh?.contactInfo}</h1>
						</div>
						<div class="grid gap-3">
							<Label for="description">เพลงที่ใช้ในการประกวด</Label>
							<h1>{data.props.bruh?.songName}</h1>
						</div>
						<div class="grid gap-3">
							<Label for="description">เครื่องดนตรีที่ใช้</Label>
							{#each instrumentsArrayWithNames as instrument}
								<div class="flex items-center space-x-2">
									<Checkbox id="inst" bind:checked={instrument.value} disabled />
									<Label for="inst">{instrument.name}</Label>
								</div>
							{/each}
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<div class="space-y-4">
			<div>
				<Card.Root class="overflow-hidden">
					<Card.Header>
						<Card.Title>ภาพถ่าย</Card.Title>
						<Card.Description>ภาพถ่ายรวมสมาชิกทุกคนในวง กดที่รูปเพื่อขยาย</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="grid gap-2">
							<a href="https://ststar-cdn.rachatat.com/{data.props.bruh?.imageUrl}" data-fancybox>
							<img
								alt="Product"
								class="aspect-square w-full rounded-md object-cover"
								height="300"
								src="https://ststar-cdn.rachatat.com/{data.props.bruh?.imageUrl}"
								width="300"
							/>
						</a>
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<div>
				<Card.Root class="overflow-hidden">
					<Card.Header>
						<Card.Title>Pre-Audition Video</Card.Title>
						<a href={data.props.bruh?.videoUrl}>
							<Card.Description>{data.props.bruh?.videoUrl}</Card.Description>
						</a>
					</Card.Header>
					<Card.Content>
						<div class="grid gap-2">
							<div class="aspect-video">
								<iframe
									class="h-full w-full rounded-lg"
									src="https://www.youtube.com/embed/{videoId}"
									width="100%"
									title="YouTube video player"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowfullscreen
								>
								</iframe>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</div>
