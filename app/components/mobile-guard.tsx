import React from 'react';

export default function MobileGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden lg:block">{children}</div>
      <div className="lg:hidden h-[100dvh] text-muted-foreground text-sm grid place-content-center">
        <p>This app is not supported on mobile devices.</p>
      </div>
    </>
  );
}
