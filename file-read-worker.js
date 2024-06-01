import {worker} from 'workerpool';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const readHTMLFile = (filename) => {
    const data = readFileSync(join(__dirname,'public',filename));
    return data;
};

worker({
    html: readHTMLFile,
});