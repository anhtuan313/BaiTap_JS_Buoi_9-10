function NhanVien(
  account,
  fullname,
  email,
  password,
  ngaylam,
  salary,
  role,
  timeOfWorks
) {
  this.account = account;
  this.fullname = fullname;
  this.email = email;
  this.password = password;
  this.ngaylam = ngaylam;
  this.salary = salary;
  this.role = role;
  this.timeOfWorks = timeOfWorks;
  // this.income = 0;
  // this.type ="" ;

  this.xeploai = function () {
    if (parseFloat(timeOfWorks) >= 192) return "nhân viên xuất sắc";
    else if (parseFloat(timeOfWorks) >= 176) return "nhân viên giỏi";
    else if (parseFloat(timeOfWorks) >= 160) return "nhân viên khá";
    else if (parseFloat(timeOfWorks) < 160) return "nhân viên trung bình";
  };

  this.tinhIncome = function () {
    if (role == "Sếp") return salary * 3;
    else if (role == "Trưởng phòng") return salary * 2;
    else if (role == "Nhân viên") return salary;
  };

  this.income = this.tinhIncome();
  this.type = this.xeploai();
}
