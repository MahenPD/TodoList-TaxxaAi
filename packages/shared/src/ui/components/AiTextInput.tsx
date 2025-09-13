import { useState } from 'react';
import { Button } from './Button';

export const AiTextInput = ({
  onClick,
  placeholder,
  buttonText,
  disabled,
}: {
  onClick?: (text: string) => void;
  placeholder?: string;
  buttonText: string;
  disabled?: boolean;
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <input
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
        value={text}
        placeholder={placeholder || 'Enter your prompt'}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <Button
        onClick={handleSubmit}
        buttonTitle={buttonText}
        disabled={disabled}
      />
    </div>
  );
};
