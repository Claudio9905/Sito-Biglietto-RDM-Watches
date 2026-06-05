import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import infoSocial from "../data/utility";
import LinkSocialPreview from "./LinkSocialPreview";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Contatti = () => {
  const [activeLinkInstagram, setActiveLinkInstagram] = useState(false);
  const [activeLinkFacebook, setActiveLinkFacebook] = useState(false);
  const [activeLinkTikTok, setActiveLinkTikTok] = useState(false);

  return (
    <>
      <Container
        id="container-contacts"
        className=" d-flex flex-column justify-content-center align-items-center m-0"
      >
        <Row id="row-contacts">
          <Col
            xs={12}
            md={12}
            lg={3}
            className="d-flex align-items-center justify-content-center gap-5"
          >
            <div className="position-relative d-flex flex-column align-items-center justify-content-center">
              <Button
                id="icon-instagram"
                onClick={() => {
                  const newValue = !activeLinkInstagram;
                  setActiveLinkInstagram(newValue);

                  if (newValue) {
                    setActiveLinkFacebook(false);
                    setActiveLinkTikTok(false);
                  }
                }}
                className={`d-flex ${activeLinkInstagram ? "icon-instagram-active d-flex" : "d-flex"}`}
              >
                <img
                  src="https://www.svgrepo.com/show/452229/instagram-1.svg"
                  alt="instagram"
                  className={`img-fluid rounded-circle  ${activeLinkInstagram ? "icon-link-svg" : ""}`}
                />
              </Button>
              <i
                id={`${activeLinkInstagram ? "downArrow" : "upArrow"}`}
                className="arrowLink bi bi-chevron-compact-up"
              ></i>
            </div>

            <div className="position-relative d-flex flex-column align-items-center justify-content-center">
              <Button
                id="icon-facebook"
                onClick={() => {
                  const newValue = !activeLinkFacebook;
                  setActiveLinkFacebook(newValue);

                  if (newValue) {
                    setActiveLinkInstagram(false);
                    setActiveLinkTikTok(false);
                  }
                }}
                className={`d-flex ${activeLinkFacebook ? "icon-facebook-active d-flex" : "d-flex"}`}
              >
                <img
                  src="https://www.svgrepo.com/show/448224/facebook.svg"
                  alt="facebook"
                  className={`img-fluid   ${activeLinkFacebook ? "icon-link-svg" : ""}`}
                />
              </Button>
              <i
                id={`${activeLinkFacebook ? "downArrow" : "upArrow"}`}
                className="arrowLink bi bi-chevron-compact-up"
              ></i>
            </div>

            <div className="position-relative d-flex flex-column align-items-center justify-content-center">
              <Button
                id="icon-tiktok"
                onClick={() => {
                  const newValue = !activeLinkTikTok;
                  setActiveLinkTikTok(newValue);

                  if (newValue) {
                    setActiveLinkFacebook(false);
                    setActiveLinkInstagram(false);
                  }
                }}
                className={`d-flex ${activeLinkTikTok ? "icon-tiktok-active d-flex" : "d-flex"}`}
              >
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/tiktok-rounded-square-icon.png"
                  alt="tiktok"
                  className={`img-fluid rounded-circle ${activeLinkTikTok ? "icon-link-svg" : ""}`}
                />
              </Button>
              <i
                id={`${activeLinkTikTok ? "downArrow" : "upArrow"}`}
                className="arrowLink bi bi-chevron-compact-up"
              ></i>
            </div>
          </Col>
        </Row>

        {/* ---------------------------------------------------- */}
        <Row id="row-embed-link">
          {activeLinkInstagram && (
            <Col
              id="col-link-preview"
              xs={12}
              md={12}
              lg={3}
              className="d-flex justify-content-center"
            >
              <LinkSocialPreview info={infoSocial[0]} />
            </Col>
          )}
          {activeLinkFacebook && (
            <Col
              id="col-link-preview"
              xs={12}
              md={12}
              lg={3}
              className="d-flex justify-content-center"
            >
              <LinkSocialPreview info={infoSocial[1]} />
            </Col>
          )}
          {activeLinkTikTok && (
            <Col
              id="col-link-preview"
              xs={12}
              md={12}
              lg={3}
              className="d-flex justify-content-center"
            >
              <LinkSocialPreview info={infoSocial[2]} />
            </Col>
          )}
        </Row>
        {/* ---------------------------------------------------- */}

        <Row
          id="row-map-position"
          className="d-flex justify-content-center align-items-center gap-4 "
        >
          <Col
            xs={12}
            md={12}
            lg={3}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="d-flex text-center">
              <h5 className="text-light ">
                Via Gaetano Filangieri 72 <br />
                80121 Napoli (NA)
              </h5>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.65474562002!2d14.242133899999999!3d40.8355466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b085519352765%3A0x5450f5c01c38ff21!2sVia%20Gaetano%20Filangieri%2C%2072%2C%2080121%20Napoli%20NA!5e0!3m2!1sit!2sit!4v1774104659833!5m2!1sit!2sit"
              width="50%"
              max-width="80%"
              height="40%"
              loading="lazy"
              id="map-location"
            ></iframe>
          </Col>
          <Col
            xs={12}
            md={12}
            lg={3}
            className="d-flex justify-content-center mb-2"
          >
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h5 className="text-light">Per info e appuntamenti</h5>
              <Link
                id="link-whatsapp"
                to="https://wa.me/393452125448"
                target="_blank"
                className="text-decoration-none text-light"
              >
                <img
                  src="https://www.svgrepo.com/show/354560/whatsapp.svg"
                  alt="whatsapp"
                  className="img-fluid"
                  id="link-whatsapp-svg"
                />
                <h6 id="number-phone-whatsapp" className="m-0">
                  +39 3452125448
                </h6>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contatti;
