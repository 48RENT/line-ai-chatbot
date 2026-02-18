const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const LINE_TOKEN = "ใส่ Channel Access Token ตรงนี้";

app.post("/webhook", async (req, res) => {
  const event = req.body.events[0];
  const msg = event.message.text;

  const replyText = `ได้รับข้อความ: ${msg}`;

  await axios.post(
    "https://api.line.me/v2/bot/message/reply",
    {
      replyToken: event.replyToken,
      messages: [{ type: "text", text: replyText }]
    },
    {
      headers: { Authorization: `Bearer ${LINE_TOKEN}` }
    }
  );

  res.sendStatus(200);
});

app.listen(3000, () => console.log("running"));
