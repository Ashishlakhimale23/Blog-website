import { BrowserRouter as Router } from 'react-router-dom'
import BlogProvider from './context/blogcontent'
import AuthProvider from './context/AuthProvider'
import Layout from './component/layout'
import { UserInfoProvider } from './context/UserInfoProvider';




function App() {

  return (
    <>
      <Router>
        <BlogProvider>
          <UserInfoProvider>
            <AuthProvider>
              <Layout />
            </AuthProvider>
          </UserInfoProvider>
        </BlogProvider>
      </Router>
    </>
  );
}

export default App
