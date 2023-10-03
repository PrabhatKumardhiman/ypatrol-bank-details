import { useState, useEffect } from 'react';
import './App.css';
import MyForm from './components/MyForm';
import Navbar from './components/Navbar';
import Table from './components/Table';

function App() {
  // States
  const [value, setValue] = useState({ userid: "", name: "", bankcode: "" })
  const [state, setState] = useState([])
  const [success, setSucess] = useState(false)

  // Hook to Load user on render
  useEffect(() => {
    fetchDataOnLoad()
  }, [success])

  // Function that fetched data from Cloud Via Backend Server
  const fetchDataOnLoad = async () => {
    // Api Call to fetch all Details
    try {
      const response = await fetch(`https://backend-assesment.onrender.com/api/details/fetchalldetails`, {
        method: "GET",
      });
      const json = await response.json()
      // Populating Data to State Hook
      setState(json)
    } catch (error) {
      console.error(error.message)
      alert("Connecting to Server! Please Wait...")
    }
  }

  return (
    <div className="App">
      <header><Navbar /></header>
      <main>
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 col-md-4">
              <MyForm success={success} setSucess={setSucess} setValue={setValue} value={value} setState={setState} fetchDataOnLoad={fetchDataOnLoad} />
            </div>
            <div className="col-12 col-md-8">
              <Table state={state} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
