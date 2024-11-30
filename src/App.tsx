import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AddPostForm } from './features/posts/AddPostForm'
import { Navbar } from './components/Navbar'
import { PostsList } from './features/posts/PostsList'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPostForm />
                <PostsList />
              </>
            }
          ></Route>
          <Route path="/post/:postId" element={
            <SinglePostPage/>
          }></Route>
                    <Route path="/posts/:postId" element={
            <EditPostForm/>
          }></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
