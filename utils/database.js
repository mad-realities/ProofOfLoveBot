const fs = require('fs');

const userJsonFilePath = "./data/users.json"


function isUserRegistered(discordId) {
    const json = getUserJson()
    const users = json["users"]
    return users.includes(discordId)
}

function registerUser(discordId) {
    let json = getUserJson()
    const users = json["users"]
    users.push(discordId)
    json["users"] = users
    writeUserJson(json)
}

function deleteUser(discordId) {
    let json = getUserJson()
    const users = json["users"]
    const index = users.indexOf(discordId);
    if (index > -1) {
        users.splice(index, 1);
    }
    json["users"] = users
    writeUserJson(json)
}

function getUserJson() {
    try {
        const rawdata = fs.readFileSync(userJsonFilePath);
        const json = JSON.parse(rawdata);
        return json
    } catch {
        return { users: [] }
    }
}

function writeUserJson(json) {
    let data = JSON.stringify(json);
    fs.writeFileSync(userJsonFilePath, data);
}

module.exports = {
    registerUser, isUserRegistered, deleteUser
}