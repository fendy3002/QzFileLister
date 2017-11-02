'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Service = function Service(_ref) {
    var log = _ref.log,
        output = _ref.output;

    return function (pathArg, callback) {
        var absolutePath = _path2.default.resolve(pathArg);
        log("Processing for:" + absolutePath);

        var processPath = function processPath(pathArg, tag) {
            return new Promise(function (resolve, reject) {
                _fs2.default.lstat(pathArg, function (err, stats) {
                    if (err) {
                        log(err);
                    } else if (stats.isDirectory()) {
                        trace(pathArg, tag).then(function (result) {
                            resolve(result);
                        });
                    } else {
                        resolve([{
                            tag: tag,
                            path: pathArg,
                            ext: _path2.default.extname(pathArg),
                            size: (stats.size / 1024).toFixed(2)
                        }]);
                    }
                });
            });
        };

        var trace = function trace(pathArg, tag) {
            return new Promise(function (resolve, reject) {
                var promises = [];
                _fs2.default.readdir(pathArg, function (err, files) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var filepath = _path2.default.join(pathArg, file);
                        var newTag = tag.concat([file]);

                        promises.push(processPath(filepath, newTag));
                    }
                    Promise.all(promises).then(function (result) {
                        resolve([].concat.apply([], result));
                    });
                });
            });
        };

        trace(absolutePath, []).then(function (result) {
            var size = _lodash2.default.sumBy(result, function (obj) {
                return obj.size * 1;
            });

            output({
                size: size.toFixed(2),
                data: result
            });
        });
    };
};

exports.default = Service;