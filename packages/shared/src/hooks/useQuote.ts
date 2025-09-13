import { useEffect, useState } from 'react';

export type Quote = { content: string; author: string };

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.realinspire.live/v1/quotes/random');
      const data: Quote[] = await res.json();
      setQuote(data[0]);
    } catch (err) {
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return { quote, loading, refetch: fetchQuote };
};
