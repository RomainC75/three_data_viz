import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
       <ul>
          <li>
             <Link to="/">Home</Link>
          </li>
          {/* <li>
             <Link to="/about">About</Link>
          </li>
          <li>
             <Link to="/formular">Formular</Link>
          </li>
          <li>
             <Link to="/crypto">Crypto</Link>
          </li>
          <li>
             <Link to="/samurai">Samurai</Link>
          </li>
          <li>
             <Link to="/monolith">Monolith</Link>
          </li> */}
          <li>
             <Link to="/videotext">VideoText</Link>
          </li>
       </ul>
 </nav>

  )
}

export default Navbar