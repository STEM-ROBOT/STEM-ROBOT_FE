import React from 'react';
import Header from '../../../system-ui/component/Header/Header';
import ProfileDashboard from '../../component/ProfileDashboard/ProfileDashboard';
import Footer from '../../../system-ui/component/Footer/Footer';
import './Account.css'
import { Routes, Route } from 'react-router-dom';
import { profileChildren } from "../../../../router/ModeratorRouter";

const Account = () => {
  return (
    <>
      <Header />
      <ProfileDashboard />
      <div className='account-outer'>
        <Routes>
          {profileChildren.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Account;
