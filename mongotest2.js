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
/*const url = 'mongodb://localhost:8000';
*/
const url = 'mongodb://localhost:27017';

exports.add_one = async (loc_code, utente, loc_name, loc_class, m_rating, orario, descrizione ) => {
    try {
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");
        let doc = {_id: new ObjectID(),
            OLC: loc_code,
            user: utente,
            name: loc_name,
            category: loc_class,
            media_rating: m_rating,
            opening: orario,
            description: descrizione
         };

        let ret = await db.collection('place').insertOne(doc);
        console.log(doc) // display the inserted information
        client.close();
        return ret;

        }
    catch (err) {
        throw err;
    }
}


exports.add_review = async (loc_code, utente, a_rating, p_rating, v_tag, comm) => {
    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        let doc = {_id: new ObjectID(),
            OLC: loc_code,
            user: utente,
            rating_audio: a_rating,
            rating_place: p_rating,
            visit_tag: v_tag,
            comment: comm
         };

        let ret = await db.collection('review').insertOne(doc);
        console.log(doc) // display the inserted information
        client.close();
        return ret;

    }
    catch(err){
        throw err;
    }



/* QUANDO SI FA AGGIUNTA DI REVIEW BISOGNA FARE L'UPDATE
DELLA MEDIA DELLE RECENZIONI NELLA COLLEZIONE PLACE  */


}

exports.find = async(olc, utente, nome, categoria, media_rating, orario) => { //ritorna il documento ricercato

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        /*
        inserendo la stringa append davanti al carattere ricercato significa che il $regret (che serve a ricercare il nome anche avendo il nome parziale)
        ricerchiamo il nome parziale ma deve essere nell-ordine che lo scriviamo, senza lui se cercassimo la lettera S troverebbe anche ad esempio la parola
        test anche se la S è al centro della parola, con append verrebbe fuori solo la parola Sam che ha la S davanti.
        */

        var append = '^';
        var _olc = append.concat(olc);
        var _utente = append.concat(utente);
        var _nome = append.concat(nome);
        var _categoria = append.concat(categoria);

        /* var append = '^';
        var _media_rating = append.concat(media_rating);
 */

        var query = {
            $and:[
                {OLC:{$regex:_olc}},
                {user:{$regex:_utente, $options:'i'}},
                {name:{$regex:_nome, $options:'i'}},
                {category:{$regex:_categoria, $options:'i'}},
                //{m_rating:{$regex:media_rating}},
                //{opening:{$regex:orario}}
            ]};/* $options:'i' serve ad annulare il Case Sensitive del regex */

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

exports.update_one = async(/* DA INSERIRE I VALORI DELLLA QUERY CHE VOGLIAMO CAMBIARE, */new_values) => {

    try{
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        const db = client.db("webdb");

        var query = {  /* DA DECIDERE I VALORI DELLA QUERY DA PASSARE NELLA FUNZIONE, COME RICERCARE I PARAMETRI DA CAMBIARE */ };


        var items = await db.collection('review').updateOne(query, new_values);

        client.close();

    }
    catch{

    }

}


exports.showdb = async () => {

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




































/*
exports.showdb = function(ret){

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  }, (err, client) => {

        const db = client.db("webdb");

        db.collection('cars').find().toArray((err,items) => {
            console.log(items);
            ret(items);
        })

    })
}
*/

function list_coll()
{

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  }, (err, client) =>
    {

        if (err) throw err;

        const db = client.db("webdb");

        db.listCollections().toArray().then((docs) =>
        {
            console.log('Available collections:');
            docs.forEach((doc, idx, array) => { console.log(doc.name) });
        })

        .catch((err) =>
        {
          console.log(err);
        })

        .finally(() =>
        {
            client.close();
        });

    });
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

function update_one(coll, nome, prezzo)
{

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) =>
    {

        if (err) throw err;

        const db = client.db("webdb");

        let filQuery = { name: nome };
        let updateQuery = { $set: { "price": prezzo }};

        db.collection(coll).updateOne(filQuery, updateQuery).then(result =>
            {
                console.log('Car updated');
                console.log(result);

        })

        .catch((err) =>
        {
            console.log(err);
        })

        .finally(() =>
        {
            client.close();
        });
    });
}


function find_one(coll, nome) //return a document
{
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) =>
    {

        if (err) throw err;

        const db = client.db("webdb");

        let collection = db.collection(coll);
        let query = { name: nome }

        collection.findOne(query).then(doc =>
        {
            console.log(doc);
        })

        .catch((err) =>
        {
            console.log(err);
        })

        .finally(() =>
        {
            client.close();
        });
    });
}

function find(coll, nome, pippo) //return a collection
{
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) =>
    {

        if (err) throw err;

        const db = client.db("webdb");


        db.collection(coll).find({}).project({_id: 0}).toArray().then((docs) => //.project serve ad escludere l'id dall'output
        {
            console.log(docs);


        })

        .catch((err) =>
        {
            console.log(err);
        })

        .finally(() =>
        {
            client.close();
        });
    });
}



function find_with_regular_expression(coll, nome)
{
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) =>
    {

        if (err) throw err;

        const db = client.db("webdb");

        let collection = db.collection(coll);
        let query = { name: nome }

        collection.findOne(query).then(doc =>
        {
            console.log(doc);
        })

        .catch((err) =>
        {
            console.log(err);
        })

        .finally(() =>
        {
            client.close();
        });
    });

}







//find_with_regular_expression("cars", /^A/); //trova tutti i nomi che iniziano per A
//update_one("cars", "audi", 50);
//remove_one("cars", "scemo");
//add_one("test1", 10);
//add_many();
//find_one("cars", "scemo"); //return a document
//find("cars", "scemo"); //return a collection
// list_coll();
