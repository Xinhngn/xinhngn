# XINH.OS — website cá nhân của Xinh Nguyễn

Website portfolio của Xinh Nguyễn (Brand / Project Management). Ý tưởng: trang là một "hệ điều hành" XINH.OS. Mở đầu bằng màn khởi động "Em Xinh say hi", chọn Story hoặc Quick, mọi nội dung nằm trong các cửa sổ OS. Phong cách (v15d, art direction "Futuristic Editorial × Digital Art Playground"): giấy kem `--cream`/`--paper` #f3eee6, mực đen, chrome/bạc; màu nhấn là hồng phấn #ff8fc0 (vẫn nằm trong biến `--lime` để khỏi đổi tên khắp nơi). Xanh trời chỉ dùng làm bầu trời ở màn mở đầu và dải đầu P1 (`--sky1/2/3`), không dùng xanh cho nút / chữ / UI (Xinh không thích xanh; `--blue` là màu mực). Chữ: Inter Tight + Newsreader nghiêng (từ nhấn) + JetBrains Mono (lớp OS) + Imperial Script (`--f-script`) chỉ cho chữ "say hi" ở màn mở đầu và màn kết, tô gradient `--chrome-pk`. Không dùng sticker, neon, glassmorphism nặng. CSS: lớp v15 → v15d ở cuối `src/styles.css` đè lên các lớp v7–v14 cũ. Màn mở đầu (boot, tham khảo trang Milla + chữ bong bóng BUTYOUBABY): bầu trời mây, ảnh Xinh ở giữa, 12 vật thể bay vòng quanh (CSS `cos()/sin()` + `@property --t`, nghiêng theo chuột), bấm vào vật thể thì nảy, bấm ảnh thì đổi ảnh (hi/go/work/chill), 11 chữ EMXINHSAYHI rơi theo vật lý 2D nhỏ (`bubblesStart`, `bubLoop` trong `main.ts`, tự ngủ khi đứng yên), kéo ném được, có nút Trọng lực + Xếp lại. LV.2 (nền nâu đen ấm) là 4 "máy" theo tham khảo bảng điều khiển radar: đĩa quét, các nút tròn, 1 nhãn sáng trên tia sáng; icon + tiêu đề + mô tả bên dưới (`#proc.lib`, `.lb`, `DEMOS`, ô đang chọn nở rộng, tự luân phiên). LV.3 (nền sáng) là danh sách năng lực trái + thẻ phải (`.lsp`). LV.4 (nền đen) là accordion ngang kiểu editorial (`.acc`, `.ac`): 1 panel mở có số lớn, bài toán, vai trò, tên khách hàng cực lớn ở đáy; 4 dự án còn lại gập thành dải dọc (rê chuột chờ 260ms hoặc bấm để mở); trên điện thoại là accordion dọc. Số liệu chỉ là chú thích. Video tham khảo: `/mnt/project-files/uploads/`.

## Công nghệ
- Vite + TypeScript, không framework. Trang giới thiệu (landing), không có backend.
- `index.html`: toàn bộ markup. `src/styles.css`: toàn bộ CSS. `src/main.ts`: toàn bộ logic, chuyển nguyên văn từ bản 1 file cũ nên đang để `// @ts-nocheck`. Khi sửa phần nào, tách dần phần đó ra module có kiểu.
- **CONFIG** (liên hệ, ô ảnh, link CV, GoatCounter) nằm ở đầu hàm trong `src/main.ts`. Nội dung còn thiếu: `CONTENT-NEEDED.md`.
- Ảnh và CV ở `public/assets/`, trang gọi bằng đường dẫn tương đối `assets/...`. Bundle của Vite ra `dist/static/` để không lẫn.
- Đã khai báo `gsap` + `lenis` (hiệu ứng theo cuộn) nhưng chưa dùng. Hiệu ứng 3D: ưu tiên CSS / WebGL2 tự viết, chỉ thêm three.js khi thật cần (~125 KB).
- Luôn tôn trọng `prefers-reduced-motion` (trong code có biến `reduce`).
- Trang cũng chạy như artifact trên claude.ai (`window.claude`, link trong `ARTIFACT_URL`). `npm run build:artifact` tạo 1 file `dist-artifact/index.html` để đăng lại.
- Tài liệu tham khảo visual: claude.ai artifact https://claude.ai/artifact/PMXudkFnZ1sNq8qmijF11G (đọc bằng Artifact tool, có `REF-NOTES.md` + contact sheets), và project "Ref visual port".

## Lệnh
| Việc | Lệnh |
|---|---|
| Cài | `npm install` (Node 22, xem `.nvmrc`) |
| Chạy thử | `npm run dev` → http://localhost:5173 |
| Build + xem bản build | `npm run build && npm run preview` → http://localhost:5175 |
| Kiểm tra kiểu | `npm run lint` |
| Unit test | `npm test` (Vitest, `tests/unit/`) |
| Test trình duyệt | `npm run e2e` (Playwright, máy tính 1366x860 + Pixel 7, chạy trên bản build). Thiếu Chromium đi kèm thì đặt `PW_CHROMIUM=<đường dẫn chrome>` (dùng cho cả `tools/`) |
| Kiểm tra trang | `npm run check:shots` / `check:jumps` / `check:fit` / `check:perf` / `check:idle` (cần bản build đang chạy ở cổng 5175; ảnh ra `tools/out/`) |

Các script trong `tools/` tự bấm "Story" để qua màn khởi động. `START=''` để giữ màn khởi động, `BASE_URL=...` để kiểm tra server khác.

**Quy tắc:** luôn chạy `npm test` và `npm run build` sạch trước khi commit.

## Quy trình
Tạo nhánh → sửa → `npm test` + `npm run build` → commit → mở PR → xem bản xem trước Cloudflare của PR → merge.
- CI (`.github/workflows/ci.yml`, `e2e.yml`) chỉ chạy khi có PR đụng đúng phần liên quan, hoặc khi bấm chạy tay. Gom nhiều sửa nhỏ vào 1 PR.
- `deps.yml`: PR đổi `package.json` thì GitHub tự cập nhật và commit `package-lock.json`, và kiểm tra CodeGraph.
- Nếu phiên bị chặn kho npm (không build / test tại chỗ được): đẩy nhánh, mở PR, đọc kết quả CI bằng `gh api repos/Xinhngn/EmXinhSayHi/actions/runs?branch=<nhánh>`.
- Deploy: Cloudflare Workers static assets (`wrangler.jsonc`, header bảo mật trong `public/_headers`). Người dùng tự nối repo trong Cloudflare (Settings → Builds) và tự đặt biến môi trường. AI không làm bước này.

## An toàn
- Không commit khoá bí mật. Biến môi trường để trong `.env.local` (đã có trong `.gitignore`).
- Thêm dịch vụ ngoài (script, font, API) thì cập nhật CSP trong `public/_headers`.

## Văn bản
- Trả lời người dùng bằng tiếng Việt, câu ngắn, rõ ràng.
- Nội dung trên trang có 2 thứ tiếng (`.en` / `.vi`). Sửa chữ thì sửa cả hai.

## Skill thiết kế (`.claude/skills/`)
- `ui-ux-pro-max`: tra bảng màu, cặp font, kiểu giao diện, quy tắc UX. Ví dụ: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "y2k chrome" --domain style`.
- `taste-skill` (tên trong skill: design-taste-frontend): landing / portfolio không "trông như AI làm".
- `redesign-skill` (redesign-existing-projects): nâng cấp giao diện có sẵn mà không làm hỏng chức năng.
- `taste-skill` dành cho landing / portfolio / redesign, KHÔNG dành cho dashboard hay màn nhiều bước trong app. Với màn trong app chỉ lấy phần phù hợp, giữ hệ thiết kế riêng của dự án.

## CodeGraph
- Tìm code / ai gọi hàm nào: dùng CodeGraph (MCP `codegraph`, cấu hình trong `.mcp.json` + `codegraph.json`) trước khi grep hay đọc nhiều file. CodeGraph không đọc file SQL.
- Trên Claude Code web, hook `.claude/hooks/session-start.sh` tự `npm install`, cài CodeGraph và lập chỉ mục. Lỗi mạng thì hook bỏ qua, không chặn phiên.

## Ghi chú
- Mỗi khi thêm tính năng lớn, cập nhật file này để phiên sau đọc là hiểu.
- Chuyển việc giữa các phiên dài: cập nhật `HANDOFF.md`.
