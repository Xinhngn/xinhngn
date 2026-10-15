/**
 * Nội dung chung của trang. Nguồn: docs/HANDOFF-du-an.md và bản chữ đã duyệt trong repo cũ.
 * Luật: không tự thêm số liệu, chức danh, kết quả. Chỗ còn chờ Xinh để trống (''), giao diện tự ẩn.
 */

export type T = { vi: string; en: string };

export const CONTACT = {
  phone: '0975108131',
  phoneLabel: '0975 108 131',
  zalo: '0975108131', // [CHỜ XINH] báo nếu Zalo khác số
  email: 'ngnxinhh@gmail.com',
  linkedin: 'xinh-nguyen-exploremore',
  facebook: '', // [CHỜ XINH]
  cv: '/assets/XinhNguyen-CV.pdf',
  city: 'TP.HCM',
};

export const HERO = {
  hi: 'Em Xinh say hi',
  headline: 'Xinh thích làm chủ.',
  sub: 'Chủ động kiểm soát từ mục tiêu đến kết quả.',
};

export const PROMISE = {
  lead: 'Bạn lo việc kinh doanh.',
  turn: 'Xinh lo dự án về đích.',
  body: 'Xinh làm việc ở giao điểm giữa thương hiệu, truyền thông và quản lý dự án — từ làm rõ mục tiêu, xây dựng kế hoạch đến tổ chức triển khai và theo sát kết quả.',
};

export const BRIEF = {
  eyebrow: 'Đề bài',
  title: 'Có mục tiêu. Có ngân sách. Nhưng bắt đầu từ đâu?',
  body: 'Xinh giúp làm rõ bài toán, xác định việc cần ưu tiên và biến đề bài thành kế hoạch có thể triển khai.',
  cards: [
    'Gỡ đúng vấn đề trước khi bắt tay triển khai.',
    'Ưu tiên đúng việc để tối ưu nguồn lực.',
    'Dùng ngân sách hợp lý theo từng mục tiêu.',
    'Đo đúng hiệu quả bằng KPI phù hợp.',
    'Giữ tiến độ giữa nhiều bên tham gia.',
  ],
};

export const JOURNEY = {
  eyebrow: 'Ai làm',
  title: 'Bốn vai trò, một hành trình tiến lên.',
  body: 'Từ nghiên cứu và lập kế hoạch, đến làm việc với khách hàng, phát triển cơ hội kinh doanh và quản lý dự án đầu cuối. Mỗi vai trò mở rộng thêm một phần việc Xinh có thể đảm nhận.',
};

/** Giữ nguyên chức danh và ngày. [CHỜ XINH] 5 năm so với các mốc (~4 năm 4 tháng). */
export const ROLES = [
  {
    lane: 'PLANNING', title: 'Digital Planning Assistant', when: '04/2022 – 08/2022', verb: 'HIỂU',
    d: 'Nghiên cứu thị trường, đối thủ và khách hàng mục tiêu để làm nền cho kế hoạch truyền thông. Phối hợp team Creative và Media để thông điệp nhất quán, ra đúng hạn.',
    v: 'Với bạn: kế hoạch dựa trên dữ liệu, không phải phỏng đoán.',
  },
  {
    lane: 'CLIENT & DELIVERY', title: 'Account Executive', when: '08/2022 – 09/2024', verb: '+ TRIỂN KHAI',
    d: 'Quản lý dự án truyền thông cho nhiều thương hiệu cùng lúc. Là đầu mối làm việc với khách hàng và các bên liên quan suốt quá trình triển khai. Điều phối team nội bộ, đối tác bên ngoài và theo sát tiến độ, chất lượng.',
    v: 'Với bạn: một đầu mối duy nhất, giữ mọi bên chạy đúng nhịp.',
  },
  {
    lane: 'PITCH & GROWTH', title: 'Senior Business Development cum Assistant Account Director', when: '09/2024 – 04/2026', verb: '+ KẾT NỐI',
    d: 'Xây giải pháp truyền thông dựa trên nghiên cứu, bám sát mục tiêu thương hiệu. Phụ trách pitching, quan hệ khách hàng và mở rộng phạm vi dự án. Điều phối Creative, Account, Media và Production. Quản lý phạm vi, ngân sách, timeline và chất lượng. Kèm 1–2 bạn junior. Ở vai trò Assistant Account Director: giám sát đầu ra và chất lượng của team account, giữ các tài khoản khách hàng chủ chốt ổn định và tăng trưởng, duyệt proposal, ngân sách và báo cáo trước khi gửi khách.',
    v: 'Với bạn: giải pháp bám mục tiêu kinh doanh, ngân sách và chất lượng nằm trong tầm kiểm soát.',
  },
  {
    lane: 'END-TO-END OWNERSHIP', title: 'Associate Account Manager', when: '05/2026 – 08/2026', verb: '+ LÀM CHỦ',
    d: 'Làm chủ dự án truyền thông từ đầu đến cuối: phạm vi, timeline và sản phẩm bàn giao. Quản lý quan hệ, kỳ vọng của khách hàng và xử lý phát sinh. Điều phối các team và đối tác, đảm bảo chất lượng và bàn giao đúng hạn.',
    v: 'Với bạn: một người làm chủ dự án từ brief đến kết quả.',
  },
];

export const METHOD = {
  eyebrow: 'Cách làm',
  title: 'Đúng mục tiêu trước, trúng đầu việc sau.',
};

export const STEPS = [
  { t: 'Làm rõ', k: 'Hiểu đúng trước khi bắt đầu.', d: 'Làm rõ mục tiêu, bối cảnh, phạm vi và tiêu chí thành công.' },
  { t: 'Cấu trúc', k: 'Biến bài toán thành kế hoạch.', d: 'Phân rã đầu việc, xác định thứ tự ưu tiên và xây dựng cách triển khai khả thi.' },
  { t: 'Quản lý triển khai', k: 'Biến kế hoạch thành hành động.', d: 'Chủ động tổ chức công việc, phân bổ nguồn lực và quản lý các bên tham gia để kế hoạch được triển khai đúng hướng.' },
  { t: 'Theo đến kết quả', k: 'Theo sát đến khi vấn đề được xử lý.', d: 'Kiểm soát tiến độ, chất lượng; chủ động xử lý phát sinh và điều chỉnh cách làm khi cần.' },
];

export const PROOF = {
  eyebrow: 'Bằng chứng',
  title: 'Xinh đã làm được gì?',
  body: 'Những dấu mốc, thương hiệu và dự án thể hiện kinh nghiệm của Xinh trong phát triển cơ hội hợp tác và quản lý triển khai.',
  stats: [
    { n: '5', l: 'năm kinh nghiệm' },
    { n: '20', l: 'thương hiệu xuất hiện trong portfolio' },
  ],
  industries: 'Ngân hàng, fintech, tiêu dùng',
  brandNote: 'Brand có mặt ở đây không có nghĩa Xinh trực tiếp quản lý mọi brand.',
};

/** Đúng 20 tên. Không thêm, không bớt. */
export const BRANDS = [
  'VIB', 'MSB', 'Cake by VPBank', 'Digimi', 'BVBank', 'TPBank', 'NCB', 'Poca', "Lay's", 'Hảo Hảo',
  'Nhựa Duy Tân', 'Cindy Bloom', 'LiveSpo COLON', 'Chanté', 'Wake-Up Tây Nguyên', 'Tam Thái Tử', 'Vihawa', 'MEATDeli', 'Van Gogh', 'Dược phẩm Hoa Linh',
];

/** 9 nhãn năng lực. [CHỜ XINH] rà ma trận năng lực × dự án. */
export const SKILLS = [
  { k: 'imc', g: 'run', t: 'Chiến dịch IMC', d: 'Chiến dịch tích hợp và ra mắt: một ý tưởng lớn chạy xuyên paid, owned, earned, KOL và on-ground, từ kế hoạch đến báo cáo.' },
  { k: 'awo', g: 'run', t: 'Quản lý social', d: 'Vận hành kênh thương hiệu tháng này qua tháng khác: trụ cột nội dung, lịch đăng, quy trình sản xuất, cộng đồng và báo cáo tháng.' },
  { k: 'act', g: 'run', t: 'Activation & sự kiện', d: 'Đưa thương hiệu ra đời thực và gắn trải nghiệm với hành động đếm được: đăng ký, dùng thử, mua hàng.' },
  { k: 'prod', g: 'run', t: 'Sản xuất', d: 'Video, key visual và nội dung social: kịch bản, quay dựng cùng production house và talent, duyệt từng sản phẩm trước khi lên sóng.' },
  { k: 'pitch', g: 'own', t: 'Pitching & proposal', d: 'Đọc ra nhu cầu kinh doanh thật, rồi định hình proposal và buổi pitch quanh nó.' },
  { k: 'exec', g: 'own', t: 'Từ kế hoạch đến triển khai', d: 'Lên kế hoạch, rồi trực tiếp triển khai đến nghiệm thu.' },
  { k: 'stake', g: 'own', t: 'Quản lý khách hàng & các bên liên quan', d: 'Đầu mối chính: kỳ vọng, feedback và phát sinh, giữ team nội bộ, agency và đối tác cùng nhịp.' },
  { k: 'ctrl', g: 'own', t: 'Quản lý tiến độ · ngân sách · chất lượng', d: 'Giữ phạm vi, ngân sách, tiến độ và chất lượng trong tầm kiểm soát khi dự án chạy.' },
  { k: 'paper', g: 'own', t: 'Hồ sơ & báo cáo', d: 'Brief, báo giá, hợp đồng, nghiệm thu và báo cáo khép lại dự án.' },
] as const;

export type SkillKey = (typeof SKILLS)[number]['k'];

/** Ma trận từ repo cũ: 1 = Xinh dẫn, 2 = cùng team, 0 = không thuộc phạm vi. Thứ tự theo SKILLS. */
export const MX: Record<string, number[]> = {
  vib: [1, 0, 1, 2, 1, 1, 1, 1, 2],
  msb: [0, 1, 0, 1, 1, 1, 1, 2, 2],
  cake: [0, 2, 0, 0, 2, 0, 1, 0, 0],
  poca: [1, 0, 0, 2, 0, 1, 1, 0, 0],
  digimi: [0, 2, 1, 2, 0, 1, 2, 0, 2],
  duytan: [1, 2, 0, 2, 1, 2, 1, 0, 0],
  cindy: [1, 2, 0, 1, 1, 1, 1, 0, 0],
};

export const COLLAB = {
  eyebrow: 'Bạn nhận được gì',
  title: 'Bắt đầu với một dự án, hoặc cả một đội.',
  body: 'Hai cách hợp tác, cách nào cũng có một người chịu trách nhiệm đến cùng.',
  solo: {
    tag: 'SOLO · Theo dự án',
    title: 'Một người, trọn dự án.',
    body: 'Từ đọc brief, lên kế hoạch, quản lý triển khai đến nghiệm thu và báo cáo, bạn làm việc trực tiếp với một đầu mối xuyên suốt.',
    fit: 'Hợp với dự án cần một người quản lý đầu-cuối hoặc team cần thêm một project owner.',
    cta: 'Bắt đầu một dự án',
  },
  squad: {
    tag: 'SQUAD · Team trọn gói',
    title: 'Một đội chất lượng, lắp theo dự án.',
    body: 'Xinh kết hợp với mạng lưới đối tác phù hợp theo từng bài toán và tiếp tục chịu trách nhiệm quản lý triển khai.',
    network: ['IMC', 'Social', 'Activation', 'Production', 'Ý tưởng & content', 'Thiết kế/KV', 'KOL/KOC', 'Media', 'Production house'],
    cta: 'Lắp đội cho tôi',
  },
  promise: {
    title: 'Cả hai cách, Xinh đều cam kết',
    items: [
      'Phạm vi, timeline, ngân sách rõ từ ngày đầu',
      'Cập nhật đều đặn, có vấn đề báo sớm',
      'Kiểm soát chất lượng trước khi lên sóng',
      'Báo cáo và rút kinh nghiệm khi phù hợp',
    ],
  },
};

export const PROFILE = {
  title: 'Người làm chủ dự án · Brand & Truyền thông',
  body: 'Xinh làm việc ở giao điểm giữa hiểu bài toán kinh doanh, phát triển cơ hội hợp tác và đưa kế hoạch vào triển khai thực tế.',
  years: '5 năm kinh nghiệm trong Marketing & Communication, phát triển từ Digital Planning và Account đến Business Development và quản lý dự án.',
  education: 'Cử nhân Hành chính công, Học viện Cán bộ TP.HCM',
};

/** Vai trò mục tiêu, không phải chức danh Xinh từng giữ. */
export const TARGET_ROLES = ['Marketing Project Manager', 'Marketing Communications', 'Campaign Management'];

export const FIT = 'Ưu tiên Banking & Fintech, sẵn sàng mở rộng sang ngành khác. TP.HCM hoặc remote. Hợp tác theo dự án hoặc theo tháng.';

export const FINISH = {
  eyebrow: 'Đến lượt bạn',
  body: 'Lúc mở màn Xinh đã say hi. Giờ đến lượt bạn: chọn một kênh, Xinh say hi lại liền.',
  cta: 'Say hi ngay',
};
