import { Routes, Route } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import About from './components/About'
import Account from './components/Account'
import Home from './components/Home'
import Parks from './components/Parks'
import Park from "./components/Park"
import Stores from './components/Stores'
import Store from "./components/Store"
import Header from './components/Header'
import Footer from './components/Footer'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import PasswordChange from './components/PasswordChange'
import ResetPassword from './components/ResetPassword'
import NotFound from './components/NotFound'
import Validate from './components/Validate'
import "./styles/App.css"
import ProtectedRoute from './lib/protectedRoute'

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
                <Route path="/stores/:id" element={<Store/>}/>
                
                <Route path="/account" element={
                  <ProtectedRoute>
                    <Account/>
                  </ProtectedRoute>
                  }/>
                <Route path="/password-change" element={
                <ProtectedRoute>
                  <PasswordChange/>
                </ProtectedRoute>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/validate" element={<Validate/>} />
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
            </main>
      <Footer/> 
    </>
  )
}

export default App
