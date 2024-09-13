import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [isSubNavVisible, setIsSubNavVisible] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [promptFromCard, setPromptFromCard] = useState("");
  const [response, setResponse] = useState("");
  const [fileResult, setFileResult] = useState(null);
  const [fileData, setFileData] = useState({
    url: null,
    file: null,
    success: false,
  });
  const [activeSession, setActiveSession] = useState({
    sessionId: 0,
    isActive: false,
  });
  const [sessionHistory, setSessionHistory] = useState(undefined);
  const [ChatSessions, setChatSessions] = useState(undefined);

  return (
    <AppContext.Provider
      value={{
        isSubNavVisible,
        setIsSubNavVisible,
        prompt,
        setPrompt,
        promptFromCard,
        setPromptFromCard,
        response,
        setResponse,
        fileResult,
        setFileResult,
        fileData,
        setFileData,
        sessionHistory,
        setSessionHistory,
        activeSession,
        setActiveSession,
        ChatSessions,
        setChatSessions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
