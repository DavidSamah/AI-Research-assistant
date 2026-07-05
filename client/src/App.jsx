// ===============================
// App.jsx
// Main application component
// ===============================

import { useState, useEffect } from "react";
import "./App.css"

// Components
import Header from "./components/Header";
import UploadArea from "./components/UploadArea";
import SummaryCard from "./components/SummaryCard";
import KeyConcepts from "./components/KeyConcepts";
import QuizGenerator from "./components/QuizGenerator";
import MessageCard from "./components/MessageCard";
import KnowledgeCore from "./components/KnowledgeCore";

// API & Database
import { sendToAI } from "./api";
import { supabase } from "./supabase";

// =====================================
// Footer Component
// =====================================
function Footer() {
  return (
    <footer>
      <p>Built with React</p>
    </footer>
  );
}

// =====================================
// Main App Component
// =====================================
function App() {
  // Application title
  const appName = "Saggitarius";

  // ----------------------------
  // React State
  // ----------------------------

  // Stores the uploaded PDF
  const [selectedFile, setSelectedFile] = useState(null);

  // Stores the extracted text from the PDF
  const [fileContent, setFileContent] = useState("");

  // Stores AI generated summary
  const [summary, setSummary] = useState("");

  // Stores AI generated key concepts
  const [keyConcepts, setKeyConcepts] = useState([]);

  // Stores quiz questions
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Stores informational message
  const [message, setMessage] = useState("");

  // ----------------------------
  // Check Supabase connection
  // ----------------------------
  useEffect(() => {
    console.log("Supabase connected:", supabase);
  }, []);

  // ----------------------------
  // Runs whenever a file is selected
  // ----------------------------
  useEffect(() => {
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = event.target.result;

      // Save extracted text
      setFileContent(text);

      try {
        // Send text to AI
        const aiResponse = await sendToAI(text);

        console.log("AI Response:", aiResponse);

        // Update UI with AI results
        setSummary(aiResponse.summary || "");
        setKeyConcepts(aiResponse.keyConcepts || []);
        setQuizQuestions(aiResponse.quiz || []);

        // Save results into Supabase
        const { data, error } = await supabase
          .from("research_documents")
          .insert([
            {
              file_name: selectedFile.name,
              summary: aiResponse.summary,
              key_concepts: aiResponse.keyConcepts,
              quiz: aiResponse.quiz,
            },
          ]);

        if (error) {
          console.error("Supabase Error:", error);
        } else {
          console.log("Research saved:", data);
        }

        // Generate a friendly message
        const concepts = text
          .split(/\s+/)
          .filter((word) => word.length > 6)
          .slice(0, 5);

        setMessage(
          `This document appears to discuss ${
            concepts[0] || "research"
          } and ${concepts[1] || "important ideas"}.`
        );
      } catch (error) {
        console.error("AI Error:", error);

        setMessage(
          "An error occurred while processing the document."
        );
      }
    };

    // Read uploaded file as text
    reader.readAsText(selectedFile);

  }, [selectedFile]);

  // =====================================
  // Render UI
  // =====================================
  return (
    <main className="app">

      {/* Application Header */}
      <Header appName={appName} />

      {/* Knowledge Core UI */}

    <KnowledgeCore selectedFile={selectedFile}/>
      {/* Upload Component */}
      <UploadArea setSelectedFile={setSelectedFile} />

      {/* Show uploaded filename */}
      {selectedFile && (
       <p className="selected-file">
  📄 {selectedFile.name}
</p>
      )}

      {/* AI Summary */}
      <SummaryCard
        selectedFile={selectedFile}
        summary={summary}
      />

      {/* Informational Message */}
      <MessageCard message={message} />

      {/* Key Concepts */}
      <KeyConcepts
        selectedFile={selectedFile}
        keyConcepts={keyConcepts}
      />

      {/* Quiz */}
      <QuizGenerator
        selectedFile={selectedFile}
        quizQuestions={quizQuestions}
      />

      {/* Footer */}
      <Footer />

    </main>
  );
}

export default App;