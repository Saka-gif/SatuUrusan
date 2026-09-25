import { NextRequest, NextResponse } from "next/server";
import { lifeEvents } from "@/data/life-events";
import fs from "fs";
import path from "path";

// Function to dynamically load keys from .env.local without restarting Next.js
function getGroqKeys() {
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/GROQ_API_KEYS="([^"]+)"/);
    if (match && match[1]) {
      return match[1].split(",").map(k => k.trim()).filter(Boolean);
    }
  } catch (err) {
    console.error("Failed to read .env.local", err);
  }
  
  // Fallback to process.env if available
  const rawKeys = process.env.GROQ_API_KEYS || "";
  return rawKeys.split(",").map(k => k.trim()).filter(Boolean);
}

// Define System Prompt
const SYSTEM_PROMPT = `Anda adalah SatuAI, asisten cerdas dari platform "SatuUrusan" (satuurusan.com).
Tugas utama Anda adalah memandu masyarakat Indonesia dalam mengurus dokumen administrasi publik dan birokrasi (seperti KTP, KK, BPJS, NIB, Pajak, Surat Nikah, dll).

INFORMASI PLATFORM SATUURUSAN:
SatuUrusan adalah "Navigator Hidup" yang merangkai seluruh dokumen dan tahapan antar-dinas menjadi urutan prioritas yang logis, tanpa calo. Layanan ini 100% menggunakan kanal resmi pemerintah.
Peristiwa hidup yang didukung saat ini (berdasarkan data website):
${lifeEvents.map(e => `- ${e.title}: ${e.description}`).join("\n")}

ATURAN KETAT (STRICT RULES):
1. Anda HANYA BOLEH menjawab pertanyaan terkait layanan publik, birokrasi, administrasi kependudukan Indonesia, perpajakan, BPJS, perizinan usaha, dan fitur website SatuUrusan.
2. JIKA PENGGUNA BERTANYA DI LUAR KONTEKS TERSEBUT (misal: coding, resep masakan, cuaca, politik, dll), Anda WAJIB MENOLAKNYA dengan sopan dan mengarahkan kembali ke topik administrasi publik.
Contoh penolakan: "Maaf, saya adalah asisten navigasi administrasi publik. Saya tidak dapat menjawab pertanyaan tersebut. Apakah ada urusan dokumen atau birokrasi yang bisa saya bantu?"
3. Jawaban harus ramah, praktis, dan akurat berdasarkan hukum administrasi Indonesia.
4. Gunakan Markdown untuk memperjelas jawaban (misal: bullet points untuk langkah-langkah).
`;

export async function POST(req: NextRequest) {
  try {
    const GROQ_KEYS = getGroqKeys();
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    if (GROQ_KEYS.length === 0) {
      return NextResponse.json({ error: "API keys not configured" }, { status: 500 });
    }

    // Prepare messages for Groq API
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: any) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }))
    ];

    // Load Balancing Logic
    let lastError = null;
    let successfulResponse = null;

    for (let i = 0; i < GROQ_KEYS.length; i++) {
      const currentKey = GROQ_KEYS[i];
      console.log(`[SatuAI] Attempting Groq API with Key Index: ${i}`);
      
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${currentKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b", // Fast and efficient model
            messages: apiMessages,
            temperature: 0.3,
            max_tokens: 1024
          })
        });

        if (response.status === 429) {
          console.warn(`[SatuAI] Key Index ${i} Rate Limited (429). Switching to next key...`);
          continue; // Try next key
        }

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          console.error(`[SatuAI] Key Index ${i} failed with status ${response.status}`, errData);
          lastError = errData || `Status ${response.status}`;
          continue; // Try next key on other errors too (like invalid key)
        }

        const data = await response.json();
        successfulResponse = data;
        break; // Success! Exit the retry loop
      } catch (error) {
        console.error(`[SatuAI] Fetch error on Key Index ${i}:`, error);
        lastError = error;
        // Continue to next key
      }
    }

    if (!successfulResponse) {
      console.error("[SatuAI] All Groq API keys failed or rate limited.", lastError);
      return NextResponse.json(
        { error: "Semua jalur API sedang sibuk atau limit harian habis. Silakan coba beberapa saat lagi.", details: lastError, keysCount: GROQ_KEYS.length },
        { status: 503 }
      );
    }

    const aiMessage = successfulResponse.choices[0]?.message?.content || "Maaf, saya tidak dapat merespons saat ini.";

    return NextResponse.json({
      role: "assistant",
      content: aiMessage
    });

  } catch (error: any) {
    console.error("[SatuAI] Internal Server Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
