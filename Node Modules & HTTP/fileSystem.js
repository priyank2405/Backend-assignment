// Intro to Node & File System

// const fs = require('node:fs');

//How to create a new file.

// fs.writeFile('log.txt', 'Hey! this is my file', (err) =>{
//     if(err) console.log(err)
//         else console.log('Done')
// })

//Append data or add the data to file

// fs.appendFile('log.txt', '\nThis is the latest updated data', (err) =>{
//      if(err) console.log(err)
//         else console.log('done')
// })

//rename the file
// fs.rename('log.txt', 'data.txt', (err) =>{
//      if(err) console.log(err)
//         else console.log('Done')
// })

//Copy File

// fs.copyFile('data.txt', './backup/dataCopy.txt', (err) =>{
//     if(err) console.log(err)
//         else console.log('Done')
// })

// delete the file

// fs.unlink('data.txt', () =>{
//     console.log('Done')
// })

// fs.unlink('./backup/dataCopy.txt', () =>{
//     console.log('Done')
// })