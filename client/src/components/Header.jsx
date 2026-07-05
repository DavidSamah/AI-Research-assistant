function Header({ appName }) {
  return (
    <header>
      <h1>{appName}</h1>

      <p className="tagline">
        Transform research papers into interactive knowledge universes with AI-powered summaries, concepts and quizzes.
      </p>
    </header>
  );
}

export default Header;