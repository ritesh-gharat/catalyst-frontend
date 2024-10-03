import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";
import remarkGfm from "remark-gfm";

const KatexMarkdown = ({ content }) => {
  
  return (
    <ReactMarkdown
      className={"word-wrap"}
      children={content}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-\w+/.test(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={oneDark}
              language={className?.replace("language-", "")}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        table({ children, ...props }) {
          return <table>{children}</table>;
        },
        thead({ children, ...props }) {
          return <thead>{children}</thead>;
        },
        th({ children, ...props }) {
          return <th>{children}</th>;
        },
        td({ children, ...props }) {
          return <td>{children}</td>;
        },
        a({ children, ...props }) {
          if (children.indexOf("https://phet.colorado.edu/sims/html/") !== -1) {
            return <iframe src={children} frameBorder="1"></iframe>;
          } else {
            return (
              <a
                style={{
                  color: "blue",
                }}
                {...props}
              >
                {children}
              </a>
            );
          }
        },
      }}
    />
  );
};

export default KatexMarkdown;
