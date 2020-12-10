import React, { Component } from 'react';
import { requestGetListCar, requestLogin, resquestGetListCarType, resquestGetExportCar, requestChoXeRa } from '../../api'
import Cookie from 'js-cookie';

import a from '../img/a.jpg';
import c from '../img/c.jpg';

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
            portIn: '0',
            numberCar: "",
            loaiHang: "",
            data: "",
            isLoading: true,
            page: 1,
            nextPage: "",
            previousPage: "",
            PortOut: null,
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
            dataChange: "",
            bienXeChange: "",
            bienContChange: "",
            bienMocChange: "",
            loaiHangChange: "",
            loaiXeChange: "",
            loaiXeIDchange: "",
            EventIDChange: "null",
            IsDongYXeRa: "",
            IsXeKhongHang: "",
            IsXeQuayDau: "",
            linkAnhBienSoChange: "",
            linkAnhDauXeChange: "",
            linkAnhFullChange: "",
            carNumber_IDChange: "",
            fromDataChange: "",
            TongTienChange: "",
            ChoXeRaPort: "",
            msgOut: "",
            bienCont: "",
            bienMooc: "",
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

            await this.setState({ isActive: null,data: res.data, isLoading: false, page: res.data.currentPage, nextPage: res.data.nextPage, previousPage: res.data.previousPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({ bienXeChange: "",bienContChange: "",bienMocChange: "",loaiHangChange: "",TongTienChange: "",loaiXeChange: "",fromDataChange: ""});

        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }

    async Select(bienxeSearch, loaihangSearch, loaixeSearch, matheSearch, sothutuSearch) {
        try {
            console.log(bienxeSearch, loaihangSearch, loaixeSearch, matheSearch, sothutuSearch)
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: bienxeSearch,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: matheSearch,
                LOAIHANG: loaihangSearch,
                PAGE: 1,
                CONG: this.state.SelectCong,
                LOAIXE: loaixeSearch,
                ORDERNUMBER: sothutuSearch,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
                LIMIT: 1
            })
            await this.setState({
                isLoading: false, dataChange: res.data,
                bienXeChange: res.data.data[0].BienXe, bienContChange: res.data.data[0].BienCont, bienMocChange: res.data.data[0].BienMooc, loaiHangChange: res.data.data[0].LoaiHangChiTiet,
                loaiXeChange: res.data.data[0].LoaiXeChiTiet, loaiXeIDchange: (res.data.data[0].LoaiXeID).toString(), linkAnhBienSoChange: res.data.data[0].LinkAnhBienSo,
                linkAnhDauXeChange: res.data.data[0].LinkAnhDauXe, linkAnhFullChange: res.data.data[0].LinkAnhFull, IsDongYXeRa: (res.data.data[0].IsDongYXeRa ? 1 : 0).toString(), IsXeKhongHang: (res.data.data[0].IsXeKhongHang ? 1 : 0).toString(),
                IsXeQuayDau: (res.data.data[0].IsXeQuayDau ? 1 : 0).toString(), carNumber_IDChange: (res.data.data[0].CarNumber_ID).toString(), fromDataChange: GetFormatDate(res.data.data[0].NgayGioVao), TongTienChange: countMoney(res.data.data[0].TongTienThu),
                EventIDChange: (res.data.data[0].EventID).toString(), ChoXeRaPort: ""
            });
            console.log(this.state.EventIDChange, "EventIdChange");
        } catch (err) {
            await this.setState({
                isLoading: true
            }, () => console.log(err))
        }
        console.log(this.state.data, "Check data!");
    }
    async RequestGetCarOut() {
        try {
            const res = await requestChoXeRa({
                BIENSOXE: this.state.bienXeChange,
                BIENCONT: this.state.bienContChange,
                BIENMOC: this.state.bienMocChange,
                LOAIHANG: this.state.loaiHangChange,
                LOAIXECHITIET: this.state.loaiXeChange,
                LOAIXE: this.state.loaiXeIDchange,
                CONGRA: this.state.CongRaChange,
                CONGRANAME: this.state.CongRaNameChange,
                LINKANHBIENSO: this.state.linkAnhBienSoChange,
                LINKANHDAUXE: this.state.linkAnhDauXeChange,
                LINKANHFULL: this.state.linkAnhFullChange,
                ISDONGYXERA: this.state.IsDongYXeRa,
                ISXEKHONGHANG: this.state.IsXeKhongHang,
                ISXEQUAYDAU: this.state.IsXeQuayDau,
                CARNUMBER_ID: this.state.carNumber_IDChange,
                EVENTID: this.state.EventIDChange
            })
            await this.setState({ msgOut: res.msg });
            if (this.state.msgOut == "Thành công") {
                alert("Cho xe ra thành công!")
                this.setState({ fromDataChange: "",bienXeChange: "",bienContChange: "",bienMocChange: "",loaiHangChange: "",TongTienChange: "",loaiXeChange: ""});
                this.Cancel();
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
            this.setState({ fromDataChange: "",bienXeChange: "",bienContChange: "",bienMocChange: "",loaiHangChange: "",TongTienChange: "",loaiXeChange: ""});
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
            console.log(this.state.dataXe, "check total");
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
            await this.setState({ isActive: null,data: res.data, isLoading: false, page: this.state.totalPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({ fromDataChange: "",bienXeChange: "",bienContChange: "",bienMocChange: "",loaiHangChange: "",TongTienChange: "",loaiXeChange: ""});
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
            await this.setState({ isActive: null,data: res.data, isLoading: false, total: res.data.total, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            this.setState({ totalPage: Math.ceil(this.state.total / this.state.limitPage) })
            console.log(this.state.portIn, "check PortIn")
            console.log(this.state.PortOut, "check PortOut")
            this.setState({ fromDataChange: "",bienXeChange: "",bienContChange: "",bienMocChange: "",loaiHangChange: "",TongTienChange: "",loaiXeChange: ""});
            console.log(this.state.data, "check data");
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
        console.log(this.state.data, "Check data!");
        // if (typeof(this.state.data) == "undefined"){
        //     return(
        //         <img src="../img/empty.png" />
        //     )
        //     // window.location.href = '/Empty'
        // }
    }

    async Cancel() {
        this.setState({ ChoXeRaPort: "", EventIDChange: "null", bienXeChange: "", bienContChange: "", bienMocChange: "", fromDataChange: "", loaiHangChange: "", TongTienChange: "", loaiXeChange: "" });
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

    handlePortOutChange(field, event) {
        this.setState({ [field]: event.target.value })
        if (event.target.value == '1') {
            this.setState({ CongRaChange: "2", CongRaNameChange: "VN" })
        }
        else if (event.target.value == '0') {
            this.setState({ CongRaChange: null, CongRaNameChange: null })
        }
        else if (event.target.value == '2') {
            this.setState({ CongRaChange: "3", CongRaNameChange: "TQ" })
        }
        else if (event.target.value == '3') {
            this.setState({ CongRaChange: "4", CongRaNameChange: "Xuat" })
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
            await this.setState({ isActive: null,data: res.data, isLoading: false, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            this.setState({ fromDataChange: "",bienXeChange: "",bienContChange: "",bienMocChange: "",loaiHangChange: "",TongTienChange: "",loaiXeChange: ""});
        } catch (err) {
            await this.setState({
                isLoading: false
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
                    <div className="container-fluid" >
                        <div className="card card-warning" >
                            <div className="card-header" >
                                <h3 className="card-title"><i>Cho xe ra</i></h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3">
                                        <b>Từ</b><input hidden={this.state.SelectCong == "/listCar/listCarParking?"} type="text" className="form-control" placeholder="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} />
                                        <b>Mã số thẻ</b><input type="text" className="form-control" placeholder="Nhập Mã số thẻ" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} />

                                    </div>
                                    <div className="col-3">
                                        <b>Đến</b><input type="text" className="form-control" placeholder="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} />
                                        <b>Biển số xe</b><input type="text" className="form-control" placeholder="Nhập Biển Số" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} />
                                    </div>
                                    <div className="col-3"><br />
                                        <b>Cổng</b><select value={this.state.namePort} onChange={(e) => this.handlePortChange('namePort', e)}>
                                            <option disabled hidden value>Chọn</option>
                                            <option value='2'>Cổng vào VN</option>
                                            <option value='5'>Cổng vào CN</option>
                                        </select>
                                    </div>
                                    <div className="col-3"><br /><br />
                                        <button className="btn btn-danger" style={{ height: '80px', width: '150px' }} onClick={() => this.list()}><h4><b>Tìm Kiếm</b></h4></button>
                                    </div>
                                    <div className="col-3">

                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="ui grid middle aligned" style={{ overflow: 'auto', float: 'left', width: '70%', height: '1000px' }}>
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
                            <table id="example2" className="table table-bordered table-hover"  >
                                <>
                                    <thead>
                                        <tr style={{ textAlign: "center"}}>
                                            <th>STT</th>
                                            <th>STT vào bãi</th>
                                            <th>Thời gian vào bãi</th>
                                            <th>Thời gian lưu bãi</th>
                                            <th>Số tiền</th>
                                            <th>Mã thẻ</th>
                                            <th>Biển số xe</th>
                                            <th>Biển Cont</th>
                                            <th>Biển Mooc</th>
                                            <th>Loại hàng</th>
                                            <th>Loại xe</th>
                                            <th>Nhân viên</th>
                                            <th>IsDongYXeRa</th>
                                        </tr> 
                                    </thead>
                                    <tbody>

                                        {this.state.data && data.data.map((item, i) => (
                                            <tr style={
                                                this.state.isActive === i
                                                    ? { background: '#BEC6C1' , textAlign: 'center' }
                                                    : { background: '' , textAlign: 'center'}      
                                            }
                                                key={i}
                                                onClick={() => this.toggleActive(i) || this.Select(item.BienXe, item.LoaiHangChiTiet, item.LoaiXeID, item.MaSoTrenThe, item.SoThuTuTrongNgay)}>
                                                <td> {(this.state.page - 1) * this.state.limitPage + i + 1}</td>
                                                <td > {item.SoThuTuTrongNgay}</td>
                                                <td > {GetFormatDate(item.NgayGioVao) || "Chưa có"}</td>
                                                <td > {item.ThoiGianTrongBai || "Chưa có"}</td>
                                                <td > {countMoney(item.TongTienThu) || "Chưa có"}</td>
                                                <td > {item.MaSoTrenThe || "Chưa có"} </td>
                                                <td> {item.BienXe || item.BienXeVao + " / " + (item.BienXeRa || "")}</td>
                                                <td > {item.BienCont || item.BienContVao}</td>
                                                <td > {item.BienMooc || item.BienMoocVao}</td>
                                                <td > {item.LoaiHangChiTiet || item.LoaihangChiTiet}</td>
                                                <td > {(item.LoaiXeChiTiet || "Chưa có") || item.Name} </td>
                                                <td > {(item.NhanVienVao || "") + " / " + (item.NhanVienRa || "")}</td>
                                                <td> {(item.IsDongYXeRa).toString()} </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            </table>
                        </div>
                    </div>
                    <div style={{ width: '30%', height: '20%', float: 'right' }}>
                        <div className="card card-warning">
                            <div className="card-header">
                                <h3 className="card-title">Hiện Tại</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <table>
                                        <tr>
                                            {/* bienXeChange: "",
                                                                 bienContChange: "",
                                                                 bienMocChange: "",
                                                                loaiHangChange: "",
                                                                 loaiXeChange: "",
                                                                loaiXeIDchange: "",
                                                                EventIDChange: "",
                                                                IsDongYXeRa: "",
                                                   om             IsXeKhongHang: "",
                                                                IsXeQuayDau: "",
                                                                linkAnhBienSoChange: "",
                                                                linkAnhDauXeChange: "",
                                                                linkAnhFullChange: "",
                                                                carNumber_IDChange: "",
                                                                fromDataChange: "",
                                                                TongTienChange: "", */}
                                            <td><b>Biển số xe</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4',marginRight: '10px' }} value={this.state.bienXeChange} onChange={(e) => this.handleTextChange('bienXeChange', e)} type="text" name="" id="edit_car" /><b>Ngày vào</b></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Cont</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4', marginRight: '20px' }} value={this.state.bienContChange} onChange={(e) => this.handleTextChange('bienContChange', e)} type="text" name="" id="edit_car" /> <input disabled style={{ width: '185px', backgroundColor: '#C0C8C4' }} value={this.state.fromDataChange} onChange={(e) => this.handleTextChange('fromDataChange', e)} type="text" name="" id="edit_car" /></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Moc</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4', marginRight: '10px' }} value={this.state.bienMocChange} onChange={(e) => this.handleTextChange('bienMocChange', e)} type="text" name="" id="edit_car" /><b>Tổng tiền</b></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Loại Hàng</b></td>
                                            <td colSpan="2"><input disabled style={{ backgroundColor: '#C0C8C4', marginRight: '20px' }} value={this.state.loaiHangChange} onChange={(e) => this.handleTextChange('loaiHangChange', e)} type="text" name="" id="edit_car" /> <input value={this.state.TongTienChange} onChange={(e) => this.handleTextChange('TongTienChange', e)} disabled style={{ width: '185px', backgroundColor: '#C0C8C4' }} type="text" /></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Loại Xe</b></td>
                                            <td colSpan="2"><input value={this.state.loaiXeChange} onChange={(e) => this.handleTextChange('loaiXeChange', e)} disabled style={{ width: '330px', backgroundColor: '#C0C8C4' }} type="text" name="" id="edit_car" /></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td colSpan='2'><b>Cổng cho ra</b><select value={this.state.ChoXeRaPort} onChange={(e) => this.handlePortOutChange('ChoXeRaPort', e)}>
                                                <option disabled hidden>SELECT</option>
                                                <option selected value='0'> Chọn</option>
                                                <option value='1'>Cổng ra quay đầu</option>
                                                <option value='2'>Cổng ra xuất</option>
                                                <option value='3'>Cổng ra TQ</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={() => this.Cancel()} className='btn btn-danger'><b>Hủy</b></button></td>
                                            <td style={{ textAlign: "center"}} colSpan="2"><button style={{width: '200px'}} hidden = {this.state.EventIDChange == "null" || this.state.ChoXeRaPort == ""} onClick={() => this.RequestGetCarOut()} className='btn btn-danger'><b>Cho xe ra</b></button></td>
                                        </tr>

                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="card-header">
                                <h3 className="card-title"></h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="">
                                        <img src={c} id="img_xetrongbai" /><br/><br/>
                                        <img src={a} id="img_xetrongbai" />
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