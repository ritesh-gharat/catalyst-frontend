import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
} from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import socket from "../../socket/socket";
import UserChat from "./Chats/UserChat";
import AIChat from "./Chats/AIChat";
import AlertError from "../AlertError/AlertError";
import expertDetail from "../../utils/expertDetail";
import firebaseDB from "../../firebase/db";
import { useAppContext } from "../../context/App.Context";
import { useAuthContext } from "../../context/Auth.Context";

function ChatWindow() {
  const [isAlert, setisAlert] = useState(false);

  // Reference to the chat container
  const chatContainerRef = useRef(null);
  // Get the expertId and sessionId from the URL
  const { expertId, sessionId } = useParams();
  // Get the expert details
  const { expert, expertIcon } = expertDetail(expertId);
  // Get the navigate function
  const navigate = useNavigate();
  // Get the required data from the context
  const {
    prompt,
    response,
    setResponse,
    fileResult,
    setFileResult,
    setSessionHistory,
    activeSession,
    setActiveSession,
    ChatSessions,
  } = useAppContext();

  const { authUser } = useAuthContext();
  // Function to update the session history
  const updateSessionHistory = useCallback(
    (history) => {
      setSessionHistory([history]);
    },
    [setSessionHistory]
  );
  // Function to handle the socket events
  useEffect(() => {
    // Store the session details
    const storeSession = {
      sessionType: expertId,
      history: {
        user: [],
        model: [],
      },
    };

    // Function to handle the socket events
    const handleSocketEvents = (data, eventType) => {
      switch (eventType) {
        case "generateRes":
          setResponse((prev) => prev + data);
          setisAlert(false);
          break;
        case "uploadRes":
          setFileResult(data);
          break;
        case "error":
          setisAlert(true);
          break;
        case "response":
          if (data) {
            // if file is uploaded
            const userMessage =
              fileResult && fileResult.success
                ? { text: prompt, image: fileResult }
                : { text: prompt };

            storeSession.history.user.push(userMessage);
            storeSession.history.model.push({ text: data });

            updateSessionHistory(storeSession.history);

            // on same page
            if (sessionId == 0) {
              firebaseDB
                .createSession(storeSession)
                .then((sessionDetail) => {
                  //console.log("Session created with ID");
                  navigate(`/app/chat/${expertId}/${sessionDetail.id}`);
                })
                .catch((error) => {
                  console.error("Error creating session:", error);
                });
            } else {
              ChatSessions.forEach((session) => {
                if (session.id === activeSession.sessionId) {
                  session.history.user.push(userMessage);
                  session.history.model.push({ text: data });

                  updateSessionHistory(session.history);

                  firebaseDB
                    .updateSession(activeSession.sessionId, session)
                    .then((res) => {
                      //console.log("Session updated successfully");
                    })
                    .catch((error) => {
                      console.error("Error updating session:", error);
                    });
                }
              });
            }
            setResponse(null);
            setFileResult(null);
            setActiveSession({ sessionId: 0, isActive: false });
          }
          break;
        default:
          break;
      }
    };

    socket.on("generateRes", (data) => handleSocketEvents(data, "generateRes"));
    socket.on("uploadRes", (data) => handleSocketEvents(data, "uploadRes"));
    socket.on("error", (data) => handleSocketEvents(data, "error"));
    socket.on("response", (data) => handleSocketEvents(data, "response"));

    return () => {
      socket.off("generateRes");
      socket.off("uploadRes");
      socket.off("error");
      socket.off("response");
    };
  }, [
    expertId,
    prompt,
    response,
    setResponse,
    fileResult,
    setFileResult,
    sessionId,
    activeSession,
    setActiveSession,
    ChatSessions,
    navigate,
  ]);

  const combinedHistory = useMemo(() => {
    if (!ChatSessions) return [];
    const session = ChatSessions.find((session) => session.id === sessionId);
    if (!session) return [];

    const { history } = session;

    updateSessionHistory(history);

    const combined = [];
    const maxLength = Math.max(history.user.length, history.model.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < history.user.length) {
        combined.push({
          type: "user",
          text: history.user[i].text,
          image: history.user[i].image,
        });
      }
      if (i < history.model.length) {
        combined.push({ type: "model", text: history.model[i].text });
      }
    }

    return combined;
  }, [ChatSessions, sessionId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      requestAnimationFrame(() => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [response, combinedHistory, ChatSessions]);

  return expertId === expert ? (
    <div
      className="w-full h-full pt-12 md:pt-0 flex flex-col flex-grow items-center gap-3 bg-Primary Add-Scrollbar-Y"
      ref={chatContainerRef}
    >
      <div className="w-full h-full md:w-3/4">
        {combinedHistory.map((chat, index) =>
          chat.type === "user" ? (
            <UserChat
              key={index}
              profileImg={authUser.profilePicture}
              message={chat.text}
              imageData={chat.image}
            />
          ) : (
            <AIChat key={index} profileImg={expertIcon} message={chat.text} />
          )
        )}
        {/* Display streaming response */}
        {response && activeSession.sessionId == sessionId && (
          <>
            <UserChat
              key={combinedHistory.length + 1}
              profileImg={authUser.profilePicture}
              message={prompt}
              imageData={fileResult}
            />
            <AIChat
              key={combinedHistory.length}
              profileImg={expertIcon}
              message={response.split("Generating...")[1]}
            />
            {isAlert && (
              <AlertError message=" Somthing went wrong from our side" />
            )}
          </>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/app/experts" replace={true} />
  );
}

export default ChatWindow;
