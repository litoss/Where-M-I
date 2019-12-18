const express =  require('express');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
// const fileUpload = require('express-fileupload');

const app = express();
const port = 8000;

// app.use(fileUpload({
//     useTempFile:true,
//     tempFileDir:'/tmp/'
// }))

const conv  = new ffmpeg()

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.get('/prova',(req,res)=>{

conv
.input(req.query.input)
.setStartTime(req.query.start) // da trasformare nel formato HH:MM:SS
.setDuration((req.query.end)) // da trasformare nel formato HH:MM:SS
.audioFilters('volume='+req.query.volume) //va da 0 a 10
.saveToFile('./assets/provatrim.mp4') //si converte cambiando l'estensione

console.log(req.query.input);
console.log(req.query.start);
console.log(req.query.end);

})


// conv
// .setStartTime(1)
// .setDuration(2)
// .on('start',(commandLine)=>{
//     console.log('command',commandLine);
// })
// .on('error',(err)=>{
//     console.log('err:',err);
// })
// .on('end',(err)=>{
//     if(!err)console.log('done');
// })
// .saveToFile('/savefile');
// // app.post('/trimmed',(req,res)=>{
// //     res.send()
// // })

app.listen(port,()=>{
    console.log('il server è connesso alla porta: ',port);
})