import React, { Component } from 'react';
import pl from '../img/placeholder.jpg'
import { requestGetListCar, requestLogin, resquestGetListCarType, requestGetListLoaiXe } from '../../api'
import Cookie from 'js-cookie';
import TableScrollbar from 'react-table-scrollbar';
import { Redirect } from 'react-router-dom';
import empty from '../img/empty.png'



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


class Content extends React.Component {
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
            namePort: "6",
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
            countInVn: "0",
            countOutVn: "0",
            countTonVn: "0",
            countDoanhThuVn: "0",
            countInCN: "0",
            countOutCN: "0",
            countTonCN: "0",
            countDoanhThuCn: "0",
            portInVN: "0",
            PortOutVN: "2",
            portInCN: "1",
            portOutCN: "3",

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

            await this.setState({ data: res.data, isLoading: false, page: res.data.currentPage, nextPage: res.data.nextPage, previousPage: res.data.previousPage });
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
            await this.setState({ data: res.data, isLoading: false, page: res.data.currentPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
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
            await this.setState({ data: res.data, isLoading: false, page: this.state.totalPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
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

            const res3 = await requestGetListLoaiXe({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTOUT: this.state.PortOutVN,
                PORTIN: this.state.portInVN,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                LOAIXE: this.state.loaiXe,
                THONGKELOAIXE: this.state.thongKeLoaiXe,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ countInVn: res3.data.countIn, countOutVn: res3.data.countOut, countDoanhThuVn: res3.data.totalMoney })
            this.setState({ countTonVn: this.state.countInVn - this.state.countOutVn })
            console.log(this.state.portInVN, this.state.PortOutVN)


            const res4 = await requestGetListLoaiXe({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTOUT: this.state.PortOutCN,
                PORTIN: this.state.portInCN,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                LOAIXE: this.state.loaiXe,
                THONGKELOAIXE: this.state.thongKeLoaiXe,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({countInCN: res4.data.countIn, countOutCN: res4.data.countOut, countDoanhThuCn: res4.data.totalMoney })
            this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
            console.log(this.state.portInCN, this.state.portOutCN)
        
        if (this.state.countTonVn < 0){
            this.setState({countTonVn: 0})
        }
        if (this.state.countTonCN < 0){
            this.setState({countTonCN: 0})
        }

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
            await this.setState({countIn: res2.data.countIn, countOut: res2.data.countOut, totalMoney: res2.data.totalMoney })
            if (this.state.namePort == 1) {
                this.setState({
                    countInVn: this.state.countIn, countOutVn: this.state.countOut, countDoanhThuVn: this.state.totalMoney,
                    countInCN: '0', countOutCN: '0', countDoanhThuCn: '0', countTonCN: '0'
                })
                this.setState({ countTonVn: this.state.countInVn - this.state.countOutVn })
            }
            if (this.state.namePort == 2) {
                this.setState({
                    countInVn: '0', countOutVn: '0', countDoanhThuVn: '0', countTonVn: '0',
                    countInCN: this.state.countIn, countOutCN: this.state.countOut, countDoanhThuCn: this.state.totalMoney
                })
                this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
            }
            if (this.state.namePort == 3) {
                this.setState({
                    countInVn: this.state.countIn, countOutVn: this.state.countOut, countDoanhThuVn: this.state.totalMoney,
                    countInCN: '0', countOutCN: '0', countDoanhThuCn: '0', countTonCN: '0'
                })
                this.setState({ countTonVn: this.state.countInVn - this.state.countOutVn })
            }
            if (this.state.namePort == 4) {
                this.setState({
                    countInVn: '0', countOutVn: '0', countDoanhThuVn: '0', countTonVn: '0',
                    countInCN: this.state.countIn, countOutCN: this.state.countOut, countDoanhThuCn: this.state.totalMoney
                })
                this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
            }
            if (this.state.namePort == 5) {
                this.setState({
                    countInVn: '0', countOutVn: '0', countDoanhThuVn: '0', countTonVn: '0',
                    countInCN: this.state.countIn, countOutCN: this.state.countOut, countDoanhThuCn: this.state.totalMoney
                })
                this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
            }
            if (this.state.namePort == 6) {
                await this.setState({
                    isLoading: true
                })
                    const res3 = await requestGetListLoaiXe({
                        FROMDATE: this.state.fromDate,
                        TODATE: this.state.toDate,
                        PLATENUMBER: this.state.plateNumber,
                        PORTOUT: this.state.PortOutVN,
                        PORTIN: this.state.portInVN,
                        NUMBERCAR: this.state.numberCar,
                        LOAIHANG: this.state.loaiHang,
                        LOAIXE: this.state.loaiXe,
                        THONGKELOAIXE: this.state.thongKeLoaiXe,
                        BIENCONT: this.state.bienCont,
                        BIENMOOC: this.state.bienMooc,
                    })
                    await this.setState({ countInVn: res3.data.countIn, countOutVn: res3.data.countOut, countDoanhThuVn: res3.data.totalMoney })
                    this.setState({ countTonVn: this.state.countInVn - this.state.countOutVn })
                    console.log(this.state.portInVN, this.state.PortOutVN)


                    const res4 = await requestGetListLoaiXe({
                        FROMDATE: this.state.fromDate,
                        TODATE: this.state.toDate,
                        PLATENUMBER: this.state.plateNumber,
                        PORTOUT: this.state.PortOutCN,
                        PORTIN: this.state.portInCN,
                        NUMBERCAR: this.state.numberCar,
                        LOAIHANG: this.state.loaiHang,
                        LOAIXE: this.state.loaiXe,
                        THONGKELOAIXE: this.state.thongKeLoaiXe,
                        BIENCONT: this.state.bienCont,
                        BIENMOOC: this.state.bienMooc,
                    })
                    await this.setState({countInCN: res4.data.countIn, countOutCN: res4.data.countOut, countDoanhThuCn: res4.data.totalMoney })
                    this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
                    console.log(this.state.portInCN, this.state.portOutCN)
                }
                if (this.state.countTonVn < 0){
                    this.setState({countTonVn: 0})
                }
                if (this.state.countTonCN < 0){
                    this.setState({countTonCN: 0})
                }
                this.setState({isLoading: false})
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
            if (event.target.value == 1) {
                this.setState({ portIn: '0', PortOut: null })
                // SelectCong: '/listCar/listCarInOut?', thongKeLoaiXe: '/Statistic/statisticCarInOut'
            }
            else if (event.target.value == 2) {
                this.setState({ portIn: null, PortOut: '4' })
            }
            else if (event.target.value == 3) {
                this.setState({ portIn: null, PortOut: '2' })
            }
            else if (event.target.value == 4) {
                this.setState({ portIn: '1', PortOut: null })
            }
            else if (event.target.value == 5) {
                this.setState({ portIn: null, PortOut: '3' })
            }
            else if (event.target.value == 6) {
                this.setState({ portIn: '', PortOut: '', portInVN: '0', PortOutVN: '2', portInCN: '1', portOutCN: '3' })
            }
        }

        render() {
            const { data, isLoading } = this.state;
            const token = Cookie.get("SESSION_ID");
            if (isLoading) {
                return (
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <div style={{ width: '50px', height: '50px' }} class="spinner-border text-primary" role="status">
                            <span class="sr-only">a</span>
                        </div>
                        <div>
                            <p style={{ fontSize: '20px' }}>Loading...</p>
                        </div>
                    </div>
                )
            }
            return (
                <div class="content-wrapper">


                    <section class="content">
                        <div class="container-fluid">
                            <div class="card card-warning">
                                <div class="card-header">
                                    <h3 class="card-title"><i>Báo cáo doanh thu</i></h3>
                                </div>

                                <div class="card-body" >
                                    <div style={{ float: 'left', width: '60%' }}>
                                        <div class="row">
                                            <div class="col-4">
                                                <b>Biển số xe</b><input type="text" class="form-control" placeholder="Nhập Biển Số" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} />
                                            </div>
                                            <div class="col-4">
                                                <b>Mã số thẻ</b><input type="text" class="form-control" placeholder="Nhập Mã số thẻ" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} />
                                            </div>
                                            <div class="col-4">
                                                <b>Số thứ tự</b><input type="text" class="form-control" placeholder="Nhập Số thứ tự" value={this.state.orderNumber} onChange={(e) => this.handleTextChange('orderNumber', e)} />
                                            </div>
                                        </div>
                                        <br />
                                        <div class="row">
                                            <div class="col-4">
                                                <b>Loại hàng</b>
                                                <select value={this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)}>
                                                    <option disabled hidden value={null}>Chọn</option>
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
                                            <div class="col-4">
                                                <b>Loại xe</b>
                                                <select value={this.state.loaiXe} onChange={(e) => this.handleTextChange('loaiXe', e)}>{this.state.dataXe && this.state.dataXe.map((item, i) => <option value={item.ID}>{item.Name}</option>)}
                                                    <option value=''>Tất cả</option>
                                                </select>
                                            </div>
                                            <div class='col-3'>
                                                <b>Cổng</b>
                                                <select value={this.state.namePort} onChange={(e) => this.handlePortChange('namePort', e)}>
                                                    <option disabled hidden> Chọn </option>
                                                    <option selected value='6'>Tất cả</option>
                                                    <option value='1'>Làn vào VN</option>
                                                    <option value='2'>Làn xuất</option>
                                                    <option value='3'>Làn quay đầu</option>
                                                    <option value='4'>Làn vào TQ</option>
                                                    <option value='5'>Làn ra TQ</option>
                                                </select>
                                            </div>
                                        </div><br />
                                        <div>
                                            <table style={{ width: '900px', textAlign: 'right' }}>
                                                <tr>
                                                    <td><b>Từ</b></td>
                                                    <td><input value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} style={{ width: '400px' }} min="2000-01-01" max="2300-12-31" type="text" class="form-control" placeholder="" /></td>
                                                    <td><b>Đến</b></td>
                                                    <td><input value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} style={{ width: '400px' }} min="2000-01-01" max="2300-12-31" type="text" class="form-control" placeholder="" /></td>
                                                </tr>
                                            </table>

                                        </div>
                                        <div class="row">

                                            <div class="col-6"><br />
                                                <button onClick={() => this.list()} class="btn btn-danger"><b>Tìm Kiếm</b></button>
                                            </div>
                                            <div class="col-6 "><br />
                                                <form action="/ExcelDoanhThu">
                                                    <button type="submit"
                                                        className="btn btn-success">
                                                        <b>Export Excel</b>
                                                    </button>
                                                </form>

                                            </div>

                                        </div>
                                    </div>
                                    <div style={{ float: 'right', width: '38%' }}><br />
                                        <table style={{ fontSize: '18px', height: '100px', borderStyle: 'inset', backgroundColor: '#E1E1E1' }}>
                                            <tr>
                                                <td></td>
                                                <td style={{ textAlign: 'center' }}><b>Vào</b></td>
                                                <td style={{ textAlign: 'center' }}><b>Ra</b></td>
                                                <td style={{ textAlign: 'center' }}><b>Tồn</b></td>
                                                <td style={{ textAlign: 'center' }}><b>Doanh thu</b></td>
                                            </tr>
                                            <tr style={{ borderStyle: 'inset' }}>
                                                <td><b>Làn Trung Quốc</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '50px', height: '50px', display: 'inline-block' }}>{this.state.countInCN}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '50px', height: '50px', display: 'inline-block' }}>{this.state.countOutCN}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '50px', height: '50px', display: 'inline-block' }}>{this.state.countTonCN}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '180px', height: '50px', display: 'inline-block' }}>{countMoney(this.state.countDoanhThuCn)}</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Làn Việt Nam</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '50px', height: '50px', display: 'inline-block' }}>{this.state.countInVn}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '50px', height: '50px', display: 'inline-block' }}>{this.state.countOutVn}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '50px', height: '50px', display: 'inline-block' }}>{this.state.countTonVn}</b></td>
                                                <td><b style={{ textAlign: 'center', backgroundColor: '#35E17E', width: '180px', height: '50px', display: 'inline-block' }}>{countMoney(this.state.countDoanhThuVn)}</b></td>
                                            </tr>
                                        </table><br />
                                        <div style={{ float: "right", width: "150px" }}>
                                            <b>Số trang </b>
                                            <select value={this.state.limitPage} onChange={(e) => this.handleTextChange('limitPage', e) || this.setState({ page: 1 }) || this.list()}>
                                                <option selected disabled hidden>Chọn</option>
                                                <option value='10'>10</option>
                                                <option value='20'>20</option>
                                                <option value='35'>35</option>
                                                <option value='50'>50</option>
                                            </select>
                                        </div>
                                        <div style={{}} class="col-5">
                                            <svg onClick={() => this.setState({ page: 1 }) || this.list()} width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-skip-start-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
                                            <svg onClick={() => this.listTo()} width="1.7em" height="1.7em" viewBox="0 0 16 16" class="bi bi-skip-end-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M12 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                                                <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="ui grid middle aligned" style={{ overflow: 'auto', width: '100%', height: '800px' }}>
                                <div class="card-header" >
                                    <h3 class="card-title" ></h3>


                                </div>
                                <table id="example2" class="table table-bordered table-hover">

                                    <thead>
                                        <tr>
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
                                                <tr key={item.EventID}>
                                                    <td> {(this.state.page - 1) * this.state.limitPage + i + 1}</td>
                                                    <td> {item.SoThuTuTrongNgay}</td>
                                                    <td> {item.BienXe || item.BienXeVao + " / " + (item.BienXeRa || "")}</td>
                                                    <td> {item.BienCont || item.BienContVao}</td>
                                                    <td> {item.BienMooc || item.BienMoocVao}</td>
                                                    <td> {(item.LoaiXeChiTiet || "Chưa có") || item.Name} </td>
                                                    <td> {item.MaSoTrenThe || "Chưa có"} </td>
                                                    <td> {GetFormatDate(item.NgayGioVao) || "Chưa có"}</td>
                                                    <td> {GetFormatDate(item.NgayGioRa) || "Chưa có"}</td>
                                                    <td> {item.ThoiGianTrongBai || "Chưa có"}</td>
                                                    <td> {countMoney(item.TongTienThu) || "Chưa có"}</td>
                                                    <td> {(item.NhanVienVao || "") + " / " + (item.NhanVienRa || "")}</td>
                                                    <td> {item.NhanVienDongYRa || "Chưa có"}</td>
                                                    <td> {item.LoaiHangChiTiet || item.LoaihangChiTiet}</td>
                                                    <td> {item.CongVaoName}</td>
                                                    <td> {item.CongRaName || "Chưa có"}</td>
                                                    <td> {item.PhieuHaiQuan}</td>
                                                </tr>
                                            </tbody>
                                        ))}

                                    </>
                                </table>
                            </div>

                        </div>
                    </section>
                </div>
            )
        }
    }

    export default Content