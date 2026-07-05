function QuizGenerator({ selectedFile, quizQuestions }) {
  return (
    <section className="card quiz-card">
      <h2>❓ Quiz Generator</h2>

      {selectedFile ? (
        quizQuestions.length > 0 ? (
          <ol className="quiz-list">
            {quizQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ol>
        ) : (
          <p>Generating quiz questions...</p>
        )
      ) : (
        <p>Upload a document to generate a quiz.</p>
      )}
    </section>
  );
}

export default QuizGenerator;