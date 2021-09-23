import React from 'react'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import { Row, Col, Image, Carousel, Container } from 'react-bootstrap'
import './style.css'


const HomePage = () => {
    return (
        <div>
            <NavigationBar />
            <section className="section-1">
                <Container fluid>
                    <Row>
                        <Col lg="6" className="left-content">
                            <Image src="https://i.pinimg.com/564x/07/2b/2a/072b2af989d8b877d32903c7d4a686f3.jpg" />
                        </Col>
                        <Col lg="6" className="right-content">
                            <h1>One workspace. Every team.</h1>
                            <h2>We’re more than a doc. Or a table. </h2>
                            <h2>Customize your personal note to work the way you do.</h2>
                            <h2>Try MyNote free</h2>
                        </Col>
                    </Row>
                </Container>

            </section>
            <section className="section-2">
                <Row>
                    <Col lg="6" className="left-column">
                        <h1> What we can offer</h1>
                    </Col>
                    <Col lg="6" className="right-column">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="carousel-image d-block"
                                    src="https://sketchnote-love.com/wp-content/uploads/2017/05/sketchnotes-howitworks-1.gif"
                                    alt="First slide"
                                />
                                <Carousel.Caption className="caption">
                                    <h4>Create your ideas anytimes</h4>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img
                                    className="carousel-image d-block"
                                    src="https://previews.123rf.com/images/markinv/markinv1802/markinv180200006/94811765-computer-cloud-black-and-white-sketch-cartoon-doodle-vector-illustration.jpg"
                                    alt="Second slide"
                                />
                                <Carousel.Caption className="caption">
                                    <h4>Save your data online</h4>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img
                                    className="carousel-image d-block"
                                    src="https://wcm-cdn.wacom.com/-/media/images/discover-2020/elearning/boost/wacom-capture-ideas---conferencing-tips---collaborate-artwork-fii.jpg?h=702&la=en&w=1400&rev=980d1f01e40f417fb6c0f73a7b8a1fdc&hash=6EB53C7891C0C83416BE2C7234671E21"
                                    alt="Third slide"
                                />
                                <Carousel.Caption className="caption">
                                    <h4>Working togther with your friends and colleagues</h4>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </section>
            <footer className="section-3">
                <Container>
                    <Row>
                        <Col lg="2" className="first-col">
                            <h5>Product</h5>
                            <h7>Overview</h7>
                            <h7>Pricing</h7>
                            <h7>Customer</h7>
                        </Col>
                        <Col lg="2" className="second-col">
                            <h5>Policy</h5>
                            <h7>Term</h7>
                            <h7>Privacy</h7>
                        </Col>
                        <Col lg="2" className="third-col">
                            <h5>Support</h5>
                            <h7>Help</h7>
                            <h7>Troubleshooting</h7>
                        </Col>
                        <Col lg="2" className="third-col">
                        </Col>

                        <Col lg="4" className="last-col">
                            <h5>Head 3</h5>
                        </Col>
                    </Row>
                </Container>


            </footer>
        </div>
    )
}

export default HomePage
