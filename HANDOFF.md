# HANDOFF — 2026-10-14

## Trạng thái repo
- Nhánh `claude/xinhos-website`. Trang đã chuyển từ 1 file (`src/page.html`) sang Vite + TS: `index.html` + `src/styles.css` + `src/main.ts`, ảnh / CV ở `public/assets/`.
- Bộ công cụ theo `CAI-DAT-SKILL-VA-CONG-CU.md` đã cài ở dạng file: 3 skill trong `.claude/skills/`, CodeGraph (`codegraph.json`, `.mcp.json`), hook khởi động cloud, `.claude/launch.json`, Vitest + Playwright, `tools/`, Cloudflare (`wrangler.jsonc`, `public/_headers`), GitHub Actions, `CLAUDE.md`.

## Đã kiểm chứng
- Đóng gói `src/main.ts` + CSS bằng esbuild rồi chụp màn hình so với trang cũ: máy tính trùng từng pixel, điện thoại chỉ khác 0,05% (do hiệu ứng đang chạy). Không có lỗi JavaScript.
- 5 script trong `tools/` chạy được trên bản đóng gói đó (Playwright có sẵn trên máy).
- Hook khởi động chạy hết, thoát 0 kể cả khi `npm install` lỗi mạng.
- 3 skill có đủ `SKILL.md` + `LICENSE` (MIT). Script tra cứu của `ui-ux-pro-max` chạy được.

## Chưa làm được / chưa kiểm chứng
- **Kho npm bị chặn trong phiên tạo bộ khung** (registry.npmjs.org trả 403 theo chính sách mạng). Vì vậy:
  - chưa chạy `npm install`, chưa có `package-lock.json`. Phiên đầu tiên có mạng: chạy `npm install`, rồi commit `package-lock.json`;
  - chưa chạy `npm run build`, `npm test`, `npm run e2e` thật, chưa chạy `vite dev`;
  - chưa cài CodeGraph (`npm i -g @colbymchenry/codegraph`, `codegraph telemetry off`, `codegraph init`, `codegraph status`).
- Phiên bản thư viện trong `package.json` ghi theo hiểu biết đến giữa 2026, chưa đối chiếu với npm.
- Trong `src/main.ts` còn code cho "mini mascot" (`#mini`, `#miniBody`, `#miniSay`) nhưng `index.html` không có phần tử đó (bản cũ cũng vậy). Code này đã có kiểm tra `if (m && ...)` ở một chỗ, nhưng `miniPlace` / `miniTalk` không kiểm tra. Cần dọn hoặc gắn lại markup. Unit test đang để 3 id này trong `KNOWN_MISSING`.
- Cloudflare: người dùng tự nối repo (Settings → Builds), lệnh build `npm run build`.
- Chưa thử trên điện thoại thật (iPhone / Safari).

## Cách làm việc người dùng muốn
- Trả lời bằng tiếng Việt, ngắn gọn.
- Hướng visual tiếp theo: xem artifact https://claude.ai/artifact/PMXudkFnZ1sNq8qmijF11G (REF-NOTES.md + contact sheets).
