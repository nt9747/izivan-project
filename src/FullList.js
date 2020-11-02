import React, { Component } from 'react';
import { requestGetListCarExcel, requestLogin } from './api'
import Cookie from 'js-cookie';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 
import TableScrollbar from 'react-table-scrollbar';



function GetFormatDate(a){
    const b = new Date(a);
    var hours = b.getUTCHours();
    var minutes = b.getUTCMinutes();
    var seconds = b.getUTCSeconds();
    var month = b.getUTCMonth() + 1;
    var day = b.getUTCDate();
    var year = b.getUTCFullYear();
    if(month.toString().length == 1) {
        month = '0'+month;
   }
   if(day.toString().length == 1) {
        day = '0'+day;
   }   
   if(hours.toString().length == 1) {
        hours = '0'+hours;
   }
   if(minutes.toString().length == 1) {
        minutes = '0'+minutes;
   }
   if(seconds.toString().length == 1) {
        seconds = '0'+seconds;
   }   
   if(year==1970){
       return 
   }
    return hours + ":" + minutes + ":" + seconds + "  "  + day + "/" + month + "/" + year
   
}

class FullList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: '',
            toDate: '',
            plateNumber: '',
            portIn: "",
            numberCar: "",
            loaiHang: "",
            data: "",
            isLoading: true,
        }
	}   
	componentDidMount() {
        this.list();
    }

    async list() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarExcel({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: "",
                PORTIN: "",
                NUMBERCAR: "",
                LOAIHANG: "",
            })
            await this.setState({ data: res.data, isLoading: false });
            console.log(this.state.data, "check data")
            // Cookie.set('SESSION_ID', res.data.TOKEN)
            // window.location.href = '/home'
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
        if (typeof(this.state.data) == "undefined"){
            alert("Sai cấu trúc, điền lại");
            window.location.href = '/ExportExcel'
        }
    }
	handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    render() {

        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        if (isLoading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
			<div class="ui grid middle aligned"  >
                            <div class="card-body"  style={{margin: '0 auto', width: '80%'}}>
                                <div class="row">
                                    <div class="col-3" >
                                        <b>Từ</b><input type="date" class="form-control" placeholder=".col-3" value={this.setState.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)}/>
</div>
                                    <div class="col-3">
                                        <b>Đến</b><input type="date" class="form-control" placeholder=".col-4" value={this.setState.toDate} onChange={(e) => this.handleTextChange('toDate', e)}/>
                                    </div>
                                    <div class="col-5">
                                        <b>Loại Hàng</b><br />
                                        <select value= {this.setState.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)}>
                                            <option>123</option>
                                            <option>456</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-1">
                                        <b>Loại xe</b><br />
                                        <select>
                                            <option>aaaab</option>
                                            <option>bbbbb</option>
                                        </select>
                                    </div>
                                    <div class="col-3">
                                        <b>Mã Thẻ</b><input type="text" class="form-control" placeholder="Nhập mã thẻ" />
                                    </div>
                                    <div class="col-3">
                                        <b>Biển số xe</b><input type="text" class="form-control" placeholder="Nhập Biển Số" value={this.setState.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)}/>
                                    </div>
                                    <div class="col-3">
                                        <b>Số thứ tự</b><input type="text" class="form-control" placeholder="Nhập số thứ tự" value={this.setState.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)}/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-5">
                                        <b>Cổng</b><br />
                                        <select value= {this.setState.portIn} onChange={(e) => this.handleTextChange('portIn', e)}>
                                            <option>Tất cả</option>
                                            <option>bbbbbb</option>
                                        </select>
                                        <select>
                                            <option>Giao dịch vào ra</option>
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
                                                table="example2"  
                                                filename= {this.state.fromDate + "-->" + this.state.toDate}  
                                                sheet="Sheet"  
                                                buttonText="Xuất Excel"
                                                style={{width: '20%'}} /> 
                                    </div>
                                        
                            </div>  
                            </div>
                            <TableScrollbar rows={15} >
                            <table id="example2" class="table table-bordered table-hover"  >
                                <>
                                    <thead>
                                        <tr>
                                            <th>STT vào bãi</th>
                                            <th>Biển sô xe vào/ Biển số xe ra</th>
                                            <th>Biển Cont</th>
                                            <th>Biển Mooc</th>
                                            <th>Loại xe</th>
                                            <th>Mã số thẻ</th>
                                            <th>Thời gian vào bãi</th>
                                            <th>Thời gia ra bãi</th>
                                            <th>Thời gian lưu bãi</th>
                                            <th>Số tiền</th>
                                            <th>Nhân viên vào / Nhân viên ra</th>
                                            <th>Loại hàng</th>
                                            <th>Cổng vào</th>
                                            <th>Ra khoi bai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
        
                                        {data.data && data.data.map((item, i) => (
                                            <tr>
                                                <td key={i}> {item.EventID}</td>
                                                <td key={i}> {item.BienXe}</td>
                                                <td key={i}> {item.BienCont}</td>
                                                <td key={i}> {item.BienMooc}</td>
                                                <td key={i}> {item.LoaiXeID}</td>
<td key={i}> {item.CarNumber_ID}</td>
                                                <td key={i}> {GetFormatDate(item.NgayGioVao)}</td>
                                                <td key={i}> {GetFormatDate(item.NgayGioDongYXuat)}</td>
                                                <td key={i}> {item.ThoiGianTrongBai}</td>
                                                <td key={i}> {item.PhiLuuDem + item.PhiLuuNgay + item.PhiVaoBai}</td>
                                                <td key={i}> {item.UserID_Vao + " / " + item.USerID_DongYra}</td>
                                                <td key={i}> {item.LoaiHangChiTiet}</td>
                                                <td key={i}> {item.CongVao + ":" + item.CongVaoName}</td>
                                                <td key={i}> {item.IsRaKhoiBai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            </table>
                            </TableScrollbar>
                        </div>
		)
		}
	}
	export default FullList