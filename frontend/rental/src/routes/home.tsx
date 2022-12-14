import {observer} from "mobx-react-lite";
import {Container, Row, Col, Tab, Nav} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import TrackVisibility from 'react-on-screen';
import headerImg from "../assets/header-img.svg";
import 'animate.css';
import projImg1 from "../assets/project-img1.png";
import projImg2 from "../assets/project-img2.jpg";
import projImg3 from "../assets/project-img3.jpg";
import projImg5 from "../assets/project-img5.jpg";
import projImg4 from "../assets/project-img4.jpg";
import projImg6 from "../assets/project-img6.jpg";
import {ProjectCard} from "../components/ProjectCard";

const Home = () => {
    const {t} = useTranslation();
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["AnimeCostume", "MovieCostume", "SeriesCostume", "GameCostume"];
    const period = 2000;
    const projects = [
        {
            title: t("AnimeCostume"),
            description: t("TheOutfitsAreCuteAndInnocent"),
            imgUrl: projImg1,
        },
        {
            title: t("MovieCostume"),
            description: t("BecomeYourFavoriteHero"),
            imgUrl: projImg2,
        },
        {
            title: t("GameCostume"),
            description: t("DontStopPlayingEvenForAMoment"),
            imgUrl: projImg4,
        },
        {
            title: t("SeriesCostume"),
            description: t("BringYourFriendsIntoTheSeries"),
            imgUrl: projImg3,
        },
        {
            title: t("OtherCosplay"),
            description: t("IWantSomethingReallyInteresting"),
            imgUrl: projImg5,
        },
        {
            title: t("YourOwnCostume"),
            description: t("IWantToBeUnique"),
            imgUrl: projImg6,
        },
    ];
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker)
        };
    }, [text])
    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = t(toRotate[i]);
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    return (
        <section className="banner" id="home">
            <Container>
                <Row className="aligh-items-center mt-5">
                    <Col xs={12} md={6} xl={7}>

                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={"animate__animated animate__fadeIn"}>
                                    <h2>{t("helloAndWelcome")} <br/> {t("lookingToday")} <span className="txt-rotate text-primary"
                                                                     data-rotate='[  ("AnimeCostume") , "MovieCostume", "SerialCostume", "GameCostume" ]'><span
                                            className="wrap">{text}</span></span></h2>
                                    <div style={{marginTop: 50}}>
                                        <p>{t("homeTextDescription")} <br/><br/>
                                            {t("homeVisitUs")}</p>
                                    </div>
                                </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={"animate__animated animate__zoomIn"}>
                                    <div className={"anime-image"}>
                                        <img src={headerImg} height={500} alt="Header Img"/>
                                    </div>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <Container className="project" id="project">
                <Row>
                    <Col size={12} >
                        <TrackVisibility>
                            <Tab.Container id="projects-tabs" defaultActiveKey="first">
                                <Tab.Content id="slideInUp">
                                    <Tab.Pane eventKey="first">
                                        <Row>
                                            {
                                                projects.map((project, index) => {
                                                    return (
                                                        <ProjectCard
                                                            key={index}
                                                            {...project}
                                                        />
                                                    )
                                                })
                                            }
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default observer(Home);
