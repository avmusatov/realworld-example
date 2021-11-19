import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLogOut } from '../hooks/useLogOut';
import { useTypedSelector } from '../hooks/useTypedSelector';

const pages = [
    { page: 'Home', path: '/home' },
    { page: 'Edit', path: '/edit' },
];

const NavigationMenu = () => {
    const logOut = useLogOut();
    const { user, activePage } = useTypedSelector(({ user, page }) => ({ ...user, ...page }));

    return (
        <Navbar expand="lg">
            <Navbar.Brand as={Link} to="home">
                Real World application
            </Navbar.Brand>
            <Navbar.Toggle />
            {user && (
                <Navbar.Collapse>
                    <Nav>
                        {pages.map(({ path, page }) => {
                            const active = path === activePage;
                            return (
                                <Nav.Link
                                    className={active ? 'fw-bold': undefined}
                                    key={path}
                                    as={Link}
                                    to={path}
                                    active={active}
                                >
                                    {page}
                                </Nav.Link>
                            );
                        })}
                    </Nav>
                    <div className="ms-auto">
                        <Link to="/user" className="text-decoration-none text-primary fw-bold me-3">
                            {user.username}
                        </Link>
                        <Button variant="primary" onClick={logOut}>
                            Log out
                        </Button>
                    </div>
                </Navbar.Collapse>
            )}
        </Navbar>
    );
};

export default NavigationMenu;
