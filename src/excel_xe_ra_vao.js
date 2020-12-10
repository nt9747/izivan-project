import React, { Component } from 'react';
import empty from './Layout/img/empty.png'
import { requestGetListCar, requestLogin, resquestGetListCarType, requestGetListLoaiXe, resquestThemPhieuHaiQuan } from './api'
import Cookie from 'js-cookie';
import TableScrollbar from 'react-table-scrollbar';
import { Redirect } from 'react-router-dom';
import a from './Layout/img/a.jpg';
import b from './Layout/img/b.jpg';
import c from './Layout/img/c.jpg';
import d from './Layout/img/d.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

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
    if (b == "NaN vnd") {
        return ""
    }
    else {
        return b;
    }
}


class excelxeravao extends React.Component {
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
            SelectCong: "/listCar/listCarOut?",
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
            thongKeLoaiXe: "/Statistic/statisticCarOut",
            TongKetCong: "",
            countIn: "",
            countOut: "",
            countTon: "",
            totalMoney: "",
            codeThongKeXe: "",
            limitPage: "100000000",
            orderNumber: "",
            bienCont: "",
            bienMooc: "",
            EventIdPhieuHaiQuan: "",
            PhieuHaiQuan: "",
            isActive: null,
        }
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
            if (this.state.nextPage == null) {
                this.setState({ nextPage: this.state.totalPage })
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

            await this.setState({ data: res.data, isLoading: false, page: res.data.currentPage, nextPage: res.data.nextPage, previousPage: res.data.previousPage,isActive: null });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({PhieuHaiQuan: "", EventIdPhieuHaiQuan: "" });

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
            if (this.state.previousPage == null) {
                this.setState({ previousPage: 1 })
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
            await this.setState({ isActive: null,data: res.data, isLoading: false, page: res.data.currentPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({PhieuHaiQuan: "", EventIdPhieuHaiQuan: "" });
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
            await this.setState({ isActive: null,data: res.data, isLoading: false, page: this.state.totalPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({PhieuHaiQuan: "", EventIdPhieuHaiQuan: "" });
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }

    async listToCurrent() {
        await this.setState({
            isLoading: true
        })
        try {
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
            await this.setState({ isActive: null,data: res.data, isLoading: false, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({PhieuHaiQuan: "", EventIdPhieuHaiQuan: "" });
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
            this.setState({ page: 1 })
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
            await this.setState({ data: res.data, total: res.data.total, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            this.setState({ totalPage: Math.ceil(this.state.total / this.state.limitPage) })
            this.setState({PhieuHaiQuan: "", EventIdPhieuHaiQuan: "" });
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
            await this.setState({ codeThongKeXe: res2.data, dataThongKeXe: res2.data, isLoading: false, countIn: res2.data.countIn, countOut: res2.data.countOut, totalMoney: res2.data.totalMoney })
            this.setState({ countTon: this.state.countIn - this.state.countOut })
            this.setState({PhieuHaiQuan: "", EventIdPhieuHaiQuan: "" });
            if (this.state.SelectCong == "/listCar/listCarParking?") {
                this.setState({ countTon: this.state.total })
            }
            // else if (this.state.countTon < 0){
            //     this.setState({countTon: "unk.."})
            // }
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
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

    async Select(bienxeSearch, loaihangSearch, loaixeSearch, matheSearch, sothutuSearch) {
        try {
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: bienxeSearch,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: "",
                LOAIHANG: loaihangSearch,
                PAGE: 1,
                CONG: this.state.SelectCong,
                LOAIXE: "",
                ORDERNUMBER: "",
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,

            })
            await this.setState({EventIdPhieuHaiQuan: res.data.data[0].EventIn_ID})
            console.log(res, "EventIDPhieuHAiQuan")
        } catch (err) {
            await this.setState({
                isLoading: true
            }, () => console.log(err))
        }
        console.log(this.state.data, "Check data!");
    }
    async RequestThemPhieuHaiQuan() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await resquestThemPhieuHaiQuan({
                EVENTID: this.state.EventIdPhieuHaiQuan,
                PHIEUHAIQUAN: this.state.PhieuHaiQuan
            })
            await this.setState({ msgOut: res.msg, isLoading: false });
            if (this.state.msgOut == "Thành công") {
                alert("Thành công!")
                this.setState({PhieuHaiQuan: "", EventIdPhieuHaiQuan: "" });
                this.listToCurrent();
            } else {
                alert("Thất bại!")
                this.listToCurrent();
            }
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
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
        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        if (isLoading) {
            return (
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <div style={{ width: '50px', height: '50px' }} className="spinner-border text-primary" role="status">
                        <span className="sr-only">a</span>
                    </div>
                    <div>
                        <p style={{ fontSize: '20px' }}>Loading...</p>
                    </div>
                </div>
            )
        }
        return (
            
                <section className="content">
                    <div className="container-fluid">
                        <div className="card card-warning">
                            <div className="card-header">
                                <h3 className="card-title"><i>Quản lí xe ra vào</i></h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3">
                                        <b>Từ</b><input  type="text" className="form-control" placeholder="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} />
                                    </div>
                                    <div className="col-3">
                                        <b>Đến</b><input type="text" className="form-control" placeholder="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} />
                                    </div>
                                    <div className="col-3">
                                        <b>Loại Hàng</b><br />
                                        <select value={this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)}>
                                            <option disabled hidden>Chọn</option>
                                            <option selected value="">Tất cả</option>
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
                                            <option disabled hidden >Chọn</option>
                                            <option selected value='1'>Tất cả</option>
                                            <option value='3'>Cổng ra quay đầu</option>
                                            <option value='4'>Cổng ra xuất</option>
                                            <option value='5'>Cổng vao ra CN</option>
                                        </select>
                                        <select value={this.state.SelectCong} onChange={(e) => this.handleTextChange('SelectCong', e)}>
                                            <option disabled hidden >Chọn</option>
                                            <option selected value='/listCar/listCarOut?'>0. Giao dịch ra</option>

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
                                    <div className="col-4"><br />
                                    
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ui grid middle aligned" id="admin1" style={{ overflow: 'auto', height: '900px' }}>
                            <table id="example2" className="table table-bordered table-hover"  >

                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
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
                                        <tbody style={
                                            this.state.isActive === i
                                                ? { background: '#BEC6C1' , textAlign: 'center' }
                                                : { background: '' , textAlign: 'center'}      
                                        }
                                            key={i}
                                            onClick={() => this.toggleActive(i)}>
                                            <tr onClick={() => this.Select(item.BienXe, item.LoaiHangChiTiet, item.LoaiXeID, item.MaSoTrenThe, item.SoThuTuTrongNgay)}  key={item.SoThuTuTrongNgay} style={{ textAlign: 'center' }}>
                                                <td > {(this.state.page - 1) * this.state.limitPage + i + 1}</td>
                                                <td > {item.SoThuTuTrongNgay}</td>
                                                <td > {item.BienXe || item.BienXeVao + " / " + (item.BienXeRa || "")}</td>
                                                <td > {item.BienCont || item.BienContVao}</td>
                                                <td > {item.BienMooc || item.BienMoocVao}</td>
                                                <td > {(item.LoaiXeChiTiet || "Chưa có") || item.Name} </td>
                                                <td > {item.MaSoTrenThe || "Chưa có"} </td>
                                                <td > {GetFormatDate(item.NgayGioVao) || "Chưa có"}</td>
                                                <td > {GetFormatDate(item.NgayGioRa) || "Chưa có"}</td>
                                                <td > {item.ThoiGianTrongBai || "Chưa có"}</td>
                                                <td > {countMoney(item.TongTienThu) || "Chưa có"}</td>
                                                <td > {(item.NhanVienVao || "") + " / " + (item.NhanVienRa || "")}</td>
                                                <td > {item.NhanVienDongYRa || "Chưa có"}</td>
                                                <td > {item.LoaiHangChiTiet || item.LoaihangChiTiet}</td>
                                                <td > {item.CongVaoName}</td>
                                                <td > {item.CongRaName || "Chưa có"}</td>
                                                <td > {item.PhieuHaiQuan}</td>
                                            </tr>
                                        </tbody>
                                    ))}

                                </>
                            </table>
                            {!this.state.data && <img src={empty} style={{ width: '100%', height: '1000px' }} />}
                        </div>
                    </div>
                    
                </section>

        )
    }
}
export default excelxeravao