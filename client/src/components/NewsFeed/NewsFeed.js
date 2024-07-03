import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaRegNewspaper } from 'react-icons/fa';
import Modal from 'react-modal';
import { customStyles, ModalContent, LoadingSpinner, fadeIn, CloseButton } from './ModalStyles';



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

/**===================================Code Actualité site gouv======================================================== */

// const NewsFeed = () => {
//   const [articles, setArticles] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingArticle, setLoadingArticle] = useState(null);

//   useEffect(() => {
//     const rssUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.ecologie.gouv.fr/rss_presse.xml');

//     axios.get(rssUrl)
//       .then(response => {
//         const base64Content = response.data.contents.split(",")[1];
//         const decodedContent = decodeURIComponent(escape(atob(base64Content)));
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(decodedContent, 'application/xml');
//         const items = doc.querySelectorAll('item');
//         const articles = Array.from(items).map(item => ({
//           guid: item.querySelector('guid').textContent,
//           title: item.querySelector('title').textContent,
//           description: item.querySelector('description').textContent,
//           link: item.querySelector('link').textContent
//         }));
//         setArticles(articles);
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des articles:', error);
//       });
//   }, []);

//   const openModal = (link, articleGuid) => {
//     setIsLoading(true);
//     setLoadingArticle(articleGuid);
//     setModalIsOpen(true);
//     axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(link)}`)
//       .then(response => {
//         const articleContent = sanitizeContent(response.data.contents);
//         setModalContent(articleContent);
//         setIsLoading(false);
//         setLoadingArticle(null);
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération du contenu de l\'article:', error);
//         setModalContent('Contenu non disponible');
//         setIsLoading(false);
//         setLoadingArticle(null);
//       });
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setModalContent('');
//   };

//   const sanitizeDescription = (description) => {
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = description;
//     const links = tempDiv.getElementsByTagName('a');
//     for (let link of links) {
//       link.removeAttribute('href');
//     }
//     return tempDiv.innerHTML;
//   };

//   return (
//     <NewsContainer>
//       {/* <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Actualités du Ministère de la Transition Écologique et Solidaire</h2> */}
//       {articles.length === 0 ? (
//         <p style={{ fontSize: '1.2em', color: '#777' }}>Chargement des articles...</p>
//       ) : (
//         articles.map(article => (
//           <Article key={article.guid} onClick={() => openModal(article.link, article.guid)}>
//             {loadingArticle === article.guid ? (
//               <LoadingSpinner>
//                 <div className="spinner"></div>
//               </LoadingSpinner>
//             ) : (
//               <>
//                 <ArticleTitle>
//                   <ArticleIcon /> {article.title}
//                 </ArticleTitle>
//                 <ArticleDescription dangerouslySetInnerHTML={{ __html: sanitizeDescription(article.description) }} />
//               </>
//             )}
//           </Article>
//         ))
//       )}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Article"
//       >
//         <CloseButton onClick={closeModal}>Fermer</CloseButton>
//         {isLoading ? (
//           <LoadingSpinner>
//             <div className="spinner"></div>
//           </LoadingSpinner>
//         ) : (
//           <ModalContent dangerouslySetInnerHTML={{ __html: modalContent }} />
//         )}
//       </Modal>
//     </NewsContainer>
//   );
// };

// export default NewsFeed;





// const NewsContainer = styled.div`
//   width: 100%;
//   height: 600px;
//   overflow-y: auto;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//   padding: 20px;
//   font-family: 'Arial', sans-serif;
// `;

// const Article = styled.div`
//   margin-bottom: 20px;
//   padding: 15px;
//   border-radius: 8px;
//   transition: box-shadow 0.3s ease-in-out;
//   animation: ${fadeIn} 0.5s ease-in;
//   cursor: pointer;
//   &:hover {
//     box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//     transform: scale(1.02);
//   }
// `;

// const ArticleTitle = styled.div`
//   font-size: 1.4em;
//   font-weight: bold;
//   color: #1a73e8;
//   margin-bottom: 10px;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   &:hover {
//     text-decoration: underline;
//     color: #1558b8;
//   }
// `;

// const ArticleIcon = styled(FaRegNewspaper)`
//   margin-right: 10px;
//   color: #1a73e8;
// `;

// const ArticleDescription = styled.div`
//   font-size: 1em;
//   color: #444;
//   line-height: 1.6;
//   margin-bottom: 15px;

//   a {
//     pointer-events: none;
//     cursor: default;
//     color: inherit;
//     text-decoration: none;
//   }
// `;

// const ArticleImage = styled.img`
//   width: 100%;
//   height: auto;
//   margin-bottom: 10px;
//   border-radius: 8px;
// `;


/**===================================Code Actualité New York times======================================================== */

// const NewsFeed = () => {
//   const [articles, setArticles] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingArticle, setLoadingArticle] = useState(null);

//   useEffect(() => {
//     const rssUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://rss.nytimes.com/services/xml/rss/nyt/World.xml');

//     axios.get(rssUrl)
//       .then(response => {
//         console.log('Contenu brut de la réponse:', response.data.contents); // Afficher le contenu brut de la réponse
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(response.data.contents, 'application/xml');
//         const items = doc.querySelectorAll('item');
//         const articles = Array.from(items).map(item => ({
//           guid: item.querySelector('guid').textContent,
//           title: item.querySelector('title').textContent,
//           description: item.querySelector('description').textContent,
//           link: item.querySelector('link').textContent
//         }));
//         setArticles(articles);
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des articles:', error);
//       });
//   }, []);

//   const openModal = (link, articleGuid) => {
//     setIsLoading(true);
//     setLoadingArticle(articleGuid);
//     setModalIsOpen(true);
//     axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(link)}`)
//       .then(response => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(response.data.contents, 'text/html');
//         const articleContent = doc.querySelector('body')?.innerHTML || 'Contenu non disponible';

//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = articleContent;
//         const links = tempDiv.getElementsByTagName('a');
//         for (let link of links) {
//           link.removeAttribute('href');
//         }

//         setModalContent(tempDiv.innerHTML);
//         setIsLoading(false);
//         setLoadingArticle(null);
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération du contenu de l\'article:', error);
//         setModalContent('Contenu non disponible');
//         setIsLoading(false);
//         setLoadingArticle(null);
//       });
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setModalContent('');
//   };

//   const sanitizeDescription = (description) => {
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = description;
//     const links = tempDiv.getElementsByTagName('a');
//     for (let link of links) {
//       link.removeAttribute('href');
//     }
//     return tempDiv.innerHTML;
//   };

//   return (
//     <NewsContainer>
//       {/* <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Actualités du NY Times</h2> */}
//       {articles.length === 0 ? (
//         <p style={{ fontSize: '1.2em', color: '#777' }}>Chargement des articles...</p>
//       ) : (
//         articles.map(article => (
//           <Article key={article.guid} onClick={() => openModal(article.link, article.guid)}>
//             {loadingArticle === article.guid ? (
//               <LoadingSpinner>
//                 <div className="spinner"></div>
//               </LoadingSpinner>
//             ) : (
//               <>
//                 <ArticleTitle>
//                   <ArticleIcon /> {article.title}
//                 </ArticleTitle>
//                 <ArticleDescription dangerouslySetInnerHTML={{ __html: sanitizeDescription(article.description) }} />
//               </>
//             )}
//           </Article>
//         ))
//       )}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Article"
//       >
//         <CloseButton onClick={closeModal}>Fermer</CloseButton>
//         {isLoading ? (
//           <LoadingSpinner>
//             <div className="spinner"></div>
//           </LoadingSpinner>
//         ) : (
//           <ModalContent dangerouslySetInnerHTML={{ __html: modalContent }} />
//         )}
//       </Modal>
//     </NewsContainer>
//   );
// };

// export default NewsFeed;

/**===================================Actualité Reporterre======================================================== */

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const fetchArticles = async () => {
    const rssUrl = 'https://rss2json.com/api.json?rss_url=https://reporterre.net/spip.php?page=backend-simple';
    try {
      const response = await axios.get(rssUrl);
      console.log('Articles reçus:', response.data.items); // Log des articles reçus
      setArticles(response.data.items);
      setLastFetchTime(Date.now());
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  };

  useEffect(() => {
    const fetchTime = localStorage.getItem('lastFetchTime');
    const cachedArticles = localStorage.getItem('articles');

    if (fetchTime && cachedArticles && (Date.now() - fetchTime) < 3600000) {
      setArticles(JSON.parse(cachedArticles));
    } else {
      fetchArticles().then(() => {
        localStorage.setItem('articles', JSON.stringify(articles));
        localStorage.setItem('lastFetchTime', Date.now());
      });
    }
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



/**===================================Code Actualité Reporterre, données en format xml (https://reporterre.net/spip.php?page=backend-simple)======================================================== */
