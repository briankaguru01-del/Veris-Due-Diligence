"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/Card";
import type { ChatMessage } from "@/lib/types";

export function ChatPanel({
  dealId,
  initialMessages,
}: {
  dealId: string;
  initialMessages: ChatMessage[];
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`chat_messages:${dealId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `deal_id=eq.${dealId}`,
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages((prev) =>
            prev.some((m) => m.id === newMessage.id) ? prev : [...prev, newMessage],
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dealId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || sending) return;

    setSending(true);
    setQuestion("");

    const supabase = createClient();
    const { data, error } = await supabase
      .from("chat_messages")
      .insert({ deal_id: dealId, sender: "analyst", message: trimmed })
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) =>
        prev.some((m) => m.id === data.id) ? prev : [...prev, data as ChatMessage],
      );
    }

    try {
      await fetch(process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deal_id: dealId, question: trimmed }),
      });
    } catch {
      // Veris's reply arrives via Realtime once the backend writes it —
      // a failed POST here just means the question wasn't relayed.
    }

    setSending(false);
  }

  return (
    <Card className="flex h-[520px] flex-col">
      <div className="border-b border-border px-5 py-4">
        <h3 className="font-heading text-sm font-semibold text-text">Ask Veris</h3>
        <p className="mt-0.5 text-xs text-slate">
          Follow-up questions about this deal, answered from the data room.
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <p className="text-sm text-slate">
            No messages yet. Ask something about the deal below.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "analyst" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                message.sender === "analyst"
                  ? "bg-blue/10 text-text"
                  : "border border-border bg-navy-deep text-text"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about this deal…"
          className="flex-1 rounded-md border border-border bg-navy-deep px-3 py-2.5 text-sm text-text outline-none focus:border-blue-dim"
        />
        <button
          type="submit"
          disabled={sending || !question.trim()}
          className="rounded-md bg-blue px-4 py-2.5 text-sm font-medium text-navy-deep transition-colors hover:bg-blue-dim disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </Card>
  );
}
