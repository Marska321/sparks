import React from 'react';
import { X } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

const Modal: React.FC = () => {
  const { isVisible, title, content, hideModal } = useModal();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={hideModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {typeof content === 'string' ? (
            <p className="text-gray-700">{content}</p>
          ) : (
            content
          )}
        </div>
        <div className="p-6 border-t">
          <button
            onClick={hideModal}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
