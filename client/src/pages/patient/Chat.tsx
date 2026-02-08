import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Header } from "@/components/shared/Header";
import { svgPaths } from "@/components/shared/svg-paths";
import sendImg from "@/assets/send.png";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

function AiScanIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <path d={svgPaths.aiScan} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [intakeId, setIntakeId] = useState<number | null>(null);
  const [intakeComplete, setIntakeComplete] = useState(false);
  const [starting, setStarting] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    startChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startChat = async () => {
    try {
      const data = await apiFetch<{ intakeId: number; message: { sender: string; content: string } }>("/chat/start", {
        method: "POST",
      });
      setIntakeId(data.intakeId);
      setMessages([{ id: Date.now(), text: data.message.content, sender: "ai" }]);
    } catch (err: any) {
      setMessages([{ id: Date.now(), text: `Error starting chat: ${err.message}. The AI service may not be configured yet - please check your OpenAI API key in server/.env`, sender: "ai" }]);
    } finally {
      setStarting(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || !intakeId || isTyping) return;

    const userMsg: Message = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    const text = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const data = await apiFetch<{ message: { sender: string; content: string }; intakeComplete: boolean }>("/chat/message", {
        method: "POST",
        body: JSON.stringify({ intakeId, message: text }),
      });
      setMessages((prev) => [...prev, { id: Date.now(), text: data.message.content, sender: "ai" }]);
      if (data.intakeComplete) {
        setIntakeComplete(true);
      }
    } catch (err: any) {
      setMessages((prev) => [...prev, { id: Date.now(), text: `Error: ${err.message}`, sender: "ai" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-[#e8f4f4] fixed inset-0 bottom-[64px] flex flex-col">
      <Header title="Health Intake" onBack={() => navigate("/patient")} />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-[25px] pb-[20px] pt-4">
        {starting && (
          <div className="flex justify-center py-8">
            <p className="text-[#160211] text-[14px] animate-pulse">Starting your intake...</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-[16px] flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            style={{ animation: "fadeIn 0.3s ease-in" }}
          >
            <div
              className={`bg-[rgba(255,255,255,0.5)] flex gap-[10px] items-start p-[10px] rounded-[8px] max-w-[80%] border border-white hover:bg-[rgba(255,255,255,0.7)] transition-all duration-200`}
            >
              {message.sender === "ai" && <AiScanIcon />}
              <p className="font-normal leading-normal text-[#160211] text-[14px] whitespace-pre-wrap">
                {message.text}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="mb-[16px] flex justify-start">
            <div className="bg-[rgba(255,255,255,0.5)] flex gap-[10px] items-center p-[10px] rounded-[8px] border border-white">
              <AiScanIcon />
              <p className="font-normal text-[#160211] text-[14px] animate-pulse">Typing...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Intake complete banner */}
      {intakeComplete && (
        <div className="px-[25px] pb-[10px]">
          <div className="bg-[#c1fecc] rounded-lg p-4 text-center">
            <p className="font-bold text-[#1e1e1e] mb-2">Intake Complete!</p>
            <p className="text-sm text-[rgba(0,0,0,0.6)] mb-3">Your intake has been sent to a doctor for review.</p>
            <button
              onClick={() => navigate("/patient/history")}
              className="bg-[#2c2c2c] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#1a1a1a] transition-all"
            >
              View History
            </button>
          </div>
        </div>
      )}

      {/* Input area */}
      {!intakeComplete && (
        <div className="px-[21px] pb-[20px] pt-2">
          <div className="bg-[rgba(255,255,255,0.5)] flex h-[44px] items-center overflow-clip rounded-[8px] border border-white hover:bg-[rgba(255,255,255,0.7)] focus-within:bg-[rgba(255,255,255,0.8)] transition-all duration-200">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Start Typing"
              disabled={starting || isTyping}
              className="flex-1 bg-transparent px-[20px] text-left outline-none text-[16px] text-black tracking-[0.5px] placeholder:text-black placeholder:opacity-100 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === "" || isTyping}
              className="mr-[10px] shrink-0 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <img alt="Send" className="h-[35px] w-[35px] object-contain" src={sendImg} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
