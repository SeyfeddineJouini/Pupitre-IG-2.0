/**================================================style du gouv=========================== */

// ModalStyles.js
import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80vh',
    overflowY: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    background: '#f9f9f9',
    zIndex: 2000,
    position: 'relative',
  },
};

export const ModalContent = styled.div`
  font-family: 'Arial', sans-serif;
  font-size: 1.1em;
  color: #333;
  line-height: 1.8;
  max-width: 100%;
  overflow: auto;
  padding: 20px;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
    text-align: justify;
  }

  h2, h3, h4, h5, h6 {
    color: #333;
    margin-bottom: 15px;
  }

  a {
    color: #1a73e8;
    text-decoration: none;
    pointer-events: none;
    cursor: default;
    &:hover {
      text-decoration: none;
      color: #1a73e8;
    }
  }

  blockquote {
    margin: 20px 0;
    padding: 20px;
    border-left: 5px solid #1a73e8;
    background: #f0f0f0;
    color: #555;
    font-style: italic;
  }

  ul, ol {
    padding-left: 20px;
    margin-bottom: 20px;
  }

  ul li, ol li {
    margin-bottom: 10px;
  }

  // Adding specific styles for removing unwanted headers and sections
  header, footer, nav, .header, .footer, .nav, sidebar, script{
    display: none !important;
  }

  .content {
    padding: 0 15px;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 2em;
  color: #1a73e8;
  animation: ${fadeIn} 0.5s ease-in-out infinite;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #1a73e8;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

export const CloseButton = styled.button`
  // position: absolute; // Utiliser une position absolue par rapport au contenu du modal
  float: right;
  top: 10px;
  right: 10px;
  padding: 10px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 2001;
`;


/**================================================style du site reporter=========================== */

// // ModalStyles.js
// import styled, { keyframes } from 'styled-components';

// export const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// export const spin = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;

// export const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     width: '80%',
//     maxHeight: '80vh',
//     overflowY: 'auto',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     background: '#f9f9f9',
//     zIndex: 2000,
//     position: 'relative', // Assurez-vous que le modal a une position relative
//   },
// };

// export const ModalContent = styled.div`
//   font-family: 'Arial', sans-serif;
//   font-size: 1.1em;
//   color: #333;
//   line-height: 1.8;
//   max-width: 100%;
//   overflow: auto;
//   padding: 20px;

//   img {
//     max-width: 100%;
//     height: auto;
//     border-radius: 8px;
//     margin-bottom: 20px;
//   }

//   p {
//     margin-bottom: 20px;
//     text-align: justify;
//   }

//   h2, h3, h4, h5, h6 {
//     color: #333;
//     margin-bottom: 15px;
//   }

//   a {
//     color: #1a73e8;
//     text-decoration: none;
//     pointer-events: none;
//     cursor: default;
//     &:hover {
//       text-decoration: none;
//       color: #1a73e8;
//     }
//   }

//   blockquote {
//     margin: 20px 0;
//     padding: 20px;
//     border-left: 5px solid #1a73e8;
//     background: #f0f0f0;
//     color: #555;
//     font-style: italic;
//   }

//   ul, ol {
//     padding-left: 20px;
//     margin-bottom: 20px;
//   }

//   ul li, ol li {
//     margin-bottom: 10px;
//   }
// `;

// export const LoadingSpinner = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   font-size: 2em;
//   color: #1a73e8;
//   animation: ${fadeIn} 0.5s ease-in-out infinite;

//   .spinner {
//     width: 50px;
//     height: 50px;
//     border: 4px solid rgba(255, 255, 255, 0.3);
//     border-top: 4px solid #1a73e8;
//     border-radius: 50%;
//     animation: ${spin} 1s linear infinite;
//   }
// `;

// export const CloseButton = styled.button`
//   // position: absolute; // Utiliser une position absolue par rapport au contenu du modal
//   float: right;
//   top: 10px;
//   right: 10px;
//   padding: 10px;
//   background: #f44336;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   z-index: 2001;
// `;