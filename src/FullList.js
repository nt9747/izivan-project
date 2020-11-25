import React, { Component } from 'react';
import { requestLogin,requestGetListLoaiXe, requestGetListCarIn, requestGetListCarExcel, resquestGetListCarType } from './api'
import Cookie from 'js-cookie';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import TableScrollbar from 'react-table-scrollbar';
import empty from './Layout/img/empty.png'


var tablesToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>'
    , templateend = '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>'
    , body = '<body>'
    , tablevar = '<table>{table'
    , tablevarend = '}</table>'
    , bodyend = '</body></html>'
    , worksheet = '<x:ExcelWorksheet><x:Name>'
    , worksheetend = '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>'
    , worksheetvar = '{worksheet'
    , worksheetvarend = '}'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    , wstemplate = ''
    , tabletemplate = '';
})

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

class FullList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: '10/01/2020 00:00:00',
            toDate: '10/02/2200 23:59:59',
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

    toggleTatCa = () => {
       
        this.setState({ showLoaiHang: true, showBienXe: true, showLoaiXe: true })
    }

    componentDidMount() {
this.list();
        this.start();
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
            this.setState({ totalPage: Math.floor(this.state.total / this.state.limitPage) + 1 })
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

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    handlePortChange(field, event) {
        this.setState({ [field]: event.target.value })
        if (event.target.value == 5) {
            this.setState({ portIn: '1', PortOut: '3' })
        }
        else if (event.target.value == 1) {
            this.setState({ portIn: '', PortOut: '' })
        }
        else if (event.target.value == 2) {
            this.setState({ portIn: '0', PortOut: null })
        }
        else if (event.target.value == 3) {
            this.setState({ portIn: null, PortOut: '2' })
        }
        else if (event.target.value == 4) {
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
        // if (isLoading) {
        //     return (
        //         <p>Loading...</p>
        //     )
        // }
        if (isLoading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <div class="ui grid middle aligned"  >
                <div class="card-body" style={{ margin: '0 auto', width: '80%' }}>
                    <div class="row">
                        <div class="col-3" >
<b>Từ</b><input type="text" class="form-control" placeholder=".col-3" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} />
                        </div>
                        <div class="col-3">
                            <b>Đến</b><input type="text" class="form-control" placeholder=".col-4" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} />
                        </div>
                        <div class="col-5">
                            <b>Loại Hàng</b><br />
                            <select value={this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)}>
                                <option value disabled hidden>Chọn</option>
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
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <b>Loại xe</b><br />
                                <select value={this.state.loaiXe} onChange={(e) => this.handleTextChange('loaiXe', e)}>{this.state.dataXe && this.state.dataXe.map((item, i) => <option value={item.LoaiXe}>{item.Name}</option>)}
                                <option value=''>Tất cả</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <b>Số thứ tự</b><input type="text" class="form-control" placeholder="Nhập STT" />
                        </div>
                        <div class="col-3">
                            <b>Biển số xe</b><input type="text" class="form-control" placeholder="Nhập Biển Số" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} />
                        </div>
                        <div class="col-3">
                            <b>Mã số thẻ</b><input type="text" class="form-control" placeholder="Nhập số thứ tự" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} />
                        </div>
                    </div>
                    <div class="row">
                    <div class="col-4">
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
                        <div class="col-3"><br />
                            <button type="submit"
                                className="btn btn-danger"
                                onClick={() => this.list()}>
                                <b>Tìm kiếm</b>
                            </button>
                        </div>
                        <div class="col-3"><br />
                        <ReactHTMLTableToExcel
                                className="btn btn-danger"
                                table='example2'
                                filename={this.state.fromDate + "-->" + this.state.toDate}
                                sheet="Sheet"
                                buttonText="Xuất Excel"
                                style={{ width: '20%' }}/>
                        </div>
                       

                    </div>
                </div>
                <div class="card-header" >
                
                    <h3 class="card-title" >
                        <button style={{marginRight:"3px"}} class="btn btn-outline-primary" onClick={this.toggleBienXe}>Biển Số</button>
                        <button style={{marginRight:"3px"}} class="btn btn-outline-primary" onClick={this.toggleLoaiXe}>Loại Xe</button>
                        <button style={{marginRight:"3px"}} class="btn btn-outline-primary" onClick={this.toggleLoaiHang}>Loại Hàng</button>
                        <button style={{marginRight:"3px"}} class="btn btn-outline-primary" onClick={this.toggleTatCa}>Tất cả</button>
                    </h3>
                </div>
                <table id="example2">
                {this.state.showBienXe && <table id="t1" class="table table-bordered table-hover table2excel" >

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
                                <tr>
                                    <td key={i}> {(this.state.page - 1) * 10 + i + 1}</td>
                                    <td key={i}> {item.EventID || item.EventParkingID}</td>
                                    <td key={i}> {item.BienXe}</td>
                                    <td key={i}> {item.BienCont}</td>
                                    <td key={i}> {item.BienMooc}</td>
                                    <td key={i}> {item.LoaiXeChiTiet} </td>
                                    <td key={i}> {item.CarNumber_ID}</td>
                                    <td key={i}> {GetFormatDate(item.NgayGioVao)}</td>
                                    <td key={i}> {GetFormatDate(item.NgayGioRa)}</td>
                                    <td key={i}> {item.ThoiGianTrongBai}</td>
                                    <td key={i}> {item.TongTienThu}</td>
                                    <td key={i}> {item.NhanVienVao}</td>
                                    <td key={i}> {item.NhanVienDongYRa}</td>
                                    <td key={i}> {item.LoaiHangChiTiet}</td>
                                    <td key={i}> {item.CongVaoName}</td>
                                    <td key={i}> {item.CongRaName}</td>
                                    <td key={i}> </td>
                                </tr>
                            </tbody>
                        ))}

                    </>
                </table>}
                {this.state.showLoaiXe && <table id="t2" class="table table-bordered table-hover table2excel" >

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
                                                <tbody >
                                                    {/* <tr onClick={() => this.Edit()} > */}
                                                    <tr >
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
                </table>}
                {this.state.showLoaiHang && <table id="t3" class="table table-bordered table-hover table2excels">

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
                </table>}
                {this.state.total == 0 && <img src={empty} style={{ width: '2000px', height: '1000px' }} />}
            </table>
            </div>
        
        )
    }
}
export default FullList