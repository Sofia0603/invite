import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/send-form", async (req, res) => {
  const { fullName, presence, transfer, kitchenPreference, alcoholPreferences, allergy } = req.body;

  if (!fullName || !presence) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const message = `
    *Новая заявка с сайта:*
    
    Имя и фамилия:
    ${fullName}
    
    Формат присутствия:
    ${presence}
    
    Трансфер:
    ${transfer || "-"}
    
    Предпочтения по кухне:
    ${kitchenPreference}
    
    Алкоголь:
    ${alcoholPreferences.join(", ")}
    
    Аллергия:
    ${allergy || "-"}
    `;



  try {
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message,
      }),
    });

    res.json({ message: "Form sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send form" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
