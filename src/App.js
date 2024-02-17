import React from 'react'
import {BrowserRouter as Router, Routes,  Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Statistics from './components/Statistics'
import BarChartE from './components/BarChart'
import PaiChartE from './components/PaiChart'
import './App.css';
import NoteState from './DataContext/noteState'

function App(){
  return (
    <NoteState>
      <Router>
          <NavBar />
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/statistics' element={<Statistics/>}/>
              <Route exact path='/bar-chart' element={<BarChartE/>} />
              <Route exact path='/pai-chart' element={<PaiChartE/>} />
            </Routes>
      </Router>
    </NoteState>
  )
}

export default App;
