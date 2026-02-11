import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Builder from './pages/Builder';
import Generating from './pages/Generating';
import Preview from './pages/Preview';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<Builder />} />
        <Route path="/generating" element={<Generating />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
