import React, { useEffect } from 'react';
import './CustomerTable.css';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineExport } from 'react-icons/ai';
import {ListAccount} from '../../../../redux/actions/AdminAction';
import { useDispatch, useSelector } from 'react-redux';

// const customers = [
//   { id: 1, name: 'Hoàng An', email: 'hoangan@example.com', phone: '0912345678', orders: 120, totalSpent: '3,000,000đ', tournament: '2', package: 'Gói vàng', avatar: 'https://i.pravatar.cc/100?img=8' },
//   { id: 2, name: 'Nguyễn Bảo', email: 'nguyenbao@example.com', phone: '0934567890', orders: 80, totalSpent: '2,500,000đ', tournament: '10', package: 'Gói bạc', avatar: 'https://i.pravatar.cc/100?img=9' },
//   { id: 3, name: 'Phạm Cường', email: 'phamcuong@example.com', phone: '0987654321', orders: 65, totalSpent: '1,800,000đ', tournament: '5', package: 'Gói đồng', avatar: 'https://i.pravatar.cc/100?img=10' },
//   { id: 4, name: 'Lê Duy', email: 'leduy@example.com', phone: '0976543210', orders: 45, totalSpent: '1,200,000đ', tournament: '8', package: 'Gói tiêu chuẩn', avatar: 'https://i.pravatar.cc/100?img=11' },
//   { id: 5, name: 'Trần Hùng', email: 'tranhung@example.com', phone: '0965432109', orders: 98, totalSpent: '2,200,000đ', tournament: '4', package: 'Gói vàng', avatar: 'https://i.pravatar.cc/100?img=12' },
//   { id: 6, name: 'Võ Minh', email: 'vominh@example.com', phone: '0943210987', orders: 54, totalSpent: '1,500,000đ', tournament: '20', package: 'Gói bạc', avatar: 'https://i.pravatar.cc/100?img=13' },
//   { id: 7, name: 'Đặng Tú', email: 'dangtu@example.com', phone: '0932109876', orders: 76, totalSpent: '2,700,000đ', tournament: '1', package: 'Gói vàng', avatar: 'https://i.pravatar.cc/100?img=14' },
// ];


const CustomerTable = () => {
  
    const dispatch = useDispatch();
    const ListAccountData = useSelector((state) => state.getListAccount);
  
    const AccountArrayData = Array.isArray(ListAccountData?.success?.data.data) ? ListAccountData?.success?.data.data : [];
    
   
    useEffect(() => {
      dispatch(ListAccount()); 
      
  }, [dispatch]);
 
  return (
    <div className="customer_table_container">
      <div className='customer_table_title'>
        Người dùng
      </div>
      <div className="customer_table_header">
        <div className="customer_table_search_container">
          <FaSearch className="customer_table_search_icon" />
          <input type="text" placeholder="Search Customers" className="customer_table_search_input" />
        </div>
      
        <div className="customer_table_action_buttons">
          <button className="customer_table_export_button"><AiOutlineExport /> Export</button>
          <button className="customer_table_add_button">+ Thêm người dùng</button>
        </div>
      </div>

      <table className="customer_table_main">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Người dùng</th>
            <th>Email</th>
            <th>Số điện thoại</th>           
            <th>Giải đấu</th>
            <th>Thí sinh</th>
            <th>Gói</th>
          </tr>
        </thead>
        <tbody>
          {AccountArrayData.map((customer) => (
            <tr key={customer.id}>
              <td><input type="checkbox" /></td>
              <td className="customer_table_info">
                <img src={customer.image} alt={customer.image} className="customer_table_avatar" />
               
              </td>
              <td><a href={`mailto:${customer.email}`} className="customer_table_email_link">{customer.email}</a></td>
              <td>{customer.phoneNumber}</td>
             
            
              <td>{customer.countTournament}</td>
              <td>{customer.countContestant}</td>
              <td>{customer.packageName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
