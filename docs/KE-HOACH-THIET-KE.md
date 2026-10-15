# KẾ HOẠCH THIẾT KẾ VÀ TRIỂN KHAI — XINH.OS MỚI

Cập nhật: 2026-10-15. Repo: `Xinhngn/xinhngn`. Deploy: Cloudflare.
Dựa trên: `docs/KE-HOACH.md` (nội dung, luật) và `docs/refs/PHAN-TICH-WEB-MAU.md` (2 web mẫu).
Đây là đề xuất. Chỗ ghi **[XINH CHỌN]** cần Xinh quyết.

---

## 1. Hướng thiết kế

**Một câu:** Trang editorial sạch, sáng. Bên dưới là một hệ điều hành nhỏ tên XINH.OS. Cuộn tới đâu, thông tin tự "gỡ rối" tới đó.

- **Editorial** (học neutomni): chữ lớn, một màu nhấn, chữ đứng xen chữ nghiêng.
- **OS** (học neutomni và toyfight): nhãn chữ mono, cửa sổ, icon, phím tắt. Giữ ý tưởng XINH.OS nhưng nhẹ tay. Nhân vật chính vẫn là nội dung.
- **Gỡ rối:** mỗi phần đi từ lộn xộn sang ngăn nắp khi cuộn. Đây là cách kể "Xinh làm chủ dự án" bằng chuyển động, không cần thêm chữ.
- **Nhịp:** mỗi phần một kiểu bố cục, chung màu, chữ và lưới.

## 2. Hệ thiết kế

### Màu
| Vai trò | Đề xuất |
|---|---|
| Nền chính | Kem giấy, sáng |
| Chữ | Mực nâu đen, không đen tuyền |
| Màu nhấn duy nhất | Hồng đậm, đủ đậm để đọc trên nền kem |
| Phụ | Hồng phấn nhạt làm nền vài phần |

- Không xanh cho nút, chữ, viền, icon.
- Không mảng đen lớn. Khung media dùng nền mực nhạt hoặc kem đậm.
- **[XINH CHỌN]** mã màu hồng nhấn. Mình sẽ gửi 3 phương án để chọn.

### Chữ (phải đọc tốt tiếng Việt có dấu)
- Chữ chính: **Be Vietnam Pro** (thiết kế cho tiếng Việt).
- Chữ nhấn nghiêng: **Newsreader Italic**.
- Lớp OS (nhãn, số, giờ): **JetBrains Mono**.
- Kiểm tra dấu tiếng Việt ở cỡ lớn trước khi chốt.

### Thành phần dùng chung
Nhãn dạng viên thuốc, số thứ tự 01–05, cửa sổ OS (thanh tiêu đề + 3 chấm), thẻ dự án, nút hồng.

## 3. Cấu trúc và chuyển động từng phần

### Trang chính (cuộn dọc)
| # | Phần | Nội dung (theo bàn giao) | Bố cục và chuyển động |
|---|---|---|---|
| 0 | Mở đầu | "Em Xinh say hi" · "Xinh thích làm chủ." · ảnh Xinh | Chữ rất lớn hết chiều ngang. Góc dưới: giờ TP.HCM chạy theo giây, trạng thái "Đang nhận dự án". Chữ hiện từng dòng trong dưới 1 giây. Không có màn chờ dài. |
| 1 | Lời hứa | "Bạn lo việc kinh doanh. Xinh lo dự án về đích." | Chữ lớn nửa đứng nửa nghiêng, từng dòng trượt lên khi cuộn tới. |
| 2 | Đề bài | "Có mục tiêu. Có ngân sách. Nhưng bắt đầu từ đâu?" + các vấn đề | Thẻ vấn đề rơi lệch, xoay lộn xộn. Cuộn tới thì tự xếp thẳng hàng, đọc được hết. |
| 3 | Hành trình | 4 chức danh thật, đúng ngày | Dòng thời gian ngang. Một vạch tiến dần qua 4 mốc khi cuộn. Điện thoại: dọc. |
| 4 | Cách làm | 4 bước: Làm rõ · Cấu trúc · Quản lý triển khai · Theo đến kết quả | Học neutomni: 4 cột cao thấp lệch thành đều, đường gợn sóng thành thẳng. Rê chuột: hình nét đi theo và đổi dạng qua từng bước. Chữ mỗi bước luôn hiện sẵn. |
| 5 | Bằng chứng | 5 năm · 20 thương hiệu · 9 nhãn năng lực | 2 số lớn. Dải 20 tên brand chạy chậm. Năng lực xếp 2 nhóm (WHAT I RUN / HOW FAR I TAKE IT). Bấm nhãn thì sáng các dự án liên quan. |
| 6 | Dự án chọn lọc | 5 case: MSB, VIB, Cake, Poca Yummy, Digimi × BVBank | Học neutomni: danh sách đánh số được ghim, ảnh hoặc tên khách hàng cực lớn trượt bên cạnh theo từng dòng. Nút "Xem tất cả dự án". |
| 7 | Cách hợp tác | Solo / Squad | 2 thẻ kiểu phiếu, có đường xé. Không ghi giá. |
| 8 | Desktop XINH.OS | Liên hệ, CV, Hồ sơ | Học neutomni: cuộn tới thì trang thành màn hình desktop. Icon: CV.pdf, Hồ sơ, Email, Zalo, LinkedIn, Cách hợp tác. Bấm mở cửa sổ, kéo thả được. Điện thoại: cửa sổ mở thành tấm trượt từ dưới lên. |
| 9 | Kết | "say hi!" + nút liên hệ | Desktop thu nhỏ vào khung máy tính. Footer: chữ đổi lần lượt các vai trò mục tiêu (học toyfight), chỉ dùng chữ đã duyệt. |

### Trang Dự án `/du-an`
- Học toyfight: lưới thẻ, mỗi thẻ có ảnh hoặc video, tên là nhãn nhỏ.
- Bộ lọc bên trái có số đếm: Theo tính chất / Theo khách hàng.
- Lọc thì thẻ cũ rút đi, thẻ mới trượt vào.
- Dự án phụ chỉ có tên, khách hàng, tính chất. Không viết thêm chuyện.

### Trang case `/du-an/<ten-case>`
- Đầu trang: tên case, tagline, nhãn vai trò.
- 5 khối: Bối cảnh / Vai trò / Đóng góp của Xinh / Phần của team / Kết quả. Phần Xinh và phần team luôn tách riêng.
- Số liệu chỉ ở khối Kết quả, đúng dự án của nó.
- Ảnh thành phẩm lớn bên dưới. Chưa có ảnh thì hiện khung chờ.
- Cuối trang: nút sang case kế tiếp.

### Chuyển trang
Khối hồng phủ màn hình theo hình bậc thang (học toyfight), dưới 0,6 giây. Không có màn chờ.

### Song ngữ
Nút VI / EN. Mỗi trang có 2 bản. Mặc định tiếng Việt.

## 4. Ưu tiên: tốc độ trước, rồi chuyển động và tương tác

Xinh chốt (15/10): tốc độ tải trang quan trọng nhất. Web vẫn có chuyển động và yếu tố tương tác. Phong cách tối giản.

### Ngân sách tốc độ (đo mỗi PR, vượt là sửa trước khi gửi)
| Chỉ số | Mục tiêu |
|---|---|
| Lighthouse Performance (điện thoại) | ≥ 95 |
| Hiện nội dung lớn nhất (LCP) | < 1,5 giây trên 4G |
| Trang nhảy bố cục (CLS) | < 0,05 |
| JavaScript tải lúc mở trang chính | < 60 KB (đã nén) |
| Font | ≤ 3 file, chỉ bộ ký tự Latin + tiếng Việt, tải trước font tiêu đề |
| Ảnh màn đầu | 1 ảnh, < 100 KB |

### Cách giữ nhanh
- Astro xuất HTML tĩnh. Chữ hiện ngay, không chờ JavaScript.
- Hiệu ứng nào chỉ tải khi phần đó sắp vào màn hình. Ví dụ: code desktop XINH.OS chỉ tải khi cuộn gần tới.
- Ưu tiên CSS (scroll-driven animation, transition) trước GSAP. Chỉ dùng GSAP cho phần cần: cột Cách làm, hình biến dạng, kéo thả.
- Không video nặng ở trang chính. Video dự án chỉ tải khi bấm hoặc khi thẻ vào màn hình.
- Không màn chờ.

### Yếu tố tương tác (tối giản, mỗi cái có lý do)
| Ở đâu | Tương tác |
|---|---|
| Mở đầu | Giờ TP.HCM chạy, ảnh Xinh đổi khi bấm |
| Đề bài | Cuộn để thẻ vấn đề tự xếp thẳng |
| Cách làm | Rê chuột / kéo hình nét qua 4 bước |
| Bằng chứng | Bấm nhãn năng lực, sáng dự án liên quan |
| Dự án chọn lọc | Rê dòng để đổi ảnh |
| Trang Dự án | Bộ lọc có số đếm |
| Desktop XINH.OS | Mở, kéo thả, đóng cửa sổ |
| Toàn trang | Phím tắt (/ để xem danh sách phím) |

## 4b. Luật chuyển động
- Nội dung luôn đọc được khi chưa có chuyển động. Chuyển động chỉ làm đẹp.
- Không bắt bấm hay rê chuột mới thấy thông tin.
- Người bật "giảm chuyển động" trên máy thì tắt hết hiệu ứng.
- Điện thoại: giữ chuyển động nhẹ, bỏ phần theo chuột.
- Tốc độ theo ngân sách ở mục 4.

## 5. Kỹ thuật

| Phần | Chọn | Vì sao |
|---|---|---|
| Khung web | **Astro** | Mỗi case ra một trang riêng, tải nhanh, Google đọc tốt. Nội dung để trong file dữ liệu, sửa chữ không đụng giao diện. Không cần backend. |
| Kiểu dữ liệu | TypeScript | Nhập thiếu hoặc sai trường nội dung thì báo lỗi ngay. |
| Chuyển động | GSAP (ScrollTrigger, SplitText, MorphSVG) + Lenis | Giống neutomni. GSAP nay miễn phí cả plugin. |
| CSS | CSS thuần với biến màu | Gọn, dễ đổi màu. |
| Ảnh | WebP, Astro tự nén | Tải nhanh. |
| Kiểm tra | Lint + build + Playwright chụp màn hình desktop và điện thoại | Mỗi lần sửa đều có ảnh trước/sau. |

### Cấu trúc thư mục
```
src/
  content/        nội dung: cases, du-an, brands, nang-luc, lien-he (vi + en)
  components/     từng phần trang chính
  layouts/
  pages/          index, du-an/index, du-an/[slug], en/...
  styles/         màu, chữ, lưới
  motion/         từng hiệu ứng, tắt được riêng
public/assets/    ảnh, CV
docs/             kế hoạch, bàn giao, phân tích mẫu
```

## 6. GitHub và Cloudflare

### Quy trình
1. Code nằm trên GitHub `Xinhngn/xinhngn`. Nhánh `main` là bản chính thức.
2. Mỗi lần làm: tạo nhánh mới, mở PR. Không đẩy thẳng lên `main`.
3. Cloudflare tự build mỗi nhánh, cho link xem trước. Mình gửi link đó cho Xinh.
4. Xinh duyệt thì merge vào `main`. Cloudflare tự đưa lên trang chính.
5. GitHub Actions chạy lint + build cho mỗi PR.

### Điều kiện để deploy được
| Điều kiện | Ai làm | Trạng thái |
|---|---|---|
| Cài Node 22 trên máy | Xinh | Chưa có |
| Đăng nhập GitHub trên máy để push | Xinh | Chưa có (máy chưa có `gh`, chưa có tên/email git) |
| Repo `Xinhngn/xinhngn` | Có rồi | Đang trống |
| Tài khoản Cloudflare, nối repo vào Workers & Pages | Xinh | Chưa làm. Mình gửi hướng dẫn từng bước khi có code |
| Cấu hình build: lệnh `npm run build`, thư mục `dist`, Node 22 | Mình | Có trong `wrangler.jsonc` |
| Tên miền riêng (nếu có) | Xinh | **[XINH CHỌN]** |
| Header bảo mật, cache | Mình | Có trong `public/_headers` |

## 7. Các bước làm

| Bước | Việc | Xinh duyệt gì |
|---|---|---|
| 1 | Moodboard hệ thiết kế: 3 phương án hồng, bộ chữ, nhãn, cửa sổ OS | Chọn màu và chữ |
| 2 | Dựng khung dự án, nối GitHub và Cloudflare, có link xem trước đầu tiên | Mở được link |
| 3 | Trang chính phần 0–3 | Link xem trước |
| 4 | Trang chính phần 4–9 | Link xem trước |
| 5 | Trang Dự án + trang case | Link xem trước |
| 6 | Bản tiếng Anh, điện thoại, tốc độ, kiểm tra cuối | Duyệt để merge |
| 7 | Lên trang chính (merge `main`), gắn tên miền | |

Mỗi bước: gửi link xem trước và ảnh trước/sau.

## 8. Cần Xinh bây giờ
1. Cài Node 22: tải bản LTS ở nodejs.org.
2. Đăng nhập GitHub trên máy. Mình sẽ hướng dẫn khi Node xong.
3. Duyệt hướng thiết kế ở mục 1 và cấu trúc ở mục 3.
4. Có tên miền riêng chưa?

Nội dung còn chờ (năm, mô tả, ảnh dự án…) vẫn như `docs/KE-HOACH.md` mục 7. Thiếu thì web hiện khung chờ, không chặn việc dựng.
