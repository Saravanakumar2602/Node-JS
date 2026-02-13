const fs = require('fs');

// const readStream = fs.createReadStream('./Docs/HugeFile.txt');

// readStream.on('data',(chunk)=>{
//     console.log('\n\nnew buffer\n\n')
//     console.log(chunk.toString());
// })

//insted of toString()

const readStream = fs.createReadStream('./Docs/HugeFile.txt',{encoding:'utf-8'});

readStream.on('data',(chunk)=>{
    console.log('\n\nnew buffer\n\n')
    console.log(chunk);
})

const writeStream = fs.createWriteStream('./Docs/CopyOfHugeFile.txt');

// readStream.on('data',(chunk)=>{
//     writeStream.write(chunk);
// })

readStream.pipe(writeStream); // insted of about code to copy from read stream to write stream