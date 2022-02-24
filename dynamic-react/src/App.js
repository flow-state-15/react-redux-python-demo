
import './App.css';

import Header from './components/Header'
import Gif from './components/Gif'
import Posts from './components/Posts'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header />

      <main className="App-main">
        <Gif />
        <Posts />
      </main>

      <Footer />
    </div>
  );
}

export default App;
