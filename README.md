# presentations-viewer

Server and client for my presentations.

## presentation format

Presentations must be in a README.md, pages are separated with double
horizontal rulers. See example [here](https://github.com/szkrd/presentations).

## keyboard shortcuts

* __HOME/0__: first page
* __END/9__: last page
* __f__: toggle fullscreen
* __h__: table of contents
* __+__: increase font
* __-__: decrease font
* __i__: invert (switch theme)


## client

Uses less, babel, webpack + marked, pagejs, jqlite.

* in production the server serves it as static content from /dist
* in dev mode webpack dev server proxy is used
* default dev url: http://localhost:3001/

## server

Uses koa, koa router, koa static, joi, winston.

* serves /dist with koa static
* api is at /api/*
* default dev url: http://localhost:3000/

## env vars

Using dotenv and nodemon (nodemon.json for server dev).

* DEFAULT_THEME: client theme, can be 'light' or 'dark'; default is light
* DEV_PORT: webpack dev server port; default is 3001
* DEV_SERVER: webpack proxy target; default is http://localhost:3000
* LOG_LEVEL: logger level; default is error
* PORT: default server port; default is 3000
* DATA: absolute path to the directory where the presentations are


### nodemon example

```json
{
  "env": {
    "LOG_LEVEL": "silly",
    "NODE_ENV": "development",
    "DATA": "/Users/szkurdi/Projects/github/presentations"
  }
}
```

### dotenv example

```
DATA=/Users/szkurdi/Projects/github/presentations
DEFAULT_THEME=light
```
