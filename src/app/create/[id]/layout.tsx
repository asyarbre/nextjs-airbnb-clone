import * as React from 'react';

export default function LayoutCreation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mt-10'>
      <main>{children}</main>
    </div>
  );
}
