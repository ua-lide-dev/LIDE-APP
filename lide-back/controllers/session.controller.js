const SessionService = require('../services/security/session.service');
const axios = require('axios');

const serverURL = process.env.VUE_APP_LIDE_WEB_URL;
const serverCAS = process.env.VUE_APP_CAS_URL;
const encoddedServerURL = encodeURIComponent(serverURL);

exports.session = async (req, res) => {
  const ticket = req.get('ticket');
  let casResponse = null;

  await axios.get(forgeValidate(ticket)).then((casRes) => {
    casResponse = casRes.data.serviceResponse;
  }).catch((error) => {
    console.log('Error during cas validation : ' + error);
    res.status(401).json(error);
  });

  let username = null;
  try {
    username = casResponse.authenticationSuccess.user;
  } catch (error) {
    console.log('error -> ' + error);
    res.status(401).json(error);
  }

  const session = await SessionService.getSession(username);

  const response = {
    username: username,
    session: session,
  };

  res.status(200).json(response);
};


exports.validateSession = async (req, res) => {
  const token = req.headers.session;

  console.log("TOKEN : " + token);

  if(!SessionService.validateSession(token)){
    res.status(401).json("pas ok");
  }

  res.status(200).json("ok");
};


/**
 *
 * @param {string} ticket
 * @return {string} validateUrl
 *
 */
function forgeValidate(ticket) {
  const validateURL = `${serverCAS}serviceValidate?format=JSON&service=${encoddedServerURL}&ticket=${ticket}`;
  return validateURL;
}
