import React from 'react'
import { Link } from 'react-router-dom'


export default function Header() {
    return (
        <div className='container header bg-dark'>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link text-warning" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-warning" to="/add-category">Add Category</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-warning" to="/add-product">Add Product</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-warning" to="/show-category">Show Category</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-warning" to="/show-product">Show Product</Link>
                </li> 
            </ul>
        </div>
    )
}