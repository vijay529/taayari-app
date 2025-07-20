import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {


  return (
    <>
      <div className='max-w-dvw px-2'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<h2>error</h2>} />
        </Routes>
      </div>
    </>
  )
}

export default App
