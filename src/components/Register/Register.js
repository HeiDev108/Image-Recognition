import React from 'react';
import ServerConfig from '../Utils/server.utils';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onRegister = () => {
    fetch(`${ServerConfig.address}/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(reg => {
        // sign in and create token
        fetch(`${ServerConfig.address}/signin`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.userId && data.success === 'true') {
              this.saveAuthTokenInSession(data.token)
              fetch(`${ServerConfig.address}/profile/${data.userId}`, {
                method: 'get',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': data.token
                }
              })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
                  this.props.loadUser(user)
                  this.props.onRouteChange('home');
                }
              })
              .catch(console.log)
            }
          })})}


  render() {
    return (
      <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-near-black o-90">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 blue">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 blue" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 blue" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-gray white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 blue" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onRegister}
                className="b ph3 pv2 input-reset ba b--black bg-dark-gray grow pointer f6 dib blue"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
