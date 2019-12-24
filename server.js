

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

    console.log("requested: categorie.json");
    res.sendFile(__dirname+"/client/categorie.json");

});

app.post("/new_place", async (req, res) => { // aggiunta di un nuovo luogo

    try {

        let doc = await myModule.add_one(req);
        res.send(doc);

    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }
});

app.post("/new_review", async (req, res) =>{

try {

    let doc = await myModule.add_review(req);
    res.send(doc);

    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }

})


app.post("/find", async (req, res) => {

    try{

        var doc = await myModule.find(req);
        console.log(doc)
        res.send(JSON.stringify(doc));

    }
    catch(err){
        res.send(err);
    }

});

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

app.get("/list_review", async (req, res) => {

    try {

    let ret = await myModule.showdb_review();
    res.send(JSON.stringify(ret));
    }
    catch (err){
        res.send("errore nella stampa lista review")
    }
});

app.get("/drop_place", async (req, res) => {

    try {

    let ret = await myModule.clear_place();
    res.send(JSON.stringify(ret));
    }
    catch (err){
        res.send(err);
    }
});

app.get("/drop_review", async (req, res) => {

    try {

    let ret = await myModule.clear_review();
    res.send(JSON.stringify(ret));
    }
    catch (err){
        res.send(err);
    }
});

app.post("/star", async (req, res) => {

    try{
    let ret = await myModule.up_star(req);
    res.send(JSON.stringify(ret));

}
    catch (err){
        res.send(err);
    }


});

app.listen(port, () => console.log("Server started on port: " + port));
