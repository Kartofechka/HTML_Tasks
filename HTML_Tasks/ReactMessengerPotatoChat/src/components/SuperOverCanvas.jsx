import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OverCanvas({head_text, body_text}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{head_text}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {body_text}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OverCanvas;