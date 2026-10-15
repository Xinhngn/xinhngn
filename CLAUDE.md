# XINH.OS — portfolio của Xinh Nguyễn

Làm lại từ đầu (10/2026). Không dùng lại giao diện cũ (repo `Xinhngn/EmXinhSayHi`), chỉ dùng nội dung và luật.

## Đọc trước
- `docs/HANDOFF-du-an.md` — nội dung, luật, các mục [CHỜ XINH].
- `docs/KE-HOACH.md` — kế hoạch nội dung.
- `docs/KE-HOACH-THIET-KE.md` — hướng thiết kế, ngân sách tốc độ, quy trình deploy.
- `docs/refs/PHAN-TICH-WEB-MAU.md` — phân tích neutomni.com, toyfight.co.

## Luật vàng
- Không tự thêm số liệu, chức danh, kết quả, câu chuyện. Chỉ dùng số trong `docs/HANDOFF-du-an.md` mục 1.13.
- Phần Xinh làm và phần team làm luôn tách riêng.
- Không màu xanh cho UI. Không mảng đen lớn. Tối giản.
- Tốc độ là ưu tiên số 1: xem ngân sách ở `docs/KE-HOACH-THIET-KE.md` mục 4.
- Nội dung phải đọc được khi không có JS. Chuyển động chỉ làm đẹp, tôn trọng `prefers-reduced-motion`.
- Trả lời Xinh bằng tiếng Việt, câu ngắn. Xong việc gửi link xem trước.

## Kỹ thuật
- Astro 5 (static) + TypeScript. Không framework UI. Chuyển động theo repo design-on-the-flank: GSAP + ScrollTrigger (tải lúc rảnh), nền WebGL2 tự viết. Hướng thiết kế: `docs/HUONG-THIET-KE.md`.
- Nội dung: `src/data/site.ts`, `src/data/work.ts`. Sửa chữ ở đây, không sửa trong component.
- Hệ thiết kế: `src/styles/global.css` (biến màu, chữ, nút, kính). Font Bricolage Grotesque khai báo trong `src/layouts/Base.astro`.
- JS: `src/scripts/core.ts` (chung, chạy ngay), `field.ts` (WebGL mở đầu) và `motion.ts` (GSAP) tải lúc rảnh.
- Deploy: Cloudflare Workers static assets (`wrangler.jsonc`, `public/_headers`). Build `npm run build` → `dist/`.

## Lệnh
| Việc | Lệnh |
|---|---|
| Cài | `npm install` |
| Chạy thử | `npm run dev` → http://localhost:4321 |
| Kiểm tra kiểu | `npm run check` |
| Build + xem | `npm run build && npm run preview` |
| Chụp ảnh | `PW_CHROMIUM="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node tools/shots.mjs <url> [/,/du-an/]` |

## Quy trình
Nhánh mới cho mỗi bước → PR → Cloudflare cho link xem trước → Xinh duyệt → merge `main`. Không merge khi Xinh chưa bảo.
