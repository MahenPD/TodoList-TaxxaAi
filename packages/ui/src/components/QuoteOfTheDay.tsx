type Quote = {
  content: string;
  author: string;
};

export const QuoteOfTheDay = ({
  quote,
  loading,
}: {
  quote: Quote;
  loading: boolean;
}) => {
  return (
    <div
      style={{
        marginTop: '50px',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px', color: 'gray' }}>
        Motivation for the Day
      </div>

      {loading && <p>Loading...</p>}

      {quote && (
        <blockquote style={{ margin: 0, color: '#9F9F9F' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '4px' }}>
            “{quote.content}”
          </p>
          <p style={{ textAlign: 'right', margin: 0 }}>— {quote.author}</p>
        </blockquote>
      )}
    </div>
  );
};
