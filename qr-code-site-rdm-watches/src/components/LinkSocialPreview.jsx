import { Button } from "react-bootstrap";

const LinkSocialPreview = ({ info }) => {
  return (
    <>
      <div
        id={`${info.id === 1 ? "div-link-preview-instagram" : info.id === 2 ? "div-link-preview-facebook" : "div-link-preview-tiktok"}`}
        className="d-flex align-items-center gap-4"
      >
        <div id="div-img-profile">
          <img
            src={info.imgProfile}
            alt="immagine profilo"
            className="img-fluid"
            id="img-profile"
          />
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h6>{info.username}</h6>
          <Button
            id="button-link"
            onClick={() => window.open(info.link, "_blank")}
          >
            Seguici ora
          </Button>
        </div>
      </div>
    </>
  );
};

export default LinkSocialPreview;
