"use server";

import { ContactFormData } from "./types";

export async function submitContact(data: ContactFormData): Promise<{ ok: boolean; message: string }> {
  const n8nUrl = process.env.N8N_URL;
  console.log("N8N_URL:", n8nUrl ?? "NOT SET");

  if (!n8nUrl) {
    return { ok: false, message: "API URL is not configured." };
  }

  const apiUrl = `${n8nUrl}/webhook/contact-insert`;
  console.log("POST URL:", apiUrl);
  console.log("POST body:", JSON.stringify(data, null, 2));

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const body = await response.text();
      console.error("n8n error response:", body);
      return { ok: false, message: `Request failed (${response.status}): ${body}` };
    }

    return { ok: true, message: "Thank you! Your information has been submitted." };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Fetch failed:", message);
    return { ok: false, message: `Fetch failed: ${message}` };
  }
}
