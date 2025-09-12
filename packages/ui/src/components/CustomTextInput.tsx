import { useState } from 'react';
import { motion } from 'framer-motion';

export const CustomTextInput = ({
  onClick,
  placeholder,
}: {
  onClick?: (text: string) => void;
  placeholder?: string;
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed) {
      onClick?.(trimmed);
      setText('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: 10, width: '100%', marginBottom: 20 }}>
      <input
        value={text}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
        style={{
          flex: 1,
          borderBottomColor: '#9F9F9F',
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 2.5,
          outline: 'none',
          padding: '6px 8px',
          fontSize: 14,
        }}
      />
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: '#606060' }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={handleSubmit}
        style={{
          backgroundColor: '#505050',
          borderWidth: 0,
          borderRadius: 8,
          padding: '4px 12px',
          color: 'white',
          fontSize: 20,
          cursor: 'pointer',
        }}
      >
        +
      </motion.button>
    </div>
  );
};
