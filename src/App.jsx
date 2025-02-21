import { Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import About from './components/About';
import Account from './components/Account';
import Home from './components/Home';
import Parks from './components/Parks';
import Stores from './components/Stores';
import Header from './components/Header'
import Footer from './components/Footer'
import './styles/App.css'



const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;



function App() {


  return (
    <>
      <Header/>
            <main id="main"> 
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/parks" element={<Parks/>}/>
                <Route path="/stores" element={<Stores/>}/>
                <Route path="/account" element={<Account/>}/>
              </Routes>
            </main>
      <Footer/>
        
    </>
  )
}

export default App
