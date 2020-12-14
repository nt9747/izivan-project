import React, { Component } from 'react';
import empty from '../img/empty.png'
import { requestGetListCar, requestLogin, resquestGetListCarType, requestGetListLoaiXe } from '../../api'
import Cookie from 'js-cookie';
import TableScrollbar from 'react-table-scrollbar';
import { Redirect } from 'react-router-dom';
import a from '../img/a.jpg';
import b from '../img/b.jpg';
import c from '../img/c.jpg';
import d from '../img/d.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

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

function countMoney(n) {
    n = parseFloat(n);
    var b = n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " vnd";
    if (b == "NaN vnd"){
        return ""   
    }
    else {
        return b;
    }
}


class HomeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: '01/10/2020 00:00:00',
            toDate: '26/12/2020 00:00:00',
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
            countTon: "",
            totalMoney: "",
            codeThongKeXe: "",
            limitPage: "10",
            orderNumber: "",
            bienCont: "",
            bienMooc: "",
            isActive: null,

        }
        this.toggleBienXe = this.toggleBienXe.bind(this)
        this.toggleLoaiHang = this.toggleLoaiHang.bind(this)
        this.toggleLoaiXe = this.toggleLoaiXe.bind(this)
    }

    toggleActive = i => {

        if (i === this.state.isActive) {
            this.setState({
                isActive: null
            });
        } else {
            this.setState({
                isActive: i
            });
        }
    };

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
            if (this.state.nextPage == null){
                this.setState({nextPage: this.state.totalPage})
            }
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.nextPage,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })

            await this.setState({ isActive: null, data: res.data, isLoading: false, page: res.data.currentPage, nextPage: res.data.nextPage, previousPage: res.data.previousPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");

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
            if (this.state.previousPage == null){
                this.setState({previousPage: 1})
            }
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.previousPage,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ isActive: null, data: res.data, isLoading: false, page: res.data.currentPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage});
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }



    async listTo() {
        await this.setState({
            isLoading: true
        })
        try {
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.totalPage,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ isActive: null, data: res.data, isLoading: false, page: this.state.totalPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage});
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
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
        console.log(this.state.nextPage, "nextPage");
        console.log(this.state.previousPage, "previousPage");
        await this.setState({
            isLoading: true
        })
        try {
            this.setState({page: 1})
            const res = await requestGetListCar({
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
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,

            })
            await this.setState({ isActive: null, data: res.data, total: res.data.total, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            this.setState({ totalPage: Math.ceil(this.state.total / this.state.limitPage)})
            if ((this.state.SelectCong == "/listCar/listCarIn?" && (this.state.PortOut == "2" || this.state.PortOut == "4")) || (this.state.SelectCong == "/listCar/listCarOut?" && (this.state.portIn == "0" || (this.state.portIn == "1" && this.state.PortOut == null)))) {
                alert("Wrong choose!")
                window.location.href = '/home'
            }
            if ((this.state.SelectCong == "/listCar/listCarParking?" && this.state.namePort == "3")) {
                alert("Cổng quay đầu ko xem được danh sách xe tồn, vui lòng chọn đúng cổng!")
                window.location.href = '/home'
            }

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
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ isActive: null, codeThongKeXe: res2.data, dataThongKeXe: res2.data, isLoading: false, countIn: res2.data.countIn, countOut: res2.data.countOut, totalMoney: res2.data.totalMoney })
            this.setState({ countTon: this.state.countIn - this.state.countOut })
            if (this.state.SelectCong == "/listCar/listCarParking?") {
                this.setState({ countTon: this.state.total })
            } 
            // else if (this.state.countTon < 0){
            //     this.setState({countTon: "unk.."})
            // }
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            if(this.state.countTon < 0){
                this.setState({countTon: 0})
            }
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
        // try {
        //     const res = await requestGetListCar({
        //         FROMDATE: this.state.fromDate,
        //         TODATE: this.state.toDate,
        //         PLATENUMBER: this.state.plateNumber,
        //         PORTIN: this.state.portIn,
        //         PORTOUT: this.state.PortOut,
        //         NUMBERCAR: this.state.numberCar,
        //         LOAIHANG: this.state.loaiHang,
        //         PAGE: 1,
        //         CONG: this.state.SelectCong,
        //         LOAIXE: this.state.loaiXe,
        //         ORDERNUMBER: row,

        //     })
        //     await this.setState({ dataPicture: res.data, pictureDauXeVao: res.data.data[0].LinkAnhDauXe, pictureDauXeRa: res.data.data[0].LinkAnhDauXeRa, pictureBienSo: res.data.data[0].LinkAnhBienSo, pictureVaoFull: res.data.data[0].LinkAnhFull, pictureRaFull: res.data.data[0].LinkAnhRaFull });
        //     console.log(this.state.pictureDauXeVao, "check DATA PICTURE")
        // } catch (err) {
        //     await this.setState({
        //         isLoading: true
        //     }, () => console.log(err))
        // }
        // console.log(this.state.data, "Check data!");
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
            this.setState({ portIn: '', PortOut: ''})
        }
        else if (event.target.value == '2') {
            this.setState({ portIn: '0', PortOut: null})
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
            this.setState({ SelectCong: '/listCar/listCarInOut?', thongKeLoaiXe: "/Statistic/statisticCarInOut"})
        }
        else if (event.target.value == '2') {
            this.setState({ SelectCong: '/listCar/listCarIn?', thongKeLoaiXe: "/Statistic/statisticCarIn"})
        }
        else if (event.target.value == '3') {
            this.setState({ SelectCong: '/listCar/listCarOut?', thongKeLoaiXe: "/Statistic/statisticCarOut"})
        }
        else if (event.target.value == '4')
            this.setState({ SelectCong: '/listCar/listCarParking?', thongKeLoaiXe: "/Statistic/statisticCarParking"})
    }

    render() {
        const { data, dataThongKeXe, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        if (isLoading) {
            return (
                <div style={{textAlign: 'center', marginTop: '100px'}}>
                    <div style={{width: '50px', height: '50px'}} className="spinner-border text-primary" role="status">
                        <span className="sr-only">a</span>
                    </div>
                    <div>
                        <p style={{fontSize: '20px'}}>Loading...</p>
                    </div>
                </div>
            )
        }
        return (
            <div className="content-wrapper" id="root">
                <section className="content">
                    <div className="container-fluid">
                        <div className="card card-warning">
                            <div className="card-header">
                                <h3 className="card-title"><i>Quản lí xe tổng hợp </i></h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3" style={{ marginRight: '40px' }}>
                                        <b hidden={this.state.SelectCong == "/listCar/listCarParking?"}>Từ</b><input hidden={this.state.SelectCong == "/listCar/listCarParking?"} type="text" className="form-control" placeholder="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} />
                                    </div>
                                    <div className="col-3" style={{ marginRight: '40px' }}>
                                        <b>Đến</b><input type="text" className="form-control" placeholder="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} />
                                    </div>
                                    <div className="col-2" style={{ marginRight: '70px' }}>
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
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#E79FEB', width: '50px', height: '30px', display: 'inline-block' }}>{this.state.countIn}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#8CE135', width: '50px', height: '30px', display: 'inline-block' }}>{this.state.countOut}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35DFE1', width: '50px', height: '30px', display: 'inline-block' }}>{(this.state.countTon)}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '170px', height: '30px', display: 'inline-block' }}>{countMoney(this.state.totalMoney)}</b></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1" style={{ marginRight: '150px' }}>
                                        <b>Loại xe</b><br />
                                        <select value={this.state.loaiXe} onChange={(e) => this.handleTextChange('loaiXe', e)}>{this.state.dataXe && this.state.dataXe.map((item, i) => <option value={item.ID}>{item.Name}</option>)}
                                            <option value=''>Tất cả</option>
                                        </select>
                                    </div>
                                    <div className="col-2" style={{ marginRight: '31px' }}>
                                        <b>Số thứ tự</b><input type="text" className="form-control" placeholder="Nhập Số thứ tự" value={this.state.orderNumber} onChange={(e) => this.handleTextChange('orderNumber', e)} />
                                    </div>
                                    <div className="col-2" style={{ marginRight: '31px' }}>
                                        <b>Biển số xe</b><input type="text" className="form-control" placeholder="Nhập Biển Số" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} />
                                    </div>
                                    <div className="col-2" style={{ marginRight: '31px' }}>
                                        <b>Mã số thẻ</b><input type="text" className="form-control" placeholder="Nhập Mã số thẻ" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <b>Cổng</b><br />
                                        <select value={this.state.namePort} onChange={(e) => this.handlePortChange('namePort', e)}>
                                            <option selected disabled hidden>Chọn</option>
                                            <option value='1'>Tất cả</option>
                                            <option hidden={this.state.TongKetCong == "3"} value='2'>Cổng vào VN</option>
                                            <option hidden={this.state.TongKetCong == "4" || this.state.TongKetCong == "2"} value='3'>Cổng ra quay đầu</option>
                                            <option hidden={this.state.TongKetCong == "2"} value='4'>Cổng ra xuất</option>
                                            <option value='5'>Cổng vào ra CN</option>
                                        </select>
                                        <select value={this.state.TongKetCong} onChange={(e) => this.handleAPIChange('TongKetCong', e)}>
                                            <option selected disabled hidden>Chọn</option>
                                            <option value='1'>0. Giao dịch vào ra</option>
                                            <option value='2'>1. Giao dịch vào </option>
                                            <option value='3'>2. Giao dịch ra</option>
                                            <option value='4'>3. Số lượng xe tồn</option>
                                        </select>
                                    </div>
                                    <div className="col-2"><br />
                                        <button type="submit"
                                            className="btn btn-danger"
                                            onClick={() => this.list()}>
                                            <b>Tìm kiếm</b>
                                        </button>
                                    </div>

                                    <div className="col-2"><br />
                                        <form action="/ExportExcel">
                                            <button type="submit"
                                                className="btn btn-success"
                                            >
                                                <b>Export Excel</b>
                                            </button>
                                        </form>
                                    </div>
                                    <div className="col-2"><br />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ui grid middle aligned" id="admin1" style={{ float: 'left', width: '77%', height: '700px' }}>
                            <div className="card-header" >
                                <h3 className="card-title" >
                                    <button className="btn btn-secondary" style={{ marginRight: '3px' }} onClick={this.toggleBienXe}>Biển Số</button>
                                    <button className="btn btn-secondary" style={{ marginRight: '3px' }} onClick={this.toggleLoaiXe}>Loại Xe</button>
                                    <button className="btn btn-secondary" style={{ marginRight: '3px' }} onClick={this.toggleLoaiHang}>Loại Hàng</button>
                                </h3>
                            </div>
                            {this.state.showBienXe && <div>
                                <div style={{ float: "right", width: "150px" }}>
                                    <b>Số trang </b>
                                    <select value={this.state.limitPage} onChange={(e) => this.handleTextChange('limitPage', e) || this.setState({page: 1}) || this.list()}>
                                        <option selected disabled hidden>Chọn</option>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                        <option value='35'>35</option>
                                        <option value='50'>50</option>
                                    </select>
                                </div>
                                <div style={{ float: "right", width: "310px", border: "none" }}>
                                    {/* <button className="myButton1" type="submit"
                                        style={{ color: '#C8C8C8', marginRight: "10px" }}
                                        onClick={() => this.listInPrevious()}>
                                        <b style={{ color: 'black' }}>Previous</b>
                                    </button> */}

                                    {/* <button id="nut" className="myButton" hidden={(this.state.page < 3)} onClick={() => this.list()}> 1 </button><a hidden={this.state.page < 5}>...</a>
                                    <button id="nut" className="myButton" hidden={(this.state.page <= 3)} onClick={() => this.setState({ page: this.state.page - 1 }) || this.listInPrevious()}>{this.state.page - 2}</button>
                                    <button id="nut" className="myButton" hidden={(this.state.page < 2)} onClick={() => this.listInPrevious()} >{this.state.page - 1}</button> */}
                                    {/* <button id="nut" className="myButton" style={{ color: 'red' }}>{this.state.page}</button> */}
                                    {/* <button id="nut" className="myButton" hidden={(this.state.page == this.state.totalPage)} onClick={() => this.listInNext()}>{this.state.page + 1}</button> */}
                                    {/* <button id="nut" className="myButton" hidden={((this.state.page == this.state.totalPage) || (this.state.page == this.state.totalPage - 1))} onClick={() => this.setState({ page: this.state.page + 1 }) || this.listInNext()}>{this.state.page + 2}</button> */}
                                    {/* <button id="nut" className="myButton" hidden={((this.state.page == this.state.totalPage) || (this.state.page == this.state.totalPage - 1) || (this.state.page == this.state.totalPage - 2))} onClick={() => this.setState({ page: this.state.page + 2 }) || this.listInNext()}>{this.state.page + 3}</button> */}
                                    {/* <button id="nut" className="myButton" hidden={((this.state.page == this.state.totalPage) || (this.state.page == this.state.totalPage - 1) || (this.state.page == this.state.totalPage - 2) || (this.state.page == this.state.totalPage - 3))} onClick={() => this.setState({ page: this.state.page + 3 }) || this.listInNext()}>{this.state.page + 4}</button> 
                                    <button id="nut" className="myButton" hidden={((this.state.page == this.state.totalPage) || (this.state.page == this.state.totalPage - 1) || (this.state.page == this.state.totalPage - 2) || (this.state.page == this.state.totalPage - 3) || (this.state.page == this.state.totalPage - 4))} onClick={() => this.setState({ page: this.state.page + 4 }) || this.listInNext()}>{this.state.page + 5}</button>  */}
                                    {/* <a>/</a>
                                    <button id="nut" className="myButton" onClick={() => this.setState({ page: this.state.totalPage - 1 }) || this.listInNext()}>{this.state.totalPage}</button> */}

                                    {/* <button className="myButton1" type="submit"
                                        style={{ color: '#C8C8C8' }}
                                        onClick={() => this.listInNext()}>
                                        <b style={{ color: 'black' }}>Next</b>
                                    </button> */}
                                    <svg onClick={() => this.setState({ page: 1 }) || this.list()} width="1.7em" height="1.7em" viewBox="0 0 16 16" className="bi bi-skip-start-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.5 3.5A.5.5 0 0 0 4 4v8a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5z" />
                                        <path d="M4.903 8.697l6.364 3.692c.54.313 1.232-.066 1.232-.697V4.308c0-.63-.692-1.01-1.232-.696L4.903 7.304a.802.802 0 0 0 0 1.393z" />
                                    </svg>
                                    <svg width="1.7em" height="1.7em" onClick={() => this.listInPrevious()} viewBox="0 0 16 16" className="bi bi-caret-left-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                                    </svg>
                                    <b>{this.state.page}/{this.state.totalPage}</b>
                                    <svg width="1.7em" height="1.7em" onClick={() => this.listInNext()} viewBox="0 0 16 16" className="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                    </svg>
                                    <svg onClick={() => this.listTo()} width="1.7em" height="1.7em" viewBox="0 0 16 16" className="bi bi-skip-end-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M12 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                                        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                    </svg>

                                    {/* <div style={{ float: 'right', width: "230px", height: '32px' }} className="">
                                        <svg width="1.7em" height="1.7em" style={{ marginRight: "5px" }} viewBox="0 0 16 16" className="bi bi-arrow-left-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => this.listInPrevious()}>
                                            <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z" />
                                        </svg>
                                        <b style={{ marginRight: "5px" }}>{this.state.page}</b>
                                        <a> / </a>
                                        <button onClick={() => this.setState({ page: this.state.totalPage - 1 }) || this.listInNext()}>{this.state.totalPage}</button>
                                        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => this.listInNext()}>
                                            <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z" />
                                        </svg>
                                    </div> */}
                                </div>

                                <div style={{ overflow: 'auto', width: '100%', height: '700px' }}>
                                    <table id="example2" className="table table-bordered table-hover" style={{ fontSize: '12.5px' }} >

                                        <thead>
                                            <tr style = {{textAlign: 'center'}}>
                                                <th></th>
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
                                                    <tr style={
                                                this.state.isActive === i
                                                    ? { background: '#BEC6C1', textAlign: 'center' }
                                                    : { background: '', textAlign: 'center' }
                                            }
                                                key={i}
                                                onClick={() => this.toggleActive(i)}>
                                                        <td onClick={() => this.Select(item.EventID)}> {(this.state.page - 1) * this.state.limitPage + i + 1}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.SoThuTuTrongNgay}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.BienXe || item.BienXeVao + " / " + (item.BienXeRa || "")}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.BienCont || item.BienContVao}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.BienMooc || item.BienMoocVao}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {(item.LoaiXeChiTiet || "Chưa có") || item.Name} </td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.MaSoTrenThe || "Chưa có"} </td>
                                                        <td onClick={() => this.Select(item.EventID)}> {GetFormatDate(item.NgayGioVao) || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {GetFormatDate(item.NgayGioRa) || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.ThoiGianTrongBai || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {countMoney(item.TongTienThu) || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {(item.NhanVienVao || "") + " / " + (item.NhanVienRa || "")}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.NhanVienDongYRa || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.LoaiHangChiTiet || item.LoaihangChiTiet}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.CongVaoName}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.CongRaName || "Chưa có"}</td>
                                                        <td onClick={() => this.Select(item.EventID)}> {item.PhieuHaiQuan}</td>
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
                                    <table id="example2" className="table table-bordered table-hover" style={{ fontSize: '12.5px' }}>

                                        <thead>
                                            <tr style = {{textAlign: 'center'}}>
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
                                                <tbody >
                                                    {/* <tr onClick={() => this.Edit()} > */}
                                                    <tr style = {{textAlign: 'center'}} >
                                                        <td key={i}> {item[0].ngayGioVao}</td>
                                                        <td> {(Object.values(item[0].nameCount)[Object.keys(item[0].nameCount).indexOf("Dưới 4 tấn")])}</td>
                                                        <td> {(Object.values(item[0].nameCount)[Object.keys(item[0].nameCount).indexOf("4 đến 10 tấn")])} </td>
                                                        <td> {(Object.values(item[0].nameCount)[Object.keys(item[0].nameCount).indexOf("10 đến 18 tấn")])} </td>
                                                        <td> {(Object.values(item[0].nameCount)[Object.keys(item[0].nameCount).indexOf("Trên 18 tấn")])} </td>
                                                        <td> {(Object.values(item[0].nameCount)[Object.keys(item[0].nameCount).indexOf("Container 20\"")])} </td>
                                                        <td> {(Object.values(item[0].nameCount)[Object.keys(item[0].nameCount).indexOf("Container 40\"")])} </td>
                                                    </tr>
                                                </tbody>
                                            ))}

                                        </>
                                    </table>
                                    {/* {this.state.total == 0 && <img src={empty} style={{ width: '1200px', height: '800px' }} />} */}
                                </div>
                            </div>}
                            {this.state.showLoaiHang && <div>
                                <div style={{ overflow: 'auto', width: '100%', height: '700px' }}>
                                    <table id="example2" className="table table-bordered table-hover" style={{ fontSize: '12.5px' }} >

                                        <thead>
                                            <tr style = {{textAlign: 'center'}}>
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
                                                <th>Đỗ xanh</th>
                                                <th>loaiHang</th>
                                            </tr>
                                        </thead>
                                        <>
                                       {this.state.dataThongKeXe && dataThongKeXe.result.map((item, i) => (
                                                <tbody>
                                                    {/* <tr onClick={() => this.Edit()} > */}
                                                    <tr style = {{textAlign: 'center'}}>
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
                                                        <td> {(Object.values(item[0].goodCount)[Object.keys(item[0].goodCount).indexOf("loaiHang")])} </td>
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
                    <div style={{ float: 'right', width: '22%' }}>
                        <div className="card card-warning" >
                            <div className="card-header">
                                <h3 className="card-title">Ảnh vào</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="">
                                        <img src={c} id="imglayout" /> <img src={a} id="imglayout" />
                                    </div>
                                </div>
                            </div>

                            <div className="card-header">
                                <h3 className="card-title">Ảnh ra</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="">
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