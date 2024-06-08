import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import BlogProvider from './context/blogcontent'
import AuthProvider from './context/AuthProvider'
import Popover from './context/popover'
import Layout from './component/layout'




function App() {

  return (
    <>
      <Router>
        <Popover>
          <BlogProvider>
            <AuthProvider>
              <Layout />
            </AuthProvider>
          </BlogProvider>
        </Popover>
      </Router>
    </>
  );
}

export default App
