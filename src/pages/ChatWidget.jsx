import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";

const ChatWidget = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const primaryColor = urlParams.get("primaryColor") || "#0675E6";
  const secondaryColor = urlParams.get("secondaryColor") || "#e6f0ff";
  const fontFamily = urlParams.get("fontFamily") || "Inter";
  const userId = urlParams.get("user_id");

  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() =>
    Math.random().toString(36).substring(2, 10)
  );
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      document.body.innerHTML = `<h3 style="font-family:${fontFamily};color:red;text-align:center;margin-top:2rem;">Error: Missing user_id</h3>`;
    }

    document.body.style.fontFamily = fontFamily;
  }, [fontFamily, userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const timestamp = new Date().toLocaleString("en-GB");

    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(
        "https://walrus.kalavishva.com/webhook/convox_trial",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            session_id: sessionId,
            timestamp,
            user_message: userMessage,
          }),
        }
      );

      const data = await res.json();

      const botReply =
        Array.isArray(data) && data.length > 0
          ? data[data.length - 1].response
          : "Sorry, something went wrong.";

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error connecting to server." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 w-[60px] h-[60px] rounded-full bg-[var(--primaryColor)] text-white text-2xl flex items-center justify-center shadow-lg z-50"
        style={{ backgroundColor: primaryColor, fontFamily }}
      >
        <RiRobot3Fill />
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div
          className="fixed bottom-[90px] right-5 w-[350px] h-[450px] rounded-3xl overflow-hidden border shadow-xl flex flex-col z-40"
          style={{
            backgroundColor: "white",
            borderColor: primaryColor,
            fontFamily,
          }}
        >
          <div className="h-12" style={{ backgroundColor: primaryColor }}></div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm ${
                    msg.from === "user"
                      ? "bg-[var(--primaryColor)] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  style={
                    msg.from === "user" ? { backgroundColor: primaryColor } : {}
                  }
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <span className="bg-gray-200 text-black px-3 py-2 rounded-2xl text-sm animate-pulse">
                  typing<span className="animate-bounce">...</span>
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 bg-[var(--secondaryColor)] flex items-center gap-2 border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 h-10 text-sm py-2 rounded-full border bg-white border-gray-300 focus:outline-none"
              style={{ fontFamily }}
            />

            <button
              onClick={handleSend}
              className="bg-[var(--primaryColor)] text-white px-4 py-2 rounded-full text-sm"
              style={{ backgroundColor: primaryColor }}
            >
              <IoSend size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
