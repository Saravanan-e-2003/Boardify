import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

function SidebarForChat({ isOpen, setIsOpen }) {
      // console.log("Sidebar rendered", isOpen);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you?" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // config for chatbot API call
    const config = {
        maxOutputTokens: 50,
        systemInstruction: [
            {
              text: `Your name is Boardify Bot, You are an Project Manager Chat bot, 
              The questions can be related to SDLC and other developement and technical stuffs, 
              dont answer if it is not related to project management or other technical questions, 
              dont give me any bold or * words, everything should be plain text`,
            }
        ],
      };

      const model = 'gemini-2.0-flash';

    setMessages([...messages, { from: "user", text: input }]);
    const response = await ai.models.generateContent({
          model,
          config,
          contents: input,
    });
    
    setInput("");

  
    // Simulate bot reply
        setMessages((prev) => [
            ...prev,
            { from: "bot", text: response.text},
        ]);

  
  
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-900 border-l border-gray-300 z-60 shadow-xl transform transition-transform duration-300 ${
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
          🤖 Board Bot
        </h2>

        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
    {messages.map((msg, i) => (
        <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`text-sm px-3 py-2 rounded-lg w-fit  ${
                msg.from === "bot"
                    ? "chatBubble bg-white text-gray-800 dark:bg-gray-700 dark:text-white text-justify"
                    : "chatBubble text-white max-w-[80%]"
                }`}
            >
            {msg.text}
            </div>
        </div>
    ))}

        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-400 rounded-l-2xl text-sm dark:bg-gray-800 dark:text-white"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            // className="bg-blue-600 text-white px-4 rounded-r-2xl hover:bg-blue-700 transition"
            className = "button rounded-l-2xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarForChat;
