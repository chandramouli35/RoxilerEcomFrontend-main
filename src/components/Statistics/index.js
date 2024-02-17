import { useState , useEffect} from 'react'
import './index.css'
// eslint-disable-next-line
import {NoteContext, useData} from '../../DataContext/noteContext'


const Statistics = () => {
    // const a = useContext(NoteContext)
    const {month, backendDbUrl} = useData()
    const [statistics, setStatistics] = useState({})
    // const [month, setMonth] = useState(updateMonth)

    useEffect(() => {
        loadStatistics();
    //  eslint-disable-next-line
    }, [month])
    

//  Fetch Statistics data from the "ecomdata.db" using an API url.
  const loadStatistics= async () =>{
    const url = `${backendDbUrl}/api/statistics/?month=${month}`
    const response = await fetch(url)
    const data = await response.json()
    if(response.ok){
      setStatistics(data)
      console.log(data)
    }else{
      console.log('Stats fetching error')
    }
  }

  const displayMonthName = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const selectedMonth = months[parseInt(month, 10) - 1]
    return selectedMonth;
  }
    return(
    <div className='statistics-container'>
        <div className='card-container'>
            <h1 className='stats-heading'>Statistics for {displayMonthName()}</h1>
            <div className='stats-container'>
                <p className='stats-tag'>Total Sale Amount: <span className='sale-span'>{statistics.totalSaleAmount}</span></p>
                <p className='stats-tag'>Total Sold Items: <span className='sold-span'>{statistics.totalSoldItems}</span></p>
                <p className='stats-tag'>Total Not Sold Items: <span className='not-sold-span'>{statistics.totalNotSoldItems}</span></p>
            </div>
        </div>
    </div>
)
}
export default Statistics