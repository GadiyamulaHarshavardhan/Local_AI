import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import "../styles/ChatBox.css";

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const sendMessage = async () => {
        if (input.trim() === "") return;
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        // Send request to FastAPI backend
        const response = await fetch("http://localhost:8000/generate/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: input }),
        });

        const data = await response.json();
        const aiMessage = { sender: "ai", text: data.response };
        setMessages([...messages, userMessage, aiMessage]);
        setInput("");
    };

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <Message key={index} sender={msg.sender} text={msg.text} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatBox;
