import { readFile } from "fs/promises";
import { expect, test } from "vitest";
import { parsepdf } from "../src";
import path from "path";

const TEST_PDF = "HighStakes.pdf";

test("parses a pdf", async () => {
    const { buffer } = await readFile(path.resolve(__dirname, TEST_PDF));
    const content = await parsepdf(buffer);
    expect(content.pages.length).toEqual(135);
});
