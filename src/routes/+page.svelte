<script lang="ts">
	import type { GetTextFromPPTX } from "$lib";
	import { getTextFromPPTX } from "$lib";

	let files: FileList | undefined = $state();
	let filesText: GetTextFromPPTX | undefined = $state();
</script>

<main class="mx-auto p-2">
	<div class="mx-auto rounded-md bg-gray-200 p-4 drop-shadow-sm">
		<label for="avatar">Escolha seus arquivos pdf:</label>
		<input bind:files multiple={true} id="avatar" name="avatar" type="file" accept=".pptx,.ppt" />
		{#if files}
			<button
				onclick={async () => {
					if (files) {
						filesText = await getTextFromPPTX(files[0]);
					}
				}}>Obter texto!</button
			>
		{/if}
	</div>
	{#if files}
		<h2>Arquivos selecionados:</h2>
		{#each Array.from(files) as file}
			<p>{file.name} ({file.size} bytes)</p>
		{/each}
	{/if}

	{#if filesText}
		{#if filesText.error}
			<h2>Erro ao obter texto</h2>
		{:else}
			{#each filesText.slidesTextArray as text, i}
				<h3>Slide {i + 1}</h3>
				<p>{text}</p>
				<div class="border-1 border"></div>
			{/each}
		{/if}
		<h2>Texto:</h2>
	{/if}
</main>
