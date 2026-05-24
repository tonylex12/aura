import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, history, scenario, character } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE" || apiKey.trim() === "") {
      return NextResponse.json(
        { error: "Gemini API Key is not configured on the server" },
        { status: 400 }
      );
    }
    
    // Construct historical context for Gemini
    const historyContext = history
      .map((h: { sender: string; text: string }) => `${h.sender === "aura" ? "Aura" : "Learner"}: ${h.text}`)
      .join("\n");
    
    const systemPrompt = `
      You are Aura, an English practice companion and support coach.
      Roleplay character context: ${character}.
      Current Scenario: ${scenario}.
      
      We are having this conversation:
      ${historyContext}
      
      The Learner just said: "${message}"
      
      TASK:
      1. Formulate a warm, supportive response from Aura (2-3 sentences max) keeping the conversation going within the roleplay scenario.
      2. Provide a natural Spanish translation of your response.
      3. Evaluate the Learner's sentence for grammar errors, spelling, or unnatural expressions.
      4. Suggest 2-3 vocabulary words/phrases relevant to the current conversation topic that they can use next.
      
      MANDATORY OUTPUT FORMAT: You must return ONLY a strictly valid JSON object matching this structure. No markdown wrappers, no backticks, no text before or after the JSON:
      {
        "response": "Your English response to the user",
        "translation": "Spanish translation of your response",
        "corrections": [
          {
            "incorrect": "The learner's original incorrect phrase or word",
            "correct": "The corrected version of the phrase or word",
            "explain": "A very brief explanation in Spanish of why it was corrected"
          }
        ],
        "suggested_vocab": ["word1", "phrase2", "word3"]
      }
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API responded with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
      throw new Error("No response candidates returned from Gemini");
    }
    
    const rawText = data.candidates[0].content.parts[0].text.trim();
    
    // Extract and clean JSON block
    const cleanJsonStr = rawText.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(cleanJsonStr);
    
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Error in Aura Chat API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process AI response" },
      { status: 500 }
    );
  }
}
export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  const isConfigured = !!apiKey && apiKey !== "YOUR_GEMINI_API_KEY_HERE" && apiKey.trim() !== "";
  return NextResponse.json({ configured: isConfigured });
}
