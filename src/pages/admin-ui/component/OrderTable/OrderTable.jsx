import React from 'react';
import './OrderTable.css';

const orders = [
  { id: '#2415', price: '2,280,000₫', customer: 'Hoàng An', avatar: 'https://i.pravatar.cc/100?img=8', paymentStatus: 'Thành công', deliveryType: 'PayOS', date: 'Nov 12, 10:45 PM' },
  { id: '#7845', price: '1,500,000₫', customer: 'Nguyễn Bảo', avatar: 'https://i.pravatar.cc/100?img=9', paymentStatus: 'Thất bại', deliveryType: 'PayOS', date: 'Nov 12, 10:45 PM' },
  { id: '#5674', price: '1,200,000₫', customer: 'Phạm Cường', avatar: 'https://i.pravatar.cc/100?img=10', paymentStatus: 'Thành công', deliveryType: 'PayOS', date: 'Nov 12, 10:45 PM' },
  { id: '#6678', price: '980,000₫', customer: 'Lê Duy', avatar: 'https://i.pravatar.cc/100?img=11', paymentStatus: 'Thành công', deliveryType: 'PayOS', date: 'Nov 12, 10:45 PM' },
  { id: '#2367', price: '750,000₫', customer: 'Trần Hùng', avatar: 'https://i.pravatar.cc/100?img=12', paymentStatus: 'Thất bại', deliveryType: 'PayOS', date: 'Nov 12, 10:45 PM' },
  { id: '#9870', price: '1,450,000₫', customer: 'Võ Minh', avatar: 'https://i.pravatar.cc/100?img=13', paymentStatus: 'Thất bại', deliveryType: 'PayOS', date: 'Nov 12, 10:45 PM' },
  { id: '#3456', price: '650,000₫', customer: 'Đặng Tú', avatar: 'https://i.pravatar.cc/100?img=14', paymentStatus: 'Thành công', deliveryType: 'PayOS', date: 'Nov 12, 10:45 PM' },
];

const OrderTable = () => {
  return (
    <div className="order_table_container">
      <div className="order_table_title">
        Đơn Hàng
      </div>
      <div className="order_table_header">
        <div className="order_table_search_container">
          <input type="text" placeholder="Tìm kiếm khách hàng" className="order_table_search_input" />
        </div>
      
        <div className="order_table_action_buttons">
          <button className="order_table_export_button">Xuất file</button>
          <button className="order_table_add_button">+ Thêm đơn hàng</button>
        </div>
      </div>

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
          {orders.map((order) => (
            <tr key={order.id}>
              <td><input type="checkbox" /></td>
              <td><a href="#" className="order_table_order_id">{order.id}</a></td>
              <td>{order.price}</td>
              <td className="order_table_info">
                <img src={order.avatar} alt={order.customer} className="order_table_avatar" />
                {order.customer}
              </td>
              <td><span className={`status_label ${order.paymentStatus === 'Thành công' ? 'success' : 'failed'}`}>{order.paymentStatus}</span></td>
              <td>{order.date}</td>
              <td>{order.deliveryType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
