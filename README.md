# About
* A CDN server that accepts file uploads, then serves them to subsequent requesters
* Use the form at `localhost/upload.html`, then view uploads at `localhost/uploads/{filename}>`

## Getting Production Ready
* `chmod +x enable-ssl.sh`
* `./enable-ssl.sh`

## Commands
* Install dependencies:
  * With node installed: `npm --prefix app install`
  * With docker installed: `docker run -it --rm -v $(pwd)/app:/app -w /app node:12 npm install`
* Start application (development):
  * `docker-compose up -d`
* Start application (production):
  * `docker-compose -f docker-compose.production.yml up -d`
* Restart in production: (For updates)
  * `docker-compose restart -d`
* List running docker containers:
  * `docker ps`
