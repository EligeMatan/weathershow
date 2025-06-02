import { Link } from "react-router-dom";
import '../styles/Navbar.scss';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Головна</Link></li>
                <li><Link to="/weather/Kharkiv">Погода у містах</Link></li>
                <li><Link to="/forecast">Прогноз на 4 дні</Link></li>
                <li><Link to="/weathermap">Погодна карта</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
