'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Service = function Service(options) {
    if (!options.out) {
        return function (result, callback) {
            if (options.pretty) {
                console.log(JSON.stringify(result, null, 2));
            } else {
                console.log(JSON.stringify(result));
            }
        };
    } else {
        return function (result, callback) {
            if (options.pretty) {
                _fs2.default.writeFile(options.out, JSON.stringify(result, null, 2), callback);
            } else {
                _fs2.default.writeFile(options.out, JSON.stringify(result), callback);
            }
        };
    }
};

exports.default = Service;