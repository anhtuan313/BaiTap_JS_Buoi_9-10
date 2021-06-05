function listNV() {
  this.list = [];

  this.addNV = function (nv) {
    this, this.list.push(nv);
  };


  this._timViTri = function (account) {
   
    var index = -1;
    for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].account == account ) {
            index = i;
            break;
        }
    }
    return index;
};

  this._xoaNV = function (account) {
    var index = this._timViTri(account);
    //Xóa SV
    if (index !== -1) {
        this.list.splice(index, 1);
    }
};


this.timKiem = function(keyword){

  var arr = [];
  for (var i = 0; i < this.list.length; i++) {
    if (this.list[i].type.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
      arr.push(this.list[i]);
    }
  }
  return arr;

}


this.layThongTinNhanVien = function (account) {
  var index = this._timViTri(account);
  if (index != -1) {
    return this.list[index];
  }
};

this.capnhatNV = function (nhanVien) {
  var index = this._timViTri(nhanVien.account);
  if (index != -1) {
    this.list[index] = nhanVien;
  }
};

// this.timKiemSinhVien = function (keyworld) {};
}

