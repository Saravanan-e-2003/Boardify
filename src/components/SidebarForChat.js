import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

function SidebarForChat({ isOpen, setIsOpen }) {
      console.log("Sidebar rendered", isOpen);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you?" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { from: "user", text: input }]);
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
          contents: input,
    });
    console.log(response.text);
    


    console.log('response.............');
  
    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: response.text},
      ]);
    }, 600);
  
    setInput("");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 border-l border-gray-300 z-60 shadow-xl transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
    <button
    onClick={() => setIsOpen(false)}
    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-2xl font-bold"
>
  ×
</button>
      <div className="p-4 flex flex-col h-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          🤖 Chatbot
        </h2>

        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-sm px-3 py-2 rounded-md max-w-[80%] ${
                msg.from === "bot"
                  ? "bg-gray-100 text-left text-gray-800 dark:bg-gray-700 dark:text-white"
                  : "bg-blue-500 text-white self-end text-right"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-400 rounded-l-md text-sm dark:bg-gray-800 dark:text-white"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarForChat;
