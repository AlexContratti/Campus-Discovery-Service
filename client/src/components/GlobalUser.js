let username = "";
let password = "";
let type = "";
let namee = "";

const setUserName = async(usern) => {
    username = usern
    let response = ""
    const user = await fetch("/users", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: usern,
        })
    }).then(res => res.json()).then(data => response = data)

    console.log(user)

    password = user.password
    type = user.type
    namee = user.name
    
    console.log(namee + " " + type)
}

const getInfo = async() => {
    return [username, namee, type]
}

export {setUserName, getInfo}