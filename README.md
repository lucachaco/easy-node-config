# easy-node-config

Easy to use config based on [nconf][nconf] and [config.json][config.json]


It will load config based on environment variables and command-line arguments to override data from configuration files.
It will try to load the specific config file and if not found it will fallback to the next one removing the last selector from right to left:

- config.LC1.DEMO.json
- config.LC1.json
- config.json



## Installation

```
npm install easy-node-config
```

## Usage

The top-level of `easy-node-config` is a function that loads configuration file with the given `filepath`.

### Create default configuration file

```
vi sample.json
```

```json
{
  "domain": "www.example.com",
  "mongodb": {
    "host": "localhost",
    "port": 27017
  }
}
```

### Create environment specific configuration file

```
vi sample.development.json
```

```json
{
  "domain": "dev.example.com"
}
```

**Note:** Environment specific configuration files should be in the same directory as the default one.

### Test config.json in action

```
vi sample.js
```

```js
var config = require('config.json')('./sample.json');

console.log("domain:", config.domain);
console.log("mongodb:\n",
  "host:", config.mongodb.host, "\n",
  "port:", config.mongodb.port);
```

Run the above script:

```
NODE_ENV=development node ./sample.js --mongodb:host "dharma.mongohq.com" --mongodb:port 10065
```

The output will be:

```
domain: dev.example.com
mongodb:
 host: dharma.mongohq.com
 port: 10065
```

### Load configuration for the specific environment

Environment can be set by passing `env` argument:

```js
var developmentConfig = require('config.json')('./sample.json', 'development');
var productionConfig = require('config.json')('./sample.json', 'production');
```

### One more thing...

`filepath` can be empty if your configuration file is in the current working directory of the process and is called **config.json**.

## License

Released under the [MIT license][license].

[nconf]:https://github.com/flatiron/nconf
[config.json]:https://github.com/bulyshko/config.json

[license]:https://raw.github.com/bulyshko/config.json/master/LICENSE
[build]:https://travis-ci.org/bulyshko/config.json.svg?branch=master
[travis]:https://travis-ci.org/bulyshko/config.json
[dependency]:https://david-dm.org/bulyshko/config.json.svg?theme=shields.io
[david]:https://david-dm.org/bulyshko/config.json
