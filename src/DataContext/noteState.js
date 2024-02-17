import {NoteContext} from './noteContext'
import { useEffect, useState } from 'react'

const backendDbUrl = 'https://ecomtransbackend.onrender.com'

const NoteState = (props) => {
    const [month, setMonth] = useState('02');
    const [search, setSearch] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    

    
    // Render
    useEffect(() => {
        loadTransactions();
        //  eslint-disable-next-line
    },[month,search,currentPage])

    const updateMonth = newMonth => {
        setMonth(newMonth);
    }

    const updateSearch = newSearch => {
        setSearch(newSearch);
    }

    const updateCurrentPage = newCurrentPage => {
        setCurrentPage(newCurrentPage);
    }

    //  Fetch transactions data from the "ecomdata.db" using an API url
    const loadTransactions= async() =>{
        // setLoading(true);
        const url = `${backendDbUrl}/api/transactions/?month=${month}&search=${search}&page=${currentPage}`
        const options = {
        method: 'GET',
        }
        let response= await fetch(url,options)
        let data = await response.json()
        if(response.ok){
        setTransactions(data.transaction)
        // console.log(data)
        // setLoading(false);
        }else{
        console.log('fetching error')
        // setLoading(false);
        }
        
    }

    return(
        transactions.length > 0 &&
            <NoteContext.Provider value={{month,search, transactions,currentPage,backendDbUrl, updateMonth,updateSearch,updateCurrentPage}}>
                {props.children}
            </NoteContext.Provider>
    )
}

export default NoteState;