import logoImg from "../assets/logoAzienda.png";
import { Container, Row, Col } from "react-bootstrap";
import Contatti from "./Contatti";
import CaroselloWatch from "./CaroselloWatch";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import BannerShop from "../assets/Banner_Shop_RDM.jpg";
import AboutUs from "./AboutUs";

const IntroCard = () => {
  return (
    <>
      <Container>
        <Row id="row-watch-contacts">
          {/* <Col
            xs={12}
            md={12}
            id="col-logo"
            className=" position-relative d-flex align-items-center justify-content-between"
          >
            <div id="div-logo" className="position-absolute">
              <div id="div-gear"></div>
              <div id="div-bracelet4"></div>
              <div id="div-bracelet3"></div>
              <div id="div-bracelet2"></div>
              <div id="div-bracelet1"></div> 
              <div id="div-circle-logo" className=" position-absolute"></div> 
            </div>
          </Col> */}

          <Col
            xs={12}
            md={12}
            id="col-logo"
            className=" d-flex align-items-center justify-content-center"
          >
            <div id="div-logo">
              <img
                src={logoImg}
                alt="Logo dell'azienda"
                className="img-fluid w-50"
              />
            </div>
            <Button
              id="button-link-sito-main"
              onClick={() => window.open("https://rdmwatches.it/", "_blank")}
            >
              Visita il sito
            </Button>
          </Col>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "cubic-bezier(0.5, 0, 0, 1)",
            }}
          >
            <Col
              xs={12}
              md={12}
              className=" d-flex justify-content-center align-items-center "
            >
              <Contatti />
            </Col>
          </motion.div>
        </Row>

        <Row id="row-description">
          <Col xs={12}>
            <AboutUs />
          </Col>
          <Col
            xs={12}
            md={12}
            className=" d-flex flex-column justify-content-center align-items-center  "
          >
            <CaroselloWatch />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IntroCard;
