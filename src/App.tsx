import Login from './components/Login'
import { ProdutoP } from './components/ProdutoP'
import './styles/global.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/produto' element={<ProdutoP/>}/>
      </Routes>
    </Router>

    
  )
}

export default App
