import React, { Component } from 'react';
import { requestGetListCar, requestLogin, resquestGetListCarType, resquestChangeInfoCar } from '../../api'
import Cookie from 'js-cookie';
import empty from '../img/empty.png'
import a from '../img/a.jpg';
import b from '../img/b.jpg';
import c from '../img/c.jpg';
import d from '../img/d.jpg';

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
            SelectCong: "/listCar/listCarIn?", //in
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
            thongKeLoaiXe: "/Statistic/statisticCarIn", //in
            TongKetCong: "",
            countIn: "",
            countOut: "",
            countTon: "",
            totalMoney: "",
            codeThongKeXe: "",
            limitPage: "20",
            orderNumber: "",
            bienCont: "",
            bienMooc: "",
            countXeAll: "",
            countXeVN: "",
            countXeCN: "",
            EventIdXuLy: "",
            PhieuHaiQuan: "",
            isActive: null,
            ThayDoiCongPort: "1",
            updateXePort: "updateCarIn",
            bienXeOld: "",
            bienContOld: "",
            bienMocOld: "",
            loaiHangOld: "",
            loaiXeOld: "",
            bienXeNew: "",
            bienContNew: "",
            bienMocNew: "",
            loaiHangNew: "",
            loaiXeNew: "",
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
    componentDidMount() {
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

            await this.setState({ data: res.data, isLoading: false, page: res.data.currentPage, nextPage: res.data.nextPage, previousPage: res.data.previousPage, isActive: null });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({ bienXeOld: "", bienContOld: "", bienMocOld: "", loaiHangOld: "", loaiXeOld: "", EventIdXuLy: "" })
            this.setState({ EventIdXuLy: '', bienXeNew: '', bienContNew: '', bienMocNew: '', loaiHangNew: '', loaiXeNew: '' });

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
            await this.setState({ isActive: null, data: res.data, isLoading: false, page: res.data.currentPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({ bienXeOld: "", bienContOld: "", bienMocOld: "", loaiHangOld: "", loaiXeOld: "", EventIdXuLy: "" })
            this.setState({ EventIdXuLy: '', bienXeNew: '', bienContNew: '', bienMocNew: '', loaiHangNew: '', loaiXeNew: '' });
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
                PAGE: this.state.page,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ isActive: null, data: res.data, isLoading: false, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({ bienXeOld: "", bienContOld: "", bienMocOld: "", loaiHangOld: "", loaiXeOld: "", EventIdXuLy: "" })
            this.setState({ EventIdXuLy: '', bienXeNew: '', bienContNew: '', bienMocNew: '', loaiHangNew: '', loaiXeNew: '' });
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }
    Cancel() {
        this.setState({ bienXeOld: "", bienContOld: "", bienMocOld: "", loaiHangOld: "", loaiXeOld: "", EventIdXuLy: "" })
        this.setState({ EventIdXuLy: '', bienXeNew: '', bienContNew: '', bienMocNew: '', loaiHangNew: '', loaiXeNew: '' });
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
            await this.setState({ isActive: null, data: res.data, isLoading: false, page: this.state.totalPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({ bienXeOld: "", bienContOld: "", bienMocOld: "", loaiHangOld: "", loaiXeOld: "", EventIdXuLy: "" })
            this.setState({ EventIdXuLy: '', bienXeNew: '', bienContNew: '', bienMocNew: '', loaiHangNew: '', loaiXeNew: '' });
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
            await this.setState({ data: res.data, total: res.data.total, previousPage: res.data.previousPage, nextPage: res.data.nextPage, isLoading: false, isActive: null });
            this.setState({ totalPage: Math.ceil(this.state.total / this.state.limitPage) })
            this.setState({ bienXeOld: "", bienContOld: "", bienMocOld: "", loaiHangOld: "", loaiXeOld: "" })
            this.setState({ EventIdXuLy: '', bienXeNew: '', bienContNew: '', bienMocNew: '', loaiHangNew: '', loaiXeNew: '' });
            if ((this.state.SelectCong == "/listCar/listCarIn?" && (this.state.PortOut == "2" || this.state.PortOut == "4")) || (this.state.SelectCong == "/listCar/listCarOut?" && (this.state.portIn == "0" || (this.state.portIn == "1" && this.state.PortOut == null)))) {
                alert("Wrong choose!")
                window.location.href = '/home'
            }
            if ((this.state.SelectCong == "/listCar/listCarParking?" && this.state.namePort == "3")) {
                alert("Cổng quay đầu ko xem được danh sách xe tồn, vui lòng chọn đúng cổng!")
                window.location.href = '/home'
            }

        } catch (err) {
            await this.setState({
                isLoading: true
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
        if (event.target.value == '1') {
            this.setState({ SelectCong: '/listCar/listCarIn?', updateXePort: 'updateCarIn' })
        }
        else if (event.target.value == '2') {
            this.setState({ SelectCong: '/listCar/listCarOut?', updateXePort: 'updateCarOut' })
        }
    }
    //////////////////////// bo sung tim kiem chuan hon 
    async Select(bienxeSearch, loaihangSearch) {
        try {
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: bienxeSearch,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: loaihangSearch,
                PAGE: 1,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
                LIMIT: 1,
            })
            await this.setState({
                EventIdXuLy: res.data.data[0].EventID, bienXeOld: res.data.data[0].BienXe, bienContOld: res.data.data[0].BienCont,
                bienMocOld: res.data.data[0].BienMooc, loaiHangOld: res.data.data[0].LoaiHangChiTiet, loaiXeOld: res.data.data[0].LoaiXeID
            });
            console.log(res.data)
        } catch (err) {
            await this.setState({
                isLoading: true
            }, () => console.log(err))
        }
        console.log(this.state.data, "Check data!");
    }


    async RequestChangeInfo() {
        try {
            const res = await resquestChangeInfoCar({
                UPDATEXEPORT: this.state.updateXePort,
                EVENTID: this.state.EventIdXuLy,
                BIENSOXE: this.state.bienXeNew,
                BIENCONT: this.state.bienContNew,
                BIENMOC: this.state.bienMocNew,
                LOAIHANG: this.state.loaiHangNew,
                LOAIXEID: this.state.loaiXeNew
            })
            await this.setState({ msgOut: res.msg });
            if (this.state.msgOut == "Thành công") {
                alert("Thay đổi thông tin thành công!")
                this.setState({ EventIdXuLy: '', bienXeNew: '', bienContNew: '', bienMocNew: '', loaiHangNew: '', loaiXeNew: '' });
                this.listToCurrent();
            } else {
                alert("Kiểm hóa thất bại!")
                this.listToCurrent();
            }
        } catch (err) {
            await this.setState({
                isLoading: true
            }, () => console.log(err))
        }
    }

    render() {

        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        console.log(data.data, "check data")
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
                <section className="content">
                    <div className="container-fluid" style={{ float: 'left', width: '70%', height: '250px' }}>
                        <div className="card card-warning" >
                            <div className="card-header" >
                                <h3 className="card-title"></h3>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3">
                                        <b>Từ</b><input type="text" className="form-control" placeholder="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} />
                                        <b>Mã số thẻ</b><input type="text" className="form-control" placeholder="Nhập Mã số thẻ" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} />

                                    </div>
                                    <div className="col-3">
                                        <b>Đến</b><input type="text" className="form-control" placeholder="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} />
                                        <b>Biển số xe</b><input type="text" className="form-control" placeholder="Nhập Biển Số" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} />
                                    </div>
                                    <div className="col-1" style={{ marginRight: '100px' }}>
                                        <b>Cổng</b>
                                        <select value={this.state.ThayDoiCongPort} onChange={(e) => this.handlePortChange('ThayDoiCongPort', e)}>
                                            <option value disabled hidden>Chọn</option>
                                            <option selected value='1'>Xe vào</option>
                                            <option value='2'>Xe ra</option>
                                        </select>
                                    </div>
                                    <div className="col-2"><br />
                                        <button className="btn btn-danger" style={{ height: '80px', width: '150px' }} onClick={() => this.list()}><h4><b>Tìm Kiếm</b></h4></button>
                                    </div>
                                </div>
                            </div>
                        </div>





                        <div className="ui grid middle aligned" style={{ overflow: 'auto', float: 'left', width: '100%', height: '800px' }}>
                            <div className="card-header" >
                                <h3 className="card-title" >
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

                            </div>
                            <table id="example2" className="table table-bordered table-hover" style={{ textAlign: 'center' }}>
                                <>
                                    <thead>
                                        <tr>
                                            <th>EventID </th>
                                            <th>STT</th>
                                            <th>STT vào bãi</th>
                                            <th>Thời gian vào bãi</th>
                                            <th>Thời gian ra bãi </th>
                                            <th>Thời gian lưu bãi</th>
                                            <th>Số tiền</th>
                                            <th>Mã thẻ</th>
                                            <th>Biển số xe</th>
                                            <th>Biển Cont</th>
                                            <th>Biển Mooc</th>
                                            <th>Loại hàng</th>
                                            <th>Loại xe</th>
                                            <th>Nhân viên</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.data && data.data.map((item, i) => (
                                            <tr style={
                                                this.state.isActive === i
                                                    ? { background: '#BEC6C1', textAlign: 'center' }
                                                    : { background: '', textAlign: 'center' }
                                            }
                                                key={i}
                                                onClick={() => this.toggleActive(i) || this.Select(item.BienXe, item.LoaiHangChiTiet, item.LoaiXeID, item.MaSoTrenThe, item.SoThuTuTrongNgay)}>
                                                <td>{item.EventID} </td>
                                                <td > {(this.state.page - 1) * this.state.limitPage + i + 1}</td>
                                                <td> {item.SoThuTuTrongNgay}</td>
                                                <td > {GetFormatDate(item.NgayGioVao) || "Chưa có"}</td>
                                                <td > {GetFormatDate(item.NgayGioRa) || "Chưa có"}</td>
                                                <td > {item.ThoiGianTrongBai || "Chưa có"}</td>
                                                <td > {countMoney(item.TongTienThu) || "Chưa có"}</td>
                                                <td > {item.MaSoTrenThe || "Chưa có"} </td>
                                                <td > {item.BienXe || item.BienXeVao + " / " + (item.BienXeRa || "")}</td>
                                                <td > {item.BienCont || item.BienContVao}</td>
                                                <td > {item.BienMooc || item.BienMoocVao}</td>
                                                <td > {item.LoaiHangChiTiet || item.LoaihangChiTiet}</td>
                                                <td > {(item.LoaiXeChiTiet || "Chưa có") || item.Name} </td>
                                                <td > {item.NhanVienVao}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            </table>
                            {this.state.total == 0 && <img src={empty} style={{ width: '1200px', height: '800px' }} />}
                        </div>
                    </div>
                    <div style={{ width: '30%', height: '20%', float: 'right' }}>
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Hiện Tại {this.state.EventIdXuLy || 'none'}</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <table>
                                        <tr>
                                            <td><b>Biển số xe</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.bienXeOld} onChange={(e) => this.handleTextChange('plateNumber', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" value={this.state.bienXeNew} onChange={(e) => this.handleTextChange('bienXeNew', e)} name="" id="edit_car1" /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Cont</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.bienContOld} onChange={(e) => this.handleTextChange('bienContEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" value={this.state.bienContNew} onChange={(e) => this.handleTextChange('bienContNew', e)} name="" id="edit_car1" /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Moc</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.bienMocOld} onChange={(e) => this.handleTextChange('bienMoocEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" value={this.state.bienMocNew} onChange={(e) => this.handleTextChange('bienMocNew', e)} name="" id="edit_car1" /></td></tr>
                                        <tr>
                                            <td><b>Loại Hàng</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.loaiHangOld} onChange={(e) => this.handleTextChange('loaiHangEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" value={this.state.loaiHangNew} onChange={(e) => this.handleTextChange('loaiHangNew', e)} name="" id="edit_car1" /></td></tr>
                                        <tr>
                                            <td><b>Loại Xe</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.loaiXeOld} onChange={(e) => this.handleTextChange('loaiXeEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" value={this.state.loaiXeNew} onChange={(e) => this.handleTextChange('loaiXeNew', e)} name="" id="edit_car1" /></td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={() => this.Cancel()} className="btn btn-danger" > Hủy</button></td>
                                            <td></td>
                                            <td><button onClick={() => this.RequestChangeInfo()} className="btn btn-danger">Thay đổi thông tin</button></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="card card-primary" >
                            <div className="card-header">
                                <h3 className="card-title">Ảnh xe</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="">

                                        <img src={b} id="img_xetrongbai" />
                                    </div>
                                </div>
                            </div><div className="card-body">
                                <div className="row">
                                    <div className="">
                                        <img src={a} id="img_xetrongbai" />

                                    </div>
                                    <div></div>
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