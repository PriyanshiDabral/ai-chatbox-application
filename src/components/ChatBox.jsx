import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, sendMessage } from "../redux/chatSlice";
import { useState, useEffect, useRef } from "react";
import styles from "./ChatBox.module.css";

/* ── Mic icon ─── */
const MicIcon = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

/* ── Send icon ─── */
const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* ── Typing dots ─── */
const TypingIndicator = () => (
  <div className={styles.messageWrapper + " " + styles.ai}>
    <span className={styles.aiLabel}>Assistant</span>
    <div className={styles.typingIndicator}>
      <span /><span /><span />
    </div>
  </div>
);

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const ChatBox = () => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((s) => s.chat);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  /* ── Auto-scroll ─── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);

useEffect(() => {
  if (isOnline) {
    setShowPopup(false);
  }
}, [isOnline]);

  /* ── Send ─── */
  const handleSend = () => {
  if (!isOnline) {
    setShowPopup(true);
    return;
  }

  if (!input.trim()) return;

  dispatch(addUserMessage(input));
  dispatch(sendMessage(input));
  setInput("");
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ── Speech recognition ─── */
  const handleMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser. Try Chrome.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onend = () => setIsRecording(false);

    recognition.onerror = (e) => {
      console.error("Speech error:", e.error);
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className={styles.chatContainer}>

    {showPopup && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalBox}>
      <p>Please connect your internet</p>
      <button onClick={() => setShowPopup(false)}>
        OK
      </button>
    </div>
  </div>
)}

      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerAvatar}>AI</div>
        <div className={styles.headerInfo}>
          <h3>Interview Assistant</h3>
          <div className={styles.headerStatus}>
  <span
    className={styles.statusDot}
    style={{ backgroundColor: isOnline ? "green" : "red" }}
  />
  {isOnline ? "Online" : "Offline"}
</div>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messagesArea}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.messageWrapper} ${styles[msg.role]}`}>
            {msg.role === "ai" && (
              <span className={styles.aiLabel}>Assistant</span>
            )}
            <div className={`${styles.messageBubble} ${styles[msg.role]}`}>
              {msg.content}
            </div>
            <span className={styles.messageTimestamp}>{formatTime()}</span>
          </div>
        ))}

        {loading && <TypingIndicator />}
        {error && <p className={styles.errorText}>{error}</p>}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.textInput}
          placeholder={isRecording ? "Listening…" : "Type a message…"}
          disabled={loading}
        />

        <button
          onClick={handleMic}
          className={`${styles.micButton} ${isRecording ? styles.recording : ""}`}
          title={isRecording ? "Stop recording" : "Speak a message"}
          disabled={loading}
        >
          <MicIcon active={isRecording} />
        </button>

        <button
          onClick={handleSend}
          className={styles.sendButton}
          disabled={loading || !input.trim()}
          title="Send"
        >
          <SendIcon />
        </button>
      </div>

    </div>
  );
};

export default ChatBox;