import React, { Component } from 'react';
import izivan from '../img/1.png'
import { requestGetListCarInfo, requestLogin } from '../../api'
import Cookie from 'js-cookie';


class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: '2020/07/03',
            toDate: '2020/10/15',
            plateNumber: '',
            portIn: "",
            numberCar: "",
            loaiHang: "",
            data: "",
            isLoading: true,
            page: 1,
        }
    }        
    componentDidMount() {
        this.list();
    }
    async listNext() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarInfo({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: "",
                PORTIN: "",
                NUMBERCAR: "",
                LOAIHANG: "",
                PAGE: ++this.state.page,
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
    }

    async listPrevious() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarInfo({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: "",
                PORTIN: "",
                NUMBERCAR: "",
                LOAIHANG: "",
                PAGE: --this.state.page,
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
    }

    async list() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarInfo({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: "",
                PORTIN: "",
                NUMBERCAR: "",
                LOAIHANG: "",
                PAGE: this.state.page,
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
    }

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    render() {
        
        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        // console.log(data.data, "check data")
        // if (isLoading) {
        //     return (
        //         <p>Loading...</p>
        //     )
        // }
        return (
            <div class="content-wrapper">
     <section class="content"  >
<div class="container-fluid">
  <div class="card card-warning">
    <div class="card-header">
        <h3 class="card-title">Danh sách xe trong bãi</h3>
    </div>

        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <b>Loại xe</b><input type="text" class="form-control" placeholder=""/>
                </div>
                <div class="col-6">
                    <b>Cổng vào</b><br/>
                          <select>
                              <option>Tất cả</option>
                              <option>ví dụ tên dàiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</option>
                          </select>
                </div>
                <form style={{float:'right'}}>
                    <input type="checkbox" name=""/>Cho xuất<br/>
                    <input type="checkbox" name=""/>Cho phép ra<br/>
                    <input type="checkbox" name=""/>Kiểm hóa<br/>
                    <input type="checkbox" name=""/>Bốc
            </form>
            </div>
            
            <div class="row">
                <div class="col-3">
                    <b>Biển số xe</b><input type="text" class="form-control" placeholder=""/>
                </div>
                <div class="col-3">
                    <b>Mã Thẻ</b><input type="text" class="form-control" placeholder="Nhập mã thẻ"/>
                </div>
                <div class="col-3"><br/>
                      <button style={{height: '40px', width: '300px'}}><b>Tìm</b></button>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <b>Tổng số xe trong bãi</b><input type="text" class="form-control" placeholder=""/>
                </div>
                <div class="col-3">
                    <b>Tổng số xe cổng VN</b><input type="text" class="form-control" placeholder=""/>
                </div>
                <div class="col-3">
                    <b>Tổng số xe cổng TQ</b><input type="text" class="form-control" placeholder=""/>
                </div>
                <div class=""><br/>
                      <button style={{height: '30px', width: '110px'}}><h9>Đồng ý cho ra</h9></button><br/>
                      <button style={{height: '30px', width: '110px'}}><h9>Đồng ý Xuất</h9></button>
                </div>
<div class=""><br/>
                      <button style={{height: '60px', width: '110px'}}><h9>Đồng ý cả hai</h9></button>
                </div>
            </div>

          </div>
      </div>
  <div class="ui grid middle aligned"  id="bang" style={{overflow:'auto', float:'left', width: '80%', height:'600px'}}>
          <div class="card-header" >
              <h3 class="card-title" ></h3>
          </div> 
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
                                                <td key={i}> {item.NgayGioVao}</td>
                                                <td key={i}> {item.NgayGioDongYXuat}</td>
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
   </div>
</div>
<div style={{width: '20%', height: '20%', float:'right'}}>
      <div class="card card-primary">
          <div class="card-header">
              <h3 class="card-title"></h3>
          </div>
      <div class="card-body">
          <div class="row">
              <div class="">
                  <img src={izivan} id="img_xetrongbai"/>
              </div>
          </div>
      </div>
      

      <div class="card-body">
          <div class="row">
              <div class="">
                  <img src={izivan} id="img_xetrongbai"/>
              </div>
              <div class="card-body">                                   
               <div class="col-3"><br/>
                      <button style={{height: '50px', width: '200px'}}><h9>Đồng ý</h9></button><br/><br/>
                      <button style={{height: '50px', width: '200px'}}><h9>Đồng ý</h9></button>
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