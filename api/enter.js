export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  const BOT_TOKEN = process.env.TG_TOKEN;
  const CHAT_ID = process.env.TG_ID;

  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "unknown";

    const lang = req.headers["accept-language"] || "unknown";
    const ua = req.headers["user-agent"] || "unknown";

    const message = `
Acceso
🕒 ${new Date().toISOString()}
🌐 IP: ${ip}
🗣 Lang: ${lang}
💻 UA: ${ua}
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });
  } catch (err) {
    console.error("ENTER ERROR:", err);
  }

  res.redirect(302, "https://miscamaras-acceso.vercel.app");
}
