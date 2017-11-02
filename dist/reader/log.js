'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Service = function Service(options) {
    if (!options.out) {
        return function (key, log) {};
    } else if (options.log) {
        return function (key, log, callback) {
            if (log) {
                var data = key + ": ";
                if (typeof log === 'string' || log instanceof String) {
                    data += log;
                } else {
                    data += JSON.stringify(log);
                }
                _fs2.default.writeFile(options.log, data, callback);
            } else {
                var data = "";
                if (typeof key === 'string' || key instanceof String) {
                    data += key;
                } else {
                    data += JSON.stringify(key);
                }
                _fs2.default.writeFile(options.log, data, callback);
            }
        };
    } else {
        return console.log;
    }
};

exports.default = Service;