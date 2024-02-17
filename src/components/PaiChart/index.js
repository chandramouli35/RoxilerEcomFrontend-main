// import React from 'react'
import './index.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
// eslint-disable-next-line
import {NoteContext, useData} from '../../DataContext/noteContext'
import {PieChart,Pie,Cell, Tooltip,Legend} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const PieChartE = () => {
    const {month, backendDbUrl} = useData()
    const [PieChartData, setPieChartData] = useState([])

    useEffect(() => {
      loadPieChartData();
      // eslint-disable-next-line
    }, [month])
    
    const loadPieChartData = async () => {
        const url = `${backendDbUrl}/api/pie-chart/?month=${month}`
        const response = await fetch(url);
        const data = await response.json();
        const outputData = Object.entries(data.categoryCounts).map(([name, value]) => ({ name, value }));
        if(!response.ok){
            console.log('Pie-Chart data fetching error')
        }else{
            
            setPieChartData(outputData)
            console.log(outputData)
        }
    }

    return( 
        <div className='paichart-container'>
            <div className='chart-container'>
                <h1 className='chart-heading'>PieChart Page</h1>
                <PieChart
                    width={380} height={350} >
                    <Pie
                    data={PieChartData}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={100}
                    fill='#8884d8'
                    label >
                        {PieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </div>
        </div>
    )
}
export default PieChartE


