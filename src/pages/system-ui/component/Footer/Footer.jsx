/* eslint-disable no-unused-vars */
import React from 'react';
import './Footer.css';
import qrCode from '/src/assets/images/app-qr.png'; // Replace with your QR code image path
import appleStore from '/src/assets/images/apple.png'; // Replace with your Apple Store image path
import googlePlay from '/src/assets/images/google-play.png'; // Replace with your Google Play image path

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <footer className="footer-container">
                <div className="footer-left">
                    <p className="footer-title">Nền tảng quản lý giải đấu, đội thi đấu</p>
                    <ul className="footer-links">
                        <li>Điều khoản sử dụng</li>
                        <li>Chính sách bảo mật</li>
                        <li>Chính sách thanh toán</li>
                        <li>Liên Hệ</li>
                        <li>Chính sách bảo mật thông tin cá nhân</li>
                        <li>Nhận xét về MyLeague</li>
                        <li>Bảng giá</li>
                    </ul>
                    <div className="footer-socials">
                        <a href="#"><img src="/src/assets/icons/email-icon.png" alt="Email" /></a>
                        <a href="#"><img src="/src/assets/icons/facebook-icon.png" alt="Facebook" /></a>
                        <a href="#"><img src="/src/assets/icons/instagram-icon.png" alt="Instagram" /></a>
                    </div>
                </div>

                <div className="footer-right">
                    <p className="footer-company-name">CÔNG TY CỔ PHẦN STEM</p>
                    <p className="footer-address">
                        Vinhome GrandPark ,Nguyễn Xiển,Phường Long Thạch Mỹ ,Thành Phố Thủ Đức, Việt Nam
                    </p>
                    <p className="footer-contact">
                        <span>📞 : 0397 125 125</span>
                        <span>✉️ : contact@stem.vn</span>
                    </p>
                    <p className="footer-copyright">
                        © 2024 - Bản quyền thuộc về stem.vn
                    </p>
                </div>

                <div className="footer-qr-section">
                    <div className="footer-qr">
                        <img src={qrCode} alt="QR Code" />
                    </div>
                    <div className="footer-apps">
                        <img src={appleStore} alt="App Store" />
                        <img src={googlePlay} alt="Google Play" />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
