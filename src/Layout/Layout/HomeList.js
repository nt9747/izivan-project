import React, { Component } from 'react';
import empty from '../img/empty.png'
import { requestGetListCarIn, requestLogin, resquestGetListCarType, requestGetListLoaiXe } from '../../api'
import Cookie from 'js-cookie';
import TableScrollbar from 'react-table-scrollbar';
import { Redirect } from 'react-router-dom';
import a from '../img/a.jpg';
import b from '../img/b.jpg';
import c from '../img/c.jpg';
import d from '../img/d.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';





function GetFormatDate(a) {
    const b = new Date(a);
    var hours = b.getUTCHours();
    var minutes = b.getUTCMinutes();
    var seconds = b.getUTCSeconds();
    var month = b.getUTCMonth() + 1;
    var day = b.getUTCDate();
    var year = b.getUTCFullYear();


    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hours.toString().length == 1) {
        hours = '0' + hours;
    }
    if (minutes.toString().length == 1) {
        minutes = '0' + minutes;
    }
    if (seconds.toString().length == 1) {
        seconds = '0' + seconds;
    }
    if (year == 1970) {
        return ""
    }
    else return hours + ":" + minutes + ":" + seconds + "  " + day + "/" + month + "/" + year
}

class HomeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: '01/10/2020 00:00:00',
            toDate: '01/10/2200 00:00:00',
            plateNumber: '',
            portIn: '',
            numberCar: "",
            loaiHang: "",
            data: "",
            isLoading: true,
            page: 1,
            nextPage: "",
            previousPage: "",
            PortOut: '',
            SelectCong: "/listCar/listCarInOut?",
            total: "",
            dataXe: "",
            loaiXe: "",
            showBienXe: true,
            showLoaiXe: false,
            showLoaiHang: false,
            pictureDauXeVao: "",
            pictureDauXeRa: "",
            pictureVaoFull: "",
            pictureRaFull: "",
            pictureBienSo: "",
            dataPicture: "",
            totalPage: "",
            namePort: "",
            dataThongKeXe: "",
            thongKeLoaiXe: "/Statistic/statisticCarInOut",
            TongKetCong: "",
            countIn: "",
            countOut: "",
            totalMoney: "",
            codeThongKeXe: "",
            limitPage: "10",

        }
        this.toggleBienXe = this.toggleBienXe.bind(this)
        this.toggleLoaiHang = this.toggleLoaiHang.bind(this)
        this.toggleLoaiXe = this.toggleLoaiXe.bind(this)
    }

    toggleBienXe = () => {
        const { showBienXe } = this.state;
        this.setState({ showBienXe: true, showLoaiXe: false, showLoaiHang: false })
    }

    toggleLoaiXe = () => {
        const { showLoaiXe } = this.state;
        this.setState({ showLoaiXe: true, showBienXe: false, showLoaiHang: false })
    }

    toggleLoaiHang = () => {
        const { showLoaiHang } = this.state;
        this.setState({ showLoaiHang: true, showBienXe: false, showLoaiXe: false })
    }

    componentDidMount() {
        this.list();
        this.start();
    }
    async listInNext() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarIn({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: ++this.state.page,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
            })
            await this.setState({ data: res.data, isLoading: false, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "Check next page")
            // if (!res.data.data){
            //     return (this.state.page)
            // }
            if (!(this.state.nextPage)) {
                return --this.state.page;
            }
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }

    async listInPrevious() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarIn({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: --this.state.page,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage
            })
            if (this.state.page < 1) {
                ++this.state.page
            }
            await this.setState({ data: res.data, isLoading: false, previousPage: res.data.previousPage });
            console.log(this.state.data, "check data")
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }
    async start() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await resquestGetListCarType({
            })
            await this.setState({ dataXe: res.data });
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }


    async list() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarIn({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.page,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,

            })
            await this.setState({ data: res.data, isLoading: false, page: 1, total: res.data.total });
            this.setState({ totalPage: Math.floor(this.state.total / this.state.limitPage) + 1 })

            const res2 = await requestGetListLoaiXe({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTOUT: this.state.PortOut,
                PORTIN: this.state.portIn,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                LOAIXE: this.state.loaiXe,
                THONGKELOAIXE: this.state.thongKeLoaiXe,
            })
            await this.setState({ codeThongKeXe: res2.data, dataThongKeXe: res2.data, isLoading: false, countIn: res2.data.countIn, countOut: res2.data.countOut, totalMoney: res2.data.totalMoney })

        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
        console.log(this.state.SelectCong, "Check Cong");
        console.log(this.state.codeThongKeXe, "thong ke loai xe");
        console.log(this.state.dataThongKeXe, "data thong ke xe")
        console.log(this.state.fromDate, "fromDate");
        console.log(this.state.toDate, "toDate");
        console.log(this.state.portIn, "portIn");
        console.log(this.state.PortOut, "portOut");
    }

    async Select(row) {
        try {
            const res = await requestGetListCarIn({
                FROMDATE: "10/01/2020 00:00:00",
                TODATE: "10/02/2200 23:59:59",
                PLATENUMBER: row,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: "",
                LOAIHANG: "",
                PAGE: 1,
                CONG: this.state.SelectCong,
                LOAIXE: "",

            })
            await this.setState({ dataPicture: res.data, pictureDauXeVao: res.data.data[0].LinkAnhDauXe, pictureDauXeRa: res.data.data[0].LinkAnhDauXeRa, pictureBienSo: res.data.data[0].LinkAnhBienSo, pictureVaoFull: res.data.data[0].LinkAnhFull, pictureRaFull: res.data.data[0].LinkAnhRaFull });
            console.log(this.state.dataPicture, "check DATA PICTURE")
        } catch (err) {
            await this.setState({
                isLoading: true
            }, () => console.log(err))
        }
        console.log(this.state.data, "Check data!");
    }

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    handlePortChange(field, event) {
        this.setState({ [field]: event.target.value })
        if (event.target.value == '5') {
            this.setState({ portIn: '1', PortOut: '3' })
        }
        else if (event.target.value == '1') {
            this.setState({ portIn: '', PortOut: '' })
        }
        else if (event.target.value == '2') {
            this.setState({ portIn: '0', PortOut: null })
        }
        else if (event.target.value == '3') {
            this.setState({ portIn: null, PortOut: '2' })
        }
        else if (event.target.value == '4') {
            this.setState({ portIn: null, PortOut: '4' })
        }
    }

    handleAPIChange(field, event) {
        this.setState({ [field]: event.target.value })
        if (event.target.value == '1') {
            this.setState({ SelectCong: '/listCar/listCarInOut?', thongKeLoaiXe: "/Statistic/statisticCarInOut" })
        }
        else if (event.target.value == '2') {
            this.setState({ SelectCong: '/listCar/listCarIn?', thongKeLoaiXe: "/Statistic/statisticCarIn" })
        }
        else if (event.target.value == '3') {
            this.setState({ SelectCong: '/listCar/listCarOut?', thongKeLoaiXe: "/Statistic/statisticCarOut" })
        }
        else if (event.target.value == '4')
            this.setState({ SelectCong: '/listCar/listCarParking?', thongKeLoaiXe: "/Statistic/statisticCarParking" })
    }


    render() {
        const { data, dataThongKeXe, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        if (isLoading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <div class="content-wrapper" id="root">
                <section class="content">
                    <div class="container-fluid">
                        <div class="card card-warning">
                            <div class="card-header">
                                <h3 class="card-title"><i>Quản lí xe tổng hợp </i></h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-3" style={{ marginRight: '40px' }}>
                                        <b hidden={this.state.SelectCong == "/listCar/listCarParking?"}>Từ</b><input hidden={this.state.SelectCong == "/listCar/listCarParking?"} type="text" class="form-control" placeholder="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} />
                                    </div>
                                    <div class="col-3" style={{ marginRight: '40px' }}>
                                        <b>Đến</b><input type="text" class="form-control" placeholder="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} />
                                    </div>
                                    <div class="col-3">
                                        <b>Loại Hàng</b><br />
                                        <select value={this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)}>
                                            <option value disabled hidden>Chọn</option>
                                            <option selected value="" >Tất cả</option>
                                            <option value="CAU KHÔ">CAU KHÔ</option>
                                            <option value="THANH LONG">THANH LONG</option>
                                            <option value="CHUỐI NÓNG">CHUỐI NÓNG</option>
                                            <option value="DƯA HẤU">DƯA HẤU</option>
                                            <option value="CHUỐI LẠNH">CHUỐI LẠNH</option>
                                            <option value="SẮN">SẮN</option>
                                            <option value="MÍT LẠNH">MÍT LẠNH</option>
                                            <option value="MÍT NÓNG">MÍT NÓNG</option>
                                            <option value="CÓI">CÓI</option>
                                            <option value="LÁ TRE">LÁ TRE</option>
                                            <option value="LẠC">LẠC</option>
                                            <option value="ĐỖ">ĐỖ</option>
                                            <option value="XOÀI LẠNH">XOÀI LẠNH</option>
                                            <option value="XOÀI NÓNG">XOÀI NÓNG</option>
                                            <option value="BỘT SẮN">BỘT SẮN</option>
                                            <option value="HÀNH TÂY">HÀNH TÂY</option>
                                            <option value="TẠP HÓA">TẠP HÓA</option>
                                            <option value="CÀ RỐT">CÀ RỐT</option>
                                            <option value="LONG NHÃN">LONG NHÃN</option>
                                            <option value="CÚT MÂY">CÚT MÂY</option>
                                            <option value="SONG MÂY">SONG MÂY</option>
                                            <option value="VẢI NÓNG">VẢI NÓNG</option>
                                            <option value="VẢI LẠNH">VẢI LẠNH</option>
                                            <option value="VẢI KHÔ">VẢI KHÔ</option>
                                            <option value="CAU">CAU</option>
                                            <option value="TỎI">TỎI</option>
                                            <option value="KHUÔN MÁY">KHUÔN MÁY</option>
                                            <option value="LÁ CỌ">LÁ CỌ</option>
                                            <option value="NẤM">NẤM</option>
                                            <option value="DƯA VÀNG">DƯA VÀNG</option>
                                            <option value="HOA HỒI">HOA HỒI</option>
                                            <option value="RAU">RAU</option>
                                            <option value="CÂY CẢNH">CÂY CẢNH</option>
                                            <option value="CHẬU CÂY">CHẬU CÂY</option>
                                            <option value="GIẤY">GIẤY</option>
                                            <option value="KHOAI TÂY">KHOAI TÂY</option>
                                            <option value="RỔ RÁ">RỔ RÁ</option>
                                            <option value="CHÔM CHÔM">CHÔM CHÔM</option>
                                            <option value="NHÃN LẠNH">NHÃN LẠNH</option>
                                            <option value="NHÃN NÓNG">NHÃN NÓNG</option>
                                            <option value="NHÃN TƯƠI">NHÃN TƯƠI</option>
                                            <option value="NHÃN KHÔ">NHÃN KHÔ</option>
                                            <option value="NÓN">NÓN</option>
                                            <option value="HẠT SEN">HẠT SEN</option>
                                            <option value="CỦ CẢI">CỦ CẢI</option>
                                            <option value="CHẬU CÂY CẢNH">CHẬU CÂY CẢNH</option>
                                            <option value="GỪNG">GỪNG</option>
                                            <option value="KHOAI SỌ">KHOAI SỌ</option>
                                            <option value="ĐỒ NGỌC">ĐỒ NGỌC</option>
                                            <option value="NỒI CƠM ĐIỆN">NỒI CƠM ĐIỆN</option>
                                            <option value="XỐP">XỐP</option>
                                            <option value="HÀNG HỘP">HÀNG HỘP</option>
                                            <option value="HỒNG">HỒNG</option>
                                            <option value="SẦU RIÊNG">SẦU RIÊNG</option>
                                            <option value="ỚT">ỚT</option>
                                            <option value="MÁY MÓC">MÁY MÓC</option>
                                            <option value="ĐỖ XANH">ĐỖ XANH</option>
                                            <option value="ĐỖ ĐỎ">ĐỖ ĐỎ</option>
                                            <option value="GIÀY DÉP">GIÀY DÉP</option>
                                            <option value="HÀNH TỎI">HÀNH TỎI</option>
                                            <option value="NỘI THẤT">NỘI THẤT</option>
                                            <option value="HẠT DƯA">HẠT DƯA</option>
                                            <option value="BÁNH PÍA">BÁNH PÍA</option>
                                            <option value="HẠT TRẦU">HẠT TRẦU</option>
                                            <option value="NỘI THẤT">NỘI THẤT</option>
                                        </select>
                                    </div>
                                    <div>
                                        <table>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}><b>Vào</b></td>
                                                <td style={{ textAlign: 'center' }}><b>Ra</b></td>
                                                <td style={{ textAlign: 'center' }}><b>Tồn</b></td>
                                                <td style={{ textAlign: 'center' }}><b>Tổng doanh thu</b></td>
                                            </tr>
                                            <tr>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#E79FEB', width: '50px', height: '50px', display: 'inline-block' }}>{this.state.countIn}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#8CE135', width: '50px', height: '50px', display: 'inline-block' }}>{this.state.countOut}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35DFE1', width: '50px', height: '50px', display: 'inline-block' }}>{this.state.countIn - this.state.countOut}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '150px', height: '50px', display: 'inline-block' }}>{this.state.totalMoney}</b></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-1" style={{ marginRight: '70px' }}>
                                        <b>Loại xe</b><br />
                                        <select value={this.state.loaiXe} onChange={(e) => this.handleTextChange('loaiXe', e)}>{this.state.dataXe && this.state.dataXe.map((item, i) => <option value={item.ID}>{item.Name}</option>)}
                                            <option value=''>Tất cả</option>
                                        </select>
                                    </div>
                                    <div class="col-2" style={{ marginRight: '70px' }}>
                                        <b>Số thứ tự</b><input type="text" class="form-control" placeholder="Nhập Số thứ tự" />
                                    </div>
                                    <div class="col-2" style={{ marginRight: '70px' }}>
                                        <b>Biển số xe</b><input type="text" class="form-control" placeholder="Nhập Biển Số" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} />
                                    </div>
                                    <div class="col-2" style={{ marginRight: '70px' }}>
                                        <b>Mã số thẻ</b><input type="text" class="form-control" placeholder="Nhập Mã số thẻ" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <b>Cổng</b><br />
                                        <select value={this.state.namePort} onChange={(e) => this.handlePortChange('namePort', e)}>
                                            <option selected disabled hidden>Chọn</option>
                                            <option value='1'>Tất cả</option>
                                            <option value='2'>Cổng vào VN</option>
                                            <option value='3'>Cổng ra quay đầu</option>
                                            <option value='4'>Cổng ra xuất</option>
                                            <option value='5'>Cổng vao ra CN</option>
                                        </select>
                                        <select value={this.state.TongKetCong} onChange={(e) => this.handleAPIChange('TongKetCong', e)}>
                                            <option selected disabled hidden>Chọn</option>
                                            <option value='1'>0. Giao dịch vào ra</option>
                                            <option value='2'>1. Giao dịch vào </option>
                                            <option value='3'>2. Giao dịch ra</option>
                                            <option value='4'>3. Số lượng xe tồn</option>
                                        </select>
                                    </div>
                                    <div class="col-2"><br />
                                        <button type="submit"
                                            className="btn btn-danger"
                                            onClick={() => this.list()}>
                                            <b>Tìm kiếm</b>
                                        </button>
                                    </div>

                                    <div class="col-2"><br />
                                        <form action="/ExportExcel">
                                            <button type="submit"
                                                className="btn btn-success"
                                            >
                                                <b>Export Excel</b>
                                            </button>
                                        </form>
                                    </div>
                                    <div class="col-2"><br />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ui grid middle aligned" id="admin1" style={{ float: 'left', width: '73%', height: '700px' }}>
                            <div class="card-header" >
                                <h3 class="card-title" >
                                    <button class="btn btn-secondary" style={{ marginRight: '3px' }} onClick={this.toggleBienXe}>Biển Số</button>
                                    <button class="btn btn-secondary" style={{ marginRight: '3px' }} onClick={this.toggleLoaiXe}>Loại Xe</button>
                                    <button class="btn btn-secondary" style={{ marginRight: '3px' }} onClick={this.toggleLoaiHang}>Loại Hàng</button>
                                </h3>
                            </div>
                            {this.state.showBienXe && <div>
                                <div style={{ float: "right", width: "150px" }}>
                                    <b>Số trang </b>
                                    <select value={this.state.limitPage} onChange={(e) => this.handleTextChange('limitPage', e) || this.list()}>
                                        <option selected disabled hidden>Chọn</option>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                        <option value='35'>35</option>
                                        <option value='50'>50</option>
                                    </select>
                                </div>
                                <div style={{ float: "right", width: "310px", border: "none" }}>
                                    {/* <button class="myButton1" type="submit"
                                        style={{ color: '#C8C8C8', marginRight: "10px" }}
                                        onClick={() => this.listInPrevious()}>
                                        <b style={{ color: 'black' }}>Previous</b>
                                    </button> */}

                                    {/* <button id="nut" class="myButton" hidden={(this.state.page < 3)} onClick={() => this.list()}> 1 </button><a hidden={this.state.page < 5}>...</a>
                                    <button id="nut" class="myButton" hidden={(this.state.page <= 3)} onClick={() => this.setState({ page: this.state.page - 1 }) || this.listInPrevious()}>{this.state.page - 2}</button>
                                    <button id="nut" class="myButton" hidden={(this.state.page < 2)} onClick={() => this.listInPrevious()} >{this.state.page - 1}</button> */}
                                    {/* <button id="nut" class="myButton" style={{ color: 'red' }}>{this.state.page}</button> */}
                                    {/* <button id="nut" class="myButton" hidden={(this.state.page == this.state.totalPage)} onClick={() => this.listInNext()}>{this.state.page + 1}</button> */}
                                    {/* <button id="nut" class="myButton" hidden={((this.state.page == this.state.totalPage) || (this.state.page == this.state.totalPage - 1))} onClick={() => this.setState({ page: this.state.page + 1 }) || this.listInNext()}>{this.state.page + 2}</button> */}
                                    {/* <button id="nut" class="myButton" hidden={((this.state.page == this.state.totalPage) || (this.state.page == this.state.totalPage - 1) || (this.state.page == this.state.totalPage - 2))} onClick={() => this.setState({ page: this.state.page + 2 }) || this.listInNext()}>{this.state.page + 3}</button> */}
                                    {/* <button id="nut" class="myButton" hidden={((this.state.page == this.state.totalPage) || (this.state.page == this.state.totalPage - 1) || (this.state.page == this.state.totalPage - 2) || (this.state.page == this.state.totalPage - 3))} onClick={() => this.setState({ page: this.state.page + 3 }) || this.listInNext()}>{this.state.page + 4}</button> 
                                    <button id="nut" class="myButton" hidden={((this.state.page == this.state.totalPage) || (this.state.page == this.state.totalPage - 1) || (this.state.page == this.state.totalPage - 2) || (this.state.page == this.state.totalPage - 3) || (this.state.page == this.state.totalPage - 4))} onClick={() => this.setState({ page: this.state.page + 4 }) || this.listInNext()}>{this.state.page + 5}</button>  */}
                                    {/* <a>/</a>
                                    <button id="nut" class="myButton" onClick={() => this.setState({ page: this.state.totalPage - 1 }) || this.listInNext()}>{this.state.totalPage}</button> */}

                                    {/* <button class="myButton1" type="submit"
                                        style={{ color: '#C8C8C8' }}
                                        onClick={() => this.listInNext()}>
                                        <b style={{ color: 'black' }}>Next</b>
                                    </button> */}
                                    <svg onClick={() => this.setState({ page: 1 }) || this.list() } width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-skip-start-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M4.5 3.5A.5.5 0 0 0 4 4v8a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5z" />
                                        <path d="M4.903 8.697l6.364 3.692c.54.313 1.232-.066 1.232-.697V4.308c0-.63-.692-1.01-1.232-.696L4.903 7.304a.802.802 0 0 0 0 1.393z" />
                                    </svg>
                                    <svg width="1.7em" height="1.7em" onClick={() => this.listInPrevious()} viewBox="0 0 16 16" class="bi bi-caret-left-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                                    </svg>
                                    <b>{this.state.page}/{this.state.totalPage}</b>
                                    <svg width="1.7em" height="1.7em" onClick={() => this.listInNext()} viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                    </svg>
                                    <svg onClick={() => this.setState({ page: this.state.totalPage - 1 }) || this.listInNext() } width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-skip-end-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M12 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                                        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                    </svg>

                                    {/* <div style={{ float: 'right', width: "230px", height: '32px' }} class="">
                                        <svg width="1.7em" height="1.7em" style={{ marginRight: "5px" }} viewBox="0 0 16 16" class="bi bi-arrow-left-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => this.listInPrevious()}>
                                            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z" />
                                        </svg>
                                        <b style={{ marginRight: "5px" }}>{this.state.page}</b>
                                        <a> / </a>
                                        <button onClick={() => this.setState({ page: this.state.totalPage - 1 }) || this.listInNext()}>{this.state.totalPage}</button>
                                        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => this.listInNext()}>
                                            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z" />
                                        </svg>
                                    </div> */}
                                </div>

                                <div style={{ overflow: 'auto', width: '100%', height: '700px' }}>
                                    <table id="example2" class="table table-bordered table-hover" style={{ fontSize: '12.5px' }} >

                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>STT vào bãi</th>
                                                <th>Biển số xe vào/ra</th>
                                                <th>Biển Cont</th>
                                                <th>Biển Mooc</th>
                                                <th>Loại xe</th>
                                                <th>Mã số thẻ</th>
                                                <th>Thời gian vào bãi</th>
                                                <th>Thời gia ra bãi</th>
                                                <th>Thời gian lưu bãi</th>
                                                <th>Số tiền</th>
                                                <th>Nhân viên vào/ra</th>
                                                <th>Nhân cho phép ra</th>
                                                <th>Loại hàng</th>
                                                <th>Cổng vào</th>
                                                <th>Cổng ra</th>
                                                <th>Phiếu hải quan</th>
                                            </tr>
                                        </thead>
                                        <>
                                            {this.state.data && data.data.map((item, i) => (
                                                <tbody>
                                                    {/* <tr onClick={() => this.Edit()} > */}
                                                    <tr key={item.BienXe}>
                                                        <td onClick={() => this.Select(item.BienXe)}> {(this.state.page - 1) * this.state.limitPage + i + 1}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.EventID || item.EventParkingID}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.BienXe || item.BienXeVao + " / " + (item.BienXeRa || "")}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.BienCont}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.BienMooc}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {(item.LoaiXeChiTiet || "Chưa có") || item.Name} </td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.CarNumber_ID || "Chưa có"} </td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {GetFormatDate(item.NgayGioVao) || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {GetFormatDate(item.NgayGioRa) || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.ThoiGianTrongBai || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.TongTienThu || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.NhanVienVao || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.NhanVienDongYRa || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.LoaiHangChiTiet || item.LoaihangChiTiet}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.CongVaoName}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> {item.CongRaName || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.BienXe)}> </td>
                                                    </tr>
                                                </tbody>
                                            ))}

                                        </>
                                    </table>
                                    {this.state.total == 0 && <img src={empty} style={{ width: '1200px', height: '800px' }} />}
                                </div>
                            </div>}
                            {this.state.showLoaiXe && <div>
                                <div style={{ overflow: 'auto', width: '100%', height: '700px' }}>
                                    <table id="example2" class="table table-bordered table-hover" style={{ fontSize: '12.5px' }}>

                                        <thead>
                                            <tr>
                                                <th>Ngày</th>
                                                <th>Xe có trọng tải dưới 4 tấn</th>
                                                <th>Xe có trọng tải 4 đến 10 tấn</th>
                                                <th>Xe có trọng tải 10 đến 18 tấn</th>
                                                <th>Xe có trọng tải trên 18 tấn</th>
                                                <th>Container 20"</th>
                                                <th>Container 40"</th>
                                            </tr>
                                        </thead>
                                        <>
                                            {this.state.dataThongKeXe && dataThongKeXe.result.map((item, i) => (
                                                <tbody>
                                                    {/* <tr onClick={() => this.Edit()} > */}
                                                    <tr>
                                                        <td key={i}> {item[0].ngayGioVao}</td>
                                                        <td> {((Object.keys(item[0].nameCount)[0]) == "Dưới 4 tấn" && (Object.values(item[0].nameCount)[0])) || ((Object.keys(item[0].nameCount)[1]) == "Dưới 4 tấn" && (Object.values(item[0].nameCount)[1])) || ((Object.keys(item[0].nameCount)[2]) == "Dưới 4 tấn" && (Object.values(item[0].nameCount)[2])) || ((Object.keys(item[0].nameCount)[3]) == "Dưới 4 tấn" && (Object.values(item[0].nameCount)[3])) || ((Object.keys(item[0].nameCount)[4]) == "Dưới 4 tấn" && (Object.values(item[0].nameCount)[4])) || ((Object.keys(item[0].nameCount)[5]) == "Dưới 4 tấn" && (Object.values(item[0].nameCount)[5])) || ((Object.keys(item[0].nameCount)[6]) == "Dưới 4 tấn" && (Object.values(item[0].nameCount)[6]))}</td>
                                                        <td> {((Object.keys(item[0].nameCount)[0]) == "4 đến 10 tấn" && (Object.values(item[0].nameCount)[0])) || ((Object.keys(item[0].nameCount)[1]) == "4 đến 10 tấn" && (Object.values(item[0].nameCount)[1])) || ((Object.keys(item[0].nameCount)[2]) == "4 đến 10 tấn" && (Object.values(item[0].nameCount)[2])) || ((Object.keys(item[0].nameCount)[3]) == "4 đến 10 tấn" && (Object.values(item[0].nameCount)[3])) || ((Object.keys(item[0].nameCount)[4]) == "4 đến 10 tấn" && (Object.values(item[0].nameCount)[4])) || ((Object.keys(item[0].nameCount)[5]) == "4 đến 10 tấn" && (Object.values(item[0].nameCount)[5])) || ((Object.keys(item[0].nameCount)[6]) == "4 đến 10 tấn" && (Object.values(item[0].nameCount)[6]))} </td>
                                                        <td> {((Object.keys(item[0].nameCount)[0]) == "10 đến 18 tấn" && (Object.values(item[0].nameCount)[0])) || ((Object.keys(item[0].nameCount)[1]) == "10 đến 18 tấn" && (Object.values(item[0].nameCount)[1])) || ((Object.keys(item[0].nameCount)[2]) == "10 đến 18 tấn" && (Object.values(item[0].nameCount)[2])) || ((Object.keys(item[0].nameCount)[3]) == "10 đến 18 tấn" && (Object.values(item[0].nameCount)[3])) || ((Object.keys(item[0].nameCount)[4]) == "10 đến 18 tấn" && (Object.values(item[0].nameCount)[4])) || ((Object.keys(item[0].nameCount)[5]) == "10 đến 18 tấn" && (Object.values(item[0].nameCount)[5])) || ((Object.keys(item[0].nameCount)[6]) == "10 đến 18 tấn" && (Object.values(item[0].nameCount)[6]))} </td>
                                                        <td> {((Object.keys(item[0].nameCount)[0]) == "Trên 18 tấn" && (Object.values(item[0].nameCount)[0])) || ((Object.keys(item[0].nameCount)[1]) == "Trên 18 tấn" && (Object.values(item[0].nameCount)[1])) || ((Object.keys(item[0].nameCount)[2]) == "Trên 18 tấn" && (Object.values(item[0].nameCount)[2])) || ((Object.keys(item[0].nameCount)[3]) == "Trên 18 tấn" && (Object.values(item[0].nameCount)[3])) || ((Object.keys(item[0].nameCount)[4]) == "Trên 18 tấn" && (Object.values(item[0].nameCount)[4])) || ((Object.keys(item[0].nameCount)[5]) == "Trên 18 tấn" && (Object.values(item[0].nameCount)[5])) || ((Object.keys(item[0].nameCount)[6]) == "Trên 18 tấn" && (Object.values(item[0].nameCount)[6]))} </td>
                                                        <td> {((Object.keys(item[0].nameCount)[0]) == "Container 20\"" && (Object.values(item[0].nameCount)[0])) || ((Object.keys(item[0].nameCount)[1]) == "Container 20\"" && (Object.values(item[0].nameCount)[1])) || ((Object.keys(item[0].nameCount)[2]) == "Container 20\"" && (Object.values(item[0].nameCount)[2])) || ((Object.keys(item[0].nameCount)[3]) == "Container 20\"" && (Object.values(item[0].nameCount)[3])) || ((Object.keys(item[0].nameCount)[4]) == "Container 20\"" && (Object.values(item[0].nameCount)[4])) || ((Object.keys(item[0].nameCount)[5]) == "Container 20\"" && (Object.values(item[0].nameCount)[5])) || ((Object.keys(item[0].nameCount)[6]) == "Container 20\"" && (Object.values(item[0].nameCount)[6]))} </td>
                                                        <td> {((Object.keys(item[0].nameCount)[0]) == "Container 40\"" && (Object.values(item[0].nameCount)[0])) || ((Object.keys(item[0].nameCount)[1]) == "Container 40\"" && (Object.values(item[0].nameCount)[1])) || ((Object.keys(item[0].nameCount)[2]) == "Container 40\"" && (Object.values(item[0].nameCount)[2])) || ((Object.keys(item[0].nameCount)[3]) == "Container 40\"" && (Object.values(item[0].nameCount)[3])) || ((Object.keys(item[0].nameCount)[4]) == "Container 40\"" && (Object.values(item[0].nameCount)[4])) || ((Object.keys(item[0].nameCount)[5]) == "Container 40\"" && (Object.values(item[0].nameCount)[5])) || ((Object.keys(item[0].nameCount)[6]) == "Container 40\"" && (Object.values(item[0].nameCount)[6]))} </td>
                                                    </tr>
                                                </tbody>
                                            ))}

                                        </>
                                    </table>
                                    {this.state.total == 0 && <img src={empty} style={{ width: '1200px', height: '800px' }} />}
                                </div>
                            </div>}
                            {this.state.showLoaiHang && <div>
                                <div style={{ overflow: 'auto', width: '100%', height: '700px' }}>
                                    <table id="example2" class="table table-bordered table-hover" style={{ fontSize: '12.5px' }} >

                                        <thead>
                                            <tr>
                                                <th>Ngày</th>
                                                <th>Cau khô</th>
                                                <th>Thanh long</th>
                                                <th>Bột sắn</th>
                                                <th>Mít lạnh</th>
                                                <th>Hạt sen</th>
                                                <th>Lá tre</th>
                                                <th>Mít nóng</th>
                                                <th>ST</th>
                                                <th>Xoài nóng</th>
                                                <th>Hành tây</th>
                                                <th>Khoai tây</th>
                                                <th>Nấm</th>
                                                <th>Hàng hộp</th>
                                                <th>Sắn</th>
                                                <th>Chuối nóng</th>
                                                <th>Nội thất</th>
                                                <th>Hạt dưa</th>
                                                <th>Cà rốt</th>
                                                <th>Lạc</th>
                                                <th>Tỏi</th>
                                                <th>Tạp hóa</th>
                                                <th>Rau</th>
                                                <th>Chôm chôm</th>
                                                <th>Nón</th>
                                                <th>Nhãn lạnh</th>
                                                <th>Hạt trẩu</th>
                                                <th>Cói</th>
                                                <th>Cau</th>
                                                <th>Bánh pía</th>
                                                <th>Xoài lạnh</th>
                                                <th>Dưa vàng</th>
                                                <th>Củ cải</th>
                                                <th>Linh kiện ĐT</th>
                                                <th>Chậu cây cảnh</th>
                                                <th>Dưa hấu</th>
                                                <th>Cây cảnh</th>
                                                <th>OT</th>
                                                <th>Giấy</th>
                                                <th>Xốp</th>
                                                <th>Cau tươi</th>

                                                <th>Đỗ</th>
                                                <th>Hoa hồi</th>
                                                <th>Hành tỏi</th>
                                                <th>Hồng</th>
                                                <th>Khoai sọ</th>
                                                <th>Máy móc</th>
                                                <th>Mít lạnh</th>
                                                <th>Long nhãn</th>
                                                <th>Đỗ xanh </th>
                                            </tr>
                                        </thead>
                                        <>
                                            {this.state.dataThongKeXe && dataThongKeXe.result.map((item, i) => (
                                                <tbody>
                                                    {/* <tr onClick={() => this.Edit()} > */}
                                                    <tr>
                                                        <td key={i}> {item[0].ngayGioVao}</td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CAU KHÔ")])}</td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("THANH LONG")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("BỘT SẮN")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("MÍT LẠNH")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("HẠT SEN")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("LÁ TRE")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("MÍT NÓNG")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("ST")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("XOÀI NÓNG")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("HÀNH TÂY")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("KHOAI TÂY")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("NẤM")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("HÀNG HỘP")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("SẮN")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CHUỐI NÓNG")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("NỘI THẤT")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("HẠT DƯA")]) || (Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("HAT DUA")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CÀ RỐT")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("LAC")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("TỎI")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("TẠP HÓA")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("RAU")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CHÔM CHÔM")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("NÓN")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("NHÃN LẠNH")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("HẠT TRẨU")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CÓI")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CAU")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("BÁNH PÍA")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("XOÀI LẠNH")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("DƯA VÀNG")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CỦ CẢI")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("LINH KIEN")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CHẬU CÂY")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("DƯA HẤU")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CÂY CẢNH")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("OT")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("GIẤY")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("XỐP")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("CAU")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("DO")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("HOA HỒI")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("HÀNH TỎI")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("HỒNG")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("KHOAI SỌ")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("MÁY MÓC")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("MÍT LẠNH")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("LONG NHÃN")])} </td>
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("DO XANH")])} </td>

                                                    </tr>
                                                </tbody>
                                            ))}
                                        </>
                                    </table>
                                    {this.state.total == 0 && <img src={empty} style={{ width: '1200px', height: '800px' }} />}
                                </div>
                            </div>}

                        </div>
                    </div>
                    <div style={{ float: 'right', width: '27%' }}>
                        <div class="card card-warning" >
                            <div class="card-header">
                                <h3 class="card-title">Ảnh vào</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="">
                                        <img src={c} id="imglayout" /> <img src={a} id="imglayout" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-header">
                                <h3 class="card-title">Ảnh ra</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="">
                                        <img src={d} id="imglayout" /><img src={b} id="imglayout" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default HomeList