import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';

const DashBoard = () => {
    const listRevenue = useSelector((state) => state.getRevenue.list);
    const listStatus = useSelector((state) => state.getStatus.listStatus);
    const listOrder = useSelector((state) => state.getOrder.listOrders || []);
    const listProduct = useSelector((state) => state.getProduct.listProduct?.data || []);
    const listUser = useSelector((state) => state.getUser.listUser || []);
  
    const calculateSum = (orders) => {
      return orders.reduce((acc, order) => acc + order.totalPrice, 0);
    };
  
    const totalMoney = calculateSum(listOrder);
  
    // Hàm định dạng số tiền thành VNĐ và dấu phẩy
    const formatCurrency = (amount) => {
      return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
  
    // Mảng màu sắc cho biểu đồ tròn
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
    const statusMap = {
      4: 'Hoàn Thành',
      3: 'Đang Giao Hàng',
      2: 'Đã Tạo Đơn',
      1: 'Chờ Thanh Toán',
      0: 'Không Hoàn Thành'
    };
  
    const convertedArray = listStatus?.map(item => {
      return {
        name: statusMap[parseInt(item.status, 10)], 
        value: item.value
      };
    }).filter(item => item.name);
  
    console.log(convertedArray);
  
    // Hàm định dạng số tiền trên trục Y
    const formatYAxis = (tickItem) => {
      return tickItem.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
  return (
    <main className='main-container' style={{ width: "80%", padding: "20px 25px" }}>
    <div className='main-title'>
      <h3 style={{ color: '#000' }}>DASHBOARD</h3>
    </div>

    <div className='main-cards'>
      <div className='card'>
        <div className='card-inner'>
          <h3>DOANH THU</h3>
          <BsFillArchiveFill className='card_icon' />
        </div>
        <h1>{formatCurrency(totalMoney)}</h1>
      </div>
      <div className='card'>
        <div className='card-inner'>
          <h3>ĐƠN HÀNG</h3>
          <BsFillGrid3X3GapFill className='card_icon' />
        </div>
        <h1>{listOrder.length}</h1>
      </div>
      <div className='card'>
        <div className='card-inner'>
          <h3>SẢN PHẨM</h3>
          <BsPeopleFill className='card_icon' />
        </div>
        <h1>{listProduct.length}</h1>
      </div>
      <div className='card'>
        <div className='card-inner'>
          <h3>THÀNH VIÊN</h3>
          <BsFillBellFill className='card_icon' />
        </div>
        <h1>{listUser.length}</h1>
      </div>
    </div>

    <div className='charts'>
      <div className='chart-container'>
        <h2 style={{ color: '#000' }}>Biểu đồ doanh thu theo tháng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={listRevenue}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='chart-container'>
        <h2 style={{ color: '#000' }}>Biểu đồ trạng thái đơn hàng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={convertedArray}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {
                convertedArray?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </main>
  )
}

export default DashBoard