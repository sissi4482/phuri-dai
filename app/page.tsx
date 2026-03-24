"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Beim Senden ist etwas schiefgelaufen.");
      }

      setStatus("success");
      setFeedback("Deine Anfrage wurde erfolgreich gesendet.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Beim Senden ist etwas schiefgelaufen."
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#F6F2EA] text-[#14263A] flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl text-center space-y-10 w-full">
        <p className="uppercase tracking-[0.3em] text-[#1e3a5f] text-sm">
          Ein Raum der Stille
        </p>

        <div className="font-serif text-6xl leading-tight space-y-2">
          <p>Ich sehe.</p>
          <p>Ich ordne.</p>
          <p>Ich wende.</p>
        </div>

        <p className="text-lg text-[#28486E] leading-relaxed max-w-2xl mx-auto">
          Für Menschen, die spüren, dass ihr Leben an einer Stelle angekommen ist,
          an der es sich nicht mehr von selbst weiterbewegt.
        </p>

        <form
          id="kontakt"
          onSubmit={handleSubmit}
          className="pt-8 space-y-4 max-w-xl mx-auto w-full"
        >
          <input
            type="text"
            placeholder="Dein Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#ddd] bg-white focus:outline-none"
          />

          <input
            type="email"
            placeholder="Deine E-Mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#ddd] bg-white focus:outline-none"
          />

          <textarea
            placeholder="Was bewegt dich?"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#ddd] bg-white focus:outline-none"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#C8A95A] text-white px-8 py-4 rounded-full uppercase tracking-widest text-sm hover:opacity-90 transition disabled:opacity-60"
          >
            {status === "loading" ? "Wird gesendet..." : "Einen Platz anfragen"}
          </button>

          <a
            href="https://wa.me/436641480013?text=Ich%20moechte%20einen%20Platz%20bei%20dir%20anfragen"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-6 text-sm text-[#28486E] opacity-70 hover:opacity-100"
          >
            Oder direkt über WhatsApp schreiben
          </a>

          {feedback ? (
            <p
              className={`text-sm ${
                status === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {feedback}
            </p>
          ) : null}
        </form>
      </div>
    </main>
  );
}