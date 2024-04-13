import { BrowserRouter,Routes,Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from './pages/TaskFormPage';
import Profile from './pages/Profile'
import HomePage from './pages/HomePage'
import EvidencePage from './pages/EvidencePage'
import EvidenceFormPage from "./pages/EvidenceFormPage";
import ProtectedRoute from "./ProtectedRoute";
import {AuthProvider} from "./context/AuthContext";
import {TaskProvider} from "./context/TasksContext";
import { EvidencesProvider } from "./context/EvidencesContext";
import NavBar from "./components/NavBar";
import ChartsPage from "./pages/ChartsPage";


function App() {
  return (  
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <EvidencesProvider>
          <main className="container mx-auto px-10">
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>

            
            <Route element={<ProtectedRoute/>}>
              <Route path="/tasks" element={<TasksPage/>}/>
              <Route path="/add-task" element={<TaskFormPage/>}/>
              <Route path="/tasks/:id" element={<TaskFormPage/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Route>

            <Route element={<ProtectedRoute/>}>
              <Route path="/charts" element={<ChartsPage/>}/>
              <Route path="/evidence" element={<EvidencePage/>}/>
              <Route path="/add-evidence" element={<EvidenceFormPage/>}/>
              <Route path="/evidence/:id" element={<EvidenceFormPage/>}/>
            </Route>
            
          </Routes>
          </main>
          </EvidencesProvider>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
