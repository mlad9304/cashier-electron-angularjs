# Cashier application

A cashier application for [Electron runtime](http://electronjs.org). Tested on Windows, macOS and Linux.  

# Quick start

Make sure you have [Node.js](https://nodejs.org) installed, then type the following commands known to every Node developer...
```
git clone https://github.com/rndev80/cashier-app.git
cd cashier-app
npm install
npm start
```
...and you have a running desktop application on your screen.

# Development

## Starting the app

```
npm start
```

## Environments

Environmental variables are done in a bit different way (not via `process.env`). Env files are plain JSONs in `config` directory, and build process dynamically links one of them as an `env` module. You can import it wherever in code you need access to the environment.
```js
import env from "env";
console.log(env.name);
```

# Making a release

To package your app into an installer use command:
```
npm run release
```

Once the packaging process finished, the `dist` directory will contain your distributable file.
