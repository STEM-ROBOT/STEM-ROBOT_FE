import React, { useState, useEffect } from 'react';
import './GenreModal.css';

const GenreModal = ({ isOpen, onClose, onSave, genre }) => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [ruleFile, setRuleFile] = useState(null);
  const [scoreFile, setScoreFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentRuleFileUrl, setCurrentRuleFileUrl] = useState('');
  const [currentScoreFileUrl, setCurrentScoreFileUrl] = useState('');

  useEffect(() => {
    if (genre) {
      setTitle(genre.title);
      setCurrentImageUrl(genre.imageUrl);
      setCurrentRuleFileUrl(genre.ruleFile);
      setCurrentScoreFileUrl(genre.scoreFile);
      setImageFile(null);
      setRuleFile(null);
      setScoreFile(null);
    } else {
      setTitle('');
      setCurrentImageUrl('');
      setCurrentRuleFileUrl('');
      setCurrentScoreFileUrl('');
      setImageFile(null);
      setRuleFile(null);
      setScoreFile(null);
    }
  }, [genre]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setCurrentImageUrl(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleSave = () => {
    const updatedGenre = {
      id: genre ? genre.id : Date.now(),
      title,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : currentImageUrl,
      ruleFile: ruleFile ? URL.createObjectURL(ruleFile) : currentRuleFileUrl,
      scoreFile: scoreFile ? URL.createObjectURL(scoreFile) : currentScoreFileUrl,
    };
    onSave(updatedGenre);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="genre_modal_overlay">
      <div className="genre_modal">
        <h3 className="genre_modal_title">{genre ? 'Chỉnh sửa nội dung' : 'Thêm nội dung mới'}</h3>
        
        <label className="genre_modal_label">Tên nội dung</label>
        <input
          type="text"
          placeholder="Tên nội dung"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="genre_modal_input"
        />

        <label className="genre_modal_label">Hình ảnh hiện tại</label>
        {currentImageUrl && (
          <img src={currentImageUrl} alt="Current" className="genre_modal_current_image" />
        )}
        <input
          type="file"
          onChange={handleImageChange}
          className="genre_modal_input"
        />

        <label className="genre_modal_label">Quy tắc (Rule) File Hiện tại</label>
        {currentRuleFileUrl && (
          <a href={currentRuleFileUrl} target="_blank" rel="noopener noreferrer" className="genre_modal_link">
            Xem quy tắc hiện tại
          </a>
        )}
        <input
          type="file"
          onChange={(e) => setRuleFile(e.target.files[0])}
          className="genre_modal_input"
        />

        <label className="genre_modal_label">Điểm số (Score) File Hiện tại</label>
        {currentScoreFileUrl && (
          <a href={currentScoreFileUrl} target="_blank" rel="noopener noreferrer" className="genre_modal_link">
            Xem điểm số hiện tại
          </a>
        )}
        <input
          type="file"
          onChange={(e) => setScoreFile(e.target.files[0])}
          className="genre_modal_input"
        />

        <div className="genre_modal_actions">
          <button onClick={onClose} className="genre_modal_button genre_modal_cancel">Hủy</button>
          <button onClick={handleSave} className="genre_modal_button genre_modal_save">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default GenreModal;
