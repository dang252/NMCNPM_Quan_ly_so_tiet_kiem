

var nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;

function checkinput(){
    var type = $("input[name = 'type']:checked").val();
    if($('#fullname').val() == "" || nameRegex.test($('#fullname').val()) == false) {
        alert("Tên không hợp lệ!");
        return false;
    }
    if($("#address").val() == "") {
        alert("Bạn chưa nhập địa chỉ!");
        return false;
    }
    if($("#citizenID").val() == "") {
        alert("Bạn chưa nhập số CMND/CCCD!");
        return false;
    }
    if($("#bookname").val() == undefined) {
        alert("Bạn chưa nhập tên sổ!");
        return false;
    }
    if(!type){
        alert("Bạn chưa chọn loại sổ!");
        return false;
    }
    if($("#deposit").val() == "") {
        alert("Bạn chưa nhập số tiền gửi!")
    }
    return true;
}
var confirmMSG = "Xác nhận mở số tiết kiệm mới?";
var succeedMSG = "Mở sổ thành công!"
var redirectURL = "/dashboard"