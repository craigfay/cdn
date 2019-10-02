import * as http from 'http';
import * as fs from 'fs';
import * as util from 'util';
import * as UrlPattern from 'url-pattern';
import * as formidable from 'formidable';
const copy = util.promisify(fs.copyFile);

const { ASSETS_DIR, PORT } = process.env;

// Start listening for http requests
export function start() {
  const server = http.createServer(requestRouter);
  server.listen(PORT, () => console.log('...'));
}

// Determine if a url matches a pattern
function matches(url:string, pattern:string): boolean {
  const patternInstance = new UrlPattern(pattern);
  const result = patternInstance.match(url);
  return result != null;
}

// Send a request to its corresponding handler function
function requestRouter(req, res) {
  const { url, method } = req;
  if (matches(url, '/upload') && method == 'POST') {
    return handleFileUpload(req, res);
  }
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
}

// Store file upload requests
async function handleFileUpload(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, field, files) => {
    // Move the oploaded file from a temp location to a permanent location
    await copy(files.upload.path, `${ASSETS_DIR}/${field.title}`);
    res.writeHead(200);
    res.end('ok');
  })
}
