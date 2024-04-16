/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div css={css({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    })}>
      <div css={css({
        padding: '20px',
        background: '#fff',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      })}>
        {children}
        <button onClick={onClose} css={css({
          padding: '10px',
          background: '#362259',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          '&:hover': {
            background: '#674c9f',
          },
        })}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
