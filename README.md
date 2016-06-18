# presentations-viewer

Server and client for my presentations.

## presentation format

Presentations must be in a README.md, pages are separated with double
horizontal rulers. See example [here](https://github.com/szkrd/presentations).

## server

* serves /dist with koa static
* api is at /api/*
* in dev mode webpack dev server proxy is used

### env vars

Using dotenv (nodemon.json for development).

* LOG_LEVEL: logger level; default is error
* PORT: default server port; default is 3000
* DATA: absolute path to the directory where the presentations are

```json
{
  "env": {
    "LOG_LEVEL": "silly",
    "PORT": 3000,
    "DATA": "/Users/johndoe/Projects/presentations"
  }
}
```