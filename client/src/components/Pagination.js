import { paginationItemClasses } from '@mui/material';
import React from 'react'

const Pagination = ({eventsPerPage, totalEvents, paginate, previousPage, nextPage}) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul>
                <li onClick={previousPage}>Prev</li>
                {pageNumbers.map((number) => (
                    <li key={number} onClick={() => paginate(number)}>
                        {number}
                    </li>
                ))}
                <li onClick={nextPage}>Next</li>
            </ul>
        </div>
    )
}

export default Pagination