import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarInfo, requestLogin, resquestGetListLoaiHang } from '../../api'
import Cookie from 'js-cookie';
import { render } from '@testing-library/react';
import TableScrollbar from 'react-table-scrollbar';

class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ""
        }
    }
    componentDidMount() {
        this.start()

    }
    async start() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await resquestGetListLoaiHang({
            })
            await this.setState({ data: res.data });
            console.log(res.data);
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }
    render() {
        const { data} = this.state;
        return (
            <div class="content-wrapper">
                <div class="card card-warning" >
                    <div class="card-header" >
                        <h3 class="card-title"><i>Thêm loại hàng</i></h3>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <input type="text" name="" /> <button class="btn btn-danger"><b>Thêm mới</b></button>
                        </div>
                    </div>
                </div>
                <div class="card card-warning">
                    <div class="card-header">
                        <h3 class="card-title">Danh sách thực tế</h3>
                    </div>
                    <div class="card-body">
                        <div style = {{overflow: 'auto',height: '650px'}}>
                        <table className="table table-bordered table-hover" id="example2" style={{ border: '1px solid black', textAlign: 'center'}} >
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            {this.state.data && data.map((item, i) => (
                                <tbody>
                                    <tr>
                                        <td>{item.ID}</td>
                                        <td>{item.cName}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Content