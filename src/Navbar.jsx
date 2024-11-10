import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './assets/logo.png';

function Navbar() {
    return (
        <>
        <nav className="navbar">
            <ul className="navbar-left">
                <img src={logo} alt="Logo" />
                <li><a href="#Aboutus">About Us</a></li>
                <li><a href="#Contact">Contact</a></li>
            </ul>
            <ul className="navbar-right">
                <li>
                    <button className="navbar-btn">
                        <Link to="/Login">Login</Link>
                    </button>
                </li>
                <li>
                    <Link to="/Signup">Register</Link>
                </li>
            </ul>
        </nav>
        <h2>Our Services:</h2>
        </>
    );
}

export default Navbar;
