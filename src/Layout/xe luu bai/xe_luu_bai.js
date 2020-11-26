import React, { Component } from 'react';
import pl from '../img/placeholder.jpg'
import { requestGetListCarIn, requestLogin, resquestGetListCarType, requestGetListLoaiXe } from '../../api'
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
            SelectCong: "/listCar/listCarIn?",
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
            thongKeLoaiXe: "/Statistic/statisticCarIn?",
            TongKetCong: "",
            countIn: "",
            countOut: "",
            countTon: "",
            totalMoney: "",
            codeThongKeXe: "",
            limitPage: "10",
            orderNumber: "",

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
                ORDERNUMBER: this.state.orderNumber,
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
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
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

    async listTo() {
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
                PAGE: this.state.totalPage,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
            })
            await this.setState({ data: res.data, isLoading: false, page: this.state.totalPage });
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
                ORDERNUMBER: this.state.orderNumber,

            })
            await this.setState({ data: res.data, isLoading: false, page: 1, total: res.data.total });
            this.setState({ totalPage: Math.ceil(this.state.total / this.state.limitPage) })
            console.log(this.state.portIn, "PortIn");
            console.log(this.state.PortOut, "PortOut");
            console.log(this.state.SelectCong, "SelectCong")
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
            })
            await this.setState({ codeThongKeXe: res2.data, dataThongKeXe: res2.data, isLoading: false, countIn: res2.data.countIn, countOut: res2.data.countOut, totalMoney: res2.data.totalMoney })
            this.setState({ countTon: this.state.countIn - this.state.countOut })
            if (this.state.SelectCong == "/listCar/listCarParking?") {
                this.setState({ countTon: this.state.total })
            } else if (this.state.countTon < 0) {
                this.setState({ countTon: "unk.." })
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
        //     const res = await requestGetListCarIn({
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
            this.setState({ portIn: '1', PortOut: null })
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



    // handleTextChange(field, event) {
    //     if (event.target.value==10){
    //         this.setState({portIn: '1', PortOut: '3'})
    //     }
    //     this.setState({
    //         [field]: event.target.value
    //     })
    // }


    render() {
        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        if (isLoading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <div class="content-wrapper">


                <section class="content">
                    <div class="container-fluid">
                        <div class="card card-warning">
                            <div class="card-header">
                                <h3 class="card-title"><i>Báo cáo lưu xe</i></h3>
                            </div>

                            <div class="card-body" >
                                <div style={{ float: 'left', width: '65%' }}>
                                    <table style={{ textAlign: 'left', width: '950px', height: '100px' }}>
                                        <tr>
                                            <td><b>Từ ngày:</b><input type="text" name="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} /></td>
                                            <td><b>Đến ngày:</b><input style={{ width: '240px' }} type="text" name="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} /></td>
                                            <td><b>Cổng vào:</b><select style={{ width: '165px' }} value={this.state.portName} onChange={(e) => this.handlePortChange('portName', e)}>
                                                <option disabled hidden >Chọn</option>
                                                <option selected value='1'>Tất cả</option>
                                                <option value='2'>Cổng vào VN</option>
                                                <option value='5'>Cổng vào CN</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển số cont:</b><input type="text" style={{ width: '160px' }} name="" /></td>
                                            <td><b>Biển số mooc:</b><input type="text" style={{ width: '210px' }} name="" /></td>
                                            <td style={{ textAlign: 'center' }}><b>Biển số xe:</b><input type="text" style={{ width: '150px' }} name="" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} /></td>

                                            <td><button style={{ width: '100px', height: '50px' }} className="btn btn-danger"
                                                onClick={() => this.list()}>Tìm</button></td>
                                        </tr>
                                        <tr>
                                            <td><b>Loại hàng:</b>
                                                <select style={{ width: '180px' }} value={this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)}>
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
                                            </td>

                                            <td><b>Loại xe:</b> <select value={this.state.loaiXe} onChange={(e) => this.handleTextChange('loaiXe', e)}>{this.state.dataXe && this.state.dataXe.map((item, i) => <option value={item.LoaiXe}>{item.Name}</option>)}
                                                <option value=''>Tất cả</option>
                                            </select></td>
                                            <td></td>
                                        </tr>
                                    </table><br />
                                    <div class="row">
                                        <div>
                                            <table style={{ textAlign: 'center', width: '850px', height: '50px', borderStyle: 'inset' }}>
                                                <tr>
                                                    <td>Tổng số xe lưu bãi</td>
                                                    <td style={{ backgroundColor: 'yellow', width: '150px' }}>230</td>
                                                    <td>Cổng VN</td>
                                                    <td style={{ backgroundColor: 'yellow', width: '150px' }}>400</td>
                                                    <td>Cổng TQ</td>
                                                    <td style={{ backgroundColor: 'yellow', width: '150px' }}>682</td>
                                                </tr>
                                            </table>

                                        </div>

                                        <div>
                                            <button class="btn btn-danger" style={{ width: '100px', height: '50px' }}>Xuất Excel</button>
                                        </div>

                                    </div><br />
                                    <div>
                                        <button onClick={this.toggleBienXe}>Biển Số</button>
                                        <button onClick={this.toggleLoaiXe}>Loại Xe</button>
                                        <button onClick={this.toggleLoaiHang}>Loại Hàng</button>
                                    </div>
                                </div>
                                <div style={{ float: 'right', width: '35%' }}>
                                    <table>
                                        <tr>
                                            <td style={{ backgroundColor: 'green', width: '300px', height: '190px', borderRight: '1px solid white' }}></td>
                                            <td style={{ backgroundColor: 'green', width: '300px', height: '190px' }}></td>
                                        </tr>
                                    </table>
                                    <div style={{ float: 'right', width: "320px", height: '30px' }} class=""><br />
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


                        <div class="ui grid middle aligned" style={{ overflow: 'auto', width: '100%', height: '600px' }}>
                            <div class="card-header" >
                                <h3 class="card-title" ></h3>
                            </div>
                            {this.state.showBienXe && <table id="example2" class="table table-bordered table-hover" >

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
                                            <tr key={item.EventID}>
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
                            </table>}
                            {this.state.showLoaiXe && <table id="example2" class="table table-bordered table-hover" >

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
                                    {this.state.data && data.data.map((item, i) => (
                                        <tbody>
                                            {/* <tr onClick={() => this.Edit()} > */}
                                            <tr>
                                                <td key={i}> 1</td>
                                                <td> 6 </td>
                                                <td> 5 </td>
                                                <td> 2 </td>
                                                <td> 4 </td>
                                                <td> 4 </td>
                                                <td> 5 </td>
                                            </tr>
                                        </tbody>
                                    ))}

                                </>
                            </table>}
                            {this.state.showLoaiHang && <table id="example2" class="table table-bordered table-hover" >

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
                                        <th>Hạt châu</th>
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
                                        <th>Bột sắn</th>
                                        <th>Quả hồng</th>
                                        <th>Đỗ</th>
                                        <th>Hoa hồi</th>
                                        <th>Hành tỏi</th>
                                        <th>Hồng</th>
                                        <th>Khoai sọ</th>
                                        <th>Máy móc</th>
                                        <th>Mít lạnh</th>
                                        <th>Long nhãn</th>
                                    </tr>
                                </thead>
                                <>
                                    {this.state.data && data.data.map((item, i) => (
                                        <tbody>
                                            {/* <tr onClick={() => this.Edit()} > */}
                                            <tr>
                                                <td key={i}> {(this.state.page - 1) * 10 + i + 1}</td>
                                                <td> 6 </td>
                                                <td> 5 </td>
                                                <td> 2 </td>
                                                <td> 4 </td>
                                                <td> 4 </td>
                                                <td> 5 </td>
                                                <td> 6 </td>
                                                <td> 5 </td>
                                                <td> 2 </td>
                                                <td> 4 </td>
                                                <td> 4 </td>
                                                <td> 5 </td>
                                                <td> 6 </td>
                                                <td> 5 </td>
                                                <td> 2 </td>
                                                <td> 4 </td>
                                                <td> 4 </td>
                                                <td> 5 </td>
                                                <td> 6 </td>
                                                <td> 5 </td>
                                                <td> 2 </td>
                                                <td> 4 </td>
                                                <td> 4 </td>
                                                <td> 5 </td>
                                                <td> 6 </td>
                                                <td> 5 </td>
                                                <td> 2 </td>
                                                <td> 4 </td>
                                                <td> 4 </td>
                                                <td> 5 </td>
                                                <td> 6 </td>
                                                <td> 5 </td>
                                                <td> 2 </td>
                                                <td> 4 </td>
                                                <td> 4 </td>
                                                <td> 5 </td>
                                                <td> 6 </td>
                                                <td> 5 </td>
                                                <td> 2 </td>
                                                <td> 4 </td>
                                                <td> 4 </td>
                                                <td> 5 </td>
                                                <td> 6 </td>
                                                <td> 5 </td>
                                                <td> 2 </td>
                                                <td> 4 </td>
                                                <td> 4 </td>
                                                <td> 5 </td>
                                                <td> 5 </td>
                                                <td> 5 </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </>
                            </table>}
                            {this.state.total == 0 && <img src={empty} style={{ width: '1300px', height: '800px' }} />}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Content