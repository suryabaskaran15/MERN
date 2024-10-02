import { ModeToggle } from "./theme/ThemeToggler";

const NavBar = () => {
    return (
        <div className="navbar">
                <div className="nav-item-right">
                    <ModeToggle />
                </div>
        </div>
    );
};

export default NavBar;
