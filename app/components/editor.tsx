'use client';

import { useApp } from '@/app/providers/app-provider';
import { KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import { codeToHtml } from 'shikiji/bundle/web';

export default function Editor() {
  const [value, setValue] = useState<string>('');
  const [html, setHTML] = useState<string>('');
  const { lang } = useApp();
  const handleHotKey: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      const shiftKey = e.shiftKey;
      const textarea = e.target as HTMLTextAreaElement;
      const val = textarea.value;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const tabSize = 2;

      if (e.key === 'Tab') {
        e.preventDefault();

        if (shiftKey) {
          if (val.substring(start - tabSize, start) === ' '.repeat(tabSize)) {
            textarea.value =
              val.substring(0, start - tabSize) + val.substring(start);
            textarea.selectionStart = textarea.selectionEnd = start - tabSize;
          }
        } else {
          textarea.value =
            val.substring(0, start) + ' '.repeat(tabSize) + val.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + tabSize;
        }

        textarea.dispatchEvent(new Event('input'));
      }
    },
    []
  );

  useEffect(() => {
    codeToHtml(value, {
      lang,
      themes: {
        dark: 'dark-plus',
        light: 'light-plus',
      },
      defaultColor: false,
      meta: {
        tabindex: '-1',
      },
    }).then((res) => setHTML(res));
  }, [value, lang]);

  useEffect(() => {
    const handleWindowClick = () => {
      const el = document.querySelector('textarea');
      if (!el) return;
      el.focus();
    };

    document.body.addEventListener('click', handleWindowClick);

    return () => {
      document.body.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <div className="relative">
      <textarea
        value={value}
        onKeyDown={handleHotKey}
        onChange={(e) => {
          resize(e.target);
          setValue(e.target.value);
        }}
        autoFocus
        spellCheck={false}
        className="editor"
      />
      <div className="formatted" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

const resize = (el: HTMLTextAreaElement) => {
  el.style.height = 'var(--editor-line-height)';
  el.style.height = el.scrollHeight + 'px';
  el.style.width = 'var(--editor-min-width)';
  el.style.width = el.scrollWidth + 'px';
};
