import { useState } from 'react';
import './App.css';
import MyForm from './components/MyForm';
import Navbar from './components/Navbar';
import Table from './components/Table';

function App() {

  const [value, setValue] = useState({userid : "", name : "", bankcode : ""})

  return (
    <div className="App">
      <header><Navbar /></header>
      <main>
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 col-md-4">
              <MyForm setValue = {setValue} value = {value} />
            </div>
            <div className="col-12 col-md-8">
             <Table/>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
