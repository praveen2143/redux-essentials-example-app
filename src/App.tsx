import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AddPostForm } from './features/posts/AddPostForm'
import { Navbar } from './components/Navbar'
import { PostsList } from './features/posts/PostsList'
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
          <Route path="/praveen" element={
            <h1>Welcome Praveen !!!</h1>
          }></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
