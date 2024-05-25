import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaRegNewspaper } from 'react-icons/fa';
import Modal from 'react-modal';
import { customStyles, ModalContent, LoadingSpinner, fadeIn, CloseButton } from '../bilan/ModalStyles';

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
    setModalIsOpen(true);
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
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du contenu de l\'article:', error);
        setModalContent('Contenu non disponible');
        setIsLoading(false);
        setLoadingArticle(null);
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
        <CloseButton onClick={closeModal}>Fermer</CloseButton>
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
