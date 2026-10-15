# HƯỚNG THIẾT KẾ ĐANG DÙNG (bản v2, 15/10/2026)

Xinh bỏ 3 phương án A/B/C trước đó và yêu cầu đập đi xây lại theo repo design-on-the-flank, chuẩn Awwwards, không dùng web mẫu.

## Ý tưởng
"Gỡ rối". Mở đầu là một trường đường đồng mức gợn sóng (đề bài rối), vẽ bằng WebGL tự viết. Gần con trỏ, hoặc khi cuộn xuống, các đường tự duỗi thẳng. Cả trang lặp lại ý này: thẻ đề bài lệch rồi xếp thẳng, đường gợn ở Cách làm thẳng dần, thanh thời gian 4 chức danh dài ra đúng ngày.

## Hệ thiết kế
- Một họ chữ: Bricolage Grotesque (biến thiên, 2 file: latin + tiếng Việt, ~50 KB).
- Màu: nền hồng trắng `#fbf6f4`, mực mận `#2a1119`, nhấn hồng mâm xôi `#c91f55`. Trường màu phụ: hồng phấn `#f8d9df`, đào `#fce3d5`. Không xanh, không mảng đen.
- Kính mờ chỉ cho: thanh menu, thẻ ảnh Xinh ở mở đầu, thẻ nổi theo chuột ở Dự án chọn lọc, menu điện thoại.
- Không chữ mono, không số thứ tự 01–04, không đường kẻ mảnh (theo taste-skill).

## Chuyển động (theo design-on-the-flank: GSAP + WebGL)
| Phần | Chuyển động |
|---|---|
| Mở đầu | Chữ trượt lên theo dòng (CSS, < 1 giây). Nền WebGL gỡ rối theo chuột/cuộn. Bấm ảnh để đổi ảnh. |
| Lời hứa | Từng chữ sáng dần theo cuộn. |
| Đề bài | 5 thẻ lệch, xoay; cuộn tới thì xếp thẳng, chấm tròn tô đầy. |
| Cách làm | Màn rộng: ghim và trượt ngang qua 4 bước, đường gợn duỗi thẳng. Điện thoại: dọc. |
| Hồ sơ | Thanh thời gian theo ngày thật dài ra. |
| Năng lực | Đếm 5 và 20. Hai dải 20 brand chạy ngược nhau. |
| Dự án chọn lọc | Thẻ kính đi theo chuột, đổi theo dòng. |
| Hợp tác | Hai phiếu nghiêng rồi đứng thẳng. |
| Kết | "say hi!" mọc lên từng chữ. Vai trò mục tiêu đổi lần lượt. |

Nút hút nhẹ theo chuột. Tắt hết khi máy bật giảm chuyển động. Nội dung đọc được khi không có JS.

## Tốc độ (đo 15/10 trên máy, CPU chậm 4 lần, khung điện thoại)
- JS: ~52 KB nén (core 2 KB chạy ngay; WebGL 2 KB và GSAP 47 KB tải lúc rảnh).
- Font 50 KB, ảnh màn đầu 85 KB. LCP ~0,6 giây, CLS 0.
