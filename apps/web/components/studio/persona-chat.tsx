import type { ConversationMessage } from "@station/types/persona";

export function PersonaChat({ messages }: { messages: ConversationMessage[] }) {
  return (
    <div className="card">
      <strong>Chat</strong>
      <div className="message-list" style={{ marginTop: 16 }}>
        {messages.length === 0 ? <div>No messages yet.</div> : null}
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <strong style={{ textTransform: "capitalize" }}>{message.role}</strong>
            <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{message.content}</div>
          </div>
        ))}
      </div>
      <form style={{ marginTop: 16, display: "grid", gap: 12 }} action="#">
        <textarea className="textarea" placeholder="Talk to the persona..." />
        <button className="button primary" type="submit">Send</button>
      </form>
    </div>
  );
}
