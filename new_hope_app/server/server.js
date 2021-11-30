const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser")
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


const uri = `mongodb+srv://kmj908:Spring21@cluster0.drago.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


var conn;
client.connect(function (err, db) {
    if (err || !db) {
        console.log(err)
    } else {
        console.log("Successfully connected to MongoDB.");
        conn = db.db("newhope")
    }
});

app.post("/new_dog", function (req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var name = parsedReq.name;
    var age = parsedReq.age || 1;
    var breed = parsedReq.breed || "";
    var gender = parsedReq.gender || "";

    const newDocument = {
        name: name,
        age: age,
        breed: breed,
        gender: gender,
        status: 0
    };

    conn.collection('dogs')
        .insertOne(newDocument, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log(`Added a new match with id ${result.insertedId}`);
                res.status(204).send();
            }
        });
});

app.post("/new_staff", function (req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var lastName = parsedReq.lastName;
    var firstName = parsedReq.firstName;
    var phone = parsedReq.phone;

    const newDocument = {
        last_name: lastName,
        first_name: firstName,
        phone: phone,
    };

    conn.collection('staff')
        .insertOne(newDocument, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log(`Added a new match with id ${result.insertedId}`);
                res.status(204).send();
            }
        });

});


app.post("/new_homevisit", function (req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var dog = parsedReq.dog;
    var staff = parsedReq.staff;

    const newDocument = {
        dog: dog,
        staff: staff,
        status: 0,
    };

    conn.collection('homevisits')
        .insertOne(newDocument, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log(`Added a new match with id ${result.insertedId}`);
                res.status(204).send();
            }
        });

});

app.get("/dog_list", function (req, res) {
    conn.collection("dogs")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                console.log("error")
            } else {
                res.json(result)
            }
        })
});

app.get("/staff_list", function (req, res) {
    conn.collection("staff")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                console.log("error")
            } else {
                res.json(result)
            }
        })
});


app.get("/homevisit_list", function (req, res) {
    conn.collection("homevisits")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                console.log("error")
            } else {
                res.json(result)
            }
        })
});

app.put("/update_dog", function (req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var id = parsedReq.id;
    var name = parsedReq.name || "";
    var age = parsedReq.age || 1;
    var breed = parsedReq.breed || "";
    var gender = parsedReq.gender || "";
    var status = parsedReq.status || 0;

    const listingQuery = { _id: ObjectId(id) };
    const updates = {
        $set: {
            name: name,
            age: age,
            breed: breed,
            gender: gender,
            status: status,
        }
    };

    conn.collection("dogs")
        .updateOne(listingQuery, updates, function (err, _results) {
            if (err) {
                console.log("error")
            } else {
                console.log(_results)
                res.status(204).send();
            }
        })
});

app.put("/update_staff", function (req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var id = parsedReq.id;
    var lastName = parsedReq.lastName;
    var firstName = parsedReq.firstName;
    var phone = parsedReq.phone;

    const listingQuery = { _id: ObjectId(id) };
    const updates = {
        $set: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
        }
    };

    conn.collection("staff")
        .updateOne(listingQuery, updates, function (err, _results) {
            if (err) {
                console.log("error")
            } else {
                console.log(_results)
                res.status(204).send();
            }
        })

});

app.put("/update_homevisit", function (req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var id = parsedReq.id;
    var dog = parsedReq.dog;
    var staff = parsedReq.staff;
    var status = parsedReq.status;

    const listingQuery = { _id: ObjectId(id) };
    const updates = {
        $set: {
            dog: dog,
            staff: staff,
            status: status,
        }
    };

    conn.collection("homevisits")
        .updateOne(listingQuery, updates, function (err, _results) {
            if (err) {
                console.log("error")
            } else {
                console.log(_results)
                res.status(204).send();
            }
        })

});

app.delete("/delete_dog", function (req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var id = parsedReq.id;

    const listingQuery = { _id: ObjectId(id) };

    conn.collection("dogs")
        .deleteOne(listingQuery, function (err, _results) {
            if (err) {
                console.log("error")
            } else {
                console.log(_results)
                res.status(204).send();
            }
        })
});

app.delete("/delete_staff", function (req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var id = parsedReq.id;

    const listingQuery = { _id: ObjectId(id) };

    conn.collection("staff")
        .deleteOne(listingQuery, function (err, _results) {
            if (err) {
                console.log("error")
            } else {
                console.log(_results)
                res.status(204).send();
            }
        })

});

app.delete("/delete_homevisit", function (req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var id = parsedReq.id;

    const listingQuery = { _id: ObjectId(id) };


    conn.collection("homevisits")
        .deleteOne(listingQuery, function (err, _results) {
            if (err) {
                console.log("error")
            } else {
                console.log(_results)
                res.status(204).send();
            }
        })

});

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)