import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { FaRegNewspaper } from 'react-icons/fa';
import Modal from 'react-modal';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const NewsContainer = styled.div`
  width: 100%;
  height: 600px;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Article = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transform: scale(1.02);
  }
`;

const ArticleTitle = styled.div`
  font-size: 1.4em;
  font-weight: bold;
  color: #1a73e8;
  margin-bottom: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
    color: #1558b8;
  }
`;

const ArticleIcon = styled(FaRegNewspaper)`
  margin-right: 10px;
  color: #1a73e8;
`;

const ArticleDescription = styled.div`
  font-size: 1em;
  color: #444;
  line-height: 1.6;
  margin-bottom: 15px;

  a {
    pointer-events: none;
    cursor: default;
    color: inherit;
    text-decoration: none;
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const LoadingSpinner = styled.div`
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

const customStyles = {
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
  },
};

const ModalContent = styled.div`
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
`;

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(null);

  useEffect(() => {
    const rssUrl = 'https://rss2json.com/api.json?rss_url=https://reporterre.net/spip.php?page=backend-simple';

    axios.get(rssUrl)
      .then(response => {
        setArticles(response.data.items);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles:', error);
      });
  }, []);

  const openModal = (link, articleGuid) => {
    setIsLoading(true);
    setLoadingArticle(articleGuid);
    axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(link)}`)
      .then(response => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data.contents, 'text/html');
        const articleContent = doc.querySelector('.texte').innerHTML;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = articleContent;
        const links = tempDiv.getElementsByTagName('a');
        for (let link of links) {
          link.removeAttribute('href');
        }

        setModalContent(tempDiv.innerHTML);
        setIsLoading(false);
        setLoadingArticle(null);
        setModalIsOpen(true);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du contenu de l\'article:', error);
        setModalContent('Contenu non disponible');
        setIsLoading(false);
        setLoadingArticle(null);
        setModalIsOpen(true);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent('');
  };

  const sanitizeDescription = (description) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const links = tempDiv.getElementsByTagName('a');
    for (let link of links) {
      link.removeAttribute('href');
    }
    return tempDiv.innerHTML;
  };

  return (
    <NewsContainer>
      <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Actualités de Reporterre</h2>
      {articles.length === 0 ? (
        <p style={{ fontSize: '1.2em', color: '#777' }}>Chargement des articles...</p>
      ) : (
        articles.map(article => (
          <Article key={article.guid} onClick={() => openModal(article.link, article.guid)}>
            {loadingArticle === article.guid ? (
              <LoadingSpinner>
                <div className="spinner"></div>
              </LoadingSpinner>
            ) : (
              <>
                {/* <ArticleImage src={article.enclosure ? article.enclosure.link : 'https://via.placeholder.com/700x467'} alt={article.title} /> */}
                <ArticleTitle>
                  <ArticleIcon /> {article.title}
                </ArticleTitle>
                <ArticleDescription dangerouslySetInnerHTML={{ __html: sanitizeDescription(article.description) }} />
              </>
            )}
          </Article>
        ))
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Article"
      >
        <button onClick={closeModal} style={{ float: 'right', padding: '10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Fermer</button>
        {isLoading ? (
          <LoadingSpinner>
            <div className="spinner"></div>
          </LoadingSpinner>
        ) : (
          <ModalContent dangerouslySetInnerHTML={{ __html: modalContent }} />
        )}
      </Modal>
    </NewsContainer>
  );
};

export default NewsFeed;
