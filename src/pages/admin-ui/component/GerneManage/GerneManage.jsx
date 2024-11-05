import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import './GerneManage.css';
import GenreModal from '../GenreModal/GenreModal';
import {ListGenre} from '../../../../redux/actions/AdminAction';
import { useDispatch, useSelector } from 'react-redux';

// const initialPackages = [
//     {
//         id: 1,
//         title: 'Robot trồng lúa',
//         imageUrl: 'https://ohstem.vn/wp-content/uploads/2024/04/webinar-stem-he-sinh-thai-robot-moi-orc-ohstem.png',
//         ruleFile: 'https://aburobocon2024.vtv.gov.vn/assets/rulePdfs/Robocon%202024%20Rulebook%20-%20revision%201.0.pdf',
//         scoreFile: 'https://robofight.com.vn/wp-content/uploads/2019/12/19.12.19-Thong-bao-Quy-dinh-ve-cach-cham-diem-1.pdf',
//     },
//     {
//         id: 2,
//         title: 'Robot chiến thuật',
//         imageUrl: 'https://ohstem.vn/wp-content/uploads/2024/04/webinar-stem-he-sinh-thai-robot-moi-orc-ohstem.png',
//         ruleFile: 'https://ohstem.vn/wp-content/uploads/2024/04/webinar-stem-he-sinh-thai-robot-moi-orc-ohstem.png',
//         scoreFile: 'https://ohstem.vn/wp-content/uploads/2024/04/webinar-stem-he-sinh-thai-robot-moi-orc-ohstem.png',
//     },
//     {
//         id: 3,
//         title: 'Robot mê cung',
//         imageUrl: 'https://ohstem.vn/wp-content/uploads/2024/04/webinar-stem-he-sinh-thai-robot-moi-orc-ohstem.png',
//         ruleFile: 'https://ohstem.vn/wp-content/uploads/2024/04/webinar-stem-he-sinh-thai-robot-moi-orc-ohstem.png',
//         scoreFile: 'https://ohstem.vn/wp-content/uploads/2024/04/webinar-stem-he-sinh-thai-robot-moi-orc-ohstem.png',
//     },
// ];

const GerneManage = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const dispatch = useDispatch();
    const ListGenreData = useSelector((state) => state.getListGenre);
    console.log(ListGenreData)
    const AccountArrayData = Array.isArray(ListGenreData.success?.data) ? ListGenreData.success?.data : [];
    console.log(AccountArrayData)
   
    useEffect(() => {
      dispatch(ListGenre()); 
      
  }, [dispatch]);
 
    const handleAddClick = () => {
        setSelectedGenre(null); // Clear any selected genre to open modal for adding new content
        setIsModalOpen(true);
    };

    const handleEditClick = (genre) => {
        setSelectedGenre(genre); // Set the selected genre for editing
        setIsModalOpen(true);
    };

    const handleSaveGenre = (updatedGenre) => {
        setPackages((prevPackages) => {
            const genreIndex = prevPackages.findIndex((pkg) => pkg.id === updatedGenre.id);
            if (genreIndex >= 0) {
                const newPackages = [...prevPackages];
                newPackages[genreIndex] = updatedGenre;
                return newPackages;
            } else {
                return [...prevPackages, updatedGenre];
            }
        });
        setIsModalOpen(false); // Close modal after saving
    };

   return (
        <div className='genre_manage_container'>
            <div className='genre_manage_container_title'>
                Nội dung thi đấu
            </div>
            <div className='genre_manage_container_header'>
                <div className="genre_manage_search_container">
                    <input type="text" placeholder="Tìm kiếm nội dung" className="genre_manage_search_input" />
                </div>

                <div className="genre_manage_action_buttons">
                    <button className="genre_manage_add_button" onClick={handleAddClick}>+ Thêm nội dung</button>
                </div>
            </div>
            <div className="genre_manage_container_wrapper">
                {AccountArrayData.map((pkg) => (
                    <div key={pkg.id} className="genre_card_wrapper">
                        <div className="genre_card_edit_icon" onClick={() => handleEditClick(pkg)}>
                            <CiEdit />
                        </div>
                        <img src={pkg.image} alt={pkg.name} className="genre_card_image" />
                        <div className="genre_card_content_wrapper">
                            <h3 className="genre_card_title_text">{pkg.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <GenreModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveGenre}
                genre={selectedGenre}
            />
        </div>
    );
};

export default GerneManage;
