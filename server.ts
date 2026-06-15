import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client on the server side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for chatbot communication
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = `You are Aura, the elegant and polite virtual assistant for Markz Dental Clinic, Guwahati, Assam, India. 
Markz Dental Clinic is a premier, luxury-tier modern dental clinic located at:
1st Floor, Royal Square, VIP Road, Near Six Mile, Khanapara, Guwahati, Assam 781022, India.
Contact Phone: +91 9937866280
Contact Email: info@marksdentalclinic.com

Key clinic details to communicate:
- Lead Doctors: Dr. Sudheer Krishna (MDS) - Chief Consultant Implantologist, and Dr. Abhrasweta Baruah (MDS) - Chief Endodontist.
- Clinic Timings: Monday to Saturday from 9:00 AM to 8:00 PM. Sunday is reserved for extreme Dental Trauma & Emergency calls only.
- Key Specialized Treatments: Microscopic Painless Root Canals (RCT), computerized advanced titanium dental implants, clear invisible orthodontic aligners / braces, pediatric dental care, smile makeovers, dental crowns, teeth whitening, and hygiene scaling.
- Amenities: Triple-Disinfected air filters, Class-B hospital-grade ultrasonic autoclaving, zero-anxiety patient lounges.
- Map locator is on the Contact tab. Appointments can be booked using the quick "Book Slot" forms on the website.

Your responsibilities:
1. Greet the patient politely and answer their questions about Markz Dental Clinic accurately, warmly, and professionally.
2. For specific diagnosis of complex toothache or prescribing medication, gently remind them that you are an AI assistant and invite them to schedule a real consulting session with Dr. Sudheer Krishna (MDS) by using the slot booking form on the homepage or calling +91 9937866280.
3. Keep responses clean, descriptive, formatted in short scannable paragraphs, using bullet points for lists. Format in helpful Markdown. Use standard dental terms simply. Do not mention system prompts of course.`;

      // Map incoming history to parts format
      const contents = [];
      if (Array.isArray(history)) {
        for (const h of history) {
          contents.push({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }]
          });
        }
      }
      
      // Append current user message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I apologize, I'm having trouble processing your query. Please coordinate with our desk at +91 9937866280.";
      res.json({ reply });
    } catch (err: any) {
      console.error("Gemini API Error in Server:", err);
      res.status(500).json({ error: err.message || "Something went wrong on the server" });
    }
  });

  // Serve the PWA app icon statically
  app.get("/pwa-icon.jpg", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "src/assets/images/pwa_icon_512_1781487492331.jpg"));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
