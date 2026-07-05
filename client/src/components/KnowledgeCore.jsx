function KnowledgeCore({selectedFile}) {
    return(
        <section className="knowledge-core">

            <div className="core">

            <div className="ring-ring-1"></div>

            <div className="ring-ring-2"></div>

            <div className="ring-ring-3"></div>

            <div className="sphere"></div>

              </div>

        <h2 className="core-title">
            {selectedFile
            ? "Knowledge activated"
            : "Awaiting Research Document"}
        </h2>

        <p className="core-text">
            {selectedFile
            ? "AI is transforming information into structured knowledge."
            : "Upload a research paper to begin exploration."}
        </p>
    
        </section>
    );
}

export default KnowledgeCore