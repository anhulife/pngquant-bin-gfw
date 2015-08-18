/*global afterEach,beforeEach,it*/

var assert = require('assert');
var execFile = require('child_process').execFile;
var path = require('path');
var binCheck = require('bin-check');
var compareSize = require('compare-size');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var tmp = path.join(__dirname, 'tmp');

beforeEach(function () {
	mkdirp.sync(tmp);
});

afterEach(function () {
	rimraf.sync(tmp);
});

it('return path to binary and verify that it is working', function (cb) {
	binCheck(require('../'), ['--version'], function (err, works) {
		assert(!err);
		assert(works);
		cb();
	});
});

it('minify a PNG', function (cb) {
	var src = path.join(__dirname, 'fixtures/test.png');
	var dest = path.join(tmp, 'test.png');
	var args = [
		'-o', dest,
		src
	];

	execFile(require('../'), args, function (err) {
		assert(!err);

		compareSize(src, dest, function (err, res) {
			assert(!err);
			assert(res[dest] < res[src]);
			cb();
		});
	});
});
