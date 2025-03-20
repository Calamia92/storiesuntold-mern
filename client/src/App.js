import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import CreateStory from './pages/CreateStory';
import EditStory from './pages/EditStory';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from "./components/PrivateRoute";
import {AuthProvider} from "./contexts/AuthContext";

function App() {
  return (
      <AuthProvider>
      <BrowserRouter>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/stories/new" element={<PrivateRoute><CreateStory/></PrivateRoute>} />
                <Route path="/stories/edit/:id" element={<PrivateRoute><EditStory/></PrivateRoute>} />
                <Route path="/stories/:id" element={<StoryDetail />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Layout>
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
