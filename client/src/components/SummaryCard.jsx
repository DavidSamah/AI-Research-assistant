function SummaryCard({ selectedFile, summary }) {
  return (
    <section className="card summary-card">
      <h2>AI Summary</h2>

      {selectedFile ? (
        <>
          <p>
            <strong>Document:</strong> {selectedFile.name}
          </p>

          <p>
            {summary || "Generating summary..."}
          </p>
        </>
      ) : (
        <p>No file uploaded yet.</p>
      )}
    </section>
  );
}

export default SummaryCard;