import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './component/home'
import CreatePost from './page/createpost'
import BlogProvider from './context/blogcontent'
import Signin from './page/signin'
import Login from './page/login'
import UserContext from './context/usercontext'



function App() {

  return( 
  <>
  <UserContext>
  <BlogProvider>
    
  <Router>
    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>    
      <Route path='/createpost' element={<CreatePost/>}/>

    </Routes>
  </Router>
</BlogProvider>
</UserContext>
  </>
  )
}

export default App
