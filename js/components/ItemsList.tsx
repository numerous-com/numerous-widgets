import React from 'react';

interface Item {
  id: string;
  name: string;
}

interface ItemsListProps {
  items: Item[];
  onSelectItem: (itemId: string) => void;
  selectedItemId?: string;
}

const ItemsList: React.FC<ItemsListProps> = ({
  items,
  onSelectItem,
  selectedItemId,
}) => {
  return (
    <div className="items-list flex flex-col overflow-auto">
      {items.map((item) => (
        <button
          key={item.id}
          className={`w-full text-left p-3 hover:bg-gray-50 ${
            selectedItemId === item.id 
              ? 'bg-blue-100 border-l-4 border-blue-500' 
              : ''
          }`}
          onClick={() => onSelectItem(item.id)}
          aria-selected={selectedItemId === item.id}
          role="option"
        >
          <h3 className="font-medium">{item.name}</h3>
        </button>
      ))}
    </div>
  );
};

export default ItemsList; 