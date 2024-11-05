import React, { useEffect, useState } from 'react';
import Settings from '../InforPorfile/PassWordAccount';
import { ChangeInfor, InforAccountID } from '../../../../redux/actions/AccountAction';
import './InforAccount.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../system-ui/component/Header/Header';
import Footer from '../../../system-ui/component/Footer/Footer';

const InforAccount = () => {
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  });

  const dispatch = useDispatch();
  const InforAccountIDs = useSelector((state) => state.getAccountID);

  useEffect(() => {
    // Gọi API để lấy thông tin tài khoản và cập nhật profileInfo khi tải trang
    dispatch(InforAccountID());
  }, [dispatch]);

  // Cập nhật profileInfo khi thông tin tài khoản thay đổi
  useEffect(() => {
    if (InforAccountIDs.success) {
      setProfileInfo({
        name: InforAccountIDs.success.name || '',
        phoneNumber: InforAccountIDs.success.phoneNumber || '',
        email: InforAccountIDs.success.email || ''
      });
    }
  }, [InforAccountIDs.success]);

  const handleSave =  () => {
     dispatch(ChangeInfor(profileInfo));
   // dispatch(InforAccountID());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  return (
      <>
      <Header/>
      <div className="profile-container-parent">
      <div className="profile-container">
        <h2 className="profile-header">
          <i className="fa fa-user"></i> Thông tin tài khoản
        </h2>
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-picture-section">
              <div className="profile-picture" onClick={() => alert("Change Picture Clicked")}>
                <img src={InforAccountIDs.success?.image} alt="Profile" />
                <span className="change-picture-text">Nhấn vào để thay đổi hình ảnh</span>
              </div>
              <p className="change-password" onClick={openPasswordModal}>Thay đổi mật khẩu</p>
            </div>
          </div>
          <div className="profile-right">
            <form>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileInfo.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profileInfo.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={profileInfo.email}
                  onChange={handleInputChange}
                />
              </div>
              <button type="button" className="save-button" onClick={handleSave}>Lưu</button>
            </form>
          </div>
        </div>

        {/* Password Change Modal */}
        <Settings isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
      </div>
    </div>

      <Footer/>
      
      </>
  );
}

export default InforAccount;
