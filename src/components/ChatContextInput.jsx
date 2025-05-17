import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
// import "./ChatContextInput.css";

export default function ChatContextInput({ onSubmit, onBack }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Tell us a bit about your business." },
  ]);
  const [input, setInput] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    // Trigger the expand effect on mount
    setTimeout(() => setExpanded(true), 100);
  }, []);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "Great!" }]);
      setTimeout(() => {
        setIsDone(true);
        onSubmit(trimmed);
      }, 1000);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={`transition-all duration-700 ease-in-out overflow-hidden ${
        expanded ? "h-[30em]" : "h-[4px]"
      }`}
    >
      <div className="w-full h-full flex flex-col gap-4">
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded-md shadow-inner"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${
                msg.sender === "bot" ? "text-left" : "text-right"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg max-w-[75%] break-words ${
                  msg.sender === "bot"
                    ? "bg-blue-100 text-blue-800"
                    : " bg-blue-600 text-white"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {!isDone && (
          <div className="flex items-center gap-2 w-full p-[1px]">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-grow h-13 content-center text-sm resize-none overflow-auto border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="text-blue-600 hover:text-blue-800 p-2"
            >
              <IoSend size={24} />
            </button>
          </div>
        )}

        <div className="flex justify-between pt-2 px-[1px]">
          <button
            onClick={onBack}
            className="bg-white h-13 w-full text-[#0575e6] border border-[#0575e6] px-4 py-2 rounded-[50px] hover:bg-[#0575e6] hover:border-[#0575e6] hover:text-white transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
