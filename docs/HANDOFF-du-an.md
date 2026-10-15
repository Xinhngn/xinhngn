# BÀN GIAO TOÀN BỘ DỰ ÁN — XINH.OS (portfolio của Xinh Nguyễn)

Cập nhật: 2026-10-15. Viết cho phiên Claude tiếp quản.
Nguồn: repo, `CLAUDE.md` + `HANDOFF.md` trên nhánh `claude/moodboard-redesign-hf110l`, PR #4–#7, các thread trong project "Website conversion with visual design", file trong `/mnt/project-files/`.
Chỗ nào chưa được Xinh xác nhận đều ghi rõ **[CHỜ XINH]**. Không có số liệu nào trong file này do Claude tự đặt ra.

## 0. Đọc nhanh (2 phút) — trạng thái mới nhất 2026-10-15 20:15

- **Sản phẩm:** website portfolio cá nhân "XINH.OS" của Xinh Nguyễn. Vite + TypeScript, không framework, deploy Cloudflare Workers.
- **Repo chính: `Xinhngn/xinhngn`, nhánh `main`** (bản Vite theo moodboard, "bản A"). Repo cũ `Xinhngn/EmXinhSayHi` không làm tiếp nữa; các mục bên dưới nhắc PR #4–#7 là lịch sử của repo cũ.
- **Web đang chạy:** https://xinhngn.ngnxinhh.workers.dev (Cloudflare Worker `xinhngn`, Workers Builds tự build + deploy mỗi lần push lên `main`; build `npm run build`, deploy `npx wrangler deploy`).
- **Quy trình:** làm trên nhánh mới → PR vào `main` → Cloudflare cho link xem trước của nhánh → Xinh duyệt → merge. Không merge khi Xinh chưa bảo.
- **Thư mục code trên máy Xinh:** `/Users/macbookpro/Documents/projects/xinhngn` (clone của repo, khớp `main`, chưa có `node_modules`). Máy Xinh chưa đăng nhập GitHub, nên Claude đẩy code từ cloud rồi chép lại vào thư mục máy khi cần.
- **Đã bỏ:** bản làm lại bằng Astro ("bản B") — Xinh chọn giữ bản A. Bản B đã xoá khỏi máy và `main`. Nhánh `claude/xinhos-astro` vẫn còn trên GitHub vì không xoá được (GitHub báo "Branch could not be deleted", Claude không có quyền xoá nhánh). Bỏ qua nhánh này, không dùng.
- **Kết nối:** project có connector Cloudflare Developer Platform (chỉ xem Worker, không deploy được).
- **Việc đang chờ:** Xinh duyệt layout trang Dự án, rồi gửi thông tin để điền các ô "+ …" (năm, mô tả, vai trò, kết quả, ảnh). Xem mục 8.
- **Luật vàng:** không tự thêm số liệu, chức danh, kết quả. Không dùng "4 pitch wins" / "6/7 projects". Giữ "Em Xinh say hi", 5 năm, 20 thương hiệu. Không dùng xanh cho UI.
- **Cách trả lời Xinh:** tiếng Việt, câu ngắn. **Xong việc luôn gửi link xem trước ngay trong tin nhắn.**

---
## 1. Về Xinh và portfolio

### 1.1 Định vị
- Xinh là người làm marketing / communication có tư duy kinh doanh: làm rõ vấn đề, cấu trúc kế hoạch, quản lý triển khai giữa nhiều bên, theo đến kết quả.
- Định vị là người **làm chủ** một dự án marketing / truyền thông, không phải người chuyển lời giữa các team.
- Website **không** phải portfolio của designer. Hiệu ứng không được lấn năng lực chuyên môn, không được gợi ý Xinh có năng lực thiết kế mà Xinh chưa tuyên bố.

### 1.2 Đối tượng xem
- Team brand / marketing in-house.
- Khách hàng trực tiếp cần project owner / marketing project manager.
- Team cần người quản lý chiến dịch theo dự án hoặc theo thời hạn.
- Không kéo hướng về vai trò Account phía agency.

### 1.3 Vai trò mục tiêu (phía khách hàng)
- Marketing Project Manager (hướng chính) · Marketing Communications · Campaign Management.
- Đây là nhóm vai trò mục tiêu, không phải chức danh Xinh từng giữ. Không dùng "Account Manager" làm vai trò mục tiêu chính. Không đặt Brand Manager / Assistant Brand Manager làm mục tiêu chính.
- Câu "Phù hợp": Ưu tiên Banking & Fintech, sẵn sàng mở rộng sang ngành khác. TP.HCM hoặc remote. Hợp tác theo dự án hoặc theo tháng.
- **[CHỜ XINH]** thời gian có thể bắt đầu (tuỳ chọn).

### 1.4 Lộ trình nghề (giữ nguyên chức danh và ngày)
| Chức danh | Thời gian |
|---|---|
| Digital Planning Assistant | 04/2022 – 08/2022 |
| Account Executive | 08/2022 – 09/2024 |
| Senior Business Development cum Assistant Account Director | 09/2024 – 04/2026 |
| Associate Account Manager | 05/2026 – 08/2026 |

- Trang ghi **5 năm** kinh nghiệm theo bản duyệt. **[CHỜ XINH]** các mốc trên chỉ cộng được khoảng 4 năm 4 tháng. Không tự đổi thành "4+ năm".
- Dữ liệu nằm trong mảng ROLES ở đầu `src/main.ts` (khoảng dòng 66–75).

### 1.5 Giọng văn
- Tự nhiên, thông minh, ngắn, gần gũi, tự tin. Được vui tươi, nhưng chuyên nghiệp đến từ nội dung.
- Tránh: văn AI / corporate / credential agency, kể chuyện sến, tính từ rỗng, phóng đại, in đậm quá nhiều.
- Giữ nguyên lời chào **"Em Xinh say hi"**. "hihi" chỉ là icon trang trí. Xưng "Xinh" được, không thay hết bằng "tôi".
- Headline đã duyệt: **"Xinh thích làm chủ."**

### 1.6 Phương pháp 4 bước
1. **LÀM RÕ** — Hiểu đúng trước khi bắt đầu: mục tiêu, bối cảnh, phạm vi, tiêu chí thành công.
2. **CẤU TRÚC** — Biến bài toán thành kế hoạch: phân rã đầu việc, ưu tiên, cách triển khai khả thi.
3. **QUẢN LÝ TRIỂN KHAI** — Biến kế hoạch thành hành động: tổ chức việc, phân bổ nguồn lực, quản lý các bên.
4. **THEO ĐẾN KẾT QUẢ** — Theo sát đến khi xử lý xong: kiểm soát tiến độ, chất lượng, xử lý phát sinh.

### 1.7 20 thương hiệu (dải brand, đúng 20 tên)
VIB · MSB · Cake by VPBank · Digimi · BVBank · TPBank · NCB · Poca · Lay's · Hảo Hảo · Nhựa Duy Tân · Cindy Bloom · LiveSpo COLON · Chanté · Wake-Up Tây Nguyên · Tam Thái Tử · Vihawa · MEATDeli · Van Gogh · Dược phẩm Hoa Linh.
- Đã bỏ Prudential và Tetra Pak. Không ghi "Trusted by leading brands".
- Brand có mặt ở đây không có nghĩa Xinh trực tiếp quản lý mọi brand.

### 1.8 Năng lực (9 nhãn)
- **WHAT I RUN:** Chiến dịch IMC · Quản lý social · Activation & sự kiện · Sản xuất.
- **HOW FAR I TAKE IT:** Pitching & proposal · Từ kế hoạch đến triển khai · Quản lý khách hàng & các bên liên quan · Quản lý tiến độ · ngân sách · chất lượng · Hồ sơ & báo cáo.
- Nhãn liên kết là "Thể hiện qua" / "Dự án liên quan" (không dùng "JD thường ghi"). Không ngụ ý năng lực nào cũng có ở mọi dự án. Ma trận dự án × năng lực: `MX` trong `src/main.ts`. **[CHỜ XINH]** rà xem mỗi năng lực gắn đúng dự án chưa.

### 1.9 Năm case chính (thứ tự MSB, VIB, Cake, Poca Yummy, Digimi × BVBank)
Khung case: Bối cảnh / Vai trò / Đóng góp / Phần của team / Kết quả. Phần Xinh làm và phần team làm luôn tách riêng.

| Case | Tiêu đề / tagline | Điểm đã có | Lưu ý |
|---|---|---|---|
| **MSB** | "Từ pitching đến vận hành đa kênh" · "Sửa cách làm việc, không chỉ nội dung." | Social AWO 2025–2027 (AWO, production, booking, media). Xinh giúp đóng khung proposal theo mối lo thật của khách, sau kick-off chủ động hỏi phản hồi chất lượng và chuyển thành điều chỉnh. Vai trò: pitching → triển khai. Kết quả: hợp tác **3 → 5 năm**. | Chiến lược / proposal làm cùng team. Kết quả là của hợp tác, không phải thành tích riêng. |
| **VIB** | "Một lần pitch, một đối tác dài hạn." | Dự án: Ivy Card, Anh Trai Say Hi (activation), Bộ Tứ Báo Thủ (video), Ngày hội không tiền mặt, Sound Notification for MAX. Vai trò: pitching → quản lý chung. | Chỉ ghi **"nhiều dự án từ một lần pitch"**, không ghi số. **[CHỜ XINH]** nguồn ghi "4 dự án" nhưng danh sách có 5; Sound Notification for MAX có thuộc VIB không. |
| **Cake by VPBank** | "Trust Opens New Doors" · "Một mối quan hệ mở ra cánh cửa mới." | Khách cũ của Digimi chuyển sang Cake và mời Xinh vào pitch. Brief: tăng Gen Y mà không làm loãng Gen Z. Xinh kết nối lại khách và góp sức pitching. Kết quả: **team** thắng social retainer. | Cake AI-land, comment-led play, WeChoice photo series, mascot Gato là việc của team. **[CHỜ XINH]** tiêu đề tiếng Việt "Niềm tin mở ra cánh cửa mới" là Claude dịch. |
| **Poca Yummy** | "Giờ ra chơi thành khoảnh khắc thương hiệu." | Ra mắt sub-brand, nền tảng QUẨY-VERSE, 2023. Xinh điều phối các hạng mục chính: hero MV, CapCut challenge, TikTok creators, community, comic pages. Kết quả chiến dịch (Xanh Credential 2024): **266K+** tương tác Facebook, **45.7K+** click website. | Số liệu là của chiến dịch. 3 dự án Poca: Thế giới vui nhộn; Poca - Thế giới pháp thuật vui nhộn; Poca Yummy - Launching campaign. **MEATDeli không thuộc Poca.** |
| **Digimi × BVBank** | "Từ nền tảng Account đến Project Ownership" · "Từ ly cà phê đến lượt đăng ký app." | Khách hàng nền tảng đầu sự nghiệp. Social AWO, sinh nhật "Tròn một tuổi – Đầy Thank Xuân", Coffee Truck, CSR "Vì một thế hệ vươn tầm", production, OOH / community / KOL / TikTok booking. | Số liệu gắn đúng hoạt động: **Sinh nhật** 500+ người tham dự / 450 tài khoản mở offline / 1.5M reach online. **Coffee Truck** ~2,000 lượt ghé booth / 268 đăng ký / 140 chuyển đổi. **[CHỜ XINH]** Xinh trực tiếp làm phần nào (mục Vai trò đang trống). |

### 1.10 Dự án khác (chỉ liệt kê, không tự viết thêm câu chuyện)
- **Nhựa Duy Tân** · Tết 2025: kế hoạch truyền thông, pitching; AWO, production, booking, media; thắng pitch cùng team. **[CHỜ XINH]** có giữ dòng "Thắng pitch cùng team" không.
- **Cindy Bloom** · chiến dịch ra mắt: pitching → triển khai; production / social / booking / AWO. Không có kết quả được xác nhận.
- **NCB** · Social Always On 2025: Xinh chạy giai đoạn đầu, nhận ra vấn đề khách chưa được làm rõ, vào làm rõ, đưa dự án về đúng hướng rồi bàn giao lại cho Account. Có thể thành case sau.
- **TPBank** · Em Xinh Say Hi Concert 1: pitching → triển khai; BD, vận hành, chăm sóc khách.
- **Masan:** Chanté Social Always On · Vihawa Social Campaign 2025 · Wake-Up Tây Nguyên Social Campaign.
- **MEATDeli** · Social Campaign Q4.2025: pitching, rồi bàn giao cho Account.

### 1.11 Cách hợp tác (LV.5 và trang Liên hệ)
- Eyebrow "LV.5 · BẠN NHẬN ĐƯỢC GÌ". Headline "Bắt đầu với một dự án, hoặc cả một đội."
- **SOLO — "Một người, trọn dự án."** Từ đọc brief, lên kế hoạch, quản lý triển khai đến nghiệm thu, báo cáo; một đầu mối xuyên suốt. CTA "Bắt đầu một dự án →".
- **SQUAD (Team trọn gói) — "Một đội chất lượng, lắp theo dự án."** Xinh kết hợp mạng lưới đối tác theo bài toán và vẫn chịu trách nhiệm quản lý triển khai. Mạng lưới: IMC, Social, Activation, Production, Ý tưởng & content, Thiết kế/KV, KOL/KOC, Media, Production house. CTA "Lắp đội cho tôi →".
- Không dùng câu tiêu cực kiểu "Không lạc thông tin, không đùn đẩy". Không hứa năng lực không có.

### 1.12 Liên hệ (CONFIG trong `src/main.ts`)
| Kênh | Giá trị |
|---|---|
| Điện thoại / Zalo | 0975 108 131 (Zalo dùng cùng số). **[CHỜ XINH]** báo nếu Zalo khác số |
| Email | ngnxinhh@gmail.com |
| LinkedIn | linkedin.com/in/xinh-nguyen-exploremore |
| Facebook / Messenger | **[CHỜ XINH]** chưa có username |
| CV | `public/assets/XinhNguyen-CV.pdf` |

### 1.13 Số liệu: nguồn sự thật
- **Được dùng:** 5 năm · 20 thương hiệu · MSB 3 → 5 năm hợp tác · Poca 266K+ / 45.7K+ · Digimi Sinh nhật 500+ / 450 / 1.5M · Digimi Coffee Truck ~2,000 / 268 / 140.
- **Cấm dùng:** 4 pitch thắng / 4 pitch wins · 6/7 dự án / 6/7 projects · 12 thương hiệu · bất kỳ số nào tự đoán.
- Số liệu chỉ gắn với đúng dự án của nó, không gộp, không biến thành thành tích cá nhân.

Tài liệu gốc của toàn bộ mục 1: file brief "XINH.OS — MASTER CONTENT & CONTEXT FOR CLAUDE" (bản 2026-10-15), lưu ở `/mnt/project-files/uploads/hearth/da070cb0-069d-478e-8dc8-4060e1d4ad90` (file chữ, không đuôi). Khi có nghi ngờ về nội dung, đọc lại file này.

---

## 2. Website: concept và art direction hiện tại

### 2.1 Concept
- Trang là một "hệ điều hành" XINH.OS. Nền tảng: Personal Computer × Career Timeline × Digital Scrapbook.
- Art direction (từ vòng v15d): **"Futuristic Editorial × Digital Art Playground"**. Playground chỉ ở màn mở đầu và chút ở màn kết; phần nghề nghiệp là editorial (chữ lớn, số thứ tự, tên khách hàng làm hình chính).

### 2.2 Màu
- Giấy kem `--cream` / `--paper` #f3eee6, mực, chrome / bạc.
- Màu nhấn: hồng phấn #ff8fc0 (vẫn nằm trong biến `--lime` để khỏi đổi tên khắp nơi). Chữ hồng trên nền sáng dùng `--rose`.
- **Xanh trời chỉ làm nền / không khí.** Không dùng xanh cho nút, chữ, UI (`--blue` là màu mực). Xinh đã nói rõ "tôi không thích màu xanh".
- Không còn mảng đen lớn ở trang trong (Xinh thấy đen trắng "nặng nề").
- Nền theo moodboard: LV.0, LV.4, Liên hệ = trời (`--g-sky`); LV.1, Hồ sơ = kem; LV.3, Năng lực = bạc (`--silver`); LV.5 = kem → hồng phấn; LV.2 = lavender sáng, kính trắng, đĩa chrome bạc, nút ngọc trai viền hồng; màn kết = hoàng hôn (`--g-dusk`).

### 2.3 Chữ
- Inter Tight 900 (chữ lớn) · Newsreader nghiêng (từ nhấn) · JetBrains Mono (lớp OS) · Imperial Script (`--f-script`) chỉ cho chữ "say hi" ở màn mở đầu và màn kết, tô gradient `--chrome-pk`.
- Không sticker, không neon, không glassmorphism nặng, không cyberpunk.

### 2.4 Cấu trúc trang (bản PR #7)
**Điều hướng:** Hành trình › Hồ sơ › Dự án › Liên hệ. Đã bỏ trang Xem nhanh (`#desk` chuyển sang `#profile`).

| Phần | Id / class | Mô tả |
|---|---|---|
| Màn mở đầu (boot) | `#boot` | Bầu trời mây, ảnh Xinh ở giữa, 6 vật thể bay vòng quanh (CSS `cos()/sin()` + `@property --t`), nghiêng theo chuột, bấm thì nảy. Bấm ảnh đổi ảnh (hi → go → work → chill). Nút Story màu hồng; nút Quick đổi thành "Xem nhanh hồ sơ" (vào Hồ sơ). Đã bỏ hẳn chữ EMXINHSAYHI rơi (Xinh thấy lặp headline). |
| Story · start (P1) | `#start` | "Bạn lo việc kinh doanh. Xinh lo dự án về đích." + câu hỗ trợ. Đầu trang nối màu trời. |
| LV.0 Đề bài | `#brief` | "Có mục tiêu. Có ngân sách. Nhưng bắt đầu từ đâu?" + 5 thẻ vấn đề. Phần "gỡ rối": vấn đề gỡ xong phải nổi bật, đọc được. |
| LV.1 Hành trình | `#clarify` | "Bốn vai trò, một hành trình tiến lên." 4 chức danh thật. |
| Dải brand | trong Story | 20 tên, chạy chậm (66s) cho dễ đọc. |
| LV.2 Cách làm | `#structure`, `#proc.lib` | 4 "máy" kiểu bảng điều khiển radar (ref 4): đĩa quét, nút tròn, 1 nhãn sáng ("Đã rõ mục tiêu thật"…), icon + tiêu đề + mô tả bên dưới. Ô đang chọn nở rộng, tự luân phiên (`DEMOS`). |
| LV.3 Bằng chứng | `#align`, `.lsp` | "Xinh đã làm được gì?" Chỉ 5 năm + 20 thương hiệu. Danh sách năng lực bên trái, thẻ chi tiết bên phải. |
| LV.4 Selected work | `#deliver`, `#track`, `.acc` | Accordion ngang kiểu editorial (ref 3). Panel mở: số lớn, Bài toán, Vai trò, tên khách hàng cực lớn ở đáy; 4 dự án khác gập thành dải dọc (rê chuột 260ms hoặc bấm). Điện thoại: accordion dọc. Số liệu chỉ là chú thích. Ô cuối "+2 / Cả 7 dự án →". |
| LV.5 Giá trị | `#value` | SOLO / SQUAD. |
| Màn kết | `#finish`, `.end-card` | "say hi!" chữ script chrome hồng. 1 thẻ kính: trái = bước tiếp theo + nút "Say hi ngay"; phải = 4 ô kênh (Gọi, Zalo, LinkedIn, Gmail). |
| Hồ sơ | `#v-profile` | "XINH.OS 2026 · HO CHI MINH CITY", "Xinh thích làm chủ.", thẻ ID (lanyard, 3D) mặt sau: 5 YEARS, 20 BRANDS, Career Roles. Năng lực là mục `#pfSkills` (`#skills` cuộn tới đây). |
| Dự án | `#v-work`, `.wx` | Xem 2.5. |
| Liên hệ | `#v-contact` | Kênh liên hệ + "Cách hợp tác" `.pk` (Solo / Team trọn gói, chữ lấy từ LV.5). |
| Report | `#v-report` | Chỉ chủ trang thấy: thống kê, danh sách "Nội dung còn thiếu" tự động. |
| Chế độ sửa | link + `#edit` (thoát `#edit-off`) | Hiện vị trí mọi ô ảnh / dữ kiện còn thiếu. |

### 2.5 Trang Dự án (vòng mới nhất, đang chờ duyệt)
Làm theo moodboard 3 bước Xinh gửi:
1. **Index chữ lớn** kiểu OUS Worldwide (`.wx`). Đổi giữa "Theo tính chất" (`TY`) và "Theo khách hàng" (`CLIENTS`). Hiện 22 chiến dịch của 11 khách hàng.
2. Bấm 1 dòng mở **thẻ kính giới thiệu** `#jobCard` (có ruy băng 3D): trái = khách hàng, tính chất, năm; phải = tên chiến dịch, mô tả, số liệu.
3. "Xem chi tiết" mở **trang "Tất cả về…"** `#jobSheet` (ref Stüssy): 4 cột (Bối cảnh, Vai trò, Xinh đã làm, Phần của team), ô Kết quả, 6 ô ảnh thành phẩm.
- Ô thiếu hiện viền đứt hồng "+ năm", "+ mô tả", "+ Ảnh thành phẩm 1…6" (`.fill`, `.jd-ph`).
- Nhóm tính chất: IMC & ra mắt · Social & always-on · Activation & sự kiện · Sản xuất · Pitch & proposal · **Cần phân loại** (Sound Notification for MAX, CSR Vì một thế hệ vươn tầm, 2 dự án Poca "Thế giới…", Ngày hội không tiền mặt đang để activation).
- Dữ liệu: mảng `JOBS` trong `src/main.ts` (field: `c` khách hàng, `cs` id case đầy đủ, `n` tên, `y` năm, `ty` tính chất, `ctx/role/me/team/out/res`). Ảnh dự án: bỏ vào `public/assets/`, khai báo trong `IMAGES`, và phải thêm field ảnh cho từng job thì 6 ô trong `openJobDetail` mới hiện ảnh thật.

### 2.6 Tài liệu tham khảo visual Xinh đã gửi
- Moodboard tổng thể + 2 video web ref (Ghi Màn hình…48.20.mov và …49.46.mov ở gốc `/mnt/project-files/`).
- 2 video ref cho LV.2 / LV.4 (Libraries.dev và trang Jason Yuan) — `uploads/hearth/c48d406f…` và `cb3b3942…` (mp4).
- Ref 1 (Milla Portfolio, millascope.pages.dev) và ref 2 (ghim Pinterest "Black & Bold", chữ bong bóng) cho màn mở đầu: bản HTML lưu ở `uploads/hearth/6a3e967f…` (Milla) và `67ca95a5…` (Pinterest). Claude chưa xem được chuyển động thật vì mạng chặn.
- Ref 3 → LV.4, ref 4 → LV.2, ref 5 = moodboard AD: các ảnh PNG trong `uploads/hearth/` gửi lúc 06:17. Moodboard 3 bước trang Dự án (OUS Worldwide / Stüssy): `uploads/hearth/00c5a457…` (gửi 08:55). 4 ảnh góp ý gửi lúc 04:14.
- Artifact tham khảo cũ: https://claude.ai/artifact/PMXudkFnZ1sNq8qmijF11G (REF-NOTES.md + contact sheets).
- Link neutomni.com Xinh gửi không mở được (DNS không tìm thấy).

---

## 3. Kỹ thuật

### 3.1 Stack
- Vite 6 + TypeScript 5.8, không framework, không backend. Node 22 (`.nvmrc`).
- `index.html` = toàn bộ markup. `src/styles.css` = toàn bộ CSS (lớp v15 → v15g ở cuối file đè lên lớp v7–v14 cũ). `src/main.ts` = toàn bộ logic, `// @ts-nocheck` (chuyển nguyên từ bản 1 file cũ; khi sửa phần nào thì tách dần ra module có kiểu).
- CONFIG ở đầu hàm trong `src/main.ts`: `CONTACT`, `IMAGES`, `CV_URL`, `ARTIFACT_URL`, `GOATCOUNTER` (đang trống).
- Ảnh trong `public/assets/`: `portrait.webp`, `xinh-hi/go/work/chill.webp`, `lv1–lv4.webp`, `XinhNguyen-CV.pdf`. **Chưa có ảnh dự án nào.**
- `gsap` + `lenis` đã khai báo nhưng chưa dùng. 3D: ưu tiên CSS / WebGL2 tự viết; chỉ thêm three.js khi thật cần.
- Luôn tôn trọng `prefers-reduced-motion` (biến `reduce`).
- Trang còn chạy như artifact trên claude.ai (`npm run build:artifact` → `dist-artifact/index.html`).

### 3.2 Lệnh
| Việc | Lệnh |
|---|---|
| Cài | `npm install` |
| Chạy thử | `npm run dev` → http://localhost:5173 |
| Build + xem | `npm run build && npm run preview` → http://localhost:5175 |
| Kiểm tra kiểu | `npm run lint` |
| Unit test | `npm test` (Vitest; báo lỗi nếu `main.ts` gọi `$('#id')` mà `index.html` không có) |
| E2E | `npm run e2e` (Playwright, 1366×860 + Pixel 7). Thiếu Chromium thì đặt `PW_CHROMIUM=<đường dẫn chrome>` |
| Kiểm tra trang | `npm run check:shots / check:jumps / check:fit / check:perf / check:idle` (cần bản build ở cổng 5175; ảnh ra `tools/out/`) |

**Quy tắc:** trước khi commit chạy `npm run lint && npm test && npm run build`.

### 3.3 CI, deploy, công cụ
- GitHub Actions: `ci.yml` (lint + test + build), `e2e.yml` (Playwright), chỉ chạy khi PR đụng phần liên quan hoặc bấm tay. `deps.yml`: PR đổi `package.json` thì tự commit `package-lock.json` và kiểm tra CodeGraph.
- Deploy: Cloudflare Workers static assets (`wrangler.jsonc`, header + CSP trong `public/_headers`). Mỗi nhánh / PR có bản xem trước (check run "Workers Builds"). Xinh tự cấu hình Cloudflare; AI không làm bước này. Thêm dịch vụ ngoài thì cập nhật CSP.
- Skill thiết kế trong `.claude/skills/`: `ui-ux-pro-max`, `taste-skill`, `redesign-skill`.
- CodeGraph: `.mcp.json` + `codegraph.json`, hook `.claude/hooks/session-start.sh` tự `npm install` và lập chỉ mục. PR #5 đổi `.mcp.json` sang chạy qua `npx` để MCP kết nối ngay đầu phiên.
- Không commit khoá bí mật; biến môi trường để trong `.env.local`.

### 3.4 Mẹo đã học
- Chụp ảnh trên bản build: `npx vite build`, rồi `setsid nohup npx vite preview --port 5175 --strictPort &` (server hay tự tắt, tắt thì chạy lại). Đặt `PW_CHROMIUM=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, dùng `tools/lib.mjs` `openPage(VIEWPORTS.desktop|phone)`.
- Proxy container chặn curl tới link preview (403). Kiểm tra deploy bằng check run "Workers Builds" của PR. CI không tự báo về phiên, phải tự kiểm tra.
- E2E boot smoke chạy tại chỗ có thể lỗi 404 do môi trường; trên CI vẫn qua.
- Trong `main.ts` đừng đặt hàm tên `fill` (trùng biến `fill` của thanh HUD). Helper ô trống tên `toFill`.
- Có phiên web từng bị chặn kho npm (registry 403). Khi đó dựa vào CI của PR để build + test.
- Claude GitHub App có thể chưa cài cho repo, nên phiên không tự nhận sự kiện PR.
- Thread moodboard đã chạm giới hạn 24 file đính kèm, nên gửi file dạng link `/mnt/project-files/...`.

---

## 4. Repo, nhánh và PR

- **Từ 2026-10-15 dự án chuyển sang repo `Xinhngn/xinhngn`, nhánh `main`** (code của PR #7). Bảng dưới là lịch sử của repo cũ `Xinhngn/EmXinhSayHi` (nhánh chính cũ `claude/xinhos-website`).

| PR | Nhánh | Nội dung | Trạng thái (15/10) |
|---|---|---|---|
| #1 | `claude/tooling-setup` | Chuyển sang Vite + TS, bộ công cụ Claude Code | Đã merge |
| #2 | `claude/remove-mascot-code(-2)` | Dọn code / CSS mascot | Đã merge |
| #4 | `claude/hero-3d` | Cây kem thuỷ tinh 3D WebGL2 ở hero | Mở, chưa merge. Có thể đã lỗi thời vì PR #7 làm lại hero; **[CHỜ XINH]** quyết định đóng hay giữ |
| #5 | `claude/project-thread-ievyl2` | CodeGraph chạy qua `npx` | Mở, chờ Xinh merge |
| #6 | `claude/content-update-vydfp6` | Cập nhật nội dung theo brief | Draft. Đã nằm trong PR #7 |
| #7 | `claude/moodboard-redesign-hf110l` | Giao diện theo moodboard, 7 vòng chỉnh, trang Dự án mới | Draft, CI xanh ở 83cd9bb, **bản mới nhất** |

- Lưu ý: trang chính (nhánh `claude/xinhos-website`) chưa có nội dung mới vì #6 và #7 chưa merge. Xinh từng hỏi "sao chưa có nội dung mới" vì mở nhầm trang chính. Luôn gửi link xem trước của PR #7.
- Gợi ý thứ tự khi Xinh duyệt xong: merge #5, rồi #7 (đã gồm #6; đóng #6 sau khi #7 vào). Chỉ merge khi Xinh bảo.

---

## 5. Lịch sử làm việc trong project

1. **Explore website repo** (14/10): đọc repo, tóm tắt cấu trúc.
2. **Hoàn thiện bước thiếu trong thiết lập** (14/10): CodeGraph MCP không kết nối do hook cài muộn 11 giây. Xinh chọn "Dùng npx" → PR #5.
3. **Cập nhật nội dung XINH.OS** (14/10): áp dụng brief nội dung → PR #6, báo cáo `/mnt/project-files/reports/xinhos-content-update.md`. Thread này còn chờ 4 câu xác nhận (mục 8).
4. **Xem trang neutomni.com** (14/10): không mở được; đã hướng dẫn Xinh quay màn hình gửi video.
5. **Chỉnh thiết kế web theo moodboard** (14/10 → 15/10), PR #7, 7 vòng:
   - v1: cobalt + lime + chrome, bỏ sticker. → Xinh: chưa có nội dung mới; bỏ thanh ảnh ở site 1; phần gỡ rối chìm trong nền đêm; 4 phương pháp lê thê; "Xinh làm được gì" khó đọc, lệch hàng; không thích màu xanh; bộ bài phải nổi tên khách hàng, không bắt bấm chuyển.
   - v2: sửa 6 điểm trên. → Xinh: LV.2 và LV.4 "rất chán", gửi 2 video ref.
   - v3: LV.2 kiểu Libraries.dev, LV.4 tường poster kiểu Jason Yuan. → Xinh gửi brief Art Direction lớn + ref 1–5.
   - v4 (v15d): AD "Futuristic Editorial × Digital Art Playground". Boot bầu trời + vật thể bay + chữ rơi; LV.2 radar; LV.4 accordion. Báo cáo `reports/moodboard-redesign/bao-cao-art-direction-v4.md`. → Xinh: trang mở lệch mood với bên trong; trang trong đen trắng nặng nề.
   - v5 (v15e): cân màu toàn trang theo moodboard, bỏ mảng đen. → Xinh: chữ rơi messy, muốn clean + chuyển động; LV.2 nặng; cụm liên hệ cuối rối; các trang con chưa align.
   - v6 (v15f): boot gọn (6 vật thể), LV.2 lavender sáng, `.end-card`, trang con cùng ngôn ngữ.
   - v7 (v15g): navigation mới, bỏ Xem nhanh, Năng lực vào Hồ sơ, Cách hợp tác ở Liên hệ, bỏ chữ EMXINHSAYHI, trang Dự án 3 bước.
   - Sau đó: chép code vào thư mục máy Xinh, viết lại `HANDOFF.md` trên nhánh.
- Ảnh / video trước-sau: `/mnt/project-files/reports/moodboard-redesign/` (đánh số 1–37; 31–37 là vòng 7).

---

## 6. File và vị trí quan trọng

| Thứ | Ở đâu |
|---|---|
| Hướng dẫn repo | `CLAUDE.md`, `HANDOFF.md` (trên nhánh PR #7) |
| Nội dung còn thiếu | `CONTENT-NEEDED.md` |
| Bản nội dung để chỉnh chữ | `export/XinhNguyen-noi-dung.md` (bản cũ, trước PR #6) |
| Brief nội dung gốc | `/mnt/project-files/uploads/hearth/da070cb0-069d-478e-8dc8-4060e1d4ad90` |
| Báo cáo nội dung | `/mnt/project-files/reports/xinhos-content-update.md` |
| Báo cáo AD v4 + ảnh trước/sau | `/mnt/project-files/reports/moodboard-redesign/` |
| Video ref gốc của Xinh | `/mnt/project-files/Ghi Màn hình 2026-10-15 lúc 02.48.20.mov`, `…02.49.46.mov` |
| File Xinh tải lên | `/mnt/project-files/uploads/hearth/` (đặt tên theo id, xem 2.6) |
| Thư mục máy Xinh | `/Users/macbookpro/Documents/Porfolio-EmXinhSayHi` (đã cho phép xoá file; còn file tạm `.repo.tgz` git đã bỏ qua, Xinh có thể xoá tay) |
| Artifact trang trên claude.ai | `ARTIFACT_URL` = https://claude.ai/artifact/RkAnAJMf5LtoW96VTVcjoc |

---

## 7. Cách Xinh muốn làm việc

- Trả lời tiếng Việt, câu ngắn, rõ.
- **Xong việc luôn gửi link xem trước ngay trong tin nhắn**. Khi có thể, kèm ảnh hoặc video trước/sau.
- Xinh thích **clean, có chuyển động, sáng**. Không thích: diêm dúa / điệu đà, messy, đen trắng nặng nề, màu xanh trên UI, chữ khó đọc, trình bày lê thê, phải bấm từng cái mới xem được.
- Luôn bám moodboard và AD tổng; mỗi section có nhịp riêng nhưng chung một hệ thiết kế.
- Ưu tiên chính xác hơn sáng tạo với nội dung. Không tự sửa nội dung, số liệu, chức danh, kết quả; không viết thêm câu chuyện cho dự án phụ.
- Chữ trên trang có 2 thứ tiếng `.en` / `.vi`; sửa thì sửa cả hai.
- Gom nhiều sửa nhỏ vào một PR. Không merge khi Xinh chưa bảo.

---

## 8. Đang chờ Xinh (gom từ mọi thread)

**Duyệt**
1. Layout mới của trang Dự án (index chữ lớn, thẻ giới thiệu, trang chi tiết).
2. Có merge PR #5, #7 (và đóng #6, xử lý #4) không.

**Nội dung cần Xinh gửi**
3. Cho từng chiến dịch trong `JOBS`: năm, mô tả, vai trò, phần của team, kết quả, ảnh thành phẩm (được phép chia sẻ).
4. Tính chất của 5 dự án "Cần phân loại": Sound Notification for MAX, CSR Vì một thế hệ vươn tầm, Poca "Thế giới vui nhộn", Poca "Thế giới pháp thuật vui nhộn", Ngày hội không tiền mặt.
5. Ảnh: chân dung chính / phụ nếu muốn thay; ảnh dự án cho 5 case + 2 dự án khác.
6. Username Facebook / Messenger; Zalo có khác số điện thoại không; thời gian có thể bắt đầu.
7. (Tuỳ chọn) mã GoatCounter nếu muốn đếm lượt xem công khai.

**Cần xác nhận**
8. 5 năm so với các mốc chức danh (~4 năm 4 tháng).
9. VIB: 4 hay 5 dự án; Sound Notification for MAX có thuộc VIB không.
10. Digimi: phần Xinh trực tiếp làm.
11. Duy Tân: giữ dòng "Thắng pitch cùng team" không.
12. Tiêu đề tiếng Việt case Cake ("Niềm tin mở ra cánh cửa mới" là bản Claude dịch).
13. Ma trận năng lực × dự án (`MX`) gắn đúng chưa.

---

## 9. Việc tiếp theo gợi ý cho phiên mới

1. Đọc `CLAUDE.md`, `HANDOFF.md` trên nhánh `claude/moodboard-redesign-hf110l` và file này. Checkout nhánh đó (hoặc làm trong thư mục máy Xinh), chạy `npm install`.
2. Mở link xem trước để nắm trạng thái thật.
3. Khi Xinh gửi dữ liệu: điền vào `JOBS` / `CASES` / `FACTS` / `CONTACT`, thêm ảnh vào `public/assets/` + `IMAGES` + field ảnh cho job; cập nhật cả `.en` và `.vi`; xoá dần các ô "+ …" tương ứng.
4. Còn nợ từ báo cáo AD v4: bố cục sheet chi tiết case (`#caseSheet`) và tab Hồ sơ mới chủ yếu đổi màu; chưa thử trên iPhone / Safari thật; LV.0 trên điện thoại từng bị thẻ hơi đè nhau do câu tiếng Việt dài.
5. Mỗi lần xong: lint + test + build, đẩy lên nhánh PR, chờ check "Workers Builds" xanh, rồi gửi Xinh link xem trước. Cập nhật `HANDOFF.md` / `CLAUDE.md` khi có thay đổi lớn và đồng bộ thư mục máy Xinh.
