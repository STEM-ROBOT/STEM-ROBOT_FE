import React, { useEffect, useState } from "react";
import Settings from "../InforPorfile/PassWordAccount";
import {
  ChangeInfor,
  InforAccountID,
} from "../../../../redux/actions/AccountAction";
import { FirebaseUpload } from "/src/config/firebase";
import "./InforAccount.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../system-ui/component/Header/Header";
import Footer from "../../../system-ui/component/Footer/Footer";

const InforAccount = () => {
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const dispatch = useDispatch();
  const InforAccountIDs = useSelector((state) => state.getAccountID);
  const [imageView, setImageView] = useState();
  const [vatarInput, setAvatarInput] = useState();
  useEffect(() => {
    // Gọi API để lấy thông tin tài khoản và cập nhật profileInfo khi tải trang
    dispatch(InforAccountID());
  }, [dispatch]);

  // Cập nhật profileInfo khi thông tin tài khoản thay đổi
  useEffect(() => {
    if (InforAccountIDs.success) {
      setImageView(InforAccountIDs.success?.image);
      setProfileInfo({
        image: InforAccountIDs.success?.image || "",
        name: InforAccountIDs.success.name || "",
        phoneNumber: InforAccountIDs.success.phoneNumber || "",
        email: InforAccountIDs.success.email || "",
      });
    }
  }, [InforAccountIDs.success]);

  const handleSave = async () => {
    const image = await FirebaseUpload(vatarInput);
    console.log(image);

    const account = {
      image: image,
      name: profileInfo.name,
      phoneNumber: profileInfo.phoneNumber,
      email: profileInfo.email,
    };
    dispatch(ChangeInfor(account));
    // dispatch(InforAccountID());
  };
  const handleFileChange = (e) => {
    // setShowInputDesImg(true);
    // setImageIndex(e.target.files[0]);

    const file = e.target.files[0];
    setAvatarInput(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageView(reader.result);
        console.log(e.target.files[0]);
      };
      reader.readAsDataURL(file);
    }
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
      <Header />
      <div className="league_container">
        <div className="profile-container">
          <h2 className="profile-header">
            <i className="fa fa-user"></i> Thông tin tài khoản
          </h2>
          <div className="profile-content">
            <div className="profile-left">
              <div className="profile-picture-section">
                <label>
                  <div className="label_avatar">Hình đại diện</div>
                  <img className="avatar_view" src={imageView} alt="" />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                  />
                </label>

                <p className="change-password" onClick={openPasswordModal}>
                  Thay đổi mật khẩu
                </p>
              </div>
            </div>
            <div className="profile-right">
              <form>
                <div className="form-group">
                  <label>Tên</label>
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
                  onChange={handleInputChange}
                />
              </div>
                <button
                  type="button"
                  className="save-button"
                  onClick={handleSave}
                >
                  Lưu
                </button>
              </form>
            </div>
          </div>

          {/* Password Change Modal */}
          <Settings isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default InforAccount;
