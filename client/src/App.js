import { Layout } from "./components/Layout.jsx"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { MainPage } from "./pages/MainPage.jsx"
import { AllMyPostsPage } from "./pages/AllMyPostsPage.jsx"
import { PostPage } from "./pages/PostPage.jsx"
import { AddPostPage } from "./pages/AddPostPage.jsx"
import { RegistrationPage } from "./pages/RegistrationPage.jsx"
import { LoginPage } from "./pages/LoginPage.jsx"
import { EditPostPage } from "./pages/EditPostPage.jsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react"
import { getUser } from "./reducers/features/auth/authSlice.js"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='post/user/me' element={<AllMyPostsPage />} />
        <Route path=':id' element={<PostPage />} />
        <Route path=':id/edit' element={<EditPostPage />} />
        <Route path='addpost' element={<AddPostPage />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='login' element={<LoginPage />} />
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
    </Layout>
  );
}

export default App;
