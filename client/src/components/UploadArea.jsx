function UploadArea({ setSelectedFile }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <section className="card upload-card">
        
      <h2>📤 Upload Research Paper</h2>

      <p>
        Select a research document to generate an AI summary,
        key concepts, and quiz questions.
      </p>

      <input
        type="file"
        accept=".txt,.pdf"
        onChange={handleFileChange}
      />
    </section>
  );
}

export default UploadArea;