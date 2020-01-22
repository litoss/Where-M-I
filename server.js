const express = require("express");
const app = express();
var redirect = require('express-http-to-https').redirectToHTTPS
const port = 8000;
const myModule = require('./mongo2.js');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
var ytdl = require('ytdl-core');
const {Readable} = require('stream');
ffmpeg.setFfmpegPath(ffmpegPath);

app.use(redirect([/localhost:8000/]));
app.use(express.urlencoded({extended : true}));
app.use(express.json({limit: '16mb'}));

app.use('/', express.static(__dirname + '/client'));
app.use((req,res,next) => {
    res.setHeader("Acces-Control-Allow-Origin", '*');
    res.setHeader("Acces-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    res.setHeader("Acces-Control-Allow-Methods", "GET, POST");
    next();
});

app.get("/categorie", function (req, res) { //richiesta del json con le categorie

    //console.log("requested: categorie.json");
    res.sendFile(__dirname+"/client/categorie.json");

});

// aggiunta di un nuovo luogo collezione place
app.post("/new_place", async (req, res) => {

    try {

        let doc = await myModule.add_one(req);
        res.send(JSON.stringify(doc));

    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }
});

//elimina un posto nella collezione place
//bisogna passare OLC e token dell'utente che lo ha creato
app.post("/del_place", async (req, res) => {

    try {
        let doc = await myModule.del_one(req);
        res.send(JSON.stringify(doc));

    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }

});

//trova informazioni su posto collezione place
//se voglio ricevere tutti gli oggetti, mi basta passare ad esempio category:"", una stringa vuota
app.post("/find_place", async (req, res) => {

    try{

        let doc = await myModule.find_place(req);
        res.send(JSON.stringify(doc));
    }
    catch(err){
        res.send(err);
    }
});

//mostra DB collezione place
app.get("/list_place", async (req, res) => {

    try {

    let ret = await myModule.showdb_place();
    var resend = JSON.stringify(ret);
    res.send(resend);
    }
    catch (err){
        res.send("errore nella stampa della lista place")
    }
});

//drop totale collezione place
app.get("/drop_place", async (req, res) => {

    try {

    let ret = await myModule.clear_place();
    res.send(JSON.stringify(ret));
    }
    catch (err){
        res.send(JSON.stringify(err));
    }
});

//creazione nuova recensione collezione review
app.post("/new_review", async (req, res) =>{
try {

    let doc = await myModule.add_review(req);
    res.send(doc);

    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }

})

//trova informazioni su recensioni dato luogo collezione review
app.post("/find_review", async (req, res) => {

    try{
        let doc = await myModule.find_review(req);
        res.send(JSON.stringify(doc));
    }
    catch(err){
        res.send(err);
    }
});

//mostra DB collezione review
app.get("/list_review", async (req, res) => {

    try {

    let ret = await myModule.showdb_review();
    res.send(JSON.stringify(ret));
    }
    catch (err){
        res.send("errore nella stampa lista review")
    }
});

//drop totale collezione review
app.get("/drop_review", async (req, res) => {

    try {

    let ret = await myModule.clear_review();
    res.send(JSON.stringify(ret));
    }
    catch (err){
        res.send(err);
    }
});

// aggiunta di un nuovo percorso alla collezione route
//bisogna passare array percorso e token user che lo sta creando
//{"route":["olc1","olc2","olc3","olc4"], "namer":"nome posto"}
//
//VIETATO PASSARE OLC, VA PASSATO ARRAY DEI LUOGHI RICERCATI
/*
Con questa funzione possiamo sia creare che modificare i percorsi.
Se non e' presente un percorso (passandogli array luoghi e user oppure namer e user) viene aggiunto.
se invece è presente vengono modificati i valori dell'array del percorso oppure il nome del percorso.
*/
app.post("/new_route", async (req, res) => {

    try {
        let doc = await myModule.add_route(req);
        res.send(JSON.stringify(doc));
    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }
});

// aggiunta di un nuovo percorso alla collezione route
//va passato l'array intero dei posti del percorso che si vuole eliminare e token user che lo ha creato
//{route:["olc1","olc2","olc3","olc4"]}
//VIETATO PASSARE OLC, VA PASSATO ARRAY DEI LUOGHI RICERCATI o NAMER
/*
L'eliminazione va sempre effettuata passando il token dell'utente, solo l'owner puo' eliminare il suo percorso.
In piu' passiamo o il campo route(passandogli l'array con l'esatto percorso), oppure il nome del percorso che gli abbiamo assegnato.
*/
app.post("/del_route", async (req, res) => {

    try {
        let doc = await myModule.del_route(req);
        res.send(JSON.stringify(doc));
    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }
});

//trova percorsi predefiniti dato luogo collezione routes
//passare: OLC:"OLC ricercato"
//{"OLC":"FHOLC888"}
/*
La richiesta viene effettuata con:
1) OLC se si ha bisogno di tutti i percorsi in partenza da quel luogo.
2) token dell'utente se si ha bisogno di tutti i percorsi creati dall'utente.
3) namer se abbiamo bisogno di ricercare un percorso in particolare e sappiamo il nome assegnatogli dall'utente.
Passare solo uno dei 3 ricercati non 2 insieme alla volta, va fatta una richiesta alla volta per ognuno
se servono piu' informazioni.
*/
app.post("/find_route", async (req, res) => {

    try{
        let doc = await myModule.find_route(req);
        res.send(JSON.stringify(doc));
    }
    catch(err){
        res.send(err);
    }
});

// aggiunta di un nuovo utente alla collezione preferences
// se l'utente esiste gia' vengono aggiornati i valori delle preferenze
app.post("/add_preference", async (req, res) => {

    try {
        let doc = await myModule.add_pref(req);
        res.send(JSON.stringify(doc));
    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }
});

// trova preferenze utente nella collezione preferences
// passare il token utente: token: "*********"
app.post("/find_preference", async (req, res) => {

    try {
        let doc = await myModule.find_pref(req);
        res.send(JSON.stringify(doc));
    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }
});

// Genera un video dato un'audio passato come parametro, utilizzando un immagine di sfondo unica per tutti i video,
// viene ritornata al chiamante
app.post('/audio_to_video', async (req,res)=>{

  var buffer = Buffer.from(req.body.chunks, 'base64');
  var readable = new Readable();
  readable._read = () => {}
  readable.push(buffer);
  readable.push(null)

  var command = ffmpeg('/webapp/youtube.jpg')
  //var command = ffmpeg('youtube.jpg')
    .fps(1)
    .size('1920x1080')
    .addInput(readable)
    .format('webm');

  var ffstream = await command.pipe();
  var chunks = [];
  ffstream.on('data', function(chunk) {
    chunks.push(chunk);
  });
  ffstream.on('end', function() {
    var result = Buffer.concat(chunks);
    res.send(result.toString('base64'));
  });
});

//Permette di apportare delle modifiche all'audio passato come paramentro e successivamente ritorna l'audio modificato
//al chiamante
app.post('/modify_video', async (req,res)=>{
    var buffer = Buffer.from(req.body.chunks, 'base64');
    var readable = new Readable();
    readable._read = () => {}
    readable.push(buffer);
    readable.push(null)

    var command = ffmpeg(readable)
      .format('webm')
      .setStartTime(req.body.start)
      .setDuration(req.body.end-req.body.start)
      .audioFilters('volume=' + (req.body.volume/10))
      .on('end', function() {
        console.log('file has been modified succesfully');
      })
      .on('error', function(err) {
        console.log('an error happened: ' + err.message);
      });

    var ffstream = command.pipe();
    var chunks = [];
    ffstream.on('data', function(chunk) {
      chunks.push(chunk);
    });
    ffstream.on('end', function() {
      var result = Buffer.concat(chunks);
      res.send(result.toString('base64'));
    });
  });

//permette di scaricare un video da youtube (in questo caso solo audio poichè viene applicato il filtro 'audioonly')
//inoltre tramite l'ausilio di fluent-ffmpeg questo viene convertito in formato webm
  app.post('/audio_from_yt', async (req,res)=>{
    var id = req.body.id;
     console.log(id);
    res.setHeader('Content-disposition', 'attachment; filename=test.pdf');
    res.set('Content-Type', 'application/json');
    var yta = ytdl('https://www.youtube.com/watch?v='+id,{filter:"audioonly"});

    var command = ffmpeg()
    .input(yta)
    .format('webm'); //da provare come weba

    var ffstream = command.pipe();
    var chunks = [];
    ffstream.on('data', function(chunk) {
      chunks.push(chunk);
    });
    ffstream.on('end', function() {
      var result = Buffer.concat(chunks);
      res.send(result.toString('base64'));
    });
  });

app.listen(port, () => console.log("Server started on port: " + port));
