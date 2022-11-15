let username = "";
let password = "";
let type = "";
let namee = "";

const setUserName = async(usern) => {
    username = usern
    let response = ""
    const user = await fetch("http://localhost:3001/users", {
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
    
    localStorage.setItem("username", username)
    localStorage.setItem("name", namee)
    localStorage.setItem("type", type)
    console.log(localStorage.getItem("type"))
}

const getInfo = async() => {
    return [username, namee, type]
}

export {setUserName, getInfo}