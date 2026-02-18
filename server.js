const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const LINE_TOKEN = "ใส่ Channel Access Token ตรงนี้";

app.post("/webhook", async (req, res) => {
  const event = req.body.events[0];

  // ✅ กัน error ถ้าไม่ใช่ข้อความ
  if (!event || event.type !== "message" || event.message.type !== "text") {
    return res.sendStatus(200);
  }

  const msg = event.message.text;
  const replyText = `ได้รับข้อความ: ${msg}`;

  try {
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
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("running"));
