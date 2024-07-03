import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaRegNewspaper } from 'react-icons/fa';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import localforage from 'localforage';
// import './NewsFeed.css'; // Assurez-vous de bien importer vos styles
import { customStyles, ModalContent, LoadingSpinner, fadeIn, CloseButton } from './ModalStyles';

const CACHE_KEY = 'news_articles';
const CACHE_EXPIRY_KEY = 'news_articles_expiry';
const CACHE_EXPIRY_TIME = 3600000; // 1 heure en millisecondes


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
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Limit the number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    pointer-events: none;
    cursor: default;
    color: inherit;
    text-decoration: none;
  }
`;

const sanitizeContent = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Remove unwanted elements
  const unwantedSelectors = ['header', 'footer', 'nav', '.sidebar', 'script'];
  unwantedSelectors.forEach(selector => {
    const elements = doc.querySelectorAll(selector);
    elements.forEach(el => el.remove());
  });

  // Clean links
  const links = doc.querySelectorAll('a');
  links.forEach(link => link.removeAttribute('href'));

  return doc.body.innerHTML;
};


const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(null);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    setIsLoading(true);
    const rssUrl = 'https://rss2json.com/api.json?rss_url=https://reporterre.net/spip.php?page=backend-simple';
    try {
      const response = await axios.get(rssUrl);
      setArticles(response.data.items);
      localforage.setItem(CACHE_KEY, response.data.items);
      localforage.setItem(CACHE_EXPIRY_KEY, Date.now() + CACHE_EXPIRY_TIME);
      setIsLoading(false);
    } catch (error) {
      setError('Erreur lors de la récupération des articles.');
      console.error('Erreur lors de la récupération des articles:', error);
      setIsLoading(false);
    }
  };

  const clearCache = async () => {
    await localforage.removeItem(CACHE_KEY);
    await localforage.removeItem(CACHE_EXPIRY_KEY);
    setArticles([]);
    fetchArticles();
  };

  useEffect(() => {
    const getCachedArticles = async () => {
      const expiryTime = await localforage.getItem(CACHE_EXPIRY_KEY);
      if (expiryTime && Date.now() < expiryTime) {
        const cachedArticles = await localforage.getItem(CACHE_KEY);
        if (cachedArticles) {
          setArticles(cachedArticles);
          return;
        }
      }
      fetchArticles();
    };

    getCachedArticles();
  }, []);

  const openModal = (link, articleGuid) => {
    setIsLoading(true);
    setLoadingArticle(articleGuid);
    setModalIsOpen(true);
    axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(link)}`)
      .then(response => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data.contents, 'text/html');
        const articleContent = doc.querySelector('.texte')?.innerHTML || 'Contenu non disponible';

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
      <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Reporterre</h2>
      <button
        onClick={clearCache}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          fontSize: '1em',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <FontAwesomeIcon icon={faSyncAlt} />
        Vider le cache
      </button>
      {isLoading ? (
        <p style={{ fontSize: '1.2em', color: '#777' }}>Chargement des articles...</p>
      ) : error ? (
        <p style={{ fontSize: '1.2em', color: 'red' }}>{error}</p>
      ) : articles.length === 0 ? (
        <p style={{ fontSize: '1.2em', color: '#777' }}>Aucun article disponible.</p>
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