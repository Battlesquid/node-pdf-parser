# node-pdf-parser

PDF parser for NodeJS based on [pdf-parse](https://www.npmjs.com/package/pdf-parse).


## Install

```sh
# pnpm
pnpm i node-pdf-parser

# yarn
yarn add node-pdf-parser

# npm
npm i node-pdf-parser
```

## Usage

```ts
import { parsepdf } from "node-pdf-parser";
import { readFile } from "fs/promises";

const filename = "HelloWorld.pdf";

(async () => {
    const { buffer } = await readFile(path.resolve(__dirname, filename));
    const content = await parsepdf(buffer);
})();
```
