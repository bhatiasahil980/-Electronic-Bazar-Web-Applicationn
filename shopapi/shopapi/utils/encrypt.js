const bcrypt = require("bcrypt");
module.exports = {
  SALT: 10,
  // register time
  generateHash(pwd) {
    return bcrypt.hashSync(pwd, this.SALT);
  },
  // login time
  compareHash(dbPwd, plainPwd) {
    return bcrypt.compareSync(plainPwd, dbPwd);
  },
};
