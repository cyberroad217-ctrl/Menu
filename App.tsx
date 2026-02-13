
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import Marketplace from './components/Marketplace';
import Store from './components/Store';
import About from './components/About';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'blog': return <Blog />;
      case 'marketplace': return <Marketplace />;
      case 'store': return <Store />;
      case 'about': return <About />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
