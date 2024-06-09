import { BrowserRouter as Router } from 'react-router-dom'
import BlogProvider from './context/blogcontent'
import AuthProvider from './context/AuthProvider'
import Layout from './component/layout'




function App() {

  return (
    <>
      <Router>
          <BlogProvider>
            <AuthProvider>
              <Layout />
            </AuthProvider>
          </BlogProvider>
      </Router>
    </>
  );
}

export default App
