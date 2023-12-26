'use client';

import DownloadButton from '@/app/components/download-button';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useEffect, useRef, useState } from 'react';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const editorFef = useRef<ReactCodeMirrorRef>(null);
  const [image, setImage] = useState<string>();

  useEffect(() => {
    async function handlePasteEvent(e: ClipboardEvent) {
      const clipboardItems = await navigator.clipboard.read();

      const item = clipboardItems[0];
      for (const type of item.types) {
        if (type.startsWith('image/')) {
          const blob = await item.getType(type);
          setImage(URL.createObjectURL(blob));
          break;
        }
      }
    }

    document.addEventListener('paste', handlePasteEvent);
  }, []);

  return (
    <div className="flex items-center justify-center flex-col h-[100dvh] bg-zinc-800">
      <div
        id="canvas"
        ref={ref}
        onClick={() => {
          editorFef.current?.editor?.focus();
        }}
        className={cn(
          'aspect-video bg-[#1e1e1e] relative',
          image ? 'grid grid-cols-2' : 'flex justify-center items-center'
        )}
      >
        <div>
          <CodeMirror
            ref={editorFef}
            value={''}
            theme={vscodeDark}
            onStatistics={(status) => console.log(status)}
            className="shrink-0"
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
          <div
            style={{
              backgroundImage: `url(${image})`,
            }}
            className="bg-cover"
          ></div>
        )}

        {/* <span className="h-10 absolute inset-x-0 top-0 bg-gradient-to-b from-[#1e1e1e]"></span>
        <span className="h-10 absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e1e1e]"></span> */}
      </div>

      <DownloadButton target={ref} />
    </div>
  );
}
