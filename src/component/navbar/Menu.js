import React from 'react';
import { Container } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import close from '../../assets/close.svg';
import location from '../../assets/location.svg';

const Menu = (props) => {
    return (
        <>
            <Offcanvas show={props.show} onHide={props.handleClose}>
                <Offcanvas.Body className='main-menu'>
                    <Container className='p-3 d-flex align-items-center justify-content-between'>
                        <button className='nav-button' onClick={props.handleClose}>
                            <img src={close} alt='Close Button' />
                        </button>
                        <div className='live-button'>Live</div>
                    </Container>

                    <Container className='my-5'>
                       <div className='location-button d-flex align-items-center justify-content-center'>
                       <span>
                            <img src={location} alt='Location Icon' />
                        </span>
                        <span className='text-white ms-2 text-uppercase text-normal'>Current Location</span>
                       </div>

                       <h1 className='mt-4 location-name'>
                        {props.city}, <br />
                        {props.country}
                       </h1>
                       
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Menu