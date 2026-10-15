# BRIEF: LÀM LẠI GIAO DIỆN XINH.OS TỪ ĐẦU

Cập nhật: 2026-10-15. Viết cho phiên Claude mới, chạy trong thư mục này để nạp các skill ở `.claude/skills/`.

## Bối cảnh
- Xinh **không duyệt** giao diện bản hiện tại (Astro, nền kem + hồng mâm xôi, kính mờ nhẹ). Làm lại giao diện từ đầu.
- Được bỏ toàn bộ `src/components/`, `src/pages/`, `src/styles/`, `src/scripts/` để dựng lại.
- **Giữ:** nội dung trong `src/data/site.ts`, `src/data/work.ts`; ảnh trong `public/assets/`; khung kỹ thuật (Astro 5 static, Cloudflare Workers: `wrangler.jsonc`, `public/_headers`).

## Bắt buộc dùng các skill
- `taste-skill` (design-taste-frontend): chọn art direction từ thư viện, tự soi trang trên trình duyệt.
- `redesign-skill`, `minimalist-skill`, `soft-skill` (high-end-visual-design).
- `ui-ux-pro-max`: chạy `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<từ khoá>" --design-system` để ra hệ thiết kế.
- `design-on-the-flank`: chỉ phần GSAP / Three.js, bỏ phần Framer.
Đọc `SKILL.md` của từng skill và làm theo quy trình của chúng.

## Các bước
1. Đọc `CLAUDE.md`, `docs/HANDOFF-du-an.md`, `docs/KE-HOACH.md`, `docs/KE-HOACH-THIET-KE.md`, `docs/refs/PHAN-TICH-WEB-MAU.md` (web mẫu Xinh thích: neutomni.com, toyfight.co/work).
2. **Trước khi code:** đề xuất 2–3 hướng art direction khác hẳn bản hiện tại. Mỗi hướng: màu, chữ, bố cục, chuyển động, ảnh mock hoặc mô tả. Ghi rõ skill nào gợi ý gì. **Chờ Xinh chọn.**
3. Dựng theo hướng Xinh chọn. Chạy thử, chụp ảnh desktop 1440×900 và điện thoại 375 vào `tools/out/`.
4. Commit trên nhánh `main` local. Chưa push (máy chưa đăng nhập GitHub).

## Luật không đổi
- Tốc độ là ưu tiên số 1 (ngân sách: `docs/KE-HOACH-THIET-KE.md` mục 4).
- Có chuyển động và yếu tố tương tác. Tối giản.
- Glassmorphism nhẹ (Xinh đã chọn).
- Không màu xanh cho UI. Không mảng đen lớn.
- Nội dung đọc được khi không có JS. Tôn trọng `prefers-reduced-motion`.
- Không tự thêm số liệu, chức danh, kết quả, câu chuyện. Phần Xinh làm và phần team làm luôn tách riêng.
- Trả lời Xinh bằng tiếng Việt, câu ngắn.

## Lệnh trên máy này
- Node 22 ở `~/.local/node/bin` (thêm vào PATH: `export PATH=$HOME/.local/node/bin:$PATH`).
- Cài thư viện: `npm install --ignore-scripts` (script cài esbuild lỗi -88 trên máy này, nhưng esbuild vẫn chạy).
- Build: `npm run build`. Kiểm tra: `npx astro check`. Xem: `npm run preview` → http://localhost:4321.
