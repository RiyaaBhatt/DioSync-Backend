const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))


app.use(express.urlencoded({ extended: true }));

const db = require("../db");

let query = "CREATE TABLE mailsettings (mail_username varchar(100) , mail_password varchar(100),mail_driver varchar(100),mail_host varchar(100),mail_port varchar(100),from_email varchar(100))"
// query = "insert into mailsettings value('a','a','a','a','a','a')"
// db.query(query)


const SET_MAIL_SETTINGS = async (req, res) => {
  console.log(req.body);
  try {
    const { mail_username, mail_password, mail_driver, mail_host, mail_port, from_email } = req.body;

    console.log(req.body);

    await db.promise().query(
      "update mailsettings set mail_username=?, mail_password=?, mail_driver=?, mail_host=?, mail_port=?, from_email=?",
      [mail_username, mail_password, mail_driver, mail_host, mail_port, from_email]
    );
    res.status(200).json({
      message: "mail settings Updated successfully",
      data: req.body
    });
  } catch (err) {
    console.log("error happning", err);
  }

}
const GET_MAIL_SETTINGS = async (req, res) => {
  // console.log("get mail settings");
  const gensettings = db.query("select * from mailsettings", (err, result) => {
    if (err) {
      res.status(201).json({
        message: "error"
      });
    } else {
      console.log(result);
      res.status(200).json({
        message: "settings send successfully",
        data: result[0]
      });
    }
  })
}
module.exports = {
  GET_MAIL_SETTINGS,
  SET_MAIL_SETTINGS
};
