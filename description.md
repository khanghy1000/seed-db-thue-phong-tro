# Xây dựng database cho thuê phòng của các nhà trọ

## Khảo sát thực tế

- Có nhiều người tìm phòng, mỗi người tìm phòng sẽ có mã riêng, họ đệm, tên, số căn cước, giới tính, ngày sinh, email, số điện thoại.

- Có nhiều chủ trọ cho thuê phòng, mỗi chủ trọ sẽ có mã riêng, họ đệm, tên, số căn cước, giới tính, ngày sinh, email, số điện thoại.

- Chủ trọ có thể đăng cho thuê nhiều phòng, mỗi phòng chỉ thuộc 1 chủ trọ. Mỗi phòng trọ sẽ có mã phòng riêng, tên phòng, số nhà, số lượng người tối đa, diện tích phòng, giá thuê.

- Có nhiều phường xã, mỗi phường xã có thể có nhiều phòng trọ, mỗi phòng trọ chỉ thuộc 1 phường xã.

- Có nhiều quận huyện, mỗi quận huyện có thể chứa nhiều phường xã, mỗi phường xã chỉ thuộc 1 quận huyện.

- Có nhiều tỉnh, mỗi tỉnh có thể chứa nhiều quận huyện, mỗi quận huyện chỉ thuộc 1 tỉnh.

- Có nhiều loại dịch vụ, mỗi loại dịch vụ sẽ có mã và tên riêng. Nhiều phòng trọ có thể có cùng 1 loại dịch vụ và 1 phòng trọ có thể có nhiều loại dịch vụ. Mỗi phòng phải chỉ rõ giá của từng loại dịch vụ (cùng 1 dịch vụ có thể có nhiều giá khác nhau tuỳ phòng).

- Có nhiều loại thiết bị, mỗi thiết bị sẽ có mã và tên riêng. Nhiều phòng trọ có thể có cùng 1 loại thiết bị và 1 phòng trọ có thể có nhiều loại thiết bị. Mỗi phòng phải chỉ rõ số lượng của mỗi loại thiết bị mà phòng trọ có.

- Người tìm phòng có thể đặt lịch hẹn xem phòng. Người chủ phòng có thể từ chối yêu cầu hẹn xem phòng. Người tìm phòng có thể đặt nhiều yêu cầu hẹn xem, 1 phòng trọ có thể có nhiều yêu cầu đặt lịch hẹn xem. Mỗi yêu cầu sẽ có 1 mã riêng, ngày giờ yêu cầu, ngày giờ hẹn xem, trạng thái chấp nhận của chủ phòng (Chờ duyệt, Đồng ý, Từ chối).

- Người tìm phòng có thể thuê phòng. Người chủ phòng có thể từ chối thuê. Người tìm phòng có thể yêu cầu thuê nhiều phòng, 1 phòng có thể có nhiều yêu cầu thuê từ nhiều người. Mỗi lần yêu cầu phải ghi nhận thông tin ngày giờ yêu cầu và trạng thái chấp nhận của chủ phòng (Chờ duyệt, Đồng ý, Từ chối). 1 phòng chỉ được có 1 yêu cầu cho thuê có trạng thái "Đồng ý".

## Xác định thực thể

- nguoi_tim_phong (<ins>ma_nguoi_tim_phong</ins>, ho_dem, ten, so_can_cuoc, gioi_tinh, ngay_sinh, email, so_dien_thoai)
- chu_phong (<ins>ma_chu_phong</ins>, ho_dem, ten, so_can_cuoc, gioi_tinh, ngay_sinh, email, so_dien_thoai)
- tinh (<ins>ma_tinh</ins>, ten_tinh)
- quan_huyen (<ins>ma_quan_huyen</ins>, ten_quan_huyen)
- phuong_xa (<ins>ma_phuong_xa</ins>, ten_phuong_xa)
- phong (<ins>ma_phong</ins>, ten_phong, so_nha, so_luong_nguoi, dien_tich_phong, gia_thue)
- dich_vu (<ins>ma_dich_vu</ins>, ten_dich_vu)
- thiet_bi (<ins>ma_thiet_bi</ins>, ten_thiet_bi)
- yeu_cau_xem_phong (<ins>ma_yeu_cau_xem</ins>, ngay_gio_yeu_cau, ngay_gio_hen, trang_thai)

## Các đối tượng sử dụng database

Gồm:
- Người tìm phòng
- Chủ phòng trọ

### Các chức năng của từng đối tượng

- Người tìm phòng:
  - Tìm phòng trọ
  - Đọc thông tin phòng trọ
  - Đọc thông tin chủ phòng trọ
  - Yêu cầu đặt lịch hẹn xem phòng
  - Yêu cầu thuê

- Chủ phòng trọ:
  - Đăng phòng trọ
  - Đọc thông tin phòng trọ
  - Chỉnh sửa thông tin phòng trọ đã đăng
  - Xoá phòng trọ đã đăng
  - Đọc thông tin của người tìm trọ yêu cầu hẹn xem phòng / yêu cầu thuê
  - Chấp nhận, từ chối yêu cầu đặt lịch hẹn xem phòng
  - Chấp nhận, từ chối yêu cầu thuê phòng