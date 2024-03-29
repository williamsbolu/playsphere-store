import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import Prouduct from './pages/Product';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Prouduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
