import { Button, Row, Col, Container, Card } from "react-bootstrap";
import mainImage from "./assets/person-edited.png";
import Card1 from "./assets/social-media.png";
import Card2 from "./assets/padlock.png";
import Card3 from "./assets/success.png";
import { AiFillCheckCircle, AiFillPlayCircle } from "react-icons/ai";
import AboutImage from "./assets/about.jpg";
import Sign from "./assets/01.png";
import AboutImage2 from "./assets/about2.jpg";
import Navbar from "./Navbar";
import Complaints from "./complaints";
import Footer from "../Footer/foooter";
function Home() {
  return (
    <>
      <Navbar />

      <section className="main">
        <Container>
          <Row>
            <Col className="col-md-6">
              <div className="main-content">
                <h5>
                  Welcome to <span className="logoText">Citizen</span>Complaints
                  <span className="logoText">.</span>
                </h5>
                <h1>
                  Citizen Complaints System <br />
                  Where you can Complain Digitally
                </h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Omnis saepe error voluptates quisquam, ullam laborum et
                  quaerat vitae. Corrupti, deserunt.
                </p>

                <Button className="customBtn">Read More</Button>
              </div>
            </Col>

            <Col className="col-xs-12 col-md-6">
              <img
                src={mainImage}
                className="img-fluid"
                height="500"
                width="500"
                alt=""
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Complaints */}

      <Complaints />

      {/* Complaints */}

      {/* ABOUT SECTION START */}
      <section className="about">
        <Container>
          <Row>
            <Col className="col-sm-12 col-md-6">
              <div className="about-content">
                <h2>
                  About Our <span className="logoText">Citizen</span>Complaints
                  <span className="logoText">.</span>{" "}
                </h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
                  laboriosam repellat iste sunt ut, beatae veniam. Reiciendis
                  eum, iusto id modi rem voluptatum alias maxime tenetur facilis
                  adipisci ullam quaerat.
                  <br />
                  <br />
                  <span className="about-secondText">
                    We bring more than 24 years’ senior experience forging of
                    collaborations across government.
                  </span>
                </p>
                <ul className="listItems">
                  <li>
                    <AiFillCheckCircle color="#16C79A" /> We will help peoples
                  </li>
                  <li>
                    <AiFillCheckCircle color="#16C79A" /> Immediate work on the
                    complain
                  </li>
                  <li>
                    <AiFillCheckCircle color="#16C79A" /> Help to make society
                    happy
                  </li>
                </ul>

                <h5>Call to ask any question : 123-456-7890 or 456-789-1430</h5>
                <div className="aboutBottom">
                  <Row>
                    <Col className="col-sm-12 col-md-3">
                      <Button className="btn btn-primary">
                        Learn More <AiFillPlayCircle />
                      </Button>
                    </Col>
                    <Col className="col-sm-12 col-md-3">
                      <span className="sign">
                        <img src={Sign} alt="" />
                      </span>
                    </Col>
                    <Col className="col-sm-12 col-md-3">
                      <h6>Randon Pexson</h6>
                      <p className="mayor">Mayor of the City</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col className="col-sm-12 col-md-6">
              <img src={AboutImage} className="img-fluid" alt="" />
            </Col>
          </Row>
          <Row className="aboutRow">
            <Col className="col-sm-12 col-md-6">
              <img src={AboutImage2} className="img-fluid" alt="" />
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">FOR ANY INFORMATION</h4>
                  <p className="card-text">(+92) 1251521</p>
                </div>
              </div>
            </Col>

            <Col className="col-sm-12 col-md-6">
              <div className="about-content">
                <h2>
                  About Our <span className="logoText">Citizen</span>Complaints
                  <span className="logoText">.</span>{" "}
                </h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
                  laboriosam repellat iste sunt ut, beatae veniam. Reiciendis
                  eum, iusto id modi rem voluptatum alias maxime tenetur facilis
                  adipisci ullam quaerat.
                  <br />
                  <br />
                  <span className="about-secondText">
                    We bring more than 24 years’ senior experience forging of
                    collaborations across government.
                  </span>
                </p>
                <ul className="listItems">
                  <li>
                    <AiFillCheckCircle color="#16C79A" /> We will help peoples
                  </li>
                  <li>
                    <AiFillCheckCircle color="#16C79A" /> Immediate work on the
                    complain
                  </li>
                  <li>
                    <AiFillCheckCircle color="#16C79A" /> Help to make society
                    happy
                  </li>
                </ul>

                <h5>Call to ask any question : 123-456-7890 or 456-789-1430</h5>
                <div className="aboutBottom">
                  <Row>
                    <Col className="col-sm-12 col-md-3">
                      <Button className="btn btn-primary">
                        Learn More <AiFillPlayCircle />
                      </Button>
                    </Col>
                    <Col className="col-sm-12 col-md-3">
                      <span className="sign">
                        <img src={Sign} alt="" />
                      </span>
                    </Col>
                    <Col className="col-sm-12 col-md-3">
                      <h6>Randon Pexson</h6>
                      <p className="mayor">Mayor of the City</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
