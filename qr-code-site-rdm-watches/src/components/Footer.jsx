import { Container, Row, Col } from "react-bootstrap";
import logoImg from "../assets/logoAzienda.png";

const Footer = () => {
  return (
    <>
      <Container id="container-footer">
        <Row className="d-flex w-100 justify-content-between align-items-center ">
          <Col
            xs={6}
            md={3}
            className="d-flex flex-column justify-content-center align-items-center position-relative"
          >
            <div id="div-img-logo-footer" className="position-absolute">
              <img
                src={logoImg}
                alt="logo dell'azienda"
                className="img-fluid w-75"
              />
            </div>
          </Col>
          <Col id="col-info-footer" xs={6} md={9} className="mt-4 p-0">
            <div id="div-info-footer">
              <h5 className="text-center">
                Copyright 2024 © RDM WATCHES S.R.L.
                <br />
                <br />
                info@rdmwatches.it
                <br />
                <br /> P.IVA IT09809091219
                <br /> Privacy Policy
              </h5>
              <div></div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
