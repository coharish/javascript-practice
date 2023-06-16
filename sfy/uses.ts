import { useEffect, useReducer, useState } from "react";
import { PlayingState, createSpeechEngine } from "./speech";

const useSpeech = (sentences: Array<string>) => {
  /*
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
  */

  const initialState = {
    isPlaying: false,
    currentWord: "",
    currentSentence: "",
    currentSentenceIndex: -1,
  };

  const reducer = (
    state = initialState,
    action: {
      type:
        | "PLAY"
        | "END"
        | "UPDATE_WORD"
        | "UPDATE_SENTENCE"
        | "UPDATE_SENTENCE_INDEX"
        | "RESET";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "PLAY":
        return Object.assign({}, state, {
          isPlaying: action.payload,
        });
      case "UPDATE_WORD":
        return Object.assign({}, state, {
          currentWord: action.payload,
        });
      case "UPDATE_SENTENCE":
        return Object.assign({}, state, {
          currentSentence: action.payload,
        });
      case "UPDATE_SENTENCE_INDEX":
        return Object.assign({}, state, {
          currentSentenceIndex: action.payload,
        });
      case "RESET":
        return action.payload;
      default:
        return state;
    }
  };

  const [speechState, dispatch] = useReducer(reducer, initialState);

  const onBoundary = (e: SpeechSynthesisEvent) => {
    // setCurrentPlayingSentence((e.currentTarget as any).text);
    const word = getWord(e.utterance.text, e.charIndex, e.charLength);
    // setCurrentPlayingWord(word);
    dispatch({
      type: "UPDATE_SENTENCE",
      payload: (e.currentTarget as any).text,
    });
    dispatch({
      type: "UPDATE_WORD",
      payload: word,
    });
  };

  const getWord = (
    sentence: string,
    wordStartIndex: number,
    wordLength: number
  ) => {
    let word = sentence.substring(wordStartIndex, wordLength + wordStartIndex);
    return word;
  };

  const onStateUpdate = (state: PlayingState) => {
    switch (state) {
      case "ended":
        const sentenceIndex =
          speechState.currentSentenceIndex < sentences.length
            ? speechState.currentSentenceIndex + 1
            : -1;
        dispatch({
          type: "UPDATE_SENTENCE_INDEX",
          payload: speechState.currentSentenceIndex + 1,
        });
        if (sentenceIndex === sentences.length) {
          reset();
        }
        break;
      case "paused":
        dispatch({
          type: "PLAY",
          payload: false,
        });
        break;
      case "playing":
        dispatch({
          type: "PLAY",
          payload: true,
        });
        break;
      default:
        break;
    }
  };

  const { play, pause, load } = createSpeechEngine({
    onBoundary,
    onEnd: () => {},
    onStateUpdate,
  });

  const onPlay = () => {
    if (speechState.currentSentenceIndex === -1) {
      dispatch({
        type: "UPDATE_SENTENCE_INDEX",
        payload: speechState.currentSentenceIndex + 1,
      });
    } else {
      load(sentences[speechState.currentSentenceIndex]);
      play();
    }
  };

  const reset = () => {
    dispatch({
      type: "RESET",
      payload: initialState,
    });
  };

  useEffect(() => {
    load(sentences[speechState.currentSentenceIndex]);
    play();
  }, [speechState.currentSentenceIndex]);

  useEffect(() => {
    reset();
  }, [sentences]);

  return {
    controls: { play: onPlay, pause },
    isPlaying: speechState.isPlaying,
    currentSentence: speechState.currentSentence,
    currentWord: speechState.currentWord,
  };
};

export { useSpeech };
