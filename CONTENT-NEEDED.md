# Nội dung cần bổ sung — XINH website

Người xem **không** thấy các chỗ còn trống: trang tự ẩn hoặc thay bằng bìa thiết kế sẵn.
Để xem vị trí từng ô, mở link với `#edit` (thoát bằng `#edit-off`). Trang **Report** (chỉ chủ trang thấy) luôn có danh sách "Nội dung còn thiếu" cập nhật tự động.

Gửi cho Claude theo từng mục bên dưới, Claude sẽ điền vào phần `CONFIG` ở đầu file `src/main.ts`.

---

## 1. Hero + Profile

| Cần gì | Tên ô | Gợi ý |
|---|---|---|
| Ảnh chân dung chính | `portrait.png` | Dọc 4:5, nền sạch, nhìn thẳng hoặc 3/4. Hợp vibe: ánh sáng flash, outfit có điểm nhấn màu hồng / xanh cobalt |
| Ảnh chân dung thứ 2 (tuỳ chọn) | `portrait_2.png` | Cho tab Profile. Nếu không có, trang dùng lại ảnh chính |

## 2. Dải "30 giây cho nhà tuyển dụng"

| Cần gì | Ghi chú |
|---|---|
| ~~Link CV (PDF)~~ | Đã có: `public/assets/XinhNguyen-CV.pdf` |
| ~~LinkedIn~~ | Đã có: xinh-nguyen-exploremore |
| Xác nhận vị trí mong muốn | Hiện ghi: Marketing Project Manager · Marketing Communications · Campaign Management, ưu tiên ngân hàng & fintech, TP.HCM hoặc remote |
| Thời gian có thể bắt đầu (tuỳ chọn) | Ví dụ: "ngay" / "từ 11/2026" |

## 3. Liên hệ (Connect Now)

| Kênh | Cần gì |
|---|---|
| Gọi | Đã có: 0975 108 131 (từ CV) |
| Zalo | Đang dùng cùng số điện thoại. Báo nếu Zalo khác số |
| Facebook / Messenger | Username (phần sau `facebook.com/`) |
| LinkedIn | Đã có |
| Gmail | Đã có: ngnxinhh@gmail.com |

## 4. Case study (tab Work + Story LV.4)

Mỗi case cần 4 nhóm thông tin. **Ưu tiên số liệu gắn với phần bạn làm**, không chỉ số chung của chiến dịch.

- **Vai trò:** chức danh của bạn trong dự án.
- **Thời gian:** tháng/năm bắt đầu – kết thúc.
- **Quy mô:** 2–4 dữ kiện ngắn. Ví dụ: số người trong team, số bên điều phối, ngân sách (khoảng), số deliverable, số KOL.
- **Ảnh:** 1 ảnh bìa ngang 16:9 + 3 ảnh phụ (4:3). Dùng key visual, ảnh sự kiện, ảnh chụp màn hình bài đăng, ảnh hậu trường. **Chỉ dùng ảnh được phép chia sẻ.**

| Case | Đã có | Còn thiếu |
|---|---|---|
| **VIB** · Ivy Card → Anh Trai Say Hi → activation | Đề bài, phần tôi, phần team, bài học, 4 dự án | Vai trò, thời gian, quy mô, 1 số liệu kết quả. Ảnh: `vib_ivy_kv.jpg`, `anh_trai_say_hi.jpg`, `bo_tu_bao_thu.jpg`, `cashless_day.jpg` |
| **MSB** · Social always-on | Đề bài, phần tôi, phần team, 2025–2027 | Vai trò, quy mô (ví dụ: số bài/tháng, số kênh), 1 chỉ số kênh. Ảnh: `msb_feed.jpg`, `msb_post_01.jpg`, `msb_post_02.jpg`, `msb_report.jpg` |
| **Cake by VPBank** · new business | Đề bài, phần tôi, phần team, kết quả (giành retainer) | Vai trò, thời gian, quy mô, thời hạn retainer. Ảnh: `cake_ai_land.jpg`, `cake_gato.jpg`, `cake_wechoice.jpg`, `cake_comments.jpg` |
| **Poca Yummy** · Quẩy-verse | Đề bài, phần tôi, 266K+ / 45.7K+, 2023 | Vai trò, quy mô (số creator, số định dạng). Ảnh: `poca_quay_verse_mv.jpg`, `poca_capcut.jpg`, `poca_tiktok.jpg`, `poca_comic.jpg` |
| **Digimi × BVBank** · coffee truck + always-on | Activation, always-on, ~2,000 / 268 / 140 | Vai trò, thời gian, quy mô (số ngày chạy, địa điểm). Ảnh: `digimi_coffee_truck.jpg`, `digimi_booth.jpg`, `bvbank_post.jpg`, `digimi_signup.jpg` |
| **Nhựa Duy Tân** · Tết 2025 | Phạm vi việc | Đề bài, vai trò, quy mô, 1 kết quả. Ảnh: `duytan_tet_2025.jpg` + 3 ảnh phụ |
| **Cindy Bloom** · launch | Phạm vi việc | Đề bài, vai trò, thời gian, quy mô, 1 kết quả. Ảnh: `cindy_bloom_kv.jpg` + 3 ảnh phụ |

## 5. Skills (bảng chấm 10 cột)

Tab Năng lực và mục LV.3 dùng chung 10 đầu việc (5 loại dự án + 5 phần việc khi làm chủ). Không còn đánh dấu mạnh/yếu, chỉ liệt kê dự án đã làm. **Hãy rà xem mỗi đầu việc gắn đúng dự án chưa** (`MX` trong `src/main.ts`, số khác 0 = có làm).

Đã bỏ khỏi trang (không dùng lại): "4 pitch thắng", "6/7 dự án", "12 thương hiệu". Cần xác nhận: số dự án VIB từ một lần pitch (nguồn ghi 4 nhưng danh sách có 5 mục), và "3 → 5 năm MSB".

### (cũ) Thành tích từng kỹ năng

Ba kỹ năng chưa có "WIN": **Always-on**, **KOL / KOC**, **Measurement**. Mỗi mục cần 1 thành tích ngắn. Ví dụ:
- Always-on: "Giữ nhịp 30 bài/tháng cho MSB trong 2 năm".
- KOL / KOC: "Điều phối 12 TikToker cho Poca".
- Measurement: "Báo cáo tháng giúp tăng X% tương tác".

> Các ví dụ trên chỉ minh hoạ định dạng, không phải số thật. Hãy gửi số đúng của bạn.

## 6. Report (đếm lượt xem công khai)

Muốn đếm mọi người xem từ link công khai:
1. Đưa web lên GitHub Pages: repo `Xinhngn/xinhngn` → Settings → Pages → chọn nhánh, thư mục gốc. File chạy là `index.html`.
2. Đăng ký GoatCounter (miễn phí), gửi Claude mã site (dạng `https://ten-ban.goatcounter.com/count`).
