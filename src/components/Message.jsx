const Message = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-start" : "flex-end",
        margin: "6px 0",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "12px",
          background: isUser ? "#d1e7ff" : "#d4edda",
          maxWidth: "70%",
        }}
      >
        {message.content}
      </div>
    </div>
  );
};

export default Message;