'use client';

import ImageGroup from '@/app/components/image-group';
import ToolBar from '@/app/components/toolbar';
import { cn } from '@/lib/utils';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import { useRef, useState } from 'react';

export default function Home() {
  const editorFef = useRef<ReactCodeMirrorRef>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center justify-center flex-col min-h-[100dvh] bg-white dark:bg-[#0d1117]">
      <div
        id="canvas"
        ref={canvasRef}
        className={cn(
          'relative aspect-video p-20 flex gap-20 justify-center items-center'
        )}
      >
        <div>
          <CodeMirror
            placeholder={'You Can Paste Image\nSupport tsx, jsx, js'}
            ref={editorFef}
            value=""
            autoFocus
            theme={resolvedTheme === 'dark' ? githubDark : githubLight}
            onStatistics={(status) => console.log(status)}
            onCreateEditor={() => setReady(true)}
            className="caret-transparent text-base font-serif"
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              highlightActiveLineGutter: false,
              highlightActiveLine: false,
            }}
            extensions={[[javascript({ jsx: true, typescript: true })]]}
          />
        </div>

        {ready && <ImageGroup />}
      </div>

      <ToolBar />
    </div>
  );
}
