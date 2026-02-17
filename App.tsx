import React, { useState } from 'react';
import Layout from './components/Layout.tsx';
import Home from './components/Home.tsx';
import Blog from './components/Blog.tsx';
import Marketplace from './components/Marketplace.tsx';
import Store from './components/Store.tsx';
import About from './components/About.tsx';
import { Page } from './types.ts';

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