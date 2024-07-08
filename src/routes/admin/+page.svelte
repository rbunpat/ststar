<script lang="ts">
	export let data;
</script>

{#each data.props.registrations as registrants}
	<a href="/admin/{registrants.id}">
		<h1>{registrants.stageName}</h1>
	</a>
{/each}
