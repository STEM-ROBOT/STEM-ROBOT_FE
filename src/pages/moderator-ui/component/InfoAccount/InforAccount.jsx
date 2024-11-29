import React, { useEffect, useState } from 'react';
import Settings from '../InforPorfile/PassWordAccount';
import { ChangeInfor, InforAccountID } from '../../../../redux/actions/AccountAction';
import './InforAccount.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../system-ui/component/Header/Header';
import Footer from '../../../system-ui/component/Footer/Footer';
import FirebaseUpload from '../../../../config/firebase';
import { toast } from 'react-toastify';

const InforAccount = () => {
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    image: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [logoFile, setLogoFile] = useState(null); // Lưu file ảnh cần tải lên
  const dispatch = useDispatch();
  const InforAccountIDs = useSelector((state) => state.getAccountID);
  const isAdd = useSelector((state)=>state.ChangeInfor.success)

  const getInitial = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };

  // Lấy thông tin tài khoản khi component render
  useEffect(() => {
    dispatch(InforAccountID());
  }, [dispatch,isAdd]);

  // Đồng bộ thông tin tài khoản vào state
  useEffect(() => {
    if (InforAccountIDs.success) {
      setProfileInfo({
        name: InforAccountIDs.success.name || '',
        phoneNumber: InforAccountIDs.success.phoneNumber || '',
        email: InforAccountIDs.success.email || '',
        image: InforAccountIDs.success.image || ''
      });
    }
  }, [InforAccountIDs.success]);

  // Xử lý lưu thông tin tài khoản
  const handleSave = async () => {
    let imageUrl = profileInfo.image || ""; // URL ảnh cũ nếu không thay đổi

    console.log(logoFile)
    if (logoFile) {
      try {
        console.log("Uploading image...");
        imageUrl = await FirebaseUpload(logoFile); // Gọi hàm tải ảnh
        console.log("Image uploaded:", imageUrl);
      } catch (error) {
        alert("Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.");
        console.error("Error uploading image:", error);
        return;
      }
    }

    dispatch(ChangeInfor({ ...profileInfo, image: imageUrl }));
    toast.success("Thông tin đã được cập nhật!");
  };

  // Xử lý thay đổi ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file); // Lưu file để tải lên
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); // Hiển thị ảnh xem trước
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý thay đổi thông tin nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  return (
    <>
      <Header />
      <div className="profile-container-outer">
        <div className="profile-container-parent">
          <div className="profile-container">
            <h2 className="profile-header">
              <i className="fa fa-user"></i> Thông tin tài khoản
            </h2>
            <div className="profile-content">
              <div className="profile-left">
                <div className="profile-picture-section">
                  <div className="profile-picture">
                    <label htmlFor="profileImageInput" className="profile-picture-label">
                      {previewImage || profileInfo.image ? (
                        <img
                          src={previewImage || profileInfo.image}
                          alt="Profile"
                        />
                      ) : (
                        <div className="profile-initial">
                          {getInitial(profileInfo.email)}
                        </div>
                      )}
                      <span className="change-picture-text">Nhấn vào để thay đổi hình ảnh</span>
                    </label>
                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                  </div>
                  <span className="change-email-text">{profileInfo.email}</span>
                  <p className="change-password" onClick={openPasswordModal}>Thay đổi mật khẩu</p>
                </div>
              </div>
              <div className="profile-right">
                <form>
                  <div className="form-group">
                    <label>Họ và Tên</label>
                    <input
                      type="text"
                      name="name"
                      value={profileInfo.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
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
                      disabled
                    />
                  </div>
                  <button type="button" className="save-button" onClick={handleSave}>Lưu</button>
                </form>
              </div>
            </div>
            <Settings isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InforAccount;
