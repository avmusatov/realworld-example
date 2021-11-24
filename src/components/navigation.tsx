import { Navbar, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLogOut } from '../hooks/useLogOut';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Form } from 'react-bootstrap';
import { useMemo } from 'react';

const NavigationMenu = () => {
    const logOut = useLogOut();
    const { user, activePage } = useTypedSelector(({ user, page }) => ({ ...user, ...page }));
    const { t, i18n } = useTranslation();

    const pages = useMemo(
        () => [
            { page: t('pages.home'), path: '/home' },
            { page: t('pages.edit'), path: '/edit' },
        ],
        [t]
    );

    const changeLanguage = (lang: string) => i18n.changeLanguage(lang);

    return (
        <Navbar expand="lg">
            <Navbar.Brand as={Link} to="home">
                Real World application
            </Navbar.Brand>
            <Navbar.Toggle />
            <Form.Select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                style={{ width: 'max-content' }}
                aria-label="Default select example"
            >
                <option value="en">EN</option>
                <option value="ru">RU</option>
            </Form.Select>
            {user && (
                <Navbar.Collapse>
                    <Nav>
                        {pages.map(({ path, page }) => {
                            const active = path === activePage;
                            return (
                                <Nav.Link
                                    className={active ? 'fw-bold' : undefined}
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
                    <div className="ms-auto d-flex align-items-center">
                        <Link to="/user" className="text-decoration-none text-primary fw-bold me-3 ms-3">
                            {user.username}
                        </Link>
                        <Button style={{ whiteSpace: 'nowrap' }} variant="primary" onClick={logOut}>
                            {t('auth.logOut')}
                        </Button>
                    </div>
                </Navbar.Collapse>
            )}
        </Navbar>
    );
};

export default NavigationMenu;
