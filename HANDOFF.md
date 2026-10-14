# HANDOFF — 2026-10-14

## Trạng thái repo
- Nhánh chính `claude/xinhos-website` (PR #1 đã merge). Trang đã chuyển từ 1 file (`src/page.html`) sang Vite + TS: `index.html` + `src/styles.css` + `src/main.ts`, ảnh / CV ở `public/assets/`.
- Bộ công cụ theo `CAI-DAT-SKILL-VA-CONG-CU.md` đã cài ở dạng file: 3 skill trong `.claude/skills/`, CodeGraph (`codegraph.json`, `.mcp.json`), hook khởi động cloud, `.claude/launch.json`, Vitest + Playwright, `tools/`, Cloudflare (`wrangler.jsonc`, `public/_headers`), GitHub Actions, `CLAUDE.md`.

## Đã kiểm chứng
- GitHub Actions trên PR #1 (môi trường có mạng): `npm install`, `npm test`, `npm run build` (tsc + vite build) và `npm run e2e` (máy tính 1366x860 + Pixel 7, không lỗi JS, không tràn ngang, ảnh/CV tải được) đều đạt.
- `package-lock.json` do workflow `deps.yml` tạo và commit. CodeGraph: `npm i -g`, `codegraph telemetry off`, `codegraph init`, `codegraph status` đều chạy được trên GitHub.
- Trước đó: đóng gói bằng esbuild rồi chụp so với trang cũ, máy tính trùng từng pixel, điện thoại chỉ khác do hiệu ứng đang chạy. 5 script trong `tools/` chạy được.
- Hook khởi động thoát 0 kể cả khi `npm install` lỗi mạng. 3 skill đủ `SKILL.md` + `LICENSE` (MIT).

## Còn lại
- Phiên Claude Code trên web của tài khoản này bị chặn kho npm (registry.npmjs.org 403). Trong phiên như vậy: không chạy được `npm run dev` / build / test tại chỗ, và MCP CodeGraph không kết nối (chưa cài được). Dựa vào CI của PR để build + test. Nếu admin mở registry.npmjs.org trong cài đặt mạng, hook sẽ tự cài hết.
- Đã dọn code + CSS "mini mascot" (người dùng đã bỏ mascot). `KNOWN_MISSING` trong unit test giờ rỗng.
- Chỉ còn một `@keyframes blink` (nhấp nháy bằng opacity) cho chấm REC; bản co dẹt của mắt mascot đã bỏ.
- Cloudflare: người dùng tự nối repo (Workers & Pages → Create → Import Git repo `EmXinhSayHi`, build command `npm run build`, deploy command `npx wrangler deploy`).
- Chưa thử trên điện thoại thật (iPhone / Safari).

## Cách làm việc người dùng muốn
- Trả lời bằng tiếng Việt, ngắn gọn.
- Hướng visual tiếp theo: xem artifact https://claude.ai/artifact/PMXudkFnZ1sNq8qmijF11G (REF-NOTES.md + contact sheets).
