import { Container, Row, Col } from "react-bootstrap";
import React, { useRef, useEffect } from "react";
import ScrollReveal from "scrollreveal";

const CaroselloWatch = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    ScrollReveal().reveal(boxRef.current, {
      duration: 2000,
      distance: "50px",
      origin: "right",
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      reset: true,
    });
  }, []);

  return (
    <>
      <Container className="mb-5 " id="container-carousel">
        <div className="text-center mb-4" ref={boxRef}>
          <h3 className="fs-4 ">
            Scopri i nostri orologi più iconici <br />
          </h3>
          <h3 className="fs-4">
            Visita il nostro sito
            <br /> per esplorare la nostra collezione <br />e trovare il tuo
            orologio perfetto.
          </h3>
        </div>
        <Row>
          <Col id="col-carousel" xs={12} md={6}>
            <div className="carousel ">
              <div className="group ">
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
              </div>
              <div aria-hidden className="group">
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CaroselloWatch;
