let assert = require('assert');
let path = require('path');
let fileLister = require('../src/index.js').default;
let fs = require('fs');

describe('FileLister', function() {
    describe('Listing', function(done) {
        it('should list file', function(done) {
            let readPath = path.join(__dirname, "..", "testHelper", "fileToList");
            new Promise(fileLister().reader()(readPath))
            .then((result) => {
                assert.equal(true, result.size > 0.02);
                assert.equal(7, result.data.length);
                done();
            });
        });
        it('should output list file', function(done) {
            let readPath = path.join(__dirname, "..", "testHelper", "fileToList");
            let outputPath = path.join(__dirname, "..", "testHelper", "output", "output");
            let output = fileLister().readerOutput({
                out: outputPath,
                encoding: "utf8" ,
                mode: 0o755
            });
            new Promise(fileLister().reader()(readPath))
            .then((result) => {
                output(result, (err) => {
                    let outputObj = JSON.parse(fs.readFileSync(outputPath));
                    assert.equal(true, outputObj.size > 0.02);
                    assert.equal(7, outputObj.data.length);
                    done();
                });
            });
        });
    });
});