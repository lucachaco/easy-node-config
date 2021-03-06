var path = require('path');
var nconf = require('nconf');

module.exports = function (_filePath, env) {
    let filePath = _filePath || path.join(process.cwd(), 'config.json');
    env = env || process.env.NODE_ENV || 'development';

    // Command-line arguments
    nconf.argv();

    // Environment variables
    nconf.env();

    // Environment specific configuration file
    const filePathParts = filePath.split('.');
    const envParts = env.split('.');
    const currentEnv = '';
    const configPaths = [];
    for (let i = 0; i < envParts.length; i += 1) {
        const currentEnvPart = envParts[i];
        // currentEnv += currentEnv;
        filePathParts.splice(filePathParts.length - 1, 0, currentEnvPart);
        configPaths.push({ customKey: i, path: filePathParts.join('.') });
    }
    const reverseConfigPaths = configPaths.reverse();
    for (let i = 0; i < reverseConfigPaths.length; i += 1) {
        nconf.file(`_${reverseConfigPaths[i].customKey}_`, reverseConfigPaths[i].path);
    }

    // Default configuration file
    nconf.file(filePath);
    return nconf.get();
};
