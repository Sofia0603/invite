import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Для __dirname в ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Маршрут для отправки формы
app.post("/send-form", async (req, res) => {
  const {
    fullName,
    presence,
    transfer,
    kitchenPreference,
    alcoholPreferences,
    allergy
  } = req.body;

  if (!fullName || !presence) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const message = `
    Новая заявка с сайта:
    
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
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message,
      }),
    });

    res.json({ message: "OK" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Telegram error" });
  }
});

// Раздаём сборку React
app.use(express.static(path.join(__dirname, "../client/dist")));

// Любой другой маршрут отдаёт index.html для React Router
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
