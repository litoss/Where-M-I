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

//modifica per provare il git di simone

const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID; //serve per poter passare i parametri in name e price dentro ObjectID
const url = 'mongodb://localhost:27017';
//const url = 'mongodb://site181927:Aeho3ael@mongo_site181927';

//le prossime due righe plus la funzione verify sono per fare la richiesta a Google per l'autenticazione dato il token dell'utente

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
    return userid;
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

  }

exports.add_one = async (req) => { //creazione di un nuovo luogo

    var m_rating = 0; // alla creazione di un nuovo luogo settiamo la media a 0 dato non ci sono ancora recensioni

    try {
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        /*  anche se non viene fatto un controllo di quello che viene passato dal client nel json quando si aggiunge nel
        DB viene creata la struttura e i parametri che non vengono inseriti nel json sono semplicemente settati a undefined ed
        eventualmente modificati nel futuro. */

        var query = {OLC : req.body.OLC};
        var exist = await db.collection('place').find(query).count() > 0; // aggiungendo il .count() > 0 ritorna true se e' presente nel database else false


        var veruser = verify(req.body.token);


        if(exist == false){

            let doc = {_id: new ObjectID(),
                OLC: req.body.OLC,                  //codice location
                user: veruser,                //nome user che crea il luogo
                name: req.body.name,                //nome del posto
                category: req.body.category,        // categoria del luogo(es. pizzeria, museo)
                media_rating: m_rating,             //media rating a zero alla creazione del luogo
                opening: req.body.opening,          // orari di apertura del luogo
                description: req.body.description,   // descrizione del luogo
                image: req.body.image
            };

            let ret = await db.collection('place').insertOne(doc);
            console.log("adding new place \n" + JSON.stringify(doc)) // display the inserted information
            client.close();
            return JSON.stringify(ret);
        }


        else{ //se il posto esiste allora vengono modificati i parametri che sono settati nel JSON

            var object2 = {};

                if (req.body.name && req.body.name != '' ){
                    object2.name = req.body.name;

                }
                if (req.body.category && req.body.category != '' ){
                    object2.category = req.body.category;

                }
                if (req.body.opening && req.body.opening != '' ){
                    object2.opening = req.body.opening;

                }
                if (req.body.description && req.body.description != '' ){
                    object2.description = req.body.description;
                }
                if (req.body.image && req.body.image != '' ){
                    object2.image = req.body.image;
                }
            var new_values = {$set: object2};
            var ret_update = await db.collection('place').updateOne(query, new_values); //update with the parameter that are passed trought the body
            console.log(ret_update.result);
            client.close();
            return (JSON.stringify(ret_update));

        }
    }
    catch (err) {
        throw err;
    }
}


exports.add_review = async (req) => {

    console.log("richiesta di aggiunta review:x " + JSON.stringify(req.body));
    console.log('\n');

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        //check if exist the review of the user
        var olc = req.body.OLC;
        var veruser = verify(req.body.token);


        var query = {$and: [{OLC:{$regex:olc}} , {user:{$regex:veruser}} ] };

        var exist = await db.collection('review').find(query).count() > 0; // aggiungendo il .count() > 0 ritorna true se e' presente nel database else false

        //if the OLC of this user is not in the DB create it

        console.log("review user exist: " + exist);

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
                        rating_audio: req.body.rating_audio,
                        rating_place: req.body.rating_place,
                        visit_tag: v_tag,
                        comment: req.body.comment
                    }
            let ret_new = await db.collection('review').insertOne(doc);
            console.log("review added");
            console.log(ret_new.result);

        client.close();

        if (req.body.rating_place || req.body.rating_audio){

            up_star(req); //with the OLC we update the media of rating of the place
        }

        return ret_new;

        }
        else{ //if the OLC for the user is already inserted


            var object_body = {}; //create the object with the values to update

            if (req.body.rating_audio && req.body.rating_audio != '' ){
                object.rating_audio = req.body.rating_audio

            }
            if (req.body.rating_place && req.body.rating_place != '' ){
                object.rating_place = req.body.rating_place;

            }
            if (req.body.visit_tag && req.body.visit_tag != '' ){
               object.visit_tag = req.body.visit_tag;

            }
            if (req.body.comment && req.body.comment != '' ){
                object.comment = req.body.comment;
            }

            var new_values = {$set: object_body};
            var ret_update = await db.collection('review').updateOne(query, new_values); //update with the parameter that are passed trought the body

            client.close();


            return ret_update;

        }

    }
    catch(err){
        console.log(err);
        throw err;
    }



}



//exports.find = async(olc, utente, nome, categoria, media_rating, orario) => { //ritorna il documento ricercato
exports.find = async(req) => { //ritorna il documento ricercato

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        /*
        inserendo la stringa append davanti al carattere ricercato significa che il $regret (che serve a ricercare il nome anche avendo il nome parziale)
        ricerchiamo il nome parziale ma deve essere nell-ordine che lo scriviamo, senza lui se cercassimo la lettera S troverebbe anche ad esempio la parola
        test anche se la S è al centro della parola, con append verrebbe fuori solo la parola Sam che ha la S davanti.
        */

        var append = '^';
        var expression = [];



        if (req.body.OLC){
            var olc = append.concat(req.body.OLC);
            expression.push({OLC:{$regex:olc}});
        }
        if (req.body.token){
            var veruser = verify(req.body.token);
            var utente = append.concat(veruser);
            expression.push({user:{$regex:utente}});
        }
        if (req.body.name){
            var nome = append.concat(req.body.name);
            expression.push({name:{$regex:nome}});
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


exports.exist_one = async(olc) => { //ritorna true se il codice luogo esiste nella collezione place

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        var query = {OLC : olc}

        var items = await db.collection('place').find(query).count() > 0; // aggiungendo il .count() > 0 ritorna true se e' presente nel database else false
        client.close();

        return items;

    }
    catch(err){
        return err;

    }
}

/* exports.update_one = async(/* DA INSERIRE I VALORI DELLLA QUERY CHE VOGLIAMO CAMBIARE, new_values) => {

    //per UPDATE.ONE olc e user sono standard e arrivano per forza, if su i 2 rating e visit e comment e semplicemente sovrascrivo

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        var query = {  // DA DECIDERE I VALORI DELLA QUERY DA PASSARE NELLA FUNZIONE, COME RICERCARE I PARAMETRI DA CAMBIARE
                        };


        var items = await db.collection('review').updateOne(query, new_values);

        client.close();

    }
    catch(err){
        return err;

    }

}
 */

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

exports.showdb_review = async () => {

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
       // let items = await db.collection('review').find().project({_id:0}).toArray();
       let items = await db.collection('review').find().toArray();
        client.close();
        return items;

        }

    catch (err){

        throw err;
    }
}

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








up_star = async(req) => {

    try{
        console.log('\n');

        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        var query = {OLC : req.body.OLC};

        if(req.body.rating_place){
            var star = await db.collection('review').aggregate([{$match:query}, {"$group":{"_id":null, rating_place:{"$avg":"$rating_place"}}}]).toArray(); //rating_place deve essere un valore numerico

            var object = {};
            object.media_rating = star[0].rating_place
            var new_values = {$set : object};

            var rate_update_place = await db.collection('place').updateOne(query, new_values); //update with the parameter that are passed trought the body

            console.log(JSON.stringify("rating_place totale aggiornato: " + star[0].rating_place));
            console.log(rate_update_place.result);
        }

        if(req.body.rating_audio){
            var star1 = await db.collection('review').aggregate([{$match:query}, {"$group":{"_id":null, rating_audio:{"$avg":"$rating_audio"}}}]).toArray(); //rating_place deve essere un valore numerico

            var object1 = {};
            object1.media_rating = star[0].rating_audio
            var new_values1 = {$set : object1};

            var rate_update_audio = await db.collection('place').updateOne(query, new_values1); //update with the parameter that are passed trought the body

            console.log(JSON.stringify("rating_place totale aggiornato: " + star1[0].rating_audio));
            console.log(rate_update_audio.result);
        }


        client.close();

        return ("rate place update: " + rate_update_place.result + "   rate audio update: " + rate_update_audio.result);


    }
    catch(err){
        return err;
    }
}








function remove_one(coll , nome)
{
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

        if (err) throw err;

        const db = client.db("wedb");

        let query = { name: nome , price: 10};

        db.collection(coll).deleteOne(query).then((result) => {

            console.log('Car deleted');
            console.log(result);
        }).catch((err) => {

            console.log(err);
        }).finally(() => {

            client.close();
        });
    });
}



/*

Nuove Collezioni:


1)
Percorsi_>
partenza da OLC e array di percorsi successivi

JSON
{[
[olc:1,olc:2,olc:3,olc:4],
[olc1:, olc:7],
[olc:1, olc:3, olc:2]
]}

2) FATTO
Modifica dei valori della collezzione luoghi

3)FATTO
controllo token username da google

4)BHO SENTI STE
campo immagine



*/
