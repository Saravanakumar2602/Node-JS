const fs = require("fs");

// fs.mkdir('./docs',(err)=>{
//     if(err){
//         console.log(err.message);
//     }else{
//         console.log("No errors, Folder Created");
//     }
// })

// if(! fs.existsSync('./docs')){

//     fs.mkdir('./docs',(err)=>{
//     if(err){
//         console.log(err.message);
//     }else{
//         console.log("No errors, Folder Created");
//     }

// })
// }


// fs.writeFile('./docs/file.txt' , "Hello Saravana" , (err)=>{  // the function will over write if we edit the file 
//     if(err){
//         console.log(err.msg);
//     }else{
//         console.log("File Written");
//     }
// })


// fs.readFile('./docs/file.txt' , (err,data)=>{
//     if(err){
//         console.log(err.message); 
//     }else{
//         console.log(data) // output : <Buffer 48 65 6c 6c 6f 20 53 61 72 61 76 61 6e 61>
//         //to avoid this we use toString() function
//         console.log(data.toString());
//     }
// })


// if(fs.existsSync('./docs/file.txt')){
//     fs.readFile('./docs/file.txt' , (err,data)=>{
//         if(err){
//             console.log(err.message); 
//         }else{
//             console.log(data.toString());
//         }
//     })
// }

//delete a file

if(fs.existsSync('./docs/file.txt')){
    fs.unlink('./docs/file.txt',(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("file deleted");
        }
    })
}

if( fs.existsSync('./docs')){

    fs.rmdir('./docs',(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("Folder Deleted");
    }

})
}
