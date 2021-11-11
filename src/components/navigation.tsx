import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLogOut } from '../hooks/useLogOut';
import { useTypedSelector } from '../hooks/useTypedSelector';

const pages = [
    { page: 'Home', path: '/home' },
    { page: 'Write an article', path: '/edit' },
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
                        {pages.map(({ path, page }) => (
                            <Nav.Link key={path} as={Link} to={path} active={path === activePage}>
                                {page}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <Button className="ms-auto" variant="primary" onClick={logOut}>
                        Log out
                    </Button>
                </Navbar.Collapse>
            )}
        </Navbar>
    );
};

export default NavigationMenu;
