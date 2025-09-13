import { motion } from 'framer-motion';

export const Button = ({
  buttonTitle,
  onClick,
  disabled,
}: {
  buttonTitle: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: '#606060' }}
      transition={{ type: 'spring', stiffness: 250 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: '#505050',
        borderWidth: 0,
        borderRadius: 8,
        padding: '12px 12px',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      {buttonTitle}
    </motion.button>
  );
};
