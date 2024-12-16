import React, { useEffect, useState } from 'react';
import './OrderTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { ListOrder } from '../../../../redux/actions/AdminAction';

const OrderTable = () => {
  const dispatch = useDispatch();
  const ListOrderData = useSelector((state) => state.getListOrder);

  const [search, setSearch] = useState('');
  const AccountArrayData = Array.isArray(ListOrderData?.success?.data) ? ListOrderData?.success?.data : [];
  //console.log(ListOrderData);

  useEffect(() => {
    dispatch(ListOrder(search));
  }, [dispatch, search]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update search term dynamically
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Xử lý tìm kiếm ở đây nếu cần
      console.log('Tìm kiếm:', search);
      // Reset ô tìm kiếm
      setSearch('');
    }
  };
  return (
    <div className="order_table_container">
      <div className="order_table_title">
        Đơn Hàng
      </div>
      <div className="order_table_header">
        <div className="order_table_search_container">
          <input type="text"
            placeholder="Tìm kiếm khách hàng"
            className="order_table_search_input"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown} />
        </div>
        <div className="order_table_action_buttons">
          <button className="order_table_export_button">Xuất file</button>

        </div>
      </div>
      <div className="order_table_container_scroll">
        <table className="order_table_main">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Mã đơn hàng</th>
              <th>Tổng tiền</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Ngày thanh toán</th>
              <th>Phương thức thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {AccountArrayData.map((order) => (
              <tr key={order.id}>
                <td><input type="checkbox" /></td>
                <td><a href="#" className="order_table_order_id">{order.id}</a></td>
                <td>{formatCurrency(order.amount)}</td>
                <td className="order_table_info">
                  <img src={order.image} alt={order.customer} className="order_table_avatar" />
                  {order.nameUser}
                </td>
                <td><span className={`status_label ${order.status === 'Success' ? 'success' : 'failed'}`}>{order.status === 'Success' ? "Thành Công" : "Thất Bại"}</span></td>
                <td>{formatDate(order.orderDate)}</td> {/* Chỉnh sửa ở đây */}
                <td>{order.methodOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default OrderTable;
