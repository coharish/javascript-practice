import "./CurrentlyReading.css";

// Implement a component that displays the currently read word and sentence
interface CurrentlyReadingProps {
  sentences: Array<string>;
  currentSentence: string;
  currentWord: string;
}

export const CurrentlyReading = ({
  sentences,
  currentSentence,
  currentWord,
}: CurrentlyReadingProps) => {
  return (
    <div className="currently-reading">
      <span id="currentSentence">
        {currentSentence.split(" ").map((word, i) => (
          <span key={i} className={word === currentWord ? "highlight" : ""}>
            {word}{" "}
          </span>
        ))}
      </span>
      <p>{sentences.join(" ")}</p>
    </div>
  );
};
