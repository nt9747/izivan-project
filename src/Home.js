import React from 'react'
// import '../../styles/Login.css'
import { Link, Redirect } from 'react-router-dom'
import { requestGetListCarIn, requestLogin } from './api'
import Cookie from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from './Layout/Layout/HomeList';
import Layout_Admin from './Layout/Layout/Layout_Admin';
import './Layout/plugins/fontawesome-free/css/all.min.css'
import './Layout/dist/css/adminlte.min.css'
import './Layout/layout.css'
import a from 'jquery'
import b from 'bootstrap'



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            isLoading: false
        }
    }
    componentDidMount() {
        this.list();
    }

    list = async () => {
        await this.setState({
            isLoading: true
        });
        try {
            const res = await requestGetListCarIn();
            await this.setState({ data: res.data, isLoading: false });
            console.log(this.state.data, "Check data");
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err));
            console.log(err);
        }
    }

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    };

    render() {
        return (<div className="Home">
            <Layout_Admin />
            <SideBar />
        </div>)

    
    }
}
export default Home