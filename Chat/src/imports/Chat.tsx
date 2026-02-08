import { useState, useRef, useEffect } from "react";
import svgPaths from "./svg-gvadwuh36f";
import imgSendLetter from "figma:asset/e7306c87d42cb70ed6a199393cd1dcb0280aa6d7.png";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

function HugeiconsAiScan() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="hugeicons:ai-scan">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="hugeicons:ai-scan">
          <path d={svgPaths.p13e04680} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ArrowBack({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="absolute h-[26px] left-[18px] top-[41px] w-[31px] cursor-pointer hover:scale-110 hover:opacity-80 active:scale-95 transition-all duration-200" 
      data-name="arrow_back"
      aria-label="Go back"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 26">
        <g id="arrow_back">
          <path d={svgPaths.p352ba080} fill="var(--fill-0, #1D1B20)" id="icon" />
        </g>
      </svg>
    </button>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "I am feeling unwell :C", sender: "user" },
    { id: 2, text: "Can you tell me your symptoms?", sender: "ai" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponses = [
        "I understand. Can you describe your symptoms in more detail?",
        "I'm here to help. What specific symptoms are you experiencing?",
        "Thank you for sharing. How long have you been feeling this way?",
        "I see. Are there any other symptoms I should know about?",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: randomResponse,
          sender: "ai",
        },
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleBack = () => {
    console.log("Back button clicked");
    // You can add navigation logic here
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-[#e8f4f4] relative size-full flex flex-col" data-name="Chat">
      {/* Header with back button */}
      <div className="relative h-[80px] shrink-0">
        <ArrowBack onClick={handleBack} />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-[25px] pb-[20px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-[16px] flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-[fadeIn_0.3s_ease-in]`}
          >
            <div
              className={`bg-[rgba(255,255,255,0.5)] content-stretch flex gap-[10px] items-center justify-center p-[10px] rounded-[8px] max-w-[80%] border border-solid border-white hover:bg-[rgba(255,255,255,0.7)] transition-all duration-200 ${
                message.sender === "user" ? "" : "w-fit"
              }`}
            >
              <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
              {message.sender === "ai" && <HugeiconsAiScan />}
              <p className={`font-['Manrope:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#160211] text-[14px]`}>
                {message.text}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-[16px] flex justify-start">
            <div className="bg-[rgba(255,255,255,0.5)] content-stretch flex gap-[10px] items-center justify-center p-[10px] rounded-[8px]">
              <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
              <HugeiconsAiScan />
              <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#160211] text-[14px]">
                Typing...
              </p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion buttons */}
      <div className="px-[25px] pb-[10px] flex flex-col gap-[8px]">
        <button
          onClick={() => handleSuggestionClick("What can I ask you to do?")}
          className="bg-[rgba(255,255,255,0.5)] content-stretch flex items-center justify-start p-[10px] rounded-[8px] hover:bg-[rgba(255,255,255,0.9)] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-solid border-white w-fit"
        >
          <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] text-[#160211] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            What can I ask you to do?
          </p>
        </button>
        <button
          onClick={() => handleSuggestionClick("What can I ask you to do?")}
          className="bg-[rgba(255,255,255,0.5)] content-stretch flex items-center justify-start p-[10px] rounded-[8px] hover:bg-[rgba(255,255,255,0.9)] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-solid border-white w-fit"
        >
          <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] text-[#160211] text-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            What can I ask you to do?
          </p>
        </button>
      </div>

      {/* Input area */}
      <div className="px-[21px] pb-[20px] relative">
        <div className="bg-[rgba(255,255,255,0.5)] content-stretch flex h-[44px] items-center overflow-clip rounded-[8px] relative border border-solid border-white hover:bg-[rgba(255,255,255,0.7)] focus-within:bg-[rgba(255,255,255,0.8)] focus-within:shadow-lg transition-all duration-200">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Start Typing"
            className="flex-1 bg-transparent px-[20px] text-left outline-none font-['Roboto:Regular',sans-serif] font-normal text-[16px] text-black tracking-[0.5px] placeholder:text-black placeholder:opacity-100"
            style={{ fontVariationSettings: "'wdth' 100" }}
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
            className="mr-[10px] shrink-0 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Send message"
          >
            <img alt="Send" className="h-[35px] w-[35px] object-contain" src={imgSendLetter} />
          </button>
        </div>
      </div>
    </div>
  );
}