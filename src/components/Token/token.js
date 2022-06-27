import React from 'react';

class Token extends React.Component {
  constructor(props) {
    super(props);
  }


  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  CreateToken = (data) => {
    if (data.userId && data.success === 'true') {
      this.saveAuthTokenInSession(data.token)
    }
  }
}
