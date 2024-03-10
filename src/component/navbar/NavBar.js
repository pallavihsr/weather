import React from 'react';
import './NavBar.css';
import { Container } from 'react-bootstrap';
import toggle from '../../assets/toggle.svg';
import searchIcon from '../../assets/search.svg';
import Search from './Search';
import Menu from './Menu';

const NavBar = (props) => {
    const [show, setShow] = React.useState(false);
    const [search, setSearch] = React.useState(false);

    const searchClose = () =>setSearch(false);
    const searchShow = () => setSearch(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Container className='d-flex justify-content-between py-4'>
                <button className='nav-button' onClick={handleShow}>
                    <img src={toggle} alt="Toggle Icon" />
                </button>
                <button className='nav-button' onClick={searchShow}>
                    <img src={searchIcon} alt="Search Icon" />
                </button>
            </Container>
            <Menu show={show} handleClose={handleClose} city={props.city} country={props.country} />
            <Search show={search} handleClose={searchClose} />
        </>
    )
}

export default NavBar