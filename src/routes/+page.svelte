<script lang="ts">
	import {
		changeFileExtension,
		createDocxBlob,
		getTextFromPPTX,
		parseSlidesTextToMarkdown,
		parseSlidesTextToTxt,
	} from "$lib";

	let files: FileList | undefined = $state();

	async function createFileFromPPTX(
		file: File,
		extension: ".txt" | ".md" | ".docx",
	): Promise<void> {
		const content = await getTextFromPPTX(file);
		if (content.error) {
			window.alert("Erro ao tentar criar arquivo!");
			return;
		}
		let blob: Blob;
		switch (extension) {
			case ".docx": {
				const docxText = parseSlidesTextToTxt(content.slidesTextArray);
				blob = await createDocxBlob(docxText);
				break;
			}
			case ".md": {
				const markdownTxt = parseSlidesTextToMarkdown(content.slidesTextArray);
				blob = new Blob([markdownTxt], { type: "text/markdown" });
				break;
			}
			case ".txt": {
				const parsedText = parseSlidesTextToTxt(content.slidesTextArray);
				blob = new Blob([parsedText], { type: "text/plain" });
				break;
			}
			default: {
				window.alert("Erro ao tentar criar arquivo!");
				return;
			}
		}

		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = changeFileExtension(file.name, extension);
		link.click();

		URL.revokeObjectURL(link.href);
	}
</script>

<main class="mx-auto p-2">
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-2 rounded-md bg-gray-200 p-4 drop-shadow-sm">
			<label for="avatar">Escolha seus arquivos PPTX:</label>
			<input bind:files multiple={true} id="avatar" name="avatar" type="file" accept=".pptx,.ppt" />
		</div>
		{#if files}
			<div class="flex flex-col gap-2 rounded-md bg-gray-200 p-4 drop-shadow-sm">
				<h2>Arquivos selecionados:</h2>
				{#each Array.from(files) as file}
					<div class="mx-auto flex flex-row items-center justify-center gap-4">
						<p>- {file.name} ({file.size} bytes)</p>
						<button
							class="mx-auto rounded-md bg-red-200 px-3 py-2 drop-shadow-lg transition-colors hover:bg-red-100"
							onclick={() => createFileFromPPTX(file, ".txt")}
						>
							Baixar TXT
						</button>
						<button
							class="mx-auto rounded-md bg-red-200 px-3 py-2 drop-shadow-lg transition-colors hover:bg-red-100"
							onclick={() => {
								createFileFromPPTX(file, ".docx");
							}}
						>
							Baixar DOCX
						</button>
						<button
							class="mx-auto rounded-md bg-red-200 px-3 py-2 drop-shadow-lg transition-colors hover:bg-red-100"
							onclick={() => {
								createFileFromPPTX(file, ".md");
							}}
						>
							Baixar Markdown
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
