import React from 'react';
import ServerConfig from '../Utils/server.utils';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmitSignIn = () => {
    fetch(`${ServerConfig.address}/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
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
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-near-black o-90">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 blue ">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 blue" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 blue " htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-dark-gray grow pointer f6 dib blue"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black  db pointer blue ">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
