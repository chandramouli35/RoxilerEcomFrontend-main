import React, { useEffect } from 'react'
import { useState } from 'react'
import './index.css'
// eslint-disable-next-line
import {NoteContext, useData} from '../../DataContext/noteContext'
import {BarChart,Bar,XAxis, YAxis, Tooltip,Legend} from 'recharts'



const BarChartE=()=> {

  const {month, backendDbUrl} = useData();
  const [barChartData, setBarChartData] = useState([])

  useEffect(() => {
    loadBarChartData();

    // eslint-disable-next-line
  }, [month])
  
   //  Fetch BarChartData data from the "ecomdata.db" using an API url.
   const loadBarChartData= async () => {
    const url = `${backendDbUrl}/api/bar-chart/?month=${month}`
    const response = await fetch(url)
    const data = await response.json()
    if(response.ok){
      setBarChartData(data.result)   //.resultBarChartData
      console.log(data)
    }else{
      console.log('bar chart fetching error')
    }
  }

  

  //  Display Month Name at statistics card & Bar Chart
  const displayMonthName = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const selectedMonth = months[parseInt(month, 10) - 1]
    return selectedMonth;
  }

  return (
    <div className='statistics-container'>
      <div className='chart-container'>
          <h1 className='bar-chart-heading'>Transaction Bar Chart for {displayMonthName()}</h1>
          <BarChart width={600} height={300} margin-top={{top:5}} data={barChartData}>
            <XAxis dataKey="range"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey='itemCount' fill="rgba(211, 154, 10, 0.856)" radius={[10, 10, 0, 0]}/>
          </BarChart>
      </div>
    </div>
  )
}

export default BarChartE
