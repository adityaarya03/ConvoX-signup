import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

const ChatWidget = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const primaryColor = urlParams.get("sanitizedPrimary")?.trim() || "#0675E6";
  const secondaryColor =
    urlParams.get("sanitizedSecondary")?.trim() || "#FFFFFF";
  const fontFamily =
    urlParams.get("sanitizedFont")?.trim() || "Poppins, sans-serif";
  const companionName =
    urlParams.get("companionName")?.trim() || "Chat Assistant";
  const userId = urlParams.get("user_id")?.trim();
  const widetWidth = urlParams.get("sanitizedWidth");

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(
    () => "sess_" + Math.random().toString(36).substring(2, 10)
  );
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      document.body.innerHTML = `<h3 style="font-family:${fontFamily};text-align:center;margin-top:2rem;">Error: Missing user_id</h3>`;
    }

    document.body.style.fontFamily = fontFamily;
  }, [userId, fontFamily]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 80) + "px";
    }
  };

  const appendMessage = (from, text) => {
    setMessages((prev) => [...prev, { from, text }]);
  };

  const handleSend = async () => {
    const message = input.trim();
    if (!message) return;

    appendMessage("user", message);
    setInput("");
    adjustHeight();
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
            timestamp: new Date().toLocaleString("en-GB"),
            user_message: message,
          }),
        }
      );

      const data = await res.json();
      setIsTyping(false);

      const botReply =
        Array.isArray(data) && data.length > 0
          ? data[data.length - 1].response
          : "Sorry, something went wrong.";

      appendMessage("bot", botReply);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      appendMessage("bot", "Error contacting server.");
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <div
        onClick={toggleChat}
        className="fixed bottom-5 right-5 w-[60px] h-[60px] rounded-full text-white text-2xl flex items-center justify-center shadow-lg z-[999] cursor-pointer"
        style={{ backgroundColor: primaryColor }}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="24"
            width="24"
            viewBox="0 0 24 24"
          >
            <path stroke="#fff" strokeWidth="2" d="M6 6L18 18M6 18L18 6" />
          </svg>
        ) : (
          <svg
            id="chatIcon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path fill="#ffffff" d="M8 7H16V9H8V7Z" />
            <path fill="#ffffff" d="M14 11H8V13H14V11Z" />
            <path
              fill="#ffffff"
              d="M19.2 3C20.19 3 20.99 3.81 20.99 4.8L21 21L17.4 17.4H4.8C3.81 17.4 3 16.59 3 15.6V4.8C3 3.81 3.81 3 4.8 3H19.2Z"
            />
          </svg>
        )}
      </div>

      {/* Chat Box */}
      <div
        className={`fixed bottom-[90px] right-3 w-[90%] sm:w-[370px] h-[70vh] rounded-2xl overflow-hidden flex flex-col shadow-lg z-[998] transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: secondaryColor }}
      >
        {/* Header */}
        <div
          className="h-16 text-white flex flex-col justify-center px-6"
          style={{ backgroundColor: primaryColor }}
        >
          <div>
            <h1>{companionName}</h1>
            <p className="text-xs text-100">Powered By ConvoX</p>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-3 flex flex-col gap-2"
          id="chatMessages"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${
                msg.from === "user"
                  ? "self-end text-white"
                  : "self-start bg-gray-100 text-black"
              } max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed`}
              style={
                msg.from === "user" ? { backgroundColor: primaryColor } : {}
              }
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="self-start bg-gray-100 px-3 py-1.5 rounded-xl text-xs animate-pulse">
              typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="flex gap-2 items-center p-2 border-t border-gray-300"
          style={{ backgroundColor: secondaryColor }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="How can we help you today..."
            rows={1}
            className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none resize-none overflow-y-auto"
            style={{ maxHeight: "80px" }}
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 text-white text-lg rounded-full flex items-center justify-center"
            style={{ backgroundColor: primaryColor }}
          >
            <svg
              width="19px"
              height="19px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
