import React from "react";
import "../styles/Message.css";

function Message({ sender, text }) {
    return (
        <div className={`message ${sender === "user" ? "user" : "ai"}`}>
            <p>{text}</p>
        </div>
    );
}

export default Message;
