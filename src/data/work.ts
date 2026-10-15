/**
 * 5 case chính và toàn bộ chiến dịch. Chữ lấy nguyên từ bản đã duyệt.
 * Phần Xinh làm (me) và phần team làm (team) luôn tách riêng.
 * Số liệu chỉ gắn đúng dự án của nó. Trường trống = [CHỜ XINH], giao diện tự ẩn.
 */

export type Result = { b: string; l: string };

export type Case = {
  slug: string;
  key: string; // khoá khách hàng, dùng cho bộ lọc và ma trận năng lực
  brand: string;
  title: string;
  tagline: string;
  meta: string;
  period: string;
  role: string;
  context: string;
  me: string;
  team: string;
  lesson?: string;
  journey: string[];
  outcome: string;
  results: Result[];
  source?: string;
  note?: string; // lưu ý hiện nhỏ, ví dụ kết quả là của team
};

export const CASES: Case[] = [
  {
    slug: 'msb', key: 'msb', brand: 'MSB',
    title: 'Từ pitching đến vận hành đa kênh',
    tagline: 'Sửa cách làm việc, không chỉ nội dung.',
    meta: 'Banking · Always-on · Production · Media',
    period: '2025 – 2027',
    role: 'Từ pitching đến triển khai',
    context: 'Định hướng social dài hạn rõ hơn sau ba năm, và bớt điểm nghẽn quy trình.',
    me: 'Định hình proposal quanh mối lo thật của client. Sau kick-off, liên tục hỏi cảm nhận về chất lượng và biến feedback thành điều chỉnh.',
    team: 'Chiến lược và proposal xây cùng team: vai trò kênh, giọng điệu theo nền tảng, báo cáo phân tích, nguồn ý tưởng.',
    journey: ['Social AWO 2025–2027', 'AWO · Production · Booking · Media'],
    outcome: 'Mối hợp tác được mở rộng từ 3 lên 5 năm. Đây là kết quả hợp tác chung, cùng với team.',
    results: [{ b: '3 → 5', l: 'năm hợp tác' }],
  },
  {
    slug: 'vib', key: 'vib', brand: 'VIB',
    title: 'Một lần pitch, một đối tác dài hạn',
    tagline: 'Một lần pitch, một đối tác dài hạn.',
    meta: 'Banking · Pitch → Execution',
    period: '',
    role: 'Từ pitching đến quản lý chung',
    context: 'Thông điệp bắt tai cho Ivy Card, đúng định vị, kéo KPI mở thẻ.',
    me: 'Tìm nhu cầu cốt lõi, định hướng proposal, điều phối team chuyên môn. Sau đó dẫn pitch và quản lý Anh Trai Say Hi, activation Ivy Card.',
    team: 'Pitch là nỗ lực chung với các team chuyên môn.',
    lesson: 'Proposal tốt bắt đầu từ mục tiêu thật. Thông điệp sản phẩm là phương tiện, không phải đích đến.',
    // [CHỜ XINH] Sound Notification for MAX có thuộc VIB không.
    journey: ['VIB Ivy Card', 'Anh Trai Say Hi', 'Bộ Tứ Báo Thủ · video', 'Ngày hội không tiền mặt', 'Sound Notification for MAX'],
    outcome: 'Từ một lần pitch, mối hợp tác kéo dài hơn và mở ra nhiều dự án tiếp theo.',
    results: [{ b: 'Nhiều dự án', l: 'từ một lần pitch' }],
  },
  {
    slug: 'cake', key: 'cake', brand: 'Cake by VPBank',
    // [CHỜ XINH] tiêu đề tiếng Việt là bản dịch, chưa duyệt.
    title: 'Niềm tin mở ra cánh cửa mới',
    tagline: 'Một mối quan hệ mở ra cánh cửa mới.',
    meta: 'Digital bank · New business',
    period: '',
    role: 'Góp sức vào quá trình pitching',
    context: 'Mở rộng Gen Y mà không làm loãng chất Gen Z.',
    me: 'Một client cũ ở Digimi chuyển sang Cake và mời Xinh vào pitch. Xinh kết nối lại và góp sức vào quá trình pitching.',
    team: 'Sáng tạo (Cake AI-land, tương tác bình luận, bộ ảnh WeChoice, mascot Gato) là của team agency.',
    journey: [],
    outcome: 'Team giành được social retainer.',
    results: [{ b: 'Giành social retainer', l: 'quan hệ mở cửa, team thắng pitch' }],
    note: 'Kết quả của team.',
  },
  {
    slug: 'poca-yummy', key: 'poca', brand: 'Poca Yummy',
    title: 'Giờ ra chơi thành khoảnh khắc thương hiệu',
    tagline: 'Giờ ra chơi thành khoảnh khắc thương hiệu.',
    meta: 'FMCG · Integrated launch · 2023',
    period: '2023',
    role: 'Điều phối các hạng mục chính',
    context: 'Ra mắt sub-brand mới giữa thị trường snack đông đúc. Nền tảng QUẨY-VERSE.',
    me: 'Điều phối các hạng mục chính: MV chính, CapCut challenge, TikToker, cộng đồng và trang comic.',
    team: '',
    journey: ['Thế giới vui nhộn', 'Poca - Thế giới pháp thuật vui nhộn', 'Poca Yummy - Launching campaign'],
    outcome: 'Đây là kết quả của cả chiến dịch, không phải kết quả cá nhân.',
    results: [{ b: '266K+', l: 'tương tác Facebook' }, { b: '45.7K+', l: 'click website' }],
    source: 'Nguồn: Xanh Credential 2024',
  },
  {
    slug: 'digimi-bvbank', key: 'digimi', brand: 'Digimi × BVBank',
    title: 'Từ nền tảng Account đến Project Ownership',
    tagline: 'Từ ly cà phê đến lượt đăng ký app.',
    meta: 'Digital banking · Activation · Social',
    period: '',
    role: '', // [CHỜ XINH] phần Xinh trực tiếp làm
    context: 'BVBank là một trong những khách hàng đầu tiên trong sự nghiệp của Xinh. Digimi × BVBank là nơi Xinh làm quen với mảng ngân hàng số, qua social always-on, chiến dịch sinh nhật, activation và CSR.',
    me: 'Xe cà phê dùng khoảnh khắc quen thuộc để giới thiệu Digimi: trải nghiệm → tương tác → đăng ký.',
    team: 'Lịch nội dung, sản xuất hình ảnh và video, thống nhất các bên, kiểm tra chất lượng: dự trù → điều phối → review → cải thiện.',
    journey: ['Social AWO', 'Tròn một tuổi – Đầy Thank Xuân', 'Coffee Truck', 'CSR · Vì một thế hệ vươn tầm'],
    outcome: 'Kết quả chiến dịch, gắn với từng hoạt động. Không phải kết quả cá nhân.',
    results: [
      { b: '~2,000', l: 'lượt ghé booth · Coffee Truck' },
      { b: '268', l: 'đăng ký · Coffee Truck' },
      { b: '140', l: 'chuyển đổi · Coffee Truck' },
      { b: '500+', l: 'người tham dự · Sinh nhật' },
      { b: '450', l: 'tài khoản mở offline · Sinh nhật' },
      { b: '1.5M', l: 'reach online · Sinh nhật' },
    ],
  },
];

export const KINDS = [
  { k: 'imc', t: 'IMC & ra mắt' },
  { k: 'awo', t: 'Social & always-on' },
  { k: 'act', t: 'Activation & sự kiện' },
  { k: 'prod', t: 'Sản xuất' },
  { k: 'pitch', t: 'Pitch & proposal' },
  { k: 'tbd', t: 'Cần phân loại' },
] as const;

export type KindKey = (typeof KINDS)[number]['k'];

export const CLIENTS = [
  { k: 'msb', n: 'MSB', ind: 'Ngân hàng' },
  { k: 'vib', n: 'VIB', ind: 'Ngân hàng' },
  { k: 'cake', n: 'Cake by VPBank', ind: 'Ngân hàng số' },
  { k: 'digimi', n: 'Digimi × BVBank', ind: 'Ngân hàng số' },
  { k: 'tpbank', n: 'TPBank', ind: 'Ngân hàng' },
  { k: 'ncb', n: 'NCB', ind: 'Ngân hàng' },
  { k: 'poca', n: 'Poca', ind: 'FMCG · snack' },
  { k: 'masan', n: 'Masan', ind: 'FMCG · các nhãn cùng tập đoàn' },
  { k: 'meatdeli', n: 'MEATDeli', ind: 'FMCG' },
  { k: 'duytan', n: 'Nhựa Duy Tân', ind: 'Tiêu dùng' },
  { k: 'cindy', n: 'Cindy Bloom', ind: 'Tiêu dùng' },
] as const;

export type Job = {
  id: string;
  c: (typeof CLIENTS)[number]['k'];
  n: string;
  y: string; // '' = [CHỜ XINH]
  ty: KindKey[];
  role?: string;
  me?: string;
  out?: string;
  results?: Result[];
  caseSlug?: string;
};

/** 22 chiến dịch của 11 khách hàng. Dự án phụ chỉ liệt kê, không viết thêm chuyện. */
export const JOBS: Job[] = [
  { id: 'msb-awo', c: 'msb', n: 'Social Always On', y: '2025–2027', ty: ['awo', 'pitch', 'prod'], caseSlug: 'msb', results: [{ b: '3 → 5', l: 'năm hợp tác' }] },
  { id: 'vib-ivy', c: 'vib', n: 'VIB Ivy Card', y: '', ty: ['pitch', 'imc'], caseSlug: 'vib' },
  { id: 'vib-ats', c: 'vib', n: 'Anh Trai Say Hi', y: '', ty: ['act'], caseSlug: 'vib', me: 'Dẫn pitch và quản lý Anh Trai Say Hi.' },
  { id: 'vib-btbt', c: 'vib', n: 'Bộ Tứ Báo Thủ · video', y: '', ty: ['prod'], caseSlug: 'vib' },
  { id: 'vib-cashless', c: 'vib', n: 'Ngày hội không tiền mặt', y: '', ty: ['act'], caseSlug: 'vib' },
  { id: 'vib-max', c: 'vib', n: 'Sound Notification for MAX', y: '', ty: ['tbd'], caseSlug: 'vib' },
  { id: 'cake-social', c: 'cake', n: 'Pitch social retainer', y: '', ty: ['pitch', 'awo'], caseSlug: 'cake', out: 'Team giành được social retainer.' },
  { id: 'digimi-awo', c: 'digimi', n: 'Social AWO', y: '', ty: ['awo', 'prod'], caseSlug: 'digimi-bvbank' },
  {
    id: 'digimi-bday', c: 'digimi', n: 'Tròn một tuổi – Đầy Thank Xuân', y: '', ty: ['act', 'imc'], caseSlug: 'digimi-bvbank',
    results: [{ b: '500+', l: 'người tham dự' }, { b: '450', l: 'tài khoản mở offline' }, { b: '1.5M', l: 'reach online' }],
  },
  {
    id: 'digimi-truck', c: 'digimi', n: 'Coffee Truck', y: '', ty: ['act'], caseSlug: 'digimi-bvbank',
    results: [{ b: '~2,000', l: 'lượt ghé booth' }, { b: '268', l: 'đăng ký' }, { b: '140', l: 'chuyển đổi' }],
  },
  { id: 'digimi-csr', c: 'digimi', n: 'CSR · Vì một thế hệ vươn tầm', y: '', ty: ['tbd'], caseSlug: 'digimi-bvbank' },
  { id: 'tpbank-concert', c: 'tpbank', n: 'Em Xinh Say Hi Concert 1', y: '', ty: ['pitch', 'act'], role: 'Từ pitching đến triển khai' },
  {
    id: 'ncb-awo', c: 'ncb', n: 'Social Always On 2025', y: '2025', ty: ['awo'],
    me: 'Chạy giai đoạn đầu. Nhận ra vấn đề của khách hàng chưa được làm rõ, vào cuộc làm rõ, đưa dự án về đúng hướng rồi bàn giao lại cho Account.',
  },
  { id: 'poca-launch', c: 'poca', n: 'Poca Yummy · ra mắt QUẨY-VERSE', y: '2023', ty: ['imc', 'prod'], caseSlug: 'poca-yummy', results: [{ b: '266K+', l: 'tương tác Facebook' }, { b: '45.7K+', l: 'click website' }] },
  { id: 'poca-tgvn', c: 'poca', n: 'Thế giới vui nhộn', y: '', ty: ['tbd'], caseSlug: 'poca-yummy' },
  { id: 'poca-magic', c: 'poca', n: 'Poca – Thế giới pháp thuật vui nhộn', y: '', ty: ['tbd'], caseSlug: 'poca-yummy' },
  { id: 'masan-chante', c: 'masan', n: 'Chanté · Social Always On', y: '', ty: ['awo'] },
  { id: 'masan-vihawa', c: 'masan', n: 'Vihawa · Social Campaign 2025', y: '2025', ty: ['awo'] },
  { id: 'masan-wakeup', c: 'masan', n: 'Wake-Up Tây Nguyên · Social Campaign', y: '', ty: ['awo'] },
  { id: 'meatdeli-q4', c: 'meatdeli', n: 'Social Campaign Q4.2025', y: '2025', ty: ['pitch', 'awo'], role: 'Pitching, sau đó bàn giao cho Account' },
  {
    id: 'duytan-tet', c: 'duytan', n: 'Tết 2025', y: '2025', ty: ['pitch', 'awo', 'prod'], role: 'Kế hoạch truyền thông · Pitching',
    me: 'Kế hoạch truyền thông, pitching, always-on, production, booking và media.',
    out: 'Thắng pitch, cùng team.', // [CHỜ XINH] có giữ dòng này không
  },
  { id: 'cindy-launch', c: 'cindy', n: 'Chiến dịch ra mắt', y: '', ty: ['imc', 'pitch', 'prod'], role: 'Từ pitching đến triển khai', me: 'Từ pitch đến triển khai, production và social campaign.' },
];

export const clientName = (k: string) => CLIENTS.find((c) => c.k === k)?.n ?? k;
export const kindName = (k: string) => KINDS.find((x) => x.k === k)?.t ?? k;
