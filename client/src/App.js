
import Header from './components/header/Header';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom'

// Views
import About from './views/About';
import Main from './views/Main';
import Contact from './views/Contact';
import Product from './views/Product';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/product" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
