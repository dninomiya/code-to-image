import React from 'react';

export default function AuthorLink() {
  return (
    <div className="p-3 rounded-xl border flex items-center gap-3 fixed bottom-4 right-4 bg-muted/50 text-muted-foreground">
      <img
        src="https://avatars.githubusercontent.com/u/5842851?v=4"
        className="w-8 h-8 rounded-full"
        alt=""
      />
      <a href="http://twitter.com/d151005" target="_blank" className="text-sm">
        nino
        <span className="absolute inset-0"></span>
      </a>
    </div>
  );
}
