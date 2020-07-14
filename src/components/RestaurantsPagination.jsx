import React, { useState } from 'react'

const RestaurantsPagination = ({ restaurantsPerPage, totalRestaurants, paginate }) => {

    const pageNumbers = []
    const [currentPage, setCurrentPage] = useState(0)
    //const maxPage = Math.ceil(totalRestaurants / restaurantsPerPage);

    for(let i = 0; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++){
        pageNumbers.push(i)
    }

    const changePage = (number) => {
        paginate(number)
        setCurrentPage(number)
    }

    /*
    const next = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage))
    }

    const prev = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1), 1)
    }

    const limit = (currentPage) => {
        const pageNumber = Math.max(1, currentPage)
        setCurrentPage(currentPage => Math.min(pageNumber, maxPage))
    }
    */

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1">Anterior</a>
                </li>
                { pageNumbers.map(number => (
                    number < 5 && 
                    <li key={number} className={number === currentPage? 'page-item active': 'page-item'}>
                        <a role="button" onClick={() => changePage(number)} className="page-link"> 
                            { number }
                        </a>
                    </li>
                )) }
                <li className="page-item">
                    <a className="page-link" href="#">Siguiente</a>
                </li>
            </ul>
        </nav>
    )
}

export default RestaurantsPagination