import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';
import Logo from '../Logo/Logo';


const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
    if (isSignedIn) {
      return (
        <nav className={isSignedIn ? "flex justify-between" : "flex flex-end"}>
          <Logo />
          <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
        </nav>
      );
    } else {
      return (
        <nav className={isSignedIn ? "flex justify-between" : "flex justify-end"}>
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer light-blue'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer light-blue'>Register</p>
        </nav>
      );
    }
}

export default Navigation;
