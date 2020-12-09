
import React, { Component } from 'react';
import empty from '../img/empty.png'
import { requestGetListCar, requestLogin, resquestGetListCarType, requestGetListLoaiXe } from '../../api'
import Cookie from 'js-cookie';
import TableScrollbar from 'react-table-scrollbar';
import { Redirect } from 'react-router-dom';
import a from '../img/a.jpg';
import b from '../img/b.jpg';
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


class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: '01/09/2019 00:00:00',
            toDate: '26/12/2200 00:00:00',
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
            SelectCong: "/listCar/listCarParking?",
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
            thongKeLoaiXe: "/Statistic/statisticCarParking",
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
            countXeAll: "",
            countXeVN: "",
            countXeCN: "",
        }
    }
    componentDidMount() {
        this.start()
        this.list()
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
    async start() {
        await this.setState({
            isLoading: true
        })
        try {
            const res3 = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: '0',
                PORTOUT: null,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.page,
                CONG: '/listCar/listCarParking?',
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ countXeVN: res3.data.total })

            const res4 = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: '1',
                PORTOUT: '3',
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.page,
                CONG: '/listCar/listCarParking?',
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ countXeCN: res4.data.total })

            const res5 = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: '',
                PORTOUT: '',
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.page,
                CONG: '/listCar/listCarParking?',
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ countXeAll: res5.data.total })
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


    async list() {
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
            await this.setState({ data: res.data, total: res.data.total, previousPage: res.data.previousPage, nextPage: res.data.nextPage});
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
            await this.setState({ codeThongKeXe: res2.data, dataThongKeXe: res2.data, isLoading: false, countIn: res2.data.countIn, countOut: res2.data.countOut, totalMoney: res2.data.totalMoney })
            this.setState({ countTon: this.state.countIn - this.state.countOut })
            if (this.state.SelectCong == "/listCar/listCarParking?") {
                this.setState({ countTon: this.state.total })
            }
            // else if (this.state.countTon < 0){
            //     this.setState({countTon: "unk.."})
            // }
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            if (this.state.countTon < 0) {
                this.setState({ countTon: 0 })
            }
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }

    async Select(row) {
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
            <div className="content-wrapper">
                <section className="content"  >
                    <div className="container-fluid">
                        <div className="card card-warning">
                            <div className="card-header">
                                <h3 className="card-title"><i>Danh sách xe trong bãi</i></h3>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="" style={{ float: 'left', width: '75%' }}>
                                        <table style={{ width: '100%' }}>
                                            <tr>
                                                <td><b>Loại hàng</b><input type="text" className="form-control" placeholder="Nhập loại hàng" value={this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)} /></td>
                                                <td><b>Biển số xe</b><input type="text" className="form-control" placeholder="Nhập biển số xe" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} /></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td><b>Cổng</b>
                                                    <select value={this.state.namePort} onChange={(e) => this.handlePortChange('namePort', e)}>
                                                        <option value disabled hidden>Chọn</option>
                                                        <option selected value='1'>Tất cả</option>
                                                        <option value='2'>Cổng vào VN</option>
                                                        <option value='5'>Cổng vao ra CN</option>
                                                    </select></td>
                                                <td><b>Mã Thẻ</b><input type="text" className="form-control" placeholder="Nhập mã thẻ" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} /></td>
                                                <td style={{ textAlign: 'center'}}><button className="btn btn-primary" onClick={() => this.list()} style={{ height: '40px', width: '250px' }}><h6><b>Tìm</b></h6></button></td>
                                            </tr>
                                        </table>
                                        <form style={{}}>
                                        <table style={{ textAlign: 'center', width: '800px', height: '50px', borderStyle: 'outset' }}>
                                            <tr>
                                                <td>Tổng số xe trong bãi</td>
                                                <td style={{ backgroundColor: 'yellow', width: '150px' }}>{this.state.countXeAll}</td>
                                                <td>Tổng số xe cổng VN</td>
                                                <td style={{ backgroundColor: 'yellow', width: '150px' }}>{this.state.countXeVN}</td>
                                                <td>Tổng số xe cổng TQ</td>
                                                <td style={{ backgroundColor: 'yellow', width: '150px' }}>{this.state.countXeCN}</td>
                                            </tr>
                                        </table>
                                        </form>
                                    </div>
                                    <div style={{ float: 'right', width: '25%' }}>
                                        <form>
                                            <input type="checkbox" name="" /><b>Cho xuất</b><br />
                                            <input type="checkbox" name="" /><b>Cho phép ra</b><br />
                                            <input type="checkbox" name="" /><b>Kiểm hóa</b><br />
                                            <input type="checkbox" name="" /><b>Bốc</b>
                                        </form><br />
                                        <table>
                                        <tr style={{ textAlign: 'center'}}>
                                            <td style={{ borderBottom: 'white solid 10px', borderRight: 'white solid 10px', height: '30px', width: '130px', backgroundColor: '#909090'}}><h9><b>Đồng ý cho ra</b></h9></td>
                                            <td style={{ height: '30px', width: '130px', backgroundColor: '#4AE10E'}}><h9><b>Đồng ý cả hai</b></h9></td>
                                        </tr>
                                        <tr style={{ textAlign: 'center'}}>
                                            <td style={{ borderRight: 'white solid 10px', height: '30px', width: '130px', backgroundColor: '#FAF022'}}><h9><b>Đồng ý Xuất</b></h9></td>
                                            <td></td>
                                        </tr>
                                        </table>


                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="ui grid middle aligned" id="bang" style={{ overflow: 'auto', float: 'left', width: '75%', height: '800px' }}>
                            <div className="card-header" >
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
                                <h3 className="card-title">
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

                                </h3>
                            </div>
                            <table id="example2" className="table table-bordered table-hover">
                                <>
                                    <thead>
                                        <tr style={{ textAlign: 'center' }}>
                                            <th>STT vào bãi</th>
                                            <th>Mã thẻ</th>
                                            <th>Ngày vào bãi</th>
                                            <th>Biển số xe</th>
                                            <th>Cho ra</th>
                                            <th>Cho xuất</th>
                                            <th>Biển Cont</th>
                                            <th>Biển Mooc</th>
                                            <th>Loại hàng</th>
                                            <th>Loại xe</th>
                                            <th>Phiểu hải quan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data && data.data.map((item, i) => (
                                            <tr style={{ textAlign: 'center' }}>
                                                <td onClick={() => this.Select(item.EventID)}> {(this.state.page - 1) * this.state.limitPage + i + 1}</td>
                                                <td onClick={() => this.Select(item.EventID)}> {item.MaSoTrenThe || "Chưa có"}</td>
                                                <td onClick={() => this.Select(item.EventID)}> {GetFormatDate(item.NgayGioVao) || "Chưa có"} </td>
                                                <td onClick={() => this.Select(item.EventID)}> {item.BienXe || item.BienXeVao}</td>
                                                <td onClick={() => this.Select(item.EventID)}> Cho ra</td>
                                                <td onClick={() => this.Select(item.EventID)}> Cho xuất</td>
                                                <td onClick={() => this.Select(item.EventID)}> {item.BienCont} </td>
                                                <td onClick={() => this.Select(item.EventID)}> {item.BienMooc}</td>
                                                <td onClick={() => this.Select(item.EventID)}> {item.LoaiHangChiTiet || item.LoaihangChiTiet}</td>
                                                <td onClick={() => this.Select(item.EventID)}> {item.Name}</td>
                                                <td onClick={() => this.Select(item.EventID)}>{item.PhieuHaiQuan}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            </table>
                            {this.state.total == 0 && <img src={empty} style={{ width: '1500px', height: '800px' }} />}
                        </div>
                    </div>
                    <div style={{ width: '25%', height: '20%', float: 'right' }}>
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title"></h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="">
                                        <img src={a} id="img_xetrongbai" />
                                    </div>
                                </div>
                            </div>


                            <div className="card-body">
                                <div className="row">
                                    <div className="">
                                        <img src={b} id="img_xetrongbai" />
                                    </div>
                                    <div className="card-body">
                                        <div className="col-4"><br />
                                        <table style = {{width: '380px'}}>
                                        <tr>
                                            <td style={{ textAlign: 'center', borderBottom: 'white solid 20px'}} colSpan="2"><button className="btn btn-danger" style={{height: '50px', width: '350px'}}><h9>Đồng ý</h9></button></td>
                                        </tr>
                                        <tr>
                                            <td><b>Phiếu hải quan</b></td>
                                            <td style = {{width: '300px'}}><input type="text" className="form-control" placeholder="" value={this.state.PhieuHaiQuan} onChange={(e) => this.handleTextChange('PhieuHaiQuan', e)} /></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><button onClick={() => this.RequestThemPhieuHaiQuan()} className="btn btn-primary" style={{ width: '200px' }}><b>Thêm phiếu hải quan</b></button></td>
                                        </tr>
                                    </table>
                                        </div>
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
export default Content