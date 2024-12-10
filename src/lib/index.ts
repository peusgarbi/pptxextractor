// place files you want to import through the `$lib` alias in this folder.
import {
	parseSlidesTextToTxt,
	changeFileExtension,
	parseSlidesTextToMarkdown,
} from "./parseSlideText";
import type { GetTextFromPPTX } from "./pdfextractor";
import { createDocxBlob } from "./createDocxFile";
import { getTextFromPPTX } from "./pdfextractor";

export type { GetTextFromPPTX };
export {
	parseSlidesTextToTxt,
	changeFileExtension,
	getTextFromPPTX,
	createDocxBlob,
	parseSlidesTextToMarkdown,
};
