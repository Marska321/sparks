import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  showModal: (title: string, content: string | React.ReactNode) => void;
  hideModal: () => void;
  isVisible: boolean;
  title: string;
  content: string | React.ReactNode;
}

const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
  isVisible: false,
  title: '',
  content: ''
});

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | React.ReactNode>('');

  const showModal = (modalTitle: string, modalContent: string | React.ReactNode) => {
    setTitle(modalTitle);
    setContent(modalContent);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setTitle('');
    setContent('');
  };

  const value = {
    showModal,
    hideModal,
    isVisible,
    title,
    content
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
