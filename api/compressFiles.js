const fs = require('fs');
const archiver = require('archiver');

function compress(path) {

    var output = fs.createWriteStream(__dirname + '/Folder_Test/archive.zip');
    var archive = archiver('zip');

    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function() {
        console.log('Data has been drained');
    });

// good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });

// good practice to catch this error explicitly
    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output);

    var file1 = __dirname + '/Folder_Test/FileToCompress.txt';
    archive.append(fs.createReadStream(file1), { name: 'file1.txt' });
    archive.finalize();
}
