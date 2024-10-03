import Header from '../../component/Header/Header';
import './Home.css';

const Home = () => {
  return (
    <div className="banner_outer">
      <Header />
      <div className="overlay-container">
        <img src="/src/assets/images/banner-sideshape.png" alt="Overlay" className="overlay-image" />
      </div>
      <div className="bottom-left-image-container">
        <img src="/src/assets/images/banner-sideshape2.png" alt="Bottom Left" className="bottom-left-image" />
      </div>
      {/* <div className="text-section">
        <h1>Tổ chức giải đấu dễ dàng</h1>
        <h2>Quản lý đội thể thao đơn giản!</h2>
        <p>
          Quis autem vel eum iure reprehenderit aui in ea voluptate velit esse ruam nihil molestiae consequatur.
        </p>
        <div className="buttons">
          <button className="primary-button">Tìm hiểu thêm</button>
          <button className="secondary-button">Liên hệ chúng tôi</button>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
