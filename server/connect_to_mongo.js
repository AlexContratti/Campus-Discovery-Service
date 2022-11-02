const { MongoClient} = require('mongodb');

async function main() {
    const uri = "mongodb+srv://AkashM12:MongoMaster69@cluster0.etwxzme.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        //CALL ALL THE METHODS HERE IN MAIN WITH await <method>
        //FOR THE PARAMS U PASS IN CLIENT AND THE PARAMS IN JSON FORMAT (If its single param like a name just do a string)

    } catch (e) {
        console.error(e);

    } finally {
        await client.close();

    }
}

main().catch(console.error);

async function createEvent(client, newEvent) {
    const result = await client.db("campus_discovery").collection("events").insertOne(newEvent);

    console.log(`New event created with the following id: ${result.insertedId}`);
}

async function createUser(client, newUser) {
    const result = await client.db("campus_discovery").collection("users").insertOne(newUser);

    console.log(`New event created with the following id: ${result.insertedId}`);
}

async function getLogin(client, {
    username = "user",
    password = "pass"
} = {}) {
    const result = await client.db("campus_discovery").collection("users").findOne(
        {
            username: username,
            password: password
        });

    if (result) {
        console.log(`Found a user in the collection with the username ${username} or password ${password}:`);
        console.log(result);
    } else {
        console.log(`No users found with the username ${username} or password ${password}`);
    }
}

async function getEvents(client, eventName) {
    const cursor = client.db("campus_discovery").collection("events").find(
        {name: eventName})
        .sort({ time: -1 });

    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`events found with name ${eventName}`);
    } else {
        console.log(`no events found with name ${eventName}`);
    }
}

async function getUserInfo(client, {
    username = "user",
    password = "pass"
} = {}) {
    const result = await client.db("campus_discovery").collection("users").findOne(
        {
            username: username,
            password: password
        }, {name: 1, type: 1});

    if (result) {
        console.log(`Found a user's info in the collection with the username ${username} or password ${password}:`);
        console.log(result);
    } else {
        console.log(`No user's info found with the username ${username} or password ${password}`);
    }
}

async function deleteEvent(client, eventName) {
    const result = await client.db("campus_discovery").collection("events")
            .deleteOne({ name: eventName });

    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}