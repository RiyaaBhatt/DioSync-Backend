const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(express.urlencoded({ extended: true }));
const { SET_GENERAL_SETTINGS, GET_GENERAL_SETTINGS } = require("../controllers/gensettings")
const { GET_MAIL_SETTINGS, SET_MAIL_SETTINGS } = require("../controllers/mailcontroller")

const router = express.Router()

router.patch("/general-settings", SET_GENERAL_SETTINGS)
router.get("/get-general-settings", GET_GENERAL_SETTINGS)
router.get("/email-settings", GET_MAIL_SETTINGS)
router.patch("/update-email-settings", SET_MAIL_SETTINGS)


module.exports = router;