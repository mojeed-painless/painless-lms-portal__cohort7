import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listTexts } from '../data.js';
import pcalogo from '../assets/pcalogo.png';
import profileImage from '../assets/profile-image.jpg';
import LogoutButton from '../components/common/LogoutButton';
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import '../assets/styles/layout.css';

const MainLayout = () => {
  const { user } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHiden, setIsHiden] = useState(false);
  const [selectedLink, setSelectedLink] = useState('Home');

  function handleClickedLink(activeLink) {
    setSelectedLink(activeLink)
  }

  const smallAsideRef = useRef(null);

    useEffect(() => {
      const handleOutsideClick = (e) => {
        const target = e.target;

        if (isHiden && smallAsideRef.current && !smallAsideRef.current.contains(target)) {
          setIsHiden(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('touchstart', handleOutsideClick);
      };
    }, [isHiden]);



  return (
    <div className="container">
      <nav>
        <div className="nav__left">
          {/* Works for WINDOWS screen only  */}
          <span className='collapse-btn large-collapse-btn' onClick={() => setIsCollapsed(prev => !prev)}>
            { isCollapsed ? <TbLayoutSidebarRightCollapse /> : <TbLayoutSidebarLeftCollapse />}
          </span>

          {/* Works for MOBILE screen only */}
          <span className='collapse-btn small-collapse-btn' onClick={() => setIsHiden(prev => !prev)}>
            { isHiden ? <TbLayoutSidebarLeftCollapse /> : <TbLayoutSidebarRightCollapse />}
          </span>

          <div className="nav-logo">
            <img src={pcalogo} alt="academy logo" />
          </div>
        </div>

        <div className="nav__right">
          <div className="nav__username">{user.firstName || "User"}</div>
          {/* <div className="nav__username">Mojeed</div> */}
          <div className="nav__user-image">
            <img src={profileImage} alt="user profile" />
          </div>
        </div>
      </nav>

      <main>
        <aside className={ isCollapsed ? 'collapsed-sidebar' : '' }>
         {(listTexts.map(({ id, to, icon: Icon, text }) => (
            <Link to={to} key={id} className={`sidebar__links ${selectedLink === text ? "active-sidebar__links" : ''}`} onClick={() => handleClickedLink(text)}>
              <span><Icon /></span>
              {!isCollapsed && <span>{text}</span>}
            </Link>
          )))}
          <LogoutButton 
            className="dashboard__logout-btn" 
            isCollapsed={isCollapsed}
          />
        </aside>

        {/* for MOBILE screen */}

        <aside ref={smallAsideRef} className={ `small-screen__sidebar ${ isHiden ? 'show-sidebar' : '' } ` }>
         <div className="sidebar-header">
            <span className='collapse-btn' onClick={() => setIsHiden(prev => !prev)}>
              { isHiden ? 
                  <TbLayoutSidebarLeftCollapse /> : 
                  <TbLayoutSidebarRightCollapse />}
            </span>
            <div className="nav-logo">
              <img src={pcalogo} alt="academy logo" />
            </div>
         </div>

         <div className='sidebar-body'>
            {(listTexts.map(item => (
              <Link to={item.to} key={item.id} className="sidebar__links" onClick={() => setIsHiden(prev => !prev)}>
                <span><item.icon /></span>
                <span>{item.text}</span>
              </Link>
            )))}
            <LogoutButton className="dashboard__logout-btn"/>
          </div>
        </aside>
        
        <Outlet />
      </main>
      
      
    </div>
  );
};

export default MainLayout;