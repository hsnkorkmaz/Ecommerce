
import Header from './components/header/Header';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

// Views
import About from './views/About';
import Main from './views/Main';
import Contact from './views/Contact';
import Products from './views/Products';
import Register from './views/Register';
import Login from './views/Login';
import Profile from './views/Profile';

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
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;