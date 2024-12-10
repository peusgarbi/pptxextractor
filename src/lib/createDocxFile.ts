import { Document, Packer, Paragraph } from "docx";

/**
 * Cria um Blob de um arquivo .docx a partir de uma string.
 *
 * @param content Texto a ser inserido no arquivo .docx.
 * @returns Blob do arquivo .docx gerado.
 */
export async function createDocxBlob(content: string): Promise<Blob> {
	// Divide o texto por quebras de linha duplas (\n\n)
	const lines = content.split(/\n\n/);

	// Cria parágrafos para cada trecho
	const paragraphs = lines.map((line) => new Paragraph(line));

	// Cria o documento Word
	const doc = new Document({
		sections: [
			{
				properties: {},
				children: paragraphs,
			},
		],
	});

	// Gera o Blob do arquivo .docx
	const blob = await Packer.toBlob(doc);
	return blob;
}
