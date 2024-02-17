import React from 'react'
// eslint-disable-next-line
import {NoteContext, useData} from '../../DataContext/noteContext'
import './index.css'
import { useEffect, useState } from 'react';



const Home = () =>{
  const {month,search, transactions, currentPage,updateMonth, backendDbUrl} = useData()
  // console.log(transactions)
  const [monthM, setMonth] = useState(month);
  const [searchI, setSearch] = useState(search);
  const [transactionsT, setTransactions] = useState(transactions);
  const [currentPageC, setCurrentPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);

  // Render
  useEffect(() => {
    loadTransactions();

    //  eslint-disable-next-line
  },[monthM,searchI,currentPageC])


  //  Fetch transactions data from the "ecomdata.db" using an API url
  const loadTransactions= async() =>{
    setLoading(true);
    const url = `${backendDbUrl}/api/transactions/?month=${month}&search=${searchI}&page=${currentPageC}`
    const options = {
      method: 'GET',
    }
    let response= await fetch(url,options)
    let data = await response.json()
    if(response.ok){
      setTransactions(data.transaction)
      console.log(data)
      setLoading(false);
    }else{
      console.log('fetching error')
      setLoading(false);
    }
    
  }

   
    //  Creating Table
    const displayTransactions=  (Trans)=>{
      // console.log(Trans)
      // transactionsT.length > 0 &&
      return  Trans.map(item => (
          <tr key={item.id} className='table-row'>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.price.toFixed(2)}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>
              <img src={item.image} alt={item.title} style={{width:'50px', height: '50px'}} />
            </td>
            <td>{item.sold}</td>
            <td>{item.dateOfSale}</td>
          </tr>
        ))

    }

  //  display month (SELECT OPTION)
  const displayMonthOptions =() => {
    const months = [
      {value: '01', label: 'Junuary'},
      {value: '02', label: 'February'},
      {value: '03', label: 'March'},
      {value: '04', label: 'April'},
      {value: '05', label: 'May'},
      {value: '06', label: 'June'},
      {value: '07', label: 'July'},
      {value: '08', label: 'August'},
      {value: '09', label: 'September'},
      {value: '10', label: 'October'},
      {value: '11', label: 'November'},
      {value: '12', label: 'December'},
    ];
    return months.map(month => (
      <option key={month.value} value={month.value}>
        {month.label}
      </option>
    ))
  }



   //  Page Change Prev-Next  
   const handlePageChange=(direction) =>{
    if(direction === 'prev' && currentPageC > 1){
      setCurrentPage(currentPageC - 1);
    }else{
      setCurrentPage(currentPageC + 1);
    }

    loadTransactions()
  }

  const handleupdateMonth = (event)=>{
    setMonth(event.target.value)
    updateMonth(event.target.value)
  }

  return(
    <div className='home-container'>
      <h1 className='heading'>Transaction Dashboard</h1>
        <div className='inputs-container'>
          <input className='search-input' type='text' placeholder='Search transaction' value={searchI} 
          onChange={(event) => setSearch(event.target.value)}/>
          <select className='select-month' value={monthM} onChange={handleupdateMonth}>
            {displayMonthOptions()}
          </select>
        </div>
        {loading ? (<p>Loading...</p>) :
        (<div className='table-container'>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Sold</th>
                  <th>DateOfSold</th>
                </tr>
              </thead>
              <tbody>
                {transactionsT.length > 0 && displayTransactions(transactionsT)}
              </tbody>
            </table>
        </div>)}
        <div className='buttons-container'>
          <p className='page-tag'>Page No: 1</p>
          <div className='page-buttons'>
            <button className='page-btn' type='button' onClick={() => handlePageChange('prev')} >Next</button>
            <span> - </span>
            <button className='page-btn' type='button' onClick={() => handlePageChange('next')} >Previous</button>
          </div>
          <p className='page-tag'>Per Page: 10</p>
          
        </div>
    </div>
  )
}


export default Home
