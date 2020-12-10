//const SessionService = require('../services/security/session.service');
const axios = require('axios');

const serverURL = process.env.VUE_APP_LIDE_WEB_URL;
const serverCAS = process.env.VUE_APP_CAS_URL;
const encoddedServerURL = encodeURIComponent(serverURL);

exports.session = async (req, res) => {
    let ticket = req.get("ticket");
    let casResponse = null;

    await axios.get(forgeValidate(ticket)).then((casRes) => {
        casResponse = casRes.data.serviceResponse;
    }).catch((error) => {
        console.log("error -> " + error);
        res.status(400).json(error);
    });

    let username = null;
    try {
        username = casResponse.authenticationSuccess.user;
    } catch (error) {
        username = "NOT_FOUND";
    }

    //let session = await SessionService.getSession(username);

    let response = {
        "username": username,
        "session": "unTokenDeSessionEnDur",
    }

    res.status(200).json(response);
};

function forgeValidate(ticket) {
    let validateURL = `${serverCAS}serviceValidate?format=JSON&service=${encoddedServerURL}&ticket=${ticket}`;
    return validateURL;
}