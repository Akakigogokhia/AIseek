import { createContext, useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import { useImageSearch } from './useImageSearch';
import { useSearch } from './useSearch';
import { useVideoSearch } from './useVideoSearch';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [conversation, setConversation] = useState([
    { question: '', length: 0, answers: ['Hello, how can I help you?'] },
  ]);
  const [prompt, setPrompt] = useState(null);
  const [next, setNext] = useState(0);
  const [imagePage, setImagePage] = useState(1);
  const [imagePrompt, setImagePrompt] = useState(null);
  const [newPrompt, setNewPrompt] = useState(null);
  const { data, loading } = useFetch(prompt);
  const { data: optimizedPrompt } = useFetch(newPrompt);
  const { result, resultLoading, nextPage, prevPage } = useSearch(prompt, next);
  const { images, imagesLoading, imagePageCount } = useImageSearch(
    optimizedPrompt,
    imagePage
  );
  const [wallpaper, setWallpaper] = useState(
    parseInt(localStorage.getItem('wallpaper')) || 1
  );
  const { videos, videosLoading } = useVideoSearch(prompt);

  useEffect(() => {
    localStorage.setItem('wallpaper', wallpaper);
  }, [wallpaper]);

  useEffect(() => {
    setImagePage(1);
    setNext(1);
    if (prompt) {
      setNewPrompt(`"${prompt}" most important word in this text is:`);
    }
  }, [prompt]);

  useEffect(() => {
    if (optimizedPrompt) setImagePrompt(optimizedPrompt.replace(/"/g, ''));
  }, [optimizedPrompt]);

  return (
    <Context.Provider
      value={{
        wallpaper,
        setWallpaper,
        nextPage,
        prevPage,
        data,
        loading,
        videos,
        videosLoading,
        next,
        setNext,
        imagePage,
        setImagePage,
        imagePageCount,
        images,
        imagesLoading,
        result,
        resultLoading,
        prompt,
        setPrompt,
        conversation,
        setConversation,
      }}
    >
      {children}
    </Context.Provider>
  );
};
