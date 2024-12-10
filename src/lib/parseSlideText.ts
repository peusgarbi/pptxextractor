export function parseSlidesTextToTxt(slidesText: string[]): string {
	let parsedText: string = "";
	for (let i = 0; i < slidesText.length; i++) {
		const slideText = slidesText[i];
		parsedText += `Slide ${i + 1}:\n\n`;
		parsedText += slideText + "\n\n---\n\n";
	}

	return parsedText;
}

export function parseSlidesTextToMarkdown(slidesText: string[]): string {
	let parsedText: string = "";
	for (let i = 0; i < slidesText.length; i++) {
		const slideText = slidesText[i];
		parsedText += `*Slide ${i + 1}:*\n\n`;
		parsedText += slideText + "\n\n---\n\n";
	}

	return parsedText;
}

export function changeFileExtension(filePath: string, newExtension: string): string {
	// Remove o ponto inicial da nova extensão, se presente
	const extension = newExtension.startsWith(".") ? newExtension : `.${newExtension}`;

	// Encontra a última ocorrência de '.' no nome do arquivo
	const lastDotIndex = filePath.lastIndexOf(".");

	// Se houver uma extensão, substituí-la; caso contrário, adiciona a nova extensão
	if (lastDotIndex !== -1 && lastDotIndex > filePath.lastIndexOf("/")) {
		return filePath.slice(0, lastDotIndex) + extension;
	} else {
		return filePath + extension;
	}
}
