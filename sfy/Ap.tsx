import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./lib/useSpeech";
import { fetchContent, parseContentIntoSentences } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWord, currentSentence, controls, isPlaying } =
    useSpeech(sentences);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resp = await fetchContent();
    const sentences = parseContentIntoSentences(resp.content);
    setSentences(sentences);
  };

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading {...{ currentWord, currentSentence, sentences }} />
      </div>
      <div>
        <Controls isPlaying={isPlaying} loadContent={fetchData} {...controls} />
      </div>
    </div>
  );
}

export default App;
