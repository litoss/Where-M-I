

const express = require("express");
const app = express();
const port = 8000;
const myModule = require('./mongo2.js');

app.use(express.urlencoded({extended : true}));
app.use(express.json({limit: '50mb'}));


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
app.post("/del_place", async (req, res) => {

    try {

        let doc = await myModule.del_one(req);
        res.send(JSON.stringify(doc));

    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }

});

//trova informazioni su posto collezione place
app.post("/find", async (req, res) => {

    try{

        let doc = await myModule.find(req);
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
        res.send(err);
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



app.listen(port, () => console.log("Server started on port: " + port));
