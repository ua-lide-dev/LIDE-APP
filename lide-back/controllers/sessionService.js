const jwt = require("jsonwebtoken");

const privateKey = "privatekey";

exports.getSession =  (username) => {
    return  jwt.sign({ username: username }, privateKey);
}

exports.validateSession = (username, session) => {
    try {
        const decocdedSession =  jwt.verify(session, privateKey);
        return decocdedSession.username == username;
    } catch (error) {
        return false;
    }
}