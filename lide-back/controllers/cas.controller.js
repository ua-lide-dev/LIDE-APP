const axios = require('axios');
const jwt = require("jsonwebtoken");

exports.validate = (req, res) => {

    const validateURL = req.headers.validateurl;
   
    axios.get(validateURL)
        .then( (response) => {
        const sessionService = require("./sessionService");
          console.log(response)
          let reponse = response.data.serviceResponse;
          
          
          
          if(reponse.authenticationSuccess!=null){
            let username = reponse.authenticationSuccess.user;
            const session = sessionService.getSession(username);
            res.status(200)
            res.json({"username":username, "session":session})
         
            
          }else if(reponse.authenticationFailure!=null){
            res.send(401)
            res.send("error")
          }
          
     
        });
        
      
}


exports.getSession =  (username) => {
    return  jwt.sign({ username: username }, privateKey);
}