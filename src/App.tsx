import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExplorarEventos from './pages/ExplorarEventos';
import Organizar from './pages/Organizar';
import Resultados from './pages/Resultados';
import VeoGenerator from './pages/VeoGenerator';
import Ajuda from './pages/Ajuda';
import Termos from './pages/Termos';
import Privacidade from './pages/Privacidade';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import EventoDetalhes from './pages/EventoDetalhes';
import { motion } from 'motion/react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 relative bg-transparent pt-16">
          <Routes>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Home />
              </motion.div>
            } />
            <Route path="/evento/:id" element={
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                <EventoDetalhes />
              </motion.div>
            } />
            <Route path="/explorar" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <ExplorarEventos />
              </motion.div>
            } />
            <Route path="/organizar" element={
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <Organizar />
              </motion.div>
            } />
            <Route path="/resultados" element={
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Resultados />
              </motion.div>
            } />
            <Route path="/veo" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <VeoGenerator />
              </motion.div>
            } />
            <Route path="/ajuda" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Ajuda />
              </motion.div>
            } />
            <Route path="/termos" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Termos />
              </motion.div>
            } />
            <Route path="/privacidade" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Privacidade />
              </motion.div>
            } />
            <Route path="/contato" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Contato />
              </motion.div>
            } />
            <Route path="/login" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Login />
              </motion.div>
            } />
            <Route path="/cadastro" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Cadastro />
              </motion.div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
