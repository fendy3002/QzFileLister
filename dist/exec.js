'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _index = require('./reader/index.js');

var _index2 = _interopRequireDefault(_index);

var _output = require('./reader/output.js');

var _output2 = _interopRequireDefault(_output);

var _log = require('./reader/log.js');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionDefinitions = [{ name: 'path', type: String, alias: 'p', multiple: false, defaultOption: true }, { name: 'out', type: String, alias: 'o', multiple: false }, { name: 'log', type: String, multiple: false }];
var options = (0, _commandLineArgs2.default)(optionDefinitions);

exports.default = function () {
    if (!options.path) {
        console.log("Usage: node exec.js <path-to-list>");
    } else {
        var path = options.path;
        (0, _index2.default)({
            log: (0, _log2.default)(options),
            output: (0, _output2.default)(options)
        })(path);
    }
};