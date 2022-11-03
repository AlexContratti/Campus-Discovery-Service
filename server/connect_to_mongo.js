const { MongoClient } = require('mongodb');

class Database {
    constructor() {

    }

    async connect() {
        const uri = "mongodb+srv://AkashM12:MongoMaster69@cluster0.etwxzme.mongodb.net/?retryWrites=true&w=majority";
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await this.client.connect();

            //CALL ALL THE METHODS HERE IN MAIN WITH await <method>
            //FOR THE PARAMS U PASS IN CLIENT AND THE PARAMS IN JSON FORMAT (If its single param like a name just do a string)

        } catch (e) {
            console.error(e);

        } finally {
            // await this.client.close();
        }
    }

    async createEvent(newEvent) {
        const result = await this.client.db("campus_discovery").collection("events").insertOne(newEvent);

        console.log(`New event created with the following id: ${result.insertedId}`);
        return result;
    }

    async createUser(newUser) {
        const result = await this.client.db("campus_discovery").collection("users").insertOne(newUser);

        console.log(`New user created with the following id: ${result.insertedId}`);
        return result;
    }

    async getLogin({
        username = "user",
        password = "pass"
    } = {}) {
        const result = await this.client.db("campus_discovery").collection("users").findOne(
            {
                username: username,
                password: password
            });

        if (result) {
            console.log(`Found a user in the collection with the username ${username} or password ${password}:`);
            console.log(result);
            return true;
        } else {
            console.log(`No users found with the username ${username} or password ${password}`);
            return false;
        }
    }

    async getAllEvents() {
        const results = await this.client.db("campus_discovery").collection("events").find({})

        if (results.toArray().length > 0) {
            console.log("events found");
            return results;
        } else {
            console.log("no events found");
            return results;
        }
    }
    async getEvents(eventName) {
        const cursor = this.client.db("campus_discovery").collection("events").find(
            {name: eventName})
            .sort({ time: -1 });

        const results = await cursor.toArray();

        if (results.length > 0) {
            console.log(`events found with name ${eventName}`);
        } else {
            console.log(`no events found with name ${eventName}`);
        }
    }

    async getUser(username) {
        const result = await this.client.db("campus_discovery").collection("users").findOne({"username": username},
        {projection: {type: 1}})
        return result
    }

    async getUserInfo({
        username = "user",
        password = "pass"
    } = {}) {
        const result = await this.client.db("campus_discovery").collection("users").findOne(
            {
                username: username,
                password: password
            }, {name: 1, type: 1});

        if (result) {
            console.log(`Found a user's info in the collection with the username ${username} or password ${password}:`);
            console.log(result);
            return result;
        } else {
            console.log(`No user's info found with the username ${username} or password ${password}`);
            return result;
        }
    }

    async deleteEvent(eventName) {
        const result = await this.client.db("campus_discovery").collection("events")
                .deleteOne({ name: eventName });

        console.log(`${result.deletedCount} document(s) was/were deleted.`);
        return result;
    }

    async updateEvent(eventName, updates) {
        const result = await this.client.db("campus_discovery").collection("events").updateOne(
            {"name": eventName}, {$set: updates}
        )
        return result;
    }
}

module.exports = { Database };

// let db;

// (async function() {
//     db = new Database();
//     await db.connect();
//     console.log(await db.client.db("campus_discovery").collection("users").count())
//     setTimeout(db.getUserInfo, 5000);
// })()