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

const SET_GENERAL_SETTINGS = async (req, res) => {
  console.log(req.body);
  try {
    const { support_name, support_email, address, phone_number, android_version, ios_version, site_title, copyright_text, date_format } = req.body;

    console.log(req.body);

    await db.promise().query(
      "update generalsettings set support_name=?,support_email=?,address=?,phone_number=?,android_version=?,ios_version=?,site_title=?,copyright_text=?,date_format=?",
      [support_name, support_email, address, phone_number, android_version, ios_version, site_title, copyright_text, date_format]
    );
    res.status(200).json({
      message: "settings Updated successfully",
      data: {
        support_name, support_email, address, phone_number, android_version, ios_version, site_title, copyright_text, date_format
      }
    });
  } catch (err) {
    console.log("error happning", err);
  }

}
const GET_GENERAL_SETTINGS = async (req, res) => {
  console.log("get gen settings");
  const gensettings = db.query("select * from generalsettings", (err, result) => {
    if (err) {
      res.status(201).json({
        message: "error"
      });
    } else {
      res.status(200).json({
        message: "settings Updated successfully",
        data: result[0]
      });
    }
  })
}
module.exports = {
  SET_GENERAL_SETTINGS,
  GET_GENERAL_SETTINGS
};
