
# ĐỒ ÁN NHẬP MÔN CÔNG NGHỆ PHẦN MỀM - ĐỀ TÀI: QUẢN LÝ SỔ TIẾT KIỆM

### LỜI GIỚI THIỆU
Bên dưới đây là những thông tin về đồ án của môn nhập môn công nghệ phần mềm với đề tài là: quản lý sổ tiết kiệm, đồ án được thực hiện bởi các thành viên của nhóm 8 dưới sự hướng dẫn của thầy Bùi Tấn Lộc.

### THÔNG TIN CƠ BẢN
Đồ án đã sử dụng các công cụ/ngôn ngữ sau trong suốt quá trình thực hiện:
* Front-end: HTML, CSS và Javascript.
* Back-end: Javascript trên môi trường nodeJS.
* Cơ sở dữ liệu: PostgreSQL.

### CÁCH CHẠY PROJECT TRÊN LOCAL PC
Sau khi tải project từ github về máy tính cá nhân, ta cần thực hiện 1 số thao tác sau để có thể khởi chạy project:
* Đảm bảo máy đã cài đặt nodeJS và postgreSQL.
* Bước 1: Trong Command prompt, sử dụng lệnh cd để tới folder của project.
* Bước 2: Trong Command prompt, sử dụng lệnh "npm i" để cài đặt các module cần thiết cho chương trình.
* Bước 3: Tạo database mới trong PostgreSQL, sau đó dùng các lệnh từ file "nmcnpm_postgre.sql" để tạo các table.
* Bước 4: Trong folder config, chỉnh sửa các thông tin của file "cnStr.js" đúng với thông tin của database đã được tạo(tên database, password,...).
* Bước 5: Sau khi đã hoàn thành các bước trên, trong Command prompt, sử dụng lệnh "npm start" để server được khởi chạy, port đang sử dụng sẽ được thông báo, truy cập vào để xem kết quả.

### VIDEO DEMO ĐỒ ÁN
[Link video demo](https://youtu.be/AUGFdoGetgI)

### MỘT SỐ CHỨC NĂNG CƠ BẢN CỦA ĐỒ ÁN
* Đăng ký, đăng nhập tài khoản.
* Tạo sổ tiết kiệm với 3 loại sổ là: không kỳ hạn, kỳ hạn 3 tháng và kỳ hạn 6 tháng.
* Gửi thêm tiền/Rút tiền tự do đối với sổ tiết kiệm không có kỳ hạn.
* Rút tiền tự do với sổ tiết kiệm không kỳ hạn.
* Khi sổ có kỳ hạn đã đến ngày đáo hạn, người dùng có thể chọn rút hết tiền hoặc gửi lại một lần nữa, nếu rút tiền thì sẽ có thêm tiền lời.
* Cập nhật, tùy chỉnh profile cá nhân của người dùng.
* Thông báo biến động số dư, hiển thị rõ số tiền đã gửi/số tiền đã rút trong tháng.
 