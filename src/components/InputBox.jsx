import { useState } from "react";

const InputBox = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ flex: 1, padding: "10px" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default InputBox;