import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let stompClient = null;

function ChatRoom() {
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/chat");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      setConnected(true);
      console.log("✅ Connected to WebSocket");
      stompClient.subscribe("/topic/messages", (msg) => {
        const received = JSON.parse(msg.body);
        setMessages((prev) => [...prev, received]);
      });
    });
  };

  const sendMessage = () => {
    if (stompClient && message.trim() !== "") {
      const chatMessage = { from: username, content: message };
      stompClient.send("/app/send", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  useEffect(() => {
    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, []);

  return (
    <div style={{ width: 400, margin: "auto", textAlign: "center" }}>
      <h2>💬 Spring Boot Chat (React)</h2>

      {!connected ? (
        <div>
          <input
            type="text"
            placeholder="Nhập tên..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={connect} disabled={!username}>
            Kết nối
          </button>
        </div>
      ) : (
        <div>
          <div
            style={{
              border: "1px solid #ccc",
              height: 300,
              overflowY: "auto",
              marginBottom: 10,
              padding: 5,
              textAlign: "left",
            }}
          >
            {messages.map((m, i) => (
              <div key={i}>
                <strong>{m.from}:</strong> {m.content}
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Gửi</button>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
