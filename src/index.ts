import { getDocument, PDFPageProxy } from "pdfjs-dist";
import { TextContent, TextItem } from "pdfjs-dist/types/src/display/api";
import { Metadata } from "pdfjs-dist/types/src/display/metadata";

type Unpacked<T> = T extends (infer U)[] ? U : T;

const isTextItem = (item: Unpacked<TextContent["items"]>): item is TextItem => {
    return "transform" in item;
};

/**
 * Renders a pdf.js page to text
 * @param page The pdf.js page to render
 * @returns The text content of the page
 */
export const render = async (page: PDFPageProxy): Promise<string> => {
    const content = await page.getTextContent();
    let lastYPosition;
    let text = "";
    for (const item of content.items) {
        if (!isTextItem(item)) {
            continue;
        }
        const textYPosition = item.transform[5];
        if (lastYPosition == textYPosition || !lastYPosition) {
            text += item.str;
        } else {
            text += "\n" + item.str;
        }
        lastYPosition = textYPosition;
    }

    return text;
};

export interface ParsePdfContent {
    info: object;
    metadata: Metadata;
    pages: string[];
}

/**
 * Parses a PDF
 * @param buffer The buffer data from of the pdf
 * @returns The parsed data from the pdf
 */
export const parsepdf = async (buffer: ArrayBuffer): Promise<ParsePdfContent> => {
    const document = await getDocument(buffer).promise;
    const { metadata, info } = await document.getMetadata();

    const tasks = Array(document.numPages)
        .fill(0)
        .map(async (_, i) => {
            const page = await document.getPage(i + 1);
            return render(page);
        });

    const pages = await Promise.all(tasks);

    await document.destroy();

    return {
        metadata,
        info,
        pages
    };
};
