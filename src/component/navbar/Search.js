import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Search = (props) => {
    return (
        <>
            <Offcanvas show={props.show} onHide={props.handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    We can implement Search bar ui here
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )
}

export default Search