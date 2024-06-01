import {createServer} from 'node:http';
import { pool } from 'workerpool';
import { error } from 'node:console';
import {log} from 'console';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;

const fileReadPool = pool(join(__dirname,'file-read-worker.js'));

const server = createServer(async(req,res) => {
    if(req.url == '/'){
        res.writeHead(200,{'Content-Type': 'text/html'});

        try {
            const result = await fileReadPool.exec('html', ['index.html']);
            res.end(result);
        } catch (error) {
            error(err);
            res.end();
        } finally{
            fileReadPool.terminate();
        }
    }else if(req.url == '/about'){
        res.writeHead(200,{'Content-Type': 'text/html'});

        try {
            const result = await fileReadPool.exec('html', ['about.html']);
            res.end(result);
        } catch (error) {
            error(err);
            res.end();
        } finally{
            fileReadPool.terminate();
        }
    }
});

server.listen(port,() => {
    log('Server running');
})