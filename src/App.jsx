import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddTask from './components/AddTask';
import './App.css'
import HomePage from './pages/HomePage';
import EditTask from './components/EditTask';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (<Router>
    <body class="text-[#111827]">
      <nav class="container relative py-3">
        <div class="flex items-center justify-between">
          <Link to="/">
            <img src="./images/logo.svg" />
          </Link>
          <div class="flex-1 max-w-xs search-field group">
            <i class="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
            <input type="text" placeholder="Search Task" class="search-input" id="lws-searchTask" value={searchQuery} onChange={handleSearch} />
          </div>
        </div>
      </nav>
      <div class="container relative">
        <Routes >
          <Route path="/" element={<HomePage searchQuery={searchQuery} />}></Route>
          <Route path="/add-new" element={<AddTask />}></Route>
          <Route path="/edit-task/:taskId" element={<EditTask />}></Route>
        </Routes>
      </div>
    </body>
  </Router>
  )
}

export default App
