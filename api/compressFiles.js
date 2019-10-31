const fs = require('fs');
const archiver = require('archiver');
var path = require("path");


function compress(paths, archiveName) {

    var archivePath = path.join(__dirname, `../fichiers/${archiveName}`)
    var output = fs.createWriteStream(archivePath);
    var archive = archiver('zip');

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
        console.log('Data has been drained');
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);


    let unwindedPaths = [].concat(...paths);
    unwindedPaths.forEach((path) => {
        let fileName = path.split('\\');
        archive.append(fs.createReadStream(path), { name: fileName[fileName.length-1] });

    });

    archive.finalize();

    return archivePath
    
}

module.exports = {
    compress: compress,
};