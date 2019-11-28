

const express = require("express");
const app = express();
const port = 8000;
const myModule = require('./mongotest2.js');

app.use(express.urlencoded({extended : true}));
app.use(express.json());


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
        
    var loc_code = req.body.OLC; //codice location
    var utente = req.body.user; //nome utente che crea il luogo
    var loc_name = req.body.name; //nome del posto
    var loc_class = req.body.category; // categoria del luogo(es. pizzeria, museo)
    var m_rating = '0' //req.body.media_rating; //media rating a zero alla creazione del luogo
    var orario = req.body.opening; // orari di apertura del luogo
    var descrizione = req.body.description; // descrizione del luogo
    try {    
        
        let doc = await myModule.add_one(loc_code, utente, loc_name, loc_class, m_rating, orario, descrizione);
        console.log(doc);
        res.send(doc);
        
    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }
});

app.post("/new_review", async (req, res) =>{

var loc_code = req.body.OLC;
var utente = req.body.user; //nome utente che crea il luogo
var a_rating = req.body.rating_audio;
var p_rating = req.body.rating_place;
var v_tag = visit_tag;
var comm = comment;


try {    
        
        let doc = await myModule.add_review(loc_code, utente, a_rating, p_rating, v_tag, comm);
        console.log(doc);
        res.send(doc);
        
    } catch (err) { //catch the error if the database isn't connected
        res.send(err);
    }


})


app.post("/find", async (req, res) => {

    var loc_code = req.body.OLC;
    var utente = req.body.user;
    var loc_name = req.body.name;
    var loc_class = req.body.category;
    var m_rating = req.body.media_rating;
    var orario = req.body.opening;

    try{

            var doc = await myModule.find(loc_code, utente, loc_name, loc_class, m_rating, orario);
            console.log(doc)
            res.send(JSON.stringify(doc));
    
    }
    catch(err){
        res.send(err);
    }

});

app.get("/list_place", async (req, res) => {
    
    try {

    let ret = await myModule.showdb();
    var resend = JSON.stringify(ret);
    res.send(resend);
    }
    catch (err){
        res.send("errore nel get list")
    }
});




app.listen(port, () => console.log("Server started on port: " + port));
