import React from 'react'
// import '../../styles/Login.css'
import { Link, Redirect, Router } from 'react-router-dom'
import { requestLogin } from './api'
import Cookie from 'js-cookie';
import './App.css'
import logo from './Layout/img/logo2.png'
import ReactDOM from 'react-dom';
// import Routes from './navigation';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'kingman',
            password: '123123'
        }
        this.login = this.login.bind(this);
    }

    // componentDidMount(){
    //     window.location.href = '/home';
    // }


    async login() {
        try {
           
            const res = await requestLogin({
              USERNAME: this.state.username,
              PASS: this.state.password
            });
             window.location.href = '/home';
            Cookie.set('SESSION_ID', res.data.TokenDangNhap)
            
        } catch (err) {
            alert("Sai tên tài khoản hoặc mật khẩu rồi!!! ")
        }
    }

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    render() {
        const { username, password } = this.state;
        const token = Cookie.get("SESSION_ID");
        // if (token) {
        //     return <Redirect to='/' />
        // }
        return (
            <>
    <div class="container" className="App" id="backgr" style={{ height: '830px' }}>
    <div class="row"  style={{marginLeft:'18%', marginRight: '10%'}}>
        <div class="col-md-offset-5 col-md-4 text-center" >
            
              <div class="form-login" style={{marginTop: '50%'}}><br/>
                    <img src={logo} id="logo1" />
                <br/><br/>
               <input type="username"
                                    placeholder="Tài khoản"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => this.handleTextChange('username', e)}
                                />
                <br/>
               <input type="password"
                                    placeholder="Mật khẩu"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => this.handleTextChange('password', e)}
                                />
                <br/>
                <div class="wrapper">
                        <span class="group-btn">
                            <a  onClick={() => this.login()}><h4 class='text-white'><button class="btn btn-danger">Đăng nhập</button></h4></a>
                        </span>
                </div>
            </div>
        </div>
    </div>
    </div>
            </>
        )
    }
}

// ReactDOM.render(<App />, document.getElementById('Login'));
export default App
