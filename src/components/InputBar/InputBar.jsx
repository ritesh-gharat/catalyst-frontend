import React, {
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket/socket.js";
import AddImgSvg from "../../assets/add_images.svg?react";
import CameraSvg from "../../assets/camera.svg?react";
import SendSvg from "../../assets/send1.svg?react";
import expertDetail from "../../utils/expertDetail";
import { useAppContext } from "../../context/App.Context";

function InputBar() {
  const { prompt, setPrompt } = useAppContext();

  const textareaRef = useRef(null);
  const { expertId } = useParams();
  const sesType = expertId || "learning";
  const { title } = expertDetail(sesType);

  useEffect(() => {
    const handleInput = () => {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };

    const textarea = textareaRef.current;
    textarea.addEventListener("input", handleInput);

    return () => {
      textarea.removeEventListener("input", handleInput);
    };
  }, []);

  useEffect(() => {
    socket.on("generateRes", (data) => console.log(data));
    socket.on("response", (data) => console.log(data));

    return () => {
      socket.off("generateRes");
      socket.off("response");
    };
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const backendSession = {
        prompt: prompt,
      };

      if (textareaRef.current.value === "" && e.target.textContent === "")
        return;

      socket.emit("generate", backendSession);

      textareaRef.current.value = "";
    },
    [prompt]
  );

  return (
    <div className="w-full flex flex-col justify-center items-center bg-Primary p-4">
      <div
        className="w-full md:w-3/4 px-4 py-2 flex items-center rounded-md gap-4 bg-Secondary"
        style={{ minHeight: "48px", maxHeight: "20vh" }}
      >
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            ref={textareaRef}
            className="w-full text-base font-normal pt-2 pb-2 text-PrimaryText placeholder-PrimaryText bg-transparent border-none outline-none resize-none Add-Scrollbar"
            rows="1"
            style={{ maxHeight: "20vh" }}
            placeholder={
              sesType === "learning" ? "Ask Catalyst AI" : `Ask ${title} Expert`
            }
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
        </form>
        <div className="flex items-center gap-4">
          <button
            className="w-6 h-6"
          >
            <AddImgSvg className="w-6 h-6 fill-PrimarySvg" />
          </button>
          <button
            className="w-6 h-6 md:hidden"
          >
            <CameraSvg className="w-6 h-6 fill-PrimarySvg" />
          </button>
          <button
            className="w-6 h-6"
            type="submit"
            onClick={handleSubmit}
          >
            <SendSvg className="w-6 h-6 fill-PrimarySvg" />
          </button>
        </div>
      </div>
      <span className="w-full md:w-11/12 pt-1 text-xs text-center text-PrimaryText">
        Catalyst AI can make mistakes. Check important information.
      </span>
    </div>
  );
}

//export { handleSubmit };

export default InputBar;
