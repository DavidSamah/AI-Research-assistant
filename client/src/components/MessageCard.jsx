function MessageCard({ message }) {
  return (
    <section className="card message-card">
      <h2>💬 AI Insights</h2>

      <p>{message || "No message available yet."}</p>
    </section>
  );
}

export default MessageCard;