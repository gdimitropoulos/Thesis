import React from 'react';
import Image from 'next/image';
import { CopyBlock, dracula } from "react-code-blocks";

export default function SyntaxHighlighter({ code, language, showLineNumbers }) {
  return (
    <div style={{overflow:"auto", flex: 1, maxHeight: 300}}>
  <CopyBlock
    text={code}
    language={language}
    showLineNumbers={showLineNumbers}
    theme={dracula}
    codeBlock
  />
  </div>);
}