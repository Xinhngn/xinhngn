# HANDOFF — 2026-10-15 (phiên moodboard redesign)

## Đang ở đâu
- Repo `Xinhngn/XinhNguyenSayHi` (upstream `Xinhngn/EmXinhSayHi`). Nhánh `claude/moodboard-redesign-hf110l`, **PR #7, chưa merge**. CI (build, e2e, Cloudflare) xanh ở commit 83cd9bb.
- Bản xem trước: https://claude-moodboard-redesign-hf110l-emxinhsayhi.ngnxinhh.workers.dev
- Thư mục trên máy Xinh: `/Users/macbookpro/Documents/Porfolio-EmXinhSayHi`. Đã chép đủ code và `.git` ở nhánh trên, nhưng chưa có `node_modules`. Còn file tạm `.repo.tgz` mà phiên trước không có quyền xoá; file này đã được ghi vào `.git/info/exclude`. Xinh muốn phiên sau làm việc trong thư mục này. Sau khi push lên GitHub, nhớ đồng bộ lại thư mục máy.
- Ảnh kiểm tra và báo cáo: `/mnt/project-files/reports/moodboard-redesign/`, số từ 01 đến 37. Các ảnh 31–37 là của vòng 7.

## Đã làm qua 7 vòng (chi tiết trong CLAUDE.md)
1. **v15d** (art direction "Futuristic Editorial × Digital Art Playground"):
   - Boot: bầu trời mây, vật thể bay quanh ảnh.
   - LV.2: 4 "máy" radar.
   - LV.4: accordion ngang.
2. **v15e:**
   - Bỏ mảng đen, cân màu theo moodboard (trời / kem / bạc / hoàng hôn).
   - Màn kết là 1 thẻ kính `.end-card` với 4 ô kênh liên hệ.
3. **v15f:**
   - Boot clean hơn, nút Story màu hồng.
   - LV.2 nền sáng lavender.
   - Các trang trong: chữ tiêu đề mực, thẻ kính bo 18px.
4. **v15g (vòng cuối, commit 83cd9bb):**
   - Điều hướng: Hành trình › Hồ sơ › Dự án › Liên hệ.
   - Bỏ trang Xem nhanh: `#desk` chuyển sang `#profile`. Nút Quick ở boot đổi thành "Xem nhanh hồ sơ".
   - Năng lực thành mục `#pfSkills` trong Hồ sơ; `#skills` cuộn tới mục này.
   - Liên hệ: thêm "Cách hợp tác" `.pk` (Solo / Team trọn gói), chữ lấy lại từ LV.5.
   - Bỏ hẳn chữ EMXINHSAYHI ở boot (cả code vật lý lẫn CSS `.bb`).
   - Trang Dự án viết lại theo moodboard 3 bước:
     1. Index chữ lớn kiểu OUS Worldwide (`.wx`), đổi giữa "Theo tính chất" (`TY`) và "Theo khách hàng" (`CLIENTS`).
     2. Bấm 1 dòng mở thẻ kính giới thiệu `#jobCard` (có ruy băng 3D).
     3. "Xem chi tiết" mở `#jobSheet` kiểu Stüssy "Tất cả về…": 4 cột chữ, ô kết quả, 6 ô ảnh.
   - Dữ liệu: `JOBS` trong `src/main.ts`, gồm 22 chiến dịch của 11 khách hàng, chỉ lấy từ brief. Ô còn thiếu hiện viền đứt "+ …" (`.fill`, `.jd-ph`).

## Đang chờ Xinh
- Duyệt layout mới của trang Dự án.
- Sau khi duyệt, Xinh gửi phần còn thiếu để điền vào `JOBS`:
  - năm;
  - mô tả;
  - vai trò;
  - phần của team;
  - kết quả;
  - ảnh thành phẩm;
  - tính chất của 5 dự án nhóm "Cần phân loại": Sound Notification for MAX, CSR Vì một thế hệ vươn tầm, 2 dự án Poca "Thế giới…", Ngày hội không tiền mặt (đang để là activation).
- Ảnh dự án thì bỏ vào `public/assets/`, khai báo trong `IMAGES`. Muốn 6 ô ảnh trong `openJobDetail` hiện ảnh thật thì phải thêm field ảnh cho từng job (hiện các ô này chỉ là chỗ trống).

## Quy tắc nội dung (bắt buộc)
- Không tự sửa nội dung, số liệu, chức danh, kết quả. Không viết thêm câu chuyện cho dự án phụ.
- Không dùng "4 pitch wins" hay "6/7 projects". Giữ nguyên "Em Xinh say hi", 5 năm, 20 thương hiệu.
- Phần team làm và phần Xinh làm phải tách riêng. Số liệu chỉ gắn với đúng dự án của nó:
  - Coffee Truck: ~2,000 / 268 / 140.
  - Sinh nhật Digimi: 500+ / 450 / 1.5M.
  - Poca: 266K+ / 45.7K+.
- VIB: chỉ ghi "nhiều dự án từ một lần pitch", không ghi con số.
- MEATDeli không thuộc Poca.
- Chữ trên trang có 2 thứ tiếng `.en` / `.vi`, sửa thì sửa cả hai.
- Không dùng xanh cho UI. Xanh trời chỉ làm nền. Màu nhấn là hồng; chữ hồng trên nền sáng dùng `--rose`.

## Cách Xinh muốn làm việc
- Trả lời bằng tiếng Việt, câu ngắn.
- **Xong việc luôn gửi link xem trước trong tin nhắn.**
- Xinh thích clean, có chuyển động. Không thích trang trong nặng nề, màu đen trắng. Luôn bám moodboard và AD tổng.

## Mẹo kỹ thuật
- Trước khi commit chạy `npm run lint && npm test && npm run build`. Unit test sẽ báo nếu `main.ts` gọi `$('#id')` mà `index.html` không có id đó.
- Có thể chụp ảnh trên bản build:
  1. Chạy `npx vite build`, rồi `setsid nohup npx vite preview --port 5175 --strictPort &`. Server preview hay tự tắt, tắt thì chạy lại.
  2. Đặt `PW_CHROMIUM=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
  3. Dùng `tools/lib.mjs`: `openPage(VIEWPORTS.desktop|phone)`.
- Proxy trong container chặn curl tới link preview (403), nên kiểm tra deploy bằng check run "Workers Builds" của PR (`mcp__github__pull_request_read get_check_runs`). CI push không bắn sự kiện về phiên, phải tự kiểm tra.
- e2e boot smoke chạy tại chỗ lỗi 404 do môi trường, trên CI vẫn qua.
- Trong `main.ts` đừng đặt tên hàm `fill`, vì đã có biến `fill` (thanh HUD) ở phạm vi chung. Helper ô trống đang tên `toFill`.
- Thread này đã chạm giới hạn 24 file đính kèm, nên gửi file dạng link `/mnt/project-files/...`.
