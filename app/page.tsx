'use client';

import { cn } from '@/lib/utils';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const editorFef = useRef<ReactCodeMirrorRef>(null);
  const [image, setImage] = useState<string>();

  useEffect(() => {
    async function handlePasteEvent(e: ClipboardEvent) {
      if (!e.clipboardData) return;

      const items = e.clipboardData.items;

      const item = items[0];
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();

        if (!blob) return;

        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      }
    }

    document.addEventListener('paste', handlePasteEvent);

    return () => {
      document.removeEventListener('paste', handlePasteEvent);
    };
  }, []);

  return (
    <div
      onClick={() => {
        // editorFef.current?.editor?.focus();
      }}
      className="flex items-center justify-center flex-col h-[100dvh] bg-[#1e1e1e]"
    >
      <div className={cn('relative flex justify-center items-center')}>
        <div>
          <CodeMirror
            ref={editorFef}
            value={''}
            autoFocus
            theme={vscodeDark}
            onStatistics={(status) => console.log(status)}
            className="caret-transparent"
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              highlightActiveLineGutter: false,
              highlightActiveLine: false,
            }}
            extensions={[[javascript({ jsx: true, typescript: true })]]}
          />
        </div>

        {image && (
          <div className="p-10">
            <img
              src={image}
              alt=""
              className="shadow-2xl rounded-lg block max-w-lg max-h-96"
            />
          </div>
        )}

        {/* <span className="h-10 absolute inset-x-0 top-0 bg-gradient-to-b from-[#1e1e1e]"></span>
        <span className="h-10 absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e1e1e]"></span> */}
      </div>

      {/* <DownloadButton target={ref} /> */}
    </div>
  );
}
