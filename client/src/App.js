
import Header from './components/header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Views
import About from './views/About';
import Main from './views/Main';
import Contact from './views/Contact';
import Products from './views/Products';

function App() {
  return (
    <Router>
      <div className="leading-normal tracking-normal" >
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;