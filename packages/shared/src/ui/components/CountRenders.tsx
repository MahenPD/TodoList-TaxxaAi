import { useEffect, useRef, useState } from 'react';

export function CountRenders({ label }: { label: string }) {
  const [mounted, setMounted] = useState(false);
  const renders = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  renders.current++;

  return (
    <div style={{ fontSize: '12px', color: 'gray' }}>
      {label} renders: {renders.current}
    </div>
  );
}
