import { Route, Routes } from 'react-router'

import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import CreatePostPage from './pages/CreatePostPage'
import PostPage from './pages/PostPage'

function App() {

  return (
    <div className='min-h-screen bg-black text-gray-100 pt-20 transition-opacity ease-in-out duration-700'>
      <Header />
      
      <main className='w-full mx-auto py-6 px-4 container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreatePostPage />} />
          <Route path='/post/:id' element={<PostPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
