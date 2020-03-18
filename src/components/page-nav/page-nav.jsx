import React from 'react';
import './page-nav.scss';

function PageNav({ curPage, totalPages, onPageChange }) {
    return (
        <div className="page-nav">
            <button className="nav-btn"
                disabled={curPage <= 1}
                onClick={() => onPageChange(curPage - 1)}>
                Previous</button>
            <div className="nav-numbers"><b>{curPage}</b> of {totalPages}</div>
            <button className="nav-btn"
                disabled={curPage === totalPages}
                onClick={() => onPageChange(curPage + 1)}>
                Next</button>
        </div>
    );
}

export default PageNav;