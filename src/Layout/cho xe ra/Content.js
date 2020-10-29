import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
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
<section class="content">
<div class="container-fluid" >
  <div class="card card-warning" >
    <div class="card-header" >
        <h3 class="card-title"></h3>
    </div>

        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <b>Từ</b><input type="datetime-local" class="form-control" placeholder=".col-3"/><br/>
                    <b>Đến</b><input type="datetime-local" class="form-control" placeholder=".col-3"/>
                </div>
                <div class="col-3">
                    <b>Mã thẻ</b><input type="text" class="form-control" name=""/><br/>
                    <b>Biển số xe</b><input type="text" class="form-control" name=""/>
                </div>
                <div class="col-3"><br/>
                    <b>Cổng</b><select><option>Cổng vào VN</option>
                                       <option>aaa</option>
                              </select>
                </div>
                <div class="col-3"><br/><br/>
                  <button style={{height: '60px', width: '120px'}}><h4>Tìm Kiếm</h4></button>
                </div>
            </div>
          </div>
    </div>
            

 
  <div class="ui grid middle aligned"  style={{overflow:'auto', float:'left', width: '60%', height:'600px'}}>
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
<div style={{width: '40%', height: '20%', float:'right'}}>
      <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">Hiện Tại</h3>
            </div>
            <div class="card-body">
                <div class="row">
                  <table>
                        <tr>
                          <td><b>Biển số xe</b></td>
                          <td><input type="text" name="" id="edit_car"/><b>Ngày vào</b></td>
                          <td><input type="text" name=""id="edit_car"/></td>
                        </tr>
                        <tr>
                          <td><b>Biển Cont</b></td>
                          <td><input type="text" name="" id="edit_car"/><b>Giờ vào</b></td>
                          <td><input type="text" name=""id="edit_car"/></td>
                        </tr>
                        <tr>
                          <td><b>Biển Moc</b></td>
                          <td><input type="text" name="" id="edit_car"/><b>Tổng tiền</b></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td><b>Loại Hàng</b></td>
                          <td colspan="2"><input type="text" name="" id="edit_car"/> <input type="text" style={{width: '185px'}}/></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td><b>Loại Xe</b></td>
                          <td colspan="2"><input type="text" style={{width: '310px'}}/></td>
                        </tr>
                        <tr>
                          <td><button>Hủy</button></td>
                          <td></td>
                          <td><button>Thay đổi thông tin</button></td>
                        </tr>
                  </table>
                </div>
            </div>
      </div>
  <div class="card card-primary">
          <div class="card-header">
              <h3 class="card-title"></h3>
          </div>
      <div class="card-body">
          <div class="row">
              <div class="">
                  <img src="../../img/izivan.png" id="img_xetrongbai"/>
                  <img src="../../img/izivan.png" id="img_xetrongbai"/>
              </div>
          </div>
      </div>
       <div class="card-body">
          <div class="row">
              <div class="">
                  <img src="../../img/izivan.png" id="img_xetrongbai"/>
                  <img src="../../img/izivan.png" id="img_xetrongbai"/>
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