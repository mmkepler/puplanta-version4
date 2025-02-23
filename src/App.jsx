import { Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import About from './components/About';
import Account from './components/Account';
import Home from './components/Home';
import Parks from './components/Parks';
import Park from "./components/Park";
import Stores from './components/Stores';
import Store from "./components/Store"
import Header from './components/Header'
import Footer from './components/Footer'
import "./styles/App.css"


function App() {
  return (
    <>
      <Header/>
            <main id="main"> 
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/parks" element={<Parks/>}/>
                <Route path="/parks/:id" element={<Park/>}/>
                <Route path="/stores" element={<Stores/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/stores/:id" element={<Store/>}/>
              </Routes>
            </main>
      <Footer/>
        
    </>
  )
}

export default App
