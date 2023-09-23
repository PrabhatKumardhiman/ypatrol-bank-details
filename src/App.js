import { useState, useEffect } from 'react';
import './App.css';
import MyForm from './components/MyForm';
import Navbar from './components/Navbar';
import Table from './components/Table';

function App() {

  const [value, setValue] = useState({userid : "", name : "", bankcode : ""})
  const [state, setState] = useState([])

  useEffect(() => {
   fetchDataOnLoad()
  }, [])

  const fetchDataOnLoad = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/details/fetchalldetails`, {
          method: "GET", 
      });
      const json = await response.json()
      setState(json)

  } catch (error) {
      console.error(error.message)
  }
  }

  return (
    <div className="App">
      <header><Navbar /></header>
      <main>
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 col-md-4">
              <MyForm setValue = {setValue} value = {value} setState = {setState} fetchDataOnLoad = {fetchDataOnLoad}/>
            </div>
            <div className="col-12 col-md-8">
             <Table state = {state}/>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
