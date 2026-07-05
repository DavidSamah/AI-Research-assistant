function KeyConcepts({ selectedFile, keyConcepts }) {
  return (
    <section className="card concepts-card">
      <h2>🧠 Key Concepts</h2>

      {selectedFile ? (
        keyConcepts.length > 0 ? (
          <div className="concept-list">
            {keyConcepts.map((concept, index) => (
              <div key={index} className="concept-card">
                <h3>{concept.name}</h3>

                <p>
                  <strong>Explanation:</strong>
                  <br />
                  {concept.explanation}
                </p>

                <p>
                  <strong>Example:</strong>
                  <br />
                  {concept.example}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Generating key concepts...</p>
        )
      ) : (
        <p>No document uploaded.</p>
      )}
    </section>
  );
}

export default KeyConcepts;
