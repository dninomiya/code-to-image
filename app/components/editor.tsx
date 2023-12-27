'use client';

import { useApp } from '@/app/providers/app-provider';
import { useEffect, useState } from 'react';
import { codeToHtml } from 'shikiji/bundle/web';

export default function Editor() {
  const [value, setValue] = useState<string>('');
  const [html, setHTML] = useState<string>('');
  const { lang } = useApp();

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
