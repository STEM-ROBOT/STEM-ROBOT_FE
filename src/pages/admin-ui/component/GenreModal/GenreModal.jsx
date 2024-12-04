import React, { useState, useEffect } from 'react';
import './GenreModal.css';
import FirebaseUpload from '../../../../config/firebase';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS
import { useDispatch, useSelector } from 'react-redux';
import { addGenreAction, updateGenreAction } from '../../../../redux/actions/AdminAction';
import LoadingComponent from '../../../system-ui/component/Loading/LoadingComponent';

const GenreModal = ({ isOpen, onClose, onSave, genre, mode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [ruleFile, setRuleFile] = useState(null);
  const [scoreFile, setScoreFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentRuleFileUrl, setCurrentRuleFileUrl] = useState('');
  const [currentScoreFileUrl, setCurrentScoreFileUrl] = useState('');
  const [ruleFileName, setRuleFileName] = useState(''); // State for rule file name
  const [scoreFileName, setScoreFileName] = useState(''); // State for score file name
  const dispatch = useDispatch();
  const loadingAdd = useSelector((state) => state.addGenre.loading)
  const loadingUpdate = useSelector((state) => state.updateGenre.loading)

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
      setRuleFileName('');
      setScoreFileName('');
    } else {
      setTitle('');
      setDescription('');
      setCurrentImageUrl('');
      setCurrentRuleFileUrl('');
      setCurrentScoreFileUrl('');
      setImageFile(null);
      setRuleFile(null);
      setScoreFile(null);
      setRuleFileName('');
      setScoreFileName('');
    }
  }, [genre, mode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setCurrentImageUrl(URL.createObjectURL(file));
    }
  };

  const handleRuleFileChange = (e) => {
    const file = e.target.files[0];
    setRuleFile(file);
    if (file) {
      setRuleFileName(file.name); // Set the file name
    }
  };

  const handleScoreFileChange = (e) => {
    const file = e.target.files[0];
    setScoreFile(file);
    if (file) {
      setScoreFileName(file.name); // Set the file name
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
    if (mode === 'edit') {
      const updatedGenre = {
        name: title,
        description,
        image: imageUrl,
        hintRule: ruleFileUrl,
        hintScore: scoreFileUrl,
        isTop:false
      };
      dispatch(updateGenreAction(genre.id, updatedGenre));
      setRuleFileName('')
      setScoreFileName('')
      onSave(updatedGenre);
      onClose();
    } else {
      const addGenre = {
        name: title,
        description,
        image: imageUrl,
        hintRule: ruleFileUrl,
        hintScore: scoreFileUrl,
        isTop: false,
      };
      dispatch(addGenreAction(addGenre));
      onSave(addGenre);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="genre_modal_overlay">
      {loadingAdd && (
        <LoadingComponent position="fixed"  borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.5)" />
      )}
       {loadingUpdate && (
        <LoadingComponent position="fixed"  borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.5)" />
      )}
      <div className="genre_modal">
        <h3 className="genre_modal_title">
          {mode === 'edit' ? 'Chỉnh sửa nội dung' : 'Thêm nội dung mới'}
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
                style={{ display: 'none' }}
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
            {ruleFileName ? (
              <p className="uploaded-file-name">📂 {ruleFileName}</p>
            ) : (
              <label htmlFor="rule-upload" className="genre_modal_file_button">
                Tải lên quy tắc
                <input
                  id="rule-upload"
                  type="file"
                  onChange={handleRuleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            )}

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
            {scoreFileName ? (
              <p className="uploaded-file-name">📂 {scoreFileName}</p>
            ) : (
              <label htmlFor="score-upload" className="genre_modal_file_button">
                Tải lên điểm số
                <input
                  id="score-upload"
                  type="file"
                  onChange={handleScoreFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            )}
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
          <button
            className="genre_modal_button genre_modal_cancel"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="genre_modal_button genre_modal_save"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenreModal;
