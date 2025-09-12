import { motion } from 'framer-motion';

export const ListItem = ({
  itemData,
  onItemDone,
  onItemRemove,
}: {
  itemData: any;
  onItemDone: (id: string) => void;
  onItemRemove: (id: string) => void;
}) => {
  return (
    <motion.div
      key={itemData.id}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0, height: 0, marginTop: 0, padding: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: 1,
        borderColor: '#9F9F9F',
        borderStyle: 'solid',
        padding: 10,
        marginTop: 12,
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <label
        style={{
          color: itemData.done ? '#9F9F9F' : '#505050',
          textDecoration: itemData.done ? 'line-through' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontWeight: 'bold',
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={itemData.done}
          onChange={() => onItemDone(itemData.id)}
        />
        {itemData.text}
      </label>
      <button
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={() => onItemRemove(itemData.id)}
      >
        x
      </button>
    </motion.div>
  );
};
