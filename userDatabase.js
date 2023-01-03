// User Database

const bcrypt = require("bcryptjs");

const userDatabase = {
  admin1: {
    id: "admin1",
    email: "admin1@gmail.com",
    password: bcrypt.hashSync("123", 10)
  },
  user1a: {
    id: "user1a",
    email: "user1a@gmail.com",
    password: bcrypt.hashSync("qwe", 10)
  }
};

module.exports = userDatabase;
