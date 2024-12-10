import { DOMParser } from "xmldom";
import JSZip from "jszip";

function getTextFromNodes(node: Document, tagName: string, namespaceURI: string) {
	let text = "";
	const textNodes = node.getElementsByTagNameNS(namespaceURI, tagName);
	for (let i = 0; i < textNodes.length; i++) {
		text += textNodes[i].textContent + " ";
	}
	return text.trim();
}

export async function getTextFromPPTX(file: File): Promise<string> {
	const arrayBuffer = await file.arrayBuffer();
	try {
		const zip = new JSZip();
		await zip.loadAsync(arrayBuffer);

		const aNamespace = "http://schemas.openxmlformats.org/drawingml/2006/main";
		let text = "";

		let slideIndex = 1;
		while (true) {
			const slideFile = zip.file(`ppt/slides/slide${slideIndex}.xml`);

			if (!slideFile) break;

			const slideXmlStr = await slideFile.async("text");

			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(slideXmlStr, "application/xml");

			text += getTextFromNodes(xmlDoc, "t", aNamespace) + " ";

			slideIndex++;
		}

		return text.trim();
	} catch (err) {
		console.error("Error extracting text from PPTX:", err);
		return "";
	}
}
