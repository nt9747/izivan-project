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
            password: '123123',
            isLoading: false
        }
        this.login = this.login.bind(this);
    }

    async login() {
        await this.setState({
            isLoading: true
        })
        try {

            const res = await requestLogin({
                USERNAME: this.state.username,
                PASS: this.state.password
            });
            this.setState({ isLoading: false });
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

            <div className="container" className="App" id="backgr" style={{ height: '950px' }}>
                <div className="row" style={{ marginLeft: '38%' }}>
                    <div className="col-md-offset-5 col-md-4 text-center" >
                        <div className="form-login" style={{ marginTop: '60%' }}><br />
                            <img src={logo} id="logo1" />
                            <br /><br /><br />
                            <input type="username"
                                placeholder="Tài khoản"
                                className="form-control"
                                value={username}
                                onChange={(e) => this.handleTextChange('username', e)}
                            />
                            <br />
                            <input type="password"
                                placeholder="Mật khẩu"
                                className="form-control"
                                value={password}
                                onChange={(e) => this.handleTextChange('password', e)}
                            />
                            <a href="/QuenMatKhau"> Quên mật khẩu </a>
                            <br />
                            <br />
                            <div className="wrapper">
                                <span className="group-btn">
                                    <a onClick={() => this.login()}><h4 className='text-white'><button hidden={this.state.isLoading == true} className="btn btn-danger">Đăng nhập</button></h4></a>
                                </span>
                            </div>
                        </div>
                        {this.state.isLoading && <div style={{ textAlign: 'center'   }}>
                            <div style={{ width: '50px', height: '50px' }} className="spinner-border text-primary" role="status">
                                <span className="sr-only">a</span>
                            </div>
                        </div>}
                    </div>
                </div>
            </div >

        )
    }
}

// ReactDOM.render(<App />, document.getElementById('Login'));
export default App
