import { Link } from "react-router-dom";
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/"><span>Головна</span></Link></li>
                <li><Link to="/weather/Kharkiv"><span>Погода у містах</span></Link></li>
                <li><Link to="/forecast"><span>Прогноз на 4 дні</span></Link></li>
                <li><Link to="/weathermap"><span>Погодна карта</span></Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
