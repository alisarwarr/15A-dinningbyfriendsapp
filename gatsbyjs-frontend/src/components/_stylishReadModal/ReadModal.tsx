import React, { useState } from 'react';
import * as style from './ReadModal.module.scss';
//REACT-BOOTSTRAP
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


interface ReadDiaryProps {
    title: string;
    notes: string;
}

function ReadModal({ title, notes }: ReadDiaryProps) {
    const [ modalShow, setModalShow ] = useState(false);

    return (
        <span className={style.read}>
            <button onClick={() => setModalShow(true)}>
                ...
            </button>

            <Modal
                size="sm"
                show={modalShow}
                onHide={() => setModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
        
                <Modal.Body>
                    <p> {notes} </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="info" onClick={() => setModalShow(false)} style={{ color: "white" }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    )
}

export default ReadModal;
