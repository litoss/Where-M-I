/*
Promise is an object used for deferred and asynchronous computations. It represents an operation that has not completed yet, but is expected in the future.

asyncFunc()
  .then(value => { * success * })
  .catch(error => { * failure * })
  .finally( => { * cleanup *};
The then() method always returns a Promise, which enables us to chain method calls.

Note: the MongoClient's connect returns a promise if no callback is passed.
We can also use async/await syntax to work with promises.
*/


const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID; //serve per poter passare i parametri in name e price dentro ObjectID
const url = 'mongodb://localhost:27017';
//const url = 'mongodb://site181927:Aeho3ael@mongo_site181927';

//le prossime tre righe plus la funzione verify sono per fare la richiesta a Google per l'autenticazione dato il token dell'utente
const CLIENT_ID = "588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com"
const {OAuth2Client} = require('google-auth-library');
const client_user = new OAuth2Client(CLIENT_ID);

verify = async(token) => {

    const ticket = await client_user.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    payload['name'];
    payload['picture'];
    //console.log(userid);
    return userid;
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
}

exports.add_one = async (req) => { //creazione di un nuovo luogo

    var m_rating = 0; // alla creazione di un nuovo luogo settiamo la media a 0 dato non ci sono ancora recensioni
    var init_ncomment = 0; //alla creazione il numero dei commenti e' settato a zero
    try {
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });

//      useNewUrlParser => Determines whether or not to use the new url parser.
//Enables the new, spec-compliant, url parser shipped in the core driver.
//This url parser fixes a number of problems with the original parser, and aims to outright replace that parser in the near future.
//Defaults to true, and must be explicitly set to false to use the legacy url parser.
//    useUnifiedTopology => Enables the new unified topology layer
// Servono entrambi per poter eliminare il Warning fi deprecazione. In MongoDB e' stato riscritto il tool che viene usato per fare
//il parse del MongoDB connection strings.
        const db = client.db("webdb");

        /*  anche se non viene fatto un controllo di quello che viene passato dal client nel json quando si aggiunge nel
        DB viene creata la struttura e i parametri che non vengono inseriti nel json sono semplicemente settati a undefined ed
        eventualmente modificati nel futuro. */

/*{OLC : req.body.OLC};
Il controllo se l'utente puo' modificare il luogo se e' il creatore viene eseguito direttamente lato client, visto che viene eseguita
la richiesta di trovare il luogo prima di farela richiesta di creazione.
*/
        var query = {OLC : req.body.OLC};
        var exist = await db.collection('place').find(query).count() > 0; // aggiungendo il .count() > 0 ritorna true se e' presente nel database else false
        var veruser = await verify(req.body.token);

        if(exist == false){

            let doc = {_id: new ObjectID(),
                OLC: req.body.OLC,                  //codice location
                user: veruser,                      //nome user che crea il luogo
                name: req.body.name,                //nome del posto
                category: req.body.category,        // categoria del luogo(es. pizzeria, museo)
                media_rating: m_rating,             //media rating a zero alla creazione del luogo
                ncomment : init_ncomment,
                opening: req.body.opening,          // orari di apertura del luogo
                description: req.body.description,  // descrizione del luogo
                image: req.body.image

            };

            let ret = await db.collection('place').insertOne(doc);
            console.log("adding new place \n" + JSON.stringify(doc)) // display the inserted information
            client.close();
            return JSON.stringify(ret);
        }

        else{ //se il posto esiste allora vengono modificati i parametri che sono settati nel JSON
            var object2 = {};

                if (req.body.name){
                    object2.name = req.body.name;
                }
                if (req.body.category){
                    object2.category = req.body.category;
                }
                if (req.body.opening){
                    object2.opening = req.body.opening;
                }
                if (req.body.description){
                    object2.description = req.body.description;
                }
                if (req.body.image){
                    object2.image = req.body.image;
                }
            var new_values = {$set: object2};
            var ret_update = await db.collection('place').updateOne(query, new_values); //update with the parameter that are passed trought the body
            //console.log(ret_update.result);
            client.close();
            return (JSON.stringify(ret_update));
        }
    }
    catch (err) {
        return err;
    }
}

exports.del_one = async (req) => {
    try {
      let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
      const db = client.db("webdb");
      var veruser = await verify(req.body.token);
      var query = {$and: [{ OLC:req.body.OLC } , { user:veruser }]};
      var can = await db.collection('place').deleteOne(query);
      client.close();
      return(can);
    }
    catch (err) {
      return(err);
    }
}

exports.find_place = async(req) => { //ritorna il documento ricercato

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        /*
        inserendo la stringa append davanti al carattere ricercato significa che il $regret (che serve a ricercare il nome anche avendo il nome parziale)
        ricerchiamo il nome parziale ma deve essere nell'ordine che lo scriviamo, senza lui se cercassimo la lettera S troverebbe anche ad esempio la parola
        test anche se la S è al centro della parola, con append verrebbe fuori solo la parola Sam che ha la S davanti.
        */
        var append = '^';
        var expression = []; //la funzione find() ha bisogno di un array

        if (req.body.OLC){
            var str = req.body.OLC;
            //var n = str.substring(0, str.indexOf("0")); //ripuliamo OLC dagli zeri quando viene eseguita una ricerca per area
            var olc = append.concat(req.body.OLC);
            expression.push({OLC:{$regex:str,$options:'i'},});
        }
        if (req.body.token){
            var veruser = await verify(req.body.token);
            //console.log("veruser" + veruser);
            var utente = append.concat(veruser);
            expression.push({user:{$regex:utente}});
        }
        if (req.body.name){
            // var nome = append.concat(req.body.name);
            // expression.push({name:{$regex:nome}});
            expression.push({name:{$regex:req.body.name}});
        }
        if (req.body.category){
            var categoria = append.concat(req.body.category);
            expression.push({category:{$regex:categoria}});
        }
         if (req.body.media_rating){
            var m_rating = append.concat(req.body.media_rating);
            expression.push({media_rating:{$regex:m_rating}});
        }
        if (req.body.opening){
            var apertura = append.concat(req.body.opening);
            expression.push({opening:{$regex:apertura}});
        }

        var query;
            if(expression.length >  1){query = {$and:expression};}
            if(expression.length == 1){query = expression[0]}
        var items = await db.collection('place').find(query).project({_id:0}).toArray();
        client.close();
        return items;
    }
    catch(err){
        return err;
    }
}

//ritorna tutta la collezione place
exports.showdb_place = async () => {

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        let items = await db.collection('place').find().project({_id:0}).toArray();
        client.close();
        return items;
        }

    catch (err){

        throw err;
    }
}

//aggiunge una review alla collezione review
exports.add_review = async (req) => {

    //console.log("richiesta di aggiunta review:x " + JSON.stringify(req.body));
    //console.log('\n');

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        //check if exist the review of the user
        var olc = req.body.OLC;
        var veruser = await verify(req.body.token);

        var query = {$and: [{OLC:{$regex:olc}} , {user:{$regex:veruser}} ] };//controlla se esiste una recensione di questo utente di questo posto
        var exist = await db.collection('review').find(query).count() > 0; // aggiungendo il .count() > 0 ritorna true se e' presente nel database else false

      //if the OLC of this user is not in the DB create it
        //console.log("review user exist: " + exist);

        if(exist == false){
            var v_tag;
            if (req.body.visit_tag){

                v_tag = req.body.visit_tag;
            }
            else{
                v_tag = false;
            }

            let doc = {_id: new ObjectID(),
                        OLC: req.body.OLC,
                        user: veruser,
                        rating_place: req.body.rating_place,
                        visit_tag: v_tag,
                        comment: req.body.comment
                    }
            let ret_new = await db.collection('review').insertOne(doc);
            //console.log("review added");
            //console.log(ret_new.result);

        client.close();
        up_review(req);

            if (req.body.rating_place){
                up_star(req); //with the OLC we update the media of rating of the place
            }

            return ret_new;

        }
        else{ //if the OLC for the user is already inserted


            var object_body = {}; //create the object with the values to update

            if (req.body.rating_place){
                object.rating_place = req.body.rating_place;
            }
            if (req.body.visit_tag != undefined){
               object5.visit_tag = req.body.visit_tag;

            }
            if (req.body.comment){
                object.comment = req.body.comment;
            }

            var new_values = {$set: object_body};
            var ret_update = await db.collection('review').updateOne(query, new_values); //update with the parameter that are passed trought the body

              client.close(); //chiudiamo il client perche' ci pensa la funzione up_star a riaprire la comunicazione con il DB

                  up_review(req);

            if (req.body.rating_place){
                  up_star(req);
            }
            return ret_update;
        }
    }
    catch(err){
        //console.log(err);
        return (err);
    }
}

//eliminazione di un commento nella collezione review
exports.del_review = async (req) => {
    try {
      let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
      const db = client.db("webdb");
      var veruser = await verify(req.body.token);
      var query = {$and: [{ OLC:req.body.OLC } , { user:veruser }]};
      var can = await db.collection('review').deleteOne(query);
      client.close();
      up_star(req);//dopo l'eliminazione di una recensione deve essere riaggiornato la media rating
      return(can);
    }
    catch (err) {
      return(err);
    }
}

//ricerca delle recensioni collezione review
exports.find_review = async(req) => {
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        /*
        Con la funzione trovo:
        - tutte le recensioni di un posto dato un OLC.
        - tutte le recensioni di un utente dato il suo token
        - la recensione del OLC che cerco dato il token di un utente
        */
        var append = '^';
        var expression = [];

        if (req.body.OLC){
            var olc = append.concat(req.body.OLC);
            expression.push({OLC:{$regex:olc}});
        }

        if (req.body.token){
            var veruser = await verify(req.body.token);;
            expression.push({user:{$regex:veruser}});
        }
        var query;
            if(expression.length >  1){query = {$and:expression};}
            if(expression.length == 1){query = expression[0]}
        var items = await db.collection('review').find(query).project({_id:0}).toArray();
        client.close();
        return items;
    }
    catch(err){
        return err;
    }
}

//mostra il DB della collezione review
exports.showdb_review = async () => {

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        let items = await db.collection('review').find().toArray();
        client.close();
        return items;
        }
    catch (err){
        throw err;
    }
}

//drop di tutti i posti nella collezione place
exports.clear_place = async() => {
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        let items = await db.collection('place').drop();

        client.close();
        return items;

        }

    catch (err){

        throw err;
    }
}

//drop di tutte le recensioni nella collezione review
exports.clear_review = async() => {
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        let items = await db.collection('review').drop();

        client.close();
        return items;
        }

    catch (err){

        throw err;
    }
}

//aggiornamento della media rating del luogo all'aggiornamento del rating durnte una review
up_star = async(req) => {
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        var query = {OLC : req.body.OLC};
        var star = await db.collection('review').aggregate([{$match:query}, {"$group":{"_id":null, rating_place:{"$avg":"$rating_place"}}}]).toArray(); //rating_place deve essere un valore numerico
        var object = {};
        object.media_rating = star[0].rating_place
        var new_values = {$set : object};
        var rate_update_place = await db.collection('place').updateOne(query, new_values); //update with the parameter that are passed trought the body

            //console.log(JSON.stringify("rating_place totale aggiornato: " + star[0].rating_place));
            //console.log(rate_update_place.result);


        client.close();
        return ("rate place update: " + rate_update_place.result + "   rate audio update: " + rate_update_audio.result);
    }
    catch(err){
        return err;
    }
}

up_review = async(req) => {
    try{

        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        var query = {$and: [{OLC:{$regex:'.*' + escapeRegExp(olc) + '.*'}} , {comment:{$ne:null}} ]};
        var qplace = {OLC : req.body.OLC};
        console.log('prova')
        var rev_count = await db.collection('review').find(query).count();
        console.log(rev_count);
          var object6 = {};
          object.ncomment = rev_count;
          var new_values = {$set : object6};
          var comment_update_place = await db.collection('place').updateOne(qplace, new_values); //update with the parameter that are passed trought the body
          client.close();
          return(rev)
      }

    catch(err){
        return (err);
    }


}

//aggiunge un percorso preferito alla collezione route
exports.add_route = async(req) =>{
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        var veruser = await verify(req.body.token);
        //verifichiamo che se viene passato per l'update solo la route oppure solo il name se esistono
        //VIETATO PASSARE OLC, VA PASSATO
        var query = {$or:[{$and: [{ OLC : req.body.route[0] } , { user:veruser }]}, {$and: [{ namer : req.body.namer } , { user:veruser }]}]};
        var exist = await db.collection('routes').find(query).count() > 0; // aggiungendo il .count() > 0 ritorna true se e' presente nel database else false

        if(exist == false){
          let doc = {_id: new ObjectID(),
              OLC: req.body.route[0],
              route: req.body.route,
              namer: req.body.namer, //nome dall'utente del percorso preferito
              user:veruser
              /*se non si salva anche l'olc di partenza, quando si fa la find e si ricerca un OLC vengono
              visualizzati anche tutti i percorsi dove quest'ultimo e' una tappa*/
          };
          let ret = await db.collection('routes').insertOne(doc);
          client.close();
          return ret;
        }
        else{
          var object4 = {};
          if(req.body.route){
            object4.OLC = req.body.route[0];
            object4.route = req.body.route;
          }
          if(req.body.namer){
            object4.namer = req.body.namer;
          }
        var new_values = {$set: object4};
        var ret_update = await db.collection('routes').updateOne(query, new_values); //update with the parameter that are passed trought the body
        client.close();
        return (JSON.stringify(ret_update));
        }
    }
    catch(err){
      return (err);
    }



}

//eliminina un percorso preferito alla collezione route
//va passato l'array intero dei posti del percorso che si vuole eliminare
exports.del_route = async(req) =>{
    try{
      let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
      const db = client.db("webdb");
      var query;

      var veruser = await verify(req.body.token);
      if(req.body.route){
        query = {$and: [{ route : req.body.route } , { user:veruser }]};
      }
      else{
        query ={$and: [{ namer : req.body.namer } , { user:veruser }]};
      }
      var can = await db.collection('routes').deleteOne(query);
      client.close();
      return can;
    }
    catch(err){
      return (err);
    }
}

//trova un percorso preferito alla collezione route dato OLC
exports.find_route = async(req) =>{
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        var query;
        if(req.body.OLC){
          query =  {OLC : req.body.OLC};
        }
        if(req.body.token){
          var veruser = await verify(req.body.token);
          query =  {user:veruser};
        }
        if(req.body.namer){
          query = { namer : req.body.namer}
        }
        var items = await db.collection('routes').find(query).project({_id:0,OLC:0}).toArray();
        //facciamo la project anche di OLC che al client non serve, serve solo al server per fare la find

        client.close();
        return items;
    }
    catch(err){
      return (err);
    }
}

//aggiunge un utente e le relative preferenze alla collezione preferences
//nel caso l'utente esistesse gi' aggiorna le sue preferenze
exports.add_pref = async(req) =>{
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        var veruser = await verify(req.body.token);
        var query = {user : veruser};
        var exist = await db.collection('preferences').find(query).count() > 0; // aggiungendo il .count() > 0 ritorna true se e' presente nel database else false

        if(exist == false){
          let doc = {_id: new ObjectID(),
              user: veruser,
              categories: req.body.categories,
              audience: req.body.audience,
              language: req.body.language
              //se non si salva anche l'olc di partenza, quando si fa la find e si ricerca un OLC vengono
              //visualizzati anche tutti i percorsi dove quest'ultimo e' una tappa
          };
          let ret = await db.collection('preferences').insertOne(doc);
          client.close();
          return (JSON.stringify(ret));
        }else{
          var object3 = {};
            if(req.body.categories)
            {
              object3.category = req.body.categories;
            }
            if(req.body.audience)
            {
              object3.audience = req.body.audience;
            }
            if(req.body.language)
            {
              object3.language = req.body.language;
            }
          var new_values = {$set: object3};
          var ret_update = await db.collection('preferences').updateOne(query, new_values); //update with the parameter that are passed trought the body
          client.close();
          return (JSON.stringify(ret_update));
        }
    }
    catch(err){
      return (err);
    }
}

//trova le preferenze di un'utente dato il suo token
exports.find_pref = async(req) =>{
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        var id = req.body.id;
        //var veruser = await verify(req.body.token);

        var query = {user: id};
        var items = await db.collection('preferences').find(query).project({_id:0}).toArray();
        client.close();
        return items;
    }
    catch(err){
      return (err);
    }
}

// exports.find_pref = async(req) =>{
//     try{
//         let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
//         const db = client.db("webdb");
//         var veruser = await verify(req.body.token);
//
//         var query = {user: veruser};
//         var items = await db.collection('preferences').find(query).project({_id:0}).toArray();
//         client.close();
//         return items;
//     }
//     catch(err){
//       return (err);
//     }
// }

/*
DA FARE==>

1)FATTO
nuova Collezione Percorsi_> partenza da OLC e array di percorsi successivi
JSON
{[
["olc1","olc2","olc3","olc4"],
["olc1", "olc7"],
["olc1", "olc3", "olc2"]
]}
aggiunta percorso, rimozione e find

2) FATTO
Modifica dei valori della collezione luoghi

3)FATTO
controllo token username da google

4)FATTO
campo immagine, max JSON size in server.js

5)FATTO
Rimozione di un luogo tramite OLC dalla collezione place

6)FATTO
Aggiungere troncamento olc nel find

7)FATTO
nuova collezione preferenze
{
user:  ,
categories:  ,
audience:  ,
language:
}

8)FATTO
Ricerca Case-Insensitive dei places

9)FATTO
Possibilita' modifica route e aggiunta degli user

10)FATTO
Ricerca tramite user delle route

11)FATTO
richiesta nella verify dei dati dell'utente

12)aggiungo riga
*/
