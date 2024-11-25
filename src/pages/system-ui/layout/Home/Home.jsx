import { useEffect, useState } from "react";
import Benefits from "../../component/Benefits/Benefits";
import Footer from "../../component/Footer/Footer";
import Header from "../../component/Header/Header";
import TournamentFormats from "../../component/TournamentFormats/TournamentFormats";
import TournamentSteps from "../../component/TournamentSteps/TournamentSteps";
import "./Home.css";
import gearIcon from "/src/assets/images/service-reboticon.png";
import image from "/src/assets/images/banner-sideshape.png";
import image2 from "/src/assets/images/banner-sideshape2.png";
import image3 from "/src/assets/images/banner-image.png";
const Home = () => {
  const [showHeader, setShowHeader] = useState(false);

  // Function to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        // Checks if scrolled more than 100vh
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="banner_outer">
        <Header isVisible={showHeader} />
        <div className="overlay-container">
          <img src={image} alt="Overlay" className="overlay-image" />
        </div>
        <div className="bottom-left-image-container">
          <img src={image2} alt="Bottom Left" className="bottom-left-image" />
        </div>

        <div className="content-wrapper">
          <div className="text-section">
            <div className="main-text">
              - Tổ chức và quản lý giải đấu
              <span className="animated-text">
                <span className="letters">đơn giản, dễ dàng!</span>
                <img src={gearIcon} alt="Gear Icon" className="gear-icon" />
              </span>
            </div>
            <div className="cta-buttons">
              <button className="styled-button">Tham gia</button>
            </div>
          </div>
          <div className="bottom-right-image-container">
            <img
              src={image3}
              alt="Bottom Right Image"
              className="banner_error"
            />
          </div>
        </div>
      </div>
      <TournamentSteps />
      <TournamentFormats />
      <Benefits />
      <Footer />
    </>
  );
};

export default Home;
