'use strict';

var assert = require('assert');
var braces = require('braces');
var npmCliPath = require('npm-cli-path');
var path = require('path');
var pify = require('pify');
var Promise = require('pinkie-promise');
var readPackageJson = pify(require('read-package-json'), Promise, { include: [] });
var spawn = require('child_process').spawn;

module.exports = function (args) {
	var NPM_MAJOR_MIN = 2;
	var NPM_MAJOR_MAX = 6;

	var npmPackage = 'npm';

	var npmVersion = parseInt(args[0]);

	if (npmVersion >= NPM_MAJOR_MIN && npmVersion <= NPM_MAJOR_MAX) {
		args.shift();
		npmPackage = '@ex-machine/npm' + npmVersion;
	}

	var expandedArgs = args
	.map(function (arg) {
		return braces.expand(arg);
	})
	.reduce(function (args, arg) {
		return args.concat(arg);
	}, []);

	var npmPathPromise;

	if (npmPackage === 'npm') {
		npmPathPromise = npmCliPath();
	} else {
		npmPathPromise = readPackageJson(require.resolve(npmPackage + '/package.json'), console.error, false)
		.then(function (data) {
			assert.ok(data.bin, 'data.bin');

			var npmBin = Object.keys(data.bin)
			.filter(function (bin) {
				return /^npm-?\d$/.test(bin);
			})[0];

			assert.ok(npmBin, 'npmBin');

			var npmBinPath = data.bin[npmBin];

			assert.ok(npmBinPath, 'npmBinPath');
			
			return require.resolve(path.join(npmPackage, npmBinPath));
		});
	}

	npmPathPromise
	.then(function (npmPath) {
		spawn(process.execPath, [npmPath].concat(expandedArgs), { stdio: 'inherit' })
		.on('exit', function (code) {
			process.exit(code);
		});
	})
	.catch(console.error);
};
