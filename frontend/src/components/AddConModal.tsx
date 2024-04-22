/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const instructionStyle = css({
    padding: '0.5rem 2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '5px',
  });

  const callbackUrlStyle = css({
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#f7f7f7',
    borderRadius: '5px',
    wordBreak: 'break-all',
    fontSize: '0.8rem'
  });

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
      overflow: 'auto',
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
          <h3 css={css({fontSize: '1.5rem',})}>GitHub OAuth Setup Instructions:</h3>
        <div css={instructionStyle}>
          <ol css={css({display:"flex", flexDirection: "column", gap: '0.2rem', fontSize: '0.8rem'})}>
            <li>Go to the <a href="https://github.com/settings/applications/new" target="_blank">link</a>  to register a new OAuth application on GitHub.</li>
            <li>Copy the OAuth Redirect URL, to the Authorization callback URL field on the GitHub page.</li>
            <li>Click on the 'Register application' button on the GitHub page.</li>
            <li>Copy the Client ID and Client Secret value from the following page.</li>
            <li>Click the 'Submit' button.</li>
            <li>After submitting an Authenticate URL will be generated, click on it to authenticate.</li>
            <li>Congrats! Start using your new GitHub connection within the flows.</li>
          </ol>
        </div>
        <div css={callbackUrlStyle}>
          <strong css={css({fontSize: '1rem',})}>OAuth Redirect URL (Callback URL):</strong> 
          <p>http://localhost:3000/github/auth/signin/callback</p>
        </div>

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
