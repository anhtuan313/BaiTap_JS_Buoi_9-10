function getEle(id) {
  return document.getElementById(id);
}
function clear1(divID){

  getEle(divID).innerHTML = "";
  getEle(divID).className = "";
}

function clear() {
  getEle("tknv").value = "";
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("datepicker").value = "";
  getEle("luongCB").value = "";
  
  getEle("gioLam").value = "";
  clear1("tbTKNV");
  clear1("tbTen");
  clear1("tbEmail");
  clear1("tbMatKhau");
  clear1("tbNgay");
  clear1("tbLuongCB");
  clear1("tbChucVu");
  clear1( "tbGiolam");
}

var validation = new Validation();
var list = new listNV();
getLocalStorage();

function kiemtraNhanVie(input, divID, mess, arr) {
  var status = true;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].account === input) {
      status = false;
      break;
    }
  }
  if (status) {
    getEle(divID).innerHTML = "";
    getEle(divID).className = "";
    return true;
  }

  getEle(divID).innerHTML = mess;
  getEle(divID).className = "alert alert-danger";
  getEle(divID).style.width = "100%";
  return false;
}

function checkInput(
  _taikhoan,
  _fullname,
  _email,
  _password,
  _ngaylam,
  _salary,
  _timeOfWorks,
  flag
) {
  var isValid = true;
  // if(flag===0){
  //   isValid &= ;
  //      }

if(flag===0){

  isValid &=
    validation.kiemTraRong(_taikhoan, "tbTKNV", "Tài khoản không được rỗng") &&
    validation.kiemTraDoDai(
      _taikhoan,
      "tbTKNV",
      "Tài khoản từ 4 đến 6 ký tự",
      4,
      6
    ) && kiemtraNhanVie(_taikhoan, "tbTKNV", "Tài khoản đã tồn tại", list.list);
    }
if(flag===1){
  isValid &=
  validation.kiemTraRong(_taikhoan, "tbTKNV", "Tài khoản không được rỗng") &&
  validation.kiemTraDoDai(
    _taikhoan,
    "tbTKNV",
    "Tài khoản từ 4 đến 6 ký tự",
    4,
    6
  );


}

  isValid &=
    validation.kiemTraRong(_fullname, "tbTen", "Tên không được rỗng") &&
    validation.kiemtrachuoi(_fullname, "tbTen", "Tên không được chứa số");
  isValid &=
    validation.kiemTraRong(_email, "tbEmail", "Email không được rỗng") &&
    validation.kiemtraemail(_email, "tbEmail", "Email không đúng định dạng");
  isValid &=
    validation.kiemTraRong(_password, "tbMatKhau", "Pass không được rỗng") &&
    validation.kiemTraDoDai(
      _password,
      "tbMatKhau",
      "Pass từ 6 đén 10 ký tự",
      6,
      10
    ) &&
    validation.kiemtramatkhau(
      _password,
      "tbMatKhau",
      "Pass không đúng định dạng"
    );
  isValid &=
    validation.kiemTraRong(_ngaylam, "tbNgay", "Ngày làm không được rỗng") &&
    validation.kiemtrangaysinh(
      _ngaylam,
      "tbNgay",
      "Ngày làm không đúng định dạng"
    );
  isValid &=
    validation.kiemTraRong(_salary, "tbLuongCB", "Lương không được rỗng") &&
    validation.kiemTraLuong(
      _salary,
      "tbLuongCB",
      "Lương từ 1000000 - 20000000",
      1000000,
      20000000
    );
  isValid &= validation.kiemtrakhoahoc(
    "chucvu",
    "tbChucVu",
    "chức vụ không được rỗng"
  );
  isValid &=
    validation.kiemTraRong(
      _timeOfWorks,
      "tbGiolam",
      "Giờ làm không được rỗng"
    ) &&
    validation.kiemTraLuong(
      _timeOfWorks,
      "tbGiolam",
      "Giờ làm từ 80 - 200 giờ",
      80,
      200
    );
  return isValid;
}

getEle("btnThemNV").addEventListener("click", function () {
  var _taikhoan = getEle("tknv").value;
  var _fullname = getEle("name").value;
  var _email = getEle("email").value;
  var _password = getEle("password").value;
  var _ngaylam = getEle("datepicker").value;
  var _salary = +getEle("luongCB").value;
  var _role = getEle("chucvu").value;
  var _timeOfWorks = getEle("gioLam").value;

  var check = true;

  check &= checkInput(
    _taikhoan,
    _fullname,
    _email,
    _password,
    _ngaylam,
    _salary,
    _timeOfWorks,0
  );

  var nhanVien = new NhanVien(
    _taikhoan,
    _fullname,
    _email,
    _password,
    _ngaylam,
    _salary,
    _role,
    _timeOfWorks
  );

  if (check) {
    // nhanVien.xeploai();
    // nhanVien.tinhIncome();
    list.addNV(nhanVien);
    taobang(list.list);
    setLocalStorage();
  }

  getEle("tknv").disabled = false;
});

function setLocalStorage() {
  //chuyen kieu Json sang String
  var arrString = JSON.stringify(list.list);
  localStorage.setItem("DSNV", arrString);
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var data = localStorage.getItem("DSNV");
    list.list = JSON.parse(data);
    taobang(list.list);
  }
}

function xoaNhanVien(acc) {
  list._xoaNV(acc);
  taobang(list.list);
  setLocalStorage();
}

function taobang(arr) {
  getEle("tableDanhSach").innerHTML = "";

  for (var i = 0; i < arr.length; i++) {
    var tagTR = document.createElement("tr");

    var tagTD_taikhoan = document.createElement("td");
    var tagTD_fullname = document.createElement("td");
    var tagTD_email = document.createElement("td");
    var tagTD_ngaylam = document.createElement("td");
    var tagTD_role = document.createElement("td");
    var tagTD_income = document.createElement("td");
    var tagTD_xeploai = document.createElement("td");
    var tagTD_Button_Delete = document.createElement("td");
    var tagTD_Button_Edit = document.createElement("td");

    tagTD_taikhoan.innerHTML = arr[i].account;
    tagTD_fullname.innerHTML = arr[i].fullname;
    tagTD_email.innerHTML = arr[i].email;
    tagTD_ngaylam.innerHTML = arr[i].ngaylam;
    tagTD_role.innerHTML = arr[i].role;

    tagTD_income.innerHTML = arr[i].income;
    tagTD_xeploai.innerHTML = arr[i].type;
    tagTD_Button_Delete.innerHTML =
      '<button class="btn btn-danger" onclick="xoaNhanVien(\'' +
      arr[i].account +
      "')\">Xóa</button>";
    tagTD_Button_Edit.innerHTML =
      '<button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien(\'' +
      arr[i].account +
      "')\">Sửa</button>";

    tagTR.appendChild(tagTD_taikhoan);
    tagTR.appendChild(tagTD_fullname);
    tagTR.appendChild(tagTD_email);
    tagTR.appendChild(tagTD_ngaylam);
    tagTR.appendChild(tagTD_role);
    tagTR.appendChild(tagTD_income);
    tagTR.appendChild(tagTD_xeploai);
    tagTR.appendChild(tagTD_Button_Delete);
    tagTR.appendChild(tagTD_Button_Edit);

    getEle("tableDanhSach").appendChild(tagTR);
  }
}

function suaNhanVien(acc) {
  var nhanVien = list.layThongTinNhanVien(acc);

  getEle("tknv").value = nhanVien.account;

  getEle("name").value = nhanVien.fullname;

  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.password;
  getEle("datepicker").value = nhanVien.ngaylam;
  getEle("luongCB").value = nhanVien.salary;
  getEle("chucvu").value = nhanVien.role;
  getEle("gioLam").value = nhanVien.timeOfWorks;
  getEle("tknv").disabled = true;
}
getEle("btnDong").addEventListener("click", function () {
  clear();
  getEle("tknv").disabled = false;
});

getEle("btnCapNhat").addEventListener("click", function () {
  var check = true;

  var _taikhoan = getEle("tknv").value;
  var _fullname = getEle("name").value;
  var _email = getEle("email").value;
  var _password = getEle("password").value;
  var _ngaylam = getEle("datepicker").value;
  var _salary = +getEle("luongCB").value;
  var _role = getEle("chucvu").value;
  var _timeOfWorks = getEle("gioLam").value;

  check = checkInput(
    _taikhoan,
    _fullname,
    _email,
    _password,
    _ngaylam,
    _salary,
    _timeOfWorks,1
  );

  var nhanVien = new NhanVien(
    _taikhoan,
    _fullname,
    _email,
    _password,
    _ngaylam,
    _salary,
    _role,
    _timeOfWorks,1
  );

  if (check) {
    list.capnhatNV(nhanVien);

    taobang(list.list);
    setLocalStorage();
  }


  getEle("tknv").disabled = false;
});

getEle("btnTimNV").addEventListener("click", function () {
  var keyword = getEle("searchName").value;
  var arrFind = list.timKiem(keyword);
  taobang(arrFind);
});
