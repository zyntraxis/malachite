import { useState, useEffect, useRef } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import "./MalachiteAI.css";

const LoadingDots = () => {
    return (
        <span className="loading-dots">
            <span>.</span><span>.</span><span>.</span>
        </span>
    );
};

const MalachiteAI = () => {
    const [input, setInput] = useState("");
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, chatOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages((msgs) => [...msgs, { from: "user", text: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await res.json();
            setMessages((msgs) => [...msgs, { from: "ai", text: data.answer }]);
        } catch (error) {
            setMessages((msgs) => [
                ...msgs,
                { from: "ai", text: "Error: Could not reach AI server." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!chatOpen && (
                <div
                    className="malachite-icon"
                    onClick={() => setChatOpen(true)}
                    title="Open chat"
                >
                    <IoChatbubbleOutline />
                </div>
            )}

            {chatOpen && (
                <div className="malachite-chat-window animate-open">
                    <div className="malachite-chat-header">
                        <span>Malachite AI</span>
                        <button onClick={() => setChatOpen(false)}>×</button>
                    </div>
                    <div className="malachite-chat-messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`message ${msg.from === "user" ? "user-msg" : "ai-msg"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="message ai-msg loading-message">
                                <LoadingDots />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="malachite-chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask something..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                            disabled={loading}
                        />
                        <button onClick={sendMessage} disabled={loading}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MalachiteAI;
