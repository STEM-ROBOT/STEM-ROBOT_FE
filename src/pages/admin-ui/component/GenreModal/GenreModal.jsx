import React, { useState, useEffect } from 'react';
import './GenreModal.css';
import FirebaseUpload from '../../../../config/firebase';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const GenreModal = ({ isOpen, onClose, onSave, genre, mode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [ruleFile, setRuleFile] = useState(null);
  const [scoreFile, setScoreFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentRuleFileUrl, setCurrentRuleFileUrl] = useState('');
  const [currentScoreFileUrl, setCurrentScoreFileUrl] = useState('');

  useEffect(() => {
    if (mode === 'edit' && genre) {
      setTitle(genre.name || '');
      setDescription(genre.description || '');
      setCurrentImageUrl(genre.image || '');
      setCurrentRuleFileUrl(genre.hintRule || '');
      setCurrentScoreFileUrl(genre.hintScore || '');
      setImageFile(null);
      setRuleFile(null);
      setScoreFile(null);
    } else {
      setTitle('');
      setDescription('');
      setCurrentImageUrl('');
      setCurrentRuleFileUrl('');
      setCurrentScoreFileUrl('');
      setImageFile(null);
      setRuleFile(null);
      setScoreFile(null);
    }
  }, [genre, mode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setCurrentImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    let imageUrl = currentImageUrl;
    let ruleFileUrl = currentRuleFileUrl;
    let scoreFileUrl = currentScoreFileUrl;

    if (imageFile) {
      imageUrl = await FirebaseUpload(imageFile);
    }
    if (ruleFile) {
      ruleFileUrl = await FirebaseUpload(ruleFile);
    }
    if (scoreFile) {
      scoreFileUrl = await FirebaseUpload(scoreFile);
    }

    const updatedGenre = {
      ...(genre ? { id: genre.id } : {}),
      title,
      description,
      imageUrl,
      ruleFile: ruleFileUrl,
      scoreFile: scoreFileUrl,
    };

    onSave(updatedGenre);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="genre_modal_overlay">
      <div className="genre_modal">
        <h3 className="genre_modal_title">
          {mode === "edit" ? "Chỉnh sửa nội dung" : "Thêm nội dung mới"}
        </h3>

        <div className="genre_modal_container">
          <div className="genre_modal_left">
            <label className="genre_modal_label">Tên nội dung</label>
            <input
              type="text"
              placeholder="Tên nội dung"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="genre_modal_input"
            />

            <label className="genre_modal_label">Hình ảnh </label>
            {currentImageUrl && (
              <img
                src={currentImageUrl}
                alt="Current"
                className="genre_modal_current_image"
              />
            )}
            <label htmlFor="image-upload" className="genre_modal_file_button">
              Tải lên hình ảnh
              <input
                id="image-upload"
                type="file"
                onChange={handleImageChange}
                style={{ display: 'none' }} // Ẩn input
              />
            </label>
          </div>


          <div className="genre_modal_right">
            <label className="genre_modal_label">File Quy tắc</label>
            {currentRuleFileUrl && (
              <a
                href={currentRuleFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="genre_modal_link"
              >
                Xem quy tắc hiện tại
              </a>
            )}
            <label htmlFor="rule-upload" className="genre_modal_file_button">
              Tải lên quy tắc
              <input
                id="rule-upload"
                type="file"
                onChange={(e) => setRuleFile(e.target.files[0])}
                style={{ display: 'none' }} // Ẩn input
              />
            </label>

            <label className="genre_modal_label">File Điểm số</label>
            {currentScoreFileUrl && (
              <a
                href={currentScoreFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="genre_modal_link"
              >
                Xem điểm số hiện tại
              </a>
            )}
            <label htmlFor="score-upload" className="genre_modal_file_button">
              Tải lên điểm số
              <input
                id="score-upload"
                type="file"
                onChange={(e) => setScoreFile(e.target.files[0])}
                style={{ display: 'none' }} // Ẩn input
              />
            </label>
          </div>

        </div>

        <div className="genre_modal_bottom">
          <label className="genre_modal_label">Giới thiệu giải</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            theme="snow"
            placeholder="Nhập mô tả nội dung..."
          />
        </div>

        <div className="genre_modal_actions">
          <button className="genre_modal_button genre_modal_cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="genre_modal_button genre_modal_save" onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenreModal;
