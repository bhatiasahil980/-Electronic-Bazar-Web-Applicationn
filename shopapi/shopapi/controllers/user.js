const { SUCCESS, SERVER_ERROR, NOT_FOUND } =
  require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const userOperations = require("../db/services/user_crud");
const jwt = require('../utils/token')

const userController = {
  
  async show(request, response) {
    try {
      const doc = await userOperations.show(request.body.emailid);
      if (doc) {
        response
          .status(SUCCESS)
          .json({profile:doc});
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["login.invaliduser"]});
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["login.invaliduser"]});
    }
  },
  
  async login(request, response) {
    const user = request.body;
    try {
      const doc = await userOperations.login(user);
      if (doc) {
        // generate token
        let token = jwt.generateToken(user.email);
        response
          .status(SUCCESS)
          .json({ message: messageBundle["login.welcome"], name: doc.name, token:token });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["login.invaliduser"]});
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["login.invaliduser"]});
    }
    // response.send("U r on Login Section " + JSON.stringify(json));
  },
  register(request, response) {
    // response.send("U r on Register Section");
    let userObject = {
      emailid: request.body.email,
      password: request.body.pwd,
      name: request.body.name,
      billingAddress : request.body.billingAddress,
      delAddress : request.body.delAddress
    };
    const promise = userOperations.register(userObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["register.welcome"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["register.fail"],err });
      });
  },

  update(request, response) {
    var promise = "";
    if(request.body.key === "Address"){
      promise = userOperations.updateAddress(request.body.emailid,request.body.value);
    }
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["register.welcome"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["register.fail"],err });
      });
  },
};

module.exports = userController;
