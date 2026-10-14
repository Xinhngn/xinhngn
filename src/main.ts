// @ts-nocheck
// XINH.OS page logic, moved verbatim from the old single-file page (src/page.html).
// Type checking is off for this file for now; move pieces into typed modules over time.
// CONFIG (contacts, image slots, CV link) is at the top of the function below.
import './styles.css';

(function(){
  /* =====================================================================
     CONFIG — fill these in. Leave a value empty to show it as "coming soon".
     ===================================================================== */
  var CONTACT = {
    phone: '0975108131', // used for Call + Zalo
    zalo: '',         // Zalo phone or id if different from phone
    facebook: '',     // e.g. 'xinh.nguyen' (facebook.com/<this>)
    linkedin: 'xinh-nguyen-exploremore',
    email: 'ngnxinhh@gmail.com'
  };
  // Image slots: map a slot file name to an image URL to replace the placeholder.
  var IMAGES = {
    'portrait.png': 'assets/portrait.webp',
    'hi.png': 'assets/xinh-hi.webp', 'lv1.png': 'assets/lv1.webp', 'lv2.png': 'assets/lv2.webp', 'lv3.png': 'assets/lv3.webp', 'lv4.png': 'assets/lv4.webp', 'work.png': 'assets/xinh-work.webp', 'go.png': 'assets/xinh-go.webp', 'chill.png': 'assets/xinh-chill.webp',
  };
  // Link to your CV (PDF on Google Drive / Canva / any public URL). Empty = button hidden.
  var CV_URL = 'assets/XinhNguyen-CV.pdf';
  var ARTIFACT_URL = 'https://claude.ai/artifact/RkAnAJMf5LtoW96VTVcjoc';
  var GOATCOUNTER = ''; // e.g. 'https://xinh.goatcounter.com/count' — only used when hosted outside claude.ai

  var root = document.documentElement;
  root.classList.add('js');
  /* Edit mode: open the link with #edit to see every missing photo / fact; #edit-off to leave. */
  var EDIT = false;
  try{ var hh0 = (location.hash || '').slice(1); if (hh0 === 'edit') localStorage.setItem('xinhos-edit', '1'); if (hh0 === 'edit-off') localStorage.removeItem('xinhos-edit'); EDIT = localStorage.getItem('xinhos-edit') === '1'; }catch(e){ EDIT = location.hash === '#edit'; }
  if (EDIT) root.classList.add('edit');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && matchMedia('(pointer: fine)').matches;
  function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
  function $(s, c){ return (c || document).querySelector(s); }
  function $$(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  var lang = 'en';
  function L(o){ return o == null ? '' : (typeof o === 'string' ? o : (o[lang] || o.en || '')); }
  function both(o){ return '<span class="en">' + esc(o.en) + '</span><span class="vi">' + esc(o.vi) + '</span>'; }
  function ph(name, small){
    var src = IMAGES[name];
    if (src) return '<div class="ph" data-img="' + esc(name) + '"><img src="' + esc(src) + '" alt=""></div>';
    if (EDIT) return '<div class="ph" data-img="' + esc(name) + '"><span>' + esc(name) + (small ? '<small>' + esc(small) + '</small>' : '') + '</span></div>';
    return '';
  }
  function need(txt){ return EDIT ? '<span class="need">+ ' + esc(txt) + '</span>' : ''; }
  function cover(c){
    var src = IMAGES[c.imgs[0]];
    if (src) return '<div class="ph" data-img="' + esc(c.imgs[0]) + '"><img src="' + esc(src) + '" alt=""></div>';
    return '<div class="cov" style="--bg:' + c.bg + '; --fg:' + c.fg + '"><b>' + esc(c.brand) + '</b><i aria-hidden="true">✦</i>' + (EDIT ? '<span class="slot">' + esc(c.imgs[0]) + '</span>' : '') + '</div>';
  }
  function portrait(name){
    var src = IMAGES[name] || IMAGES['portrait.png'];
    if (src) return '<div class="ph"><img src="' + esc(src) + '" alt="Xinh Nguyễn"></div>';
    return '<div class="mono-pt"><svg class="lq" viewBox="0 0 300 300" aria-hidden="true"><text x="150" y="236" text-anchor="middle" font-size="260" fill="url(#gIrid)" stroke-width="6" filter="url(#liquid)">x</text></svg><span class="cap">XINH NGUYỄN</span>' + (EDIT ? '<span class="slot">' + esc(name) + '</span>' : '') + '</div>';
  }
  function hydrateImgs(){ $$('[data-portrait]').forEach(function(el){ el.innerHTML = portrait(el.dataset.portrait); }); }

  /* =====================================================================
     DATA
     ===================================================================== */
  var ROLES = [
    {lane:'PLANNING', t:'Digital Planning Assistant', short:'Planning Assistant', y:'2022', w:'04/2022 – 08/2022', s:25,
     d:{en:'Researched market, competitors and audiences to ground the communication plan. Coordinated Creative and Media so the message stayed consistent and on time.', vi:'Nghiên cứu thị trường, đối thủ và khách hàng mục tiêu để làm nền cho kế hoạch truyền thông. Phối hợp team Creative và Media để thông điệp nhất quán, ra đúng hạn.'},
     v:{en:'For you: plans built on data, not guesses.', vi:'Với bạn: kế hoạch dựa trên dữ liệu, không phải phỏng đoán.'}, sc:{en:'UNDERSTAND', vi:'HIỂU'}},
    {lane:'CLIENT & DELIVERY', t:'Account Executive', short:'Account Executive', y:'2022–24', w:'08/2022 – 09/2024', s:50,
     d:{en:'Managed communication projects for several brands at once. Main contact for clients and stakeholders through delivery. Coordinated internal teams and outside partners, and tracked progress and quality.', vi:'Quản lý dự án truyền thông cho nhiều thương hiệu cùng lúc. Là đầu mối làm việc với khách hàng và các bên liên quan suốt quá trình triển khai. Điều phối team nội bộ, đối tác bên ngoài và theo sát tiến độ, chất lượng.'},
     v:{en:'For you: one point of contact who keeps every party moving.', vi:'Với bạn: một đầu mối duy nhất, giữ mọi bên chạy đúng nhịp.'}, sc:{en:'+ DELIVER', vi:'+ TRIỂN KHAI'}},
    {lane:'PITCH & GROWTH', t:'Senior Business Development cum Assistant Account Director', short:'Senior BD × Asst. Account Director', y:'2024–26', w:'09/2024 – 04/2026', s:75,
     d:{en:'Built research-based communication solutions tied to brand goals. Led pitches, client relationships and scope growth. Coordinated Creative, Account, Media and Production. Managed scope, budget, timeline and quality. Mentored 1–2 juniors. As Assistant Account Director: oversaw the account team\u2019s output and quality, kept key client accounts healthy and growing, and signed off proposals, budgets and reports before they reached the client.', vi:'Xây giải pháp truyền thông dựa trên nghiên cứu, bám sát mục tiêu thương hiệu. Phụ trách pitching, quan hệ khách hàng và mở rộng phạm vi dự án. Điều phối Creative, Account, Media và Production. Quản lý phạm vi, ngân sách, timeline và chất lượng. Kèm 1–2 bạn junior. Ở vai trò Assistant Account Director: giám sát đầu ra và chất lượng của team account, giữ các tài khoản khách hàng chủ chốt ổn định và tăng trưởng, duyệt proposal, ngân sách và báo cáo trước khi gửi khách.'},
     v:{en:'For you: solutions tied to business goals, with budget and quality under control.', vi:'Với bạn: giải pháp bám mục tiêu kinh doanh, ngân sách và chất lượng nằm trong tầm kiểm soát.'}, sc:{en:'+ CONNECT', vi:'+ KẾT NỐI'}},
    {lane:'END-TO-END OWNERSHIP', t:'Associate Account Manager', short:'Associate Account Manager', y:'2026', w:'05/2026 – 08/2026', s:100,
     d:{en:'Owned communication projects end to end: scope, timeline and deliverables. Managed client relationships, expectations and issues. Coordinated cross-functional teams and partners, and drove quality and on-time delivery.', vi:'Làm chủ dự án truyền thông từ đầu đến cuối: phạm vi, timeline và sản phẩm bàn giao. Quản lý quan hệ, kỳ vọng của khách hàng và xử lý phát sinh. Điều phối các team và đối tác, đảm bảo chất lượng và bàn giao đúng hạn.'},
     v:{en:'For you: one person who owns the project from brief to result.', vi:'Với bạn: một người làm chủ dự án từ brief đến kết quả.'}, sc:{en:'+ OWN', vi:'+ LÀM CHỦ'}}
  ];
  var STEPS = [
    {t:{en:'Clarify', vi:'Làm rõ'}, k:{en:'Goal before tasks', vi:'Mục tiêu trước công việc'}, d:{en:'Define the goal, context, scope and what success looks like.', vi:'Xác định mục tiêu, bối cảnh, phạm vi và tiêu chí thành công.'}},
    {t:{en:'Structure', vi:'Cấu trúc'}, k:{en:'From problem to plan', vi:'Từ bài toán thành kế hoạch'}, d:{en:'Break the work into tasks, dependencies and priorities, and agree how it will run.', vi:'Phân rã đầu việc, dependency, ưu tiên và cách vận hành.'}},
    {t:{en:'Coordinate', vi:'Điều phối'}, k:{en:'Right people, right roles', vi:'Đúng người, đúng vai trò'}, d:{en:'Connect the team, the client and partners, and put the right resources on each part.', vi:'Kết nối team, client và partner; phân bổ nguồn lực phù hợp.'}},
    {t:{en:'Follow through', vi:'Theo đến kết quả'}, k:{en:'From plan to outcome', vi:'Từ kế hoạch đến outcome'}, d:{en:'Track progress, control quality and optimise before small issues grow.', vi:'Theo sát tiến độ, kiểm soát chất lượng, chủ động tối ưu.'}}
  ];
  /* One benchmark for every project. Columns follow the wording of Vietnamese agency / brand JDs
     (Account Manager, Brand Executive, Marketing Project Manager). 1 = I led it, 2 = part of the team, 0 = not in scope. */
  var COLS = [
    {k:'imc', g:'type', t:{en:'IMC campaign', vi:'Chiến dịch IMC'},
     d:{en:'Integrated campaigns and launches: one big idea carried across paid, owned, earned, KOL and on-ground, from plan to report.', vi:'Chiến dịch tích hợp và ra mắt: một ý tưởng lớn chạy xuyên paid, owned, earned, KOL và on-ground, từ kế hoạch đến báo cáo.'},
     jd:{en:'"Execute IMC campaigns", "launch plan", "KOL / KOC booking"', vi:'"Triển khai chiến dịch IMC", "kế hoạch ra mắt", "booking KOL / KOC"'}},
    {k:'awo', g:'type', t:{en:'Social management', vi:'Quản lý social'},
     d:{en:'Running brand channels month after month: content pillars, calendar, production flow, community and the monthly report.', vi:'Vận hành kênh thương hiệu tháng này qua tháng khác: trụ cột nội dung, lịch đăng, quy trình sản xuất, cộng đồng và báo cáo tháng.'},
     jd:{en:'"Manage always-on social", "content calendar", "channel performance report"', vi:'"Quản lý social always-on", "lịch nội dung", "báo cáo hiệu quả kênh"'}},
    {k:'act', g:'type', t:{en:'Activation & event', vi:'Activation & sự kiện'},
     d:{en:'Taking the brand offline and tying the experience to an action you can count: sign-ups, trials, sales.', vi:'Đưa thương hiệu ra đời thực và gắn trải nghiệm với hành động đếm được: đăng ký, dùng thử, mua hàng.'},
     jd:{en:'"Activation", "on-ground event", "trade & experiential"', vi:'"Activation", "sự kiện on-ground", "trải nghiệm thương hiệu"'}},
    {k:'prod', g:'type', t:{en:'Production', vi:'Sản xuất'},
     d:{en:'Video, key visuals and social content: script, shoot and edit with production houses and talent, every asset checked before it goes live.', vi:'Video, key visual và nội dung social: kịch bản, quay dựng cùng production house và talent, duyệt từng sản phẩm trước khi lên sóng.'},
     jd:{en:'"Oversee asset production", "TVC / video / KV", "work with production houses"', vi:'"Giám sát sản xuất ấn phẩm", "TVC / video / KV", "làm việc với production house"'}},
    {k:'pitch', g:'own', t:{en:'Pitch & proposal', vi:'Pitch & proposal'},
     d:{en:'Reading the real business need, then shaping the proposal and the pitch around it.', vi:'Đọc ra nhu cầu kinh doanh thật, rồi định hình proposal và buổi pitch quanh nó.'},
     jd:{en:'"New business", "prepare proposals", "pitch to clients"', vi:'"Phát triển khách hàng mới", "chuẩn bị proposal", "pitch với khách hàng"'}},
    {k:'exec', g:'own', t:{en:'Plan → execution', vi:'Từ plan đến triển khai'},
     d:{en:'Writing the plan, then running it myself through to sign-off.', vi:'Lên kế hoạch, rồi trực tiếp triển khai đến nghiệm thu.'},
     jd:{en:'"End-to-end project management", "from planning to execution"', vi:'"Quản lý dự án đầu cuối", "từ lập kế hoạch đến triển khai"'}},
    {k:'stake', g:'own', t:{en:'Client & stakeholders', vi:'Khách hàng & các bên'},
     d:{en:'Main point of contact: expectations, feedback and issues, with internal teams, agencies and partners aligned.', vi:'Đầu mối chính: kỳ vọng, feedback và phát sinh, giữ team nội bộ, agency và đối tác cùng nhịp.'},
     jd:{en:'"Client relationship", "stakeholder management", "coordinate internal teams"', vi:'"Quan hệ khách hàng", "quản lý các bên liên quan", "điều phối team nội bộ"'}},
    {k:'ctrl', g:'own', t:{en:'Timeline · budget · quality', vi:'Timeline · ngân sách · chất lượng'},
     d:{en:'Keeping scope, money, dates and quality under control while the work moves.', vi:'Giữ phạm vi, ngân sách, tiến độ và chất lượng trong tầm kiểm soát khi dự án chạy.'},
     jd:{en:'"Manage timeline and budget", "ensure quality and on-time delivery"', vi:'"Quản lý timeline và ngân sách", "đảm bảo chất lượng, đúng hạn"'}},
    {k:'paper', g:'own', t:{en:'Paperwork & reporting', vi:'Giấy tờ & báo cáo'},
     d:{en:'Briefs, quotes, contracts, acceptance and the report that closes the loop.', vi:'Brief, báo giá, hợp đồng, nghiệm thu và báo cáo khép lại dự án.'},
     jd:{en:'"Quotations, contracts, acceptance", "campaign reports"', vi:'"Báo giá, hợp đồng, nghiệm thu", "báo cáo chiến dịch"'}}
  ];
  var MX = {
    vib:    [1,0,1,2, 1,1,1,1,2],
    msb:    [0,1,0,1, 1,1,1,2,2],
    cake:   [0,2,0,0, 2,0,1,0,0],
    poca:   [1,0,0,2, 0,1,1,0,0],
    digimi: [0,2,1,2, 0,1,2,0,2],
    duytan: [1,2,0,2, 1,2,1,0,0],
    cindy:  [1,2,0,1, 1,1,1,0,0]
  };
  var CATS = [{k:'all', t:{en:'All', vi:'Tất cả'}}, {k:'bank', t:{en:'Banking & fintech', vi:'Ngân hàng & fintech'}}, {k:'fmcg', t:{en:'Consumer', vi:'Tiêu dùng'}}]
    .concat(COLS.filter(function(c){ return c.g === 'type' || c.k === 'pitch'; }).map(function(c){ return {k:c.k, t:c.t}; }));
  var CASES = [
    {id:'vib', brand:'VIB', cats:['bank','pitch','act'], size:'big', grad:'linear-gradient(135deg,#ffe7a3,#ffd3ec 60%,#cfd8ff)',
     subs:['IVY CARD','ANH TRAI SAY HI','ACTIVATION'], meta:'BANKING · PITCH → EXECUTION',
     t:{en:'One pitch, a long-term partner.', vi:'Một lần pitch, một đối tác dài hạn.'},
     ask:{en:'A catchy Ivy Card message that fits the positioning and drives new card opens.', vi:'Thông điệp bắt tai cho Ivy Card, đúng định vị, kéo KPI mở thẻ.'},
     me:{en:'Found the core need, shaped the proposal, coordinated specialists. Then led pitching and management for Anh Trai Say Hi and the Ivy Card activation.', vi:'Tìm nhu cầu cốt lõi, định hướng proposal, điều phối team chuyên môn. Sau đó dẫn pitch và quản lý Anh Trai Say Hi, activation Ivy Card.'},
     team:{en:'The pitch was a team effort with specialist teams.', vi:'Pitch là nỗ lực chung với các team chuyên môn.'},
     lesson:{en:'A good proposal starts with the real objective. The product message is a means, not the goal.', vi:'Proposal tốt bắt đầu từ mục tiêu thật. Thông điệp sản phẩm là phương tiện, không phải đích đến.'},
     journey:['VIB Ivy Card','Anh Trai Say Hi','Bộ Tứ Báo Thủ · video','Ngày hội không tiền mặt'],
     res:[{b:'4', l:{en:'projects in the relationship', vi:'dự án trong mối hợp tác'}}, {empty:true, l:{en:'add a result', vi:'thêm kết quả'}}],
     imgs:['vib_ivy_kv.jpg','anh_trai_say_hi.jpg','bo_tu_bao_thu.jpg','cashless_day.jpg']},
    {id:'msb', brand:'MSB', cats:['bank','awo','pitch'], size:'mid', grad:'linear-gradient(135deg,#ffd9c2,#ffe45c 70%)',
     subs:['SOCIAL AWO','2025–2027'], meta:'BANKING · ALWAYS-ON · PRODUCTION · MEDIA',
     t:{en:'Fixing how the work works.', vi:'Sửa cách làm việc, không chỉ nội dung.'},
     ask:{en:'A clearer long-term direction for social after three years, and fewer process pains.', vi:'Định hướng social dài hạn rõ hơn sau ba năm, và bớt điểm nghẽn quy trình.'},
     me:{en:'Framed the proposal around the client’s real worries. After kick-off, kept checking how they saw quality and turned feedback into fixes.', vi:'Định hình proposal quanh mối lo thật của client. Sau kick-off, liên tục hỏi cảm nhận về chất lượng và biến feedback thành điều chỉnh.'},
     team:{en:'Strategy and proposal were built with the team: channel roles, platform tone, analytical reports, an idea pipeline.', vi:'Chiến lược và proposal xây cùng team: vai trò kênh, giọng điệu theo nền tảng, báo cáo phân tích, nguồn ý tưởng.'},
     res:[{b:'3 → 5', l:{en:'years of partnership', vi:'năm hợp tác'}}, {empty:true, l:{en:'add a channel metric', vi:'thêm chỉ số kênh'}}],
     imgs:['msb_feed.jpg','msb_post_01.jpg','msb_post_02.jpg','msb_report.jpg']},
    {id:'cake', brand:'Cake', cats:['bank','pitch'], size:'mid', grad:'linear-gradient(135deg,#ffd3ec,#ff8fc6 60%,#ddd6ff)',
     subs:['BY VPBANK','NEW BUSINESS'], meta:'DIGITAL BANK · NEW BUSINESS',
     t:{en:'A relationship that opened the next door.', vi:'Một mối quan hệ mở ra cánh cửa mới.'},
     ask:{en:'Grow Gen Y without diluting a Gen Z identity.', vi:'Mở rộng Gen Y mà không làm loãng chất Gen Z.'},
     me:{en:'A client from Digimi moved to Cake and invited me into the pitch. I reconnected and contributed to pitching.', vi:'Một client cũ ở Digimi chuyển sang Cake và mời tôi vào pitch. Tôi kết nối lại và góp sức vào quá trình pitching.'},
     team:{en:'Creative (Cake AI-land, comment-led play, WeChoice photo series, Gato mascot) was agency team work.', vi:'Sáng tạo (Cake AI-land, tương tác bình luận, bộ ảnh WeChoice, mascot Gato) là của team agency.'},
     res:[{line:true, b:{en:'Social retainer won', vi:'Giành social retainer'}, l:{en:'the relationship opened the door, the team won the pitch', vi:'quan hệ mở cửa, team thắng pitch'}}],
     imgs:['cake_ai_land.jpg','cake_gato.jpg','cake_wechoice.jpg','cake_comments.jpg']},
    {id:'poca', brand:'Poca Yummy', cats:['fmcg','launch'], size:'', grad:'linear-gradient(135deg,#fff3a6,#ffe45c 50%,#ffb06b)',
     subs:['QUẨY-VERSE','2023'], meta:'FMCG · INTEGRATED LAUNCH · 2023',
     t:{en:'School break, now a brand moment.', vi:'Giờ ra chơi thành khoảnh khắc thương hiệu.'},
     ask:{en:'Launch a new sub-brand into a crowded snacking moment.', vi:'Ra mắt sub-brand mới giữa thị trường snack đông đúc.'},
     me:{en:'Coordinated the moving parts: hero MV, CapCut challenge, TikTok creators, community and comic pages.', vi:'Điều phối mọi phần việc: MV chính, CapCut challenge, TikToker, cộng đồng và trang comic.'},
     res:[{b:'266K+', l:{en:'FB engagements', vi:'tương tác FB'}}, {b:'45.7K+', l:{en:'website clicks', vi:'click website'}}], src:'SOURCE: XANH CREDENTIAL 2024',
     imgs:['poca_quay_verse_mv.jpg','poca_capcut.jpg','poca_tiktok.jpg','poca_comic.jpg']},
    {id:'digimi', brand:'Digimi × BVBank', cats:['bank','act','awo'], size:'', grad:'linear-gradient(135deg,#d2fff3,#9be8b0 55%,#8ec9ff)',
     subs:['COFFEE TRUCK','ALWAYS-ON'], meta:'DIGITAL BANKING · ACTIVATION · SOCIAL',
     t:{en:'From a cup of coffee to an app sign-up.', vi:'Từ ly cà phê đến lượt đăng ký app.'},
     ask:{en:'Introduce a digital bank at a moment people already enjoy, then keep the channel alive.', vi:'Giới thiệu ngân hàng số vào đúng khoảnh khắc người ta đang thích, rồi giữ kênh luôn sống.'},
     sw:[{k:'me', lbl:'ACTIVATION'}, {k:'team', lbl:'ALWAYS-ON'}],
     me:{en:'A coffee truck used a familiar moment to introduce Digimi: experience → engagement → sign-up.', vi:'Xe cà phê dùng khoảnh khắc quen thuộc để giới thiệu Digimi: trải nghiệm → tương tác → đăng ký.'},
     team:{en:'Content calendars, image and video production, stakeholder alignment, quality review: anticipate → coordinate → review → improve.', vi:'Lịch nội dung, sản xuất hình ảnh và video, thống nhất các bên, kiểm tra chất lượng: dự trù → điều phối → review → cải thiện.'},
     res:[{b:'~2,000', l:{en:'booth visitors', vi:'lượt ghé booth'}}, {b:'268', l:{en:'registrations', vi:'đăng ký'}}, {b:'140', l:{en:'conversions', vi:'chuyển đổi'}}],
     imgs:['digimi_coffee_truck.jpg','digimi_booth.jpg','bvbank_post.jpg','digimi_signup.jpg']},
    {id:'duytan', brand:'Nhựa Duy Tân', cats:['fmcg','pitch','awo'], size:'', grad:'linear-gradient(135deg,#ff9a9a,#ffe45c)', small:true,
     subs:['TẾT 2025'], meta:'CONSUMER · TẾT 2025',
     t:{en:'A Tết plan from pitch to media.', vi:'Kế hoạch Tết từ pitch đến media.'},
     me:{en:'Communication plan, pitching, always-on, production, booking and media.', vi:'Kế hoạch truyền thông, pitching, always-on, production, booking và media.'},
     res:[{empty:true, l:{en:'add a result', vi:'thêm kết quả'}}], imgs:['duytan_tet_2025.jpg','duytan_02.jpg','duytan_03.jpg','duytan_04.jpg']},
    {id:'cindy', brand:'Cindy Bloom', cats:['fmcg','pitch','launch'], size:'', grad:'linear-gradient(135deg,#ffd3ec,#ddd6ff)', small:true,
     subs:['LAUNCH'], meta:'CONSUMER · LAUNCH CAMPAIGN',
     t:{en:'A launch from pitch to execution.', vi:'Một đợt ra mắt từ pitch đến triển khai.'},
     me:{en:'Pitch to execution, production and the social campaign.', vi:'Từ pitch đến triển khai, production và social campaign.'},
     res:[{empty:true, l:{en:'add a result', vi:'thêm kết quả'}}], imgs:['cindy_bloom_kv.jpg','cindy_02.jpg','cindy_03.jpg','cindy_04.jpg']}
  ];
  /* Cover colours when there is no photo yet */
  var LOOK = {vib:['#dfe3ff','#4757ff'], msb:['#ffd6ea','#c2186f'], cake:['#e6e2ff','#d1167a'], poca:['#eaffbf','#1d1f3d'],
              digimi:['#dcf5ff','#1d1f3d'], duytan:['#fff0c4','#c2186f'], cindy:['#ffe3f1','#4757ff']};
  /* Facts per case — fill these in. Empty values stay hidden for visitors.
     role: your title on the project · period: e.g. '03/2024 – 12/2024' · scope: short facts, e.g. ['Team 6', '3 agencies', '40 posts / month'] */
  var FACTS = {
    vib:    {role:'Pitching → overall management', period:'', scope:[]},
    msb:    {role:'Pitching → execution', period:'2025 – 2027', scope:['AWO · Production · Booking · Media']},
    cake:   {role:'', period:'', scope:[]},
    poca:   {role:'', period:'2023', scope:[]},
    digimi: {role:'', period:'', scope:[]},
    duytan: {role:'Communication plan · Pitching', period:'Tết 2025', scope:['AWO · Production · Booking · Media']},
    cindy:  {role:'Pitching → execution', period:'', scope:['Production · Social campaign']}
  };
  CASES.forEach(function(c){ var l = LOOK[c.id] || ['var(--ink)','var(--lime)'], f = FACTS[c.id] || {}; c.bg = l[0]; c.fg = l[1]; c.role = f.role || ''; c.period = f.period || ''; c.scope = f.scope || [];
    var m = MX[c.id] || []; c.cats = [c.cats.indexOf('bank') > -1 ? 'bank' : 'fmcg'].concat(COLS.filter(function(col, i){ return (col.g === 'type' || col.k === 'pitch') && m[i]; }).map(function(col){ return col.k; })); });
  var FEATURED = ['vib', 'msb', 'digimi'];
  var MAIN = CASES.filter(function(c){ return FEATURED.indexOf(c.id) > -1; });

  /* =====================================================================
     RENDER: shared pieces
     ===================================================================== */
  function resHTML(res){
    var shown = res.filter(function(r){ return EDIT || !r.empty; });
    if (!shown.length) return '';
    return '<div class="res">' + shown.map(function(r){
      if (r.empty) return '<div class="empty"><b>+ ___</b><span>' + both(r.l) + '</span></div>';
      if (r.line) return '<div class="line"><b>' + both(r.b) + '</b><span>' + both(r.l) + '</span></div>';
      return '<div><b>' + esc(r.b) + '</b><span>' + both(r.l) + '</span></div>';
    }).join('') + '</div>';
  }
  function switchHTML(c){
    if (!c.team) return '<div class="swp"><p><span class="sw-lbl">' + both({en:'MY PART', vi:'PHẦN CỦA TÔI'}) + '</span> ' + both(c.me) + '</p></div>';
    var sw = c.sw || [{k:'me', lbl:{en:'MY PART', vi:'PHẦN CỦA TÔI'}}, {k:'team', lbl:'TEAM'}];
    return '<div class="sw" role="group">' + sw.map(function(s, i){ return '<button type="button" aria-pressed="' + (i ? 'false' : 'true') + '" data-k="' + s.k + '">' + (typeof s.lbl === 'string' ? s.lbl : both(s.lbl)) + '</button>'; }).join('') + '</div>' +
      '<div class="swp"><p data-v="me">' + both(c.me) + '</p><p data-v="team" hidden>' + both(c.team) + '</p></div>';
  }
  function bindSwitches(scope){
    $$('.sw', scope).forEach(function(g){
      var bs = $$('button', g), host = g.parentElement, ps = $$('.swp [data-v]', host);
      bs.forEach(function(b){ b.addEventListener('click', function(){
        bs.forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        ps.forEach(function(p){ p.hidden = p.dataset.v !== b.dataset.k; });
      }); });
    });
  }

  var carIdx = 0, carRot = 0, carAuto = 0;
  function renderStoryCases(){
    var vi = lang === 'vi';
    var MESH = {vib:['#ff7a18','#c6f24e','#ff3d8b'], msb:['#2c4bff','#7fe3ff','#0b1a6b'], cake:['#ff2e93','#9b5bff','#2a0a3d'], poca:['#ffcf3f','#ff5f6d','#c6f24e'], digimi:['#00c2a8','#c6f24e','#0a3d3a'], duytan:['#ff3d3d','#ffb43f','#7a0a2e'], cindy:['#ff8cc4','#b38cff','#ff3d97']};
    var BIG = {vib:['4', {en:'projects from one pitch', vi:'dự án từ một lần pitch'}], msb:['3→5', {en:'years of partnership', vi:'năm hợp tác'}], cake:['WIN', {en:'social retainer', vi:'giành social retainer'}], poca:['266K', {en:'Facebook engagements', vi:'tương tác Facebook'}], digimi:['268', {en:'app sign-ups', vi:'lượt đăng ký app'}], duytan:['TẾT', {en:'2025 campaign', vi:'chiến dịch 2025'}], cindy:['NEW', {en:'product launch', vi:'ra mắt sản phẩm'}]};
    var items = CASES.map(function(c, i){
      var m = MESH[c.id] || ['#ff5fae','#c6f24e','#2b1d2a'], bg = BIG[c.id] || ['', {en:'', vi:''}];
      return '<article class="cc" data-ci="' + i + '" tabindex="-1" style="--m1:' + m[0] + '; --m2:' + m[1] + '; --m3:' + m[2] + '"><div class="cc-in">' +
        '<span class="cc-top"><span>' + esc(c.brand) + '</span><span>' + ('0' + (i + 1)).slice(-2) + '/0' + CASES.length + '</span></span>' +
        '<span class="cc-big">' + esc(bg[0]) + '</span><span class="cc-bl">' + esc(L(bg[1])) + '</span>' +
        '<span class="cc-bar"><i></i></span>' +
        '<span class="cc-t">' + both(c.t) + '</span>' +
        '<button class="cc-open" type="button" data-case="' + c.id + '">' + (vi ? 'Xem chi tiết' : 'Open case') + ' ↗</button></div></article>';
    }).join('');
    $('#track').innerHTML = '<div class="car-glow" aria-hidden="true"></div><div class="car-tags" id="carTags" aria-hidden="true"></div><div class="car" id="car" role="group" aria-roledescription="carousel" aria-label="' + (vi ? 'Bảy dự án' : 'Seven projects') + '"><div class="car-ring" id="carRing">' + items + '</div></div>' +
      '<div class="car-ctl"><button type="button" class="car-btn" data-car="-1" aria-label="' + (vi ? 'Dự án trước' : 'Previous project') + '">‹</button><span class="car-dots" id="carDots">' + CASES.map(function(c, i){ return '<i data-cgo="' + i + '"></i>'; }).join('') + '</span><button type="button" class="car-btn" data-car="1" aria-label="' + (vi ? 'Dự án tiếp' : 'Next project') + '">›</button></div>';
    layoutCar();
  }
  function carGeom(){ var w = window.innerWidth < 760 ? 230 : 300, n = CASES.length, step = 360 / n; return {w:w, step:step, R:Math.round((w / 2 + 26) / Math.tan(Math.PI / n))}; }
  function layoutCar(){
    var ring = $('#carRing'); if (!ring) return; var g = carGeom();
    $$('.cc', ring).forEach(function(el, i){ el.style.width = g.w + 'px'; el.style.marginLeft = (-g.w / 2) + 'px'; el.style.transform = 'rotateY(' + (i * g.step) + 'deg) translateZ(' + g.R + 'px)'; });
    ring.style.transform = 'translateZ(' + (-g.R) + 'px) rotateY(' + carRot + 'deg)';
    var front = ((Math.round(-carRot / g.step) % CASES.length) + CASES.length) % CASES.length; carIdx = front;
    $$('.cc', ring).forEach(function(el, i){ var d = Math.abs(((i - front) % CASES.length + CASES.length) % CASES.length); d = Math.min(d, CASES.length - d); el.classList.toggle('front', d === 0); el.style.opacity = d > 2 ? .18 : d === 2 ? .45 : 1; el.setAttribute('aria-hidden', d === 0 ? 'false' : 'true'); });
    $$('#carDots i').forEach(function(d, i){ d.classList.toggle('on', i === front); });
    var tg = $('#carTags'); if (tg){ var fc = CASES[front], tags = fc.subs.concat(fc.cats.filter(function(k){ return k !== 'bank' && k !== 'fmcg'; }).map(function(k){ var c = COLS[colIdx(k)]; return L(c.t); })).slice(0, 4);
      if (tg.dataset.f !== String(front) + lang){ tg.dataset.f = String(front) + lang; tg.innerHTML = tags.map(function(t, i){ return '<span style="--i:' + i + '">' + esc(t) + '</span>'; }).join(''); } }
  }
  function carGo(i){ var g = carGeom(); var target = -i * g.step, cur = carRot; var diff = ((target - cur) % 360 + 540) % 360 - 180; carRot = cur + diff; layoutCar(); }
  function carStep(d){ var g = carGeom(); carRot = Math.round(carRot / g.step) * g.step - d * g.step; layoutCar(); }
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-car]'); if (b){ carStep(+b.dataset.car); stopAuto(); return; }
    var d = e.target.closest('[data-cgo]'); if (d){ carGo(+d.dataset.cgo); stopAuto(); return; }
    var cc = e.target.closest('.cc'); if (cc && !cc.classList.contains('front') && !e.target.closest('[data-case]')){ e.preventDefault(); carGo(+cc.dataset.ci); stopAuto(); }
  }, true);
  (function(){
    var sx = null, sr = 0, moved = false;
    document.addEventListener('pointerdown', function(e){ var c = e.target.closest('#car'); if (!c || e.target.closest('button')) return; sx = e.clientX; sr = carRot; moved = false; stopAuto(); });
    document.addEventListener('pointermove', function(e){ if (sx === null) return; var dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; carRot = sr + dx * .35; var ring = $('#carRing'); if (ring){ ring.style.transition = 'none'; layoutCar(); } }, {passive:true});
    document.addEventListener('pointerup', function(){ if (sx === null) return; sx = null; var ring = $('#carRing'); if (ring) ring.style.transition = ''; if (moved){ var g = carGeom(); carRot = Math.round(carRot / g.step) * g.step; layoutCar(); } });
    document.addEventListener('keydown', function(e){ if (!document.activeElement || !document.activeElement.closest || !document.activeElement.closest('.car-ctl,#car')) return; if (e.key === 'ArrowLeft'){ carStep(-1); stopAuto(); } if (e.key === 'ArrowRight'){ carStep(1); stopAuto(); } });
  })();
  function stopAuto(){ clearInterval(carAuto); carAuto = 0; }
  if (!reduce && 'IntersectionObserver' in window){
    new IntersectionObserver(function(es){ es.forEach(function(en){ if (en.isIntersecting && !carAuto && !en.target.dataset.touched){ carAuto = setInterval(function(){ carStep(1); }, 3600); } else if (!en.isIntersecting){ stopAuto(); } }); }, {threshold:.4}).observe($('#pin'));
  }
  document.addEventListener('pointerdown', function(e){ if (e.target.closest && e.target.closest('#pin')) $('#pin').dataset.touched = '1'; });
  window.addEventListener('resize', function(){ layoutCar(); });
  function tileHTML(c){
    return '<a class="wt ' + (c.size || '') + '" href="#case-' + c.id + '" data-case="' + c.id + '" data-cats="' + c.cats.join(' ') + '" data-cursor="OPEN">' +
      '<div class="pic">' + cover(c) + (IMAGES[c.imgs[0]] ? '<span class="bt"><span>' + esc(c.brand) + '</span></span>' : '') + '<span class="ov">' + (lang === 'vi' ? 'XEM CHI TIẾT ↗' : 'OPEN CASE ↗') + '</span></div>' +
      '<div class="cap"><h3>' + both(c.t) + '</h3><span class="tg">' + esc(c.meta) + (c.period && c.meta.indexOf(c.period) < 0 && c.meta.indexOf(c.period.toUpperCase()) < 0 ? ' · ' + esc(c.period) : '') + (c.res[0] && !c.res[0].empty && !c.res[0].line ? '<span class="big-n">' + esc(c.res[0].b) + '</span>' : '') + '</span></div></a>';
  }
  var filterK = 'all';
  function renderWork(){
    $('#filters').innerHTML = CATS.map(function(f){
      var n = f.k === 'all' ? CASES.length : CASES.filter(function(c){ return c.cats.indexOf(f.k) > -1; }).length;
      return '<button class="chip" type="button" data-f="' + f.k + '" aria-pressed="' + (f.k === filterK ? 'true' : 'false') + '">' + esc(L(f.t)) + ' <span class="ct">' + n + '</span></button>';
    }).join('');
    $('#workGrid').innerHTML = CASES.map(tileHTML).join(''); wkMeta(null);
    applyFilter();
  }
  function wkMeta(c){
    var el = $('#wkMeta'); if (!el) return; var vi = lang === 'vi';
    if (!c){ el.innerHTML = '<p class="mono">' + (vi ? 'Rê chuột lên dự án' : 'Hover a project') + '</p><p class="wk-t">' + (vi ? '7 dự án · 2022–2026' : '7 projects · 2022–2026') + '</p><p class="wk-d">' + (vi ? 'Ngân hàng, fintech, tiêu dùng. IMC · Social · Activation · Sản xuất.' : 'Banking, fintech, consumer. IMC · Social · Activation · Production.') + '</p>'; return; }
    el.innerHTML = '<p class="mono">' + esc(c.brand) + (c.period ? ' · ' + esc(c.period) : '') + '</p><p class="wk-t">' + esc(L(c.t)) + '</p>' + (c.ask ? '<p class="wk-d">' + esc(L(c.ask)) + '</p>' : '') +
      '<ul class="wk-l">' + c.subs.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + (c.role ? '<li>' + esc(c.role) + '</li>' : '') + '</ul><p class="mono" style="color:var(--pink)">' + (vi ? 'Bấm để mở ↗' : 'Click to open ↗') + '</p>';
  }
  document.addEventListener('pointerover', function(e){ var t = e.target.closest && e.target.closest('#workGrid .wt'); if (t) wkMeta(CASES.filter(function(c){ return c.id === t.dataset.case; })[0]); });
  function applyFilter(){
    $$('#filters .chip').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.f === filterK ? 'true' : 'false'); });
    $$('#workGrid .wt').forEach(function(t){ t.classList.toggle('dim', filterK !== 'all' && t.dataset.cats.split(' ').indexOf(filterK) < 0); });
  }
  document.addEventListener('click', function(e){
    var f = e.target.closest('#filters [data-f]'); if (f){ filterK = f.dataset.f; applyFilter(); track('filter', filterK); }
  });

  /* LV.1 roles + flip */
  var roleIdx = 3, seenRoles = {3:1};
  function renderRoles(){
    var vi = lang === 'vi';
    var PH = ['lv1.png', 'lv2.png', 'lv3.png', 'lv4.png'];
    $('#roleTabs').innerHTML = ROLES.map(function(r, i){
      return '<div class="hc" data-hc="' + i + '" style="--drop:' + [10, 34, 34, 10][i] + 'px; --str:' + [46, 30, 62, 40][i] + 'px; --tilt:' + [-3, 2, -1.5, 3][i] + 'deg">' +
        '<span class="hc-str" aria-hidden="true"></span><span class="hc-clip" aria-hidden="true"></span>' +
        '<button class="hc-card" type="button" aria-label="' + esc(r.t) + (vi ? '. Chạm để lật' : '. Tap to flip') + '">' +
          '<span class="hc-face hc-front"><span class="hc-top"><span>' + (vi ? 'LEVEL · XANH' : 'LEVEL · XANH') + '</span><span>#0' + (i + 1) + '</span></span>' +
            '<span class="hc-pic">' + (IMAGES[PH[i]] ? '<img src="' + esc(IMAGES[PH[i]]) + '" alt="">' : '') + '</span>' +
            '<span class="hc-name">' + esc(r.short) + '</span><span class="hc-role">' + esc(r.w) + '</span>' +
            '<span class="hc-row"><span>' + (vi ? 'XEM VAI TRÒ' : 'VIEW ROLE') + '</span><i>↗</i></span><span class="hc-holo" aria-hidden="true"></span></span>' +
          '<span class="hc-face hc-back"><span class="hc-top"><span>' + r.lane + '</span><span>' + r.y + '</span></span>' +
            '<span class="hc-t">' + esc(r.t) + '</span><span class="hc-d">' + esc(L(r.d)) + '</span>' +
            '<span class="hc-v">' + esc(L(r.v)).replace(/^(For you|Với bạn): (.)/, function(_, x, c){ return c.toUpperCase(); }) + '</span>' +
            '<span class="hc-scope"><i style="width:' + r.s + '%"></i></span><span class="hc-holo" aria-hidden="true"></span></span>' +
        '</button></div>';
    }).join('');
    initHang();
    if ($('#tl4')) $('#tl4').innerHTML = ROLES.map(function(r){ return '<article><span class="lane">' + r.lane + '</span><h4>' + esc(r.t) + '</h4><span class="w">' + r.w + '</span><p>' + esc(L(r.d)) + '</p><p style="font-weight:700; color:var(--ink)">' + esc(L(r.v)) + '</p><div class="scope"><div class="m"><i style="width:' + r.s + '%"></i></div><span>' + esc(L(r.sc)) + '</span></div></article>'; }).join('');
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest('button[data-role]'); if (b && !b.disabled){ roleIdx = +b.dataset.role; seenRoles[roleIdx] = 1; renderRoles(); var nb = $('#roleTabs [data-role="' + roleIdx + '"]'); if (nb && !reduce){ nb.classList.add('flip'); } return; }
    var j = e.target.closest('[data-jump-role]');
    if (j){ e.preventDefault(); roleIdx = +j.dataset.jumpRole; seenRoles[roleIdx] = 1; renderRoles(); var t = $('#roleTabs'); if (curView !== 'story'){ location.hash = 'clarify'; } else if (t) t.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'center'}); }
  });
  /* LV.2 accordion + profile steps */
  var syIdx = -1, SYIC = ['i-search', 'i-blocks', 'i-nodes', 'i-target'];
  function syUpdate(force){
    var sc = $('#scrolly'); if (!sc || (curView !== 'story' && !force)) return;
    var r = sc.getBoundingClientRect(), span = sc.offsetHeight - window.innerHeight * .75;
    var p = clamp((window.innerHeight * .2 - r.top) / Math.max(1, span), 0, .999), i = window.innerWidth < 760 ? syIdx < 0 ? 0 : syIdx : Math.floor(p * 4);
    if (window.innerWidth >= 760){ var mk = $('#syMark'); if (mk) mk.style.top = (p * 100).toFixed(1) + '%'; }
    if (i === syIdx && !force) return; syIdx = i;
    $$('#syText .sy-step').forEach(function(a, k){ a.classList.toggle('on', k === i); });
    var iso = $('#iso'); if (iso){ iso.dataset.s = i; $('#isoUse').setAttribute('href', '#' + SYIC[i]); }
  }
  window.addEventListener('scroll', function(){ syUpdate(false); }, {passive:true});
  document.addEventListener('click', function(e){ if (window.innerWidth < 760 && e.target.closest('#scrolly')){ syIdx = (syIdx + 1) % 4; var k = syIdx; syIdx = -9; syIdx = k; $$('#syText .sy-step').forEach(function(a, j){ a.classList.toggle('on', j === k); }); var iso = $('#iso'); iso.dataset.s = k; $('#isoUse').setAttribute('href', '#' + SYIC[k]); } });
  function renderSteps(){
    var IC = ['i-search', 'i-blocks', 'i-nodes', 'i-target'];
    var html = STEPS.map(function(s, i){ return '<article class="how-card"><svg class="ic" viewBox="0 0 64 64" aria-hidden="true"><use href="#' + IC[i] + '"/></svg><span class="n">0' + (i + 1) + '</span><h3>' + esc(L(s.t)) + '</h3><p class="k">' + esc(L(s.k)) + '</p><p>' + esc(L(s.d)) + '</p></article>'; }).join('');
    $('#proc').innerHTML = html; $('#steps4').innerHTML = html; $('#steps4').classList.add('stackx');
    var st = $('#syText'); if (st) st.innerHTML = STEPS.map(function(s, i){ return '<article class="sy-step" data-i="' + i + '"><p class="sy-k">0' + (i + 1) + ' / 04 · ' + esc(L(s.t)) + '</p><h3>' + esc(L(s.k)) + '</h3><p class="sy-d">' + esc(L(s.d)) + '</p></article>'; }).join('');
    syUpdate(true);
  }

  /* LV.3 capability matrix (story + Skills tab share it) */
  var mxSel = 'exec';
  function colIdx(k){ for (var i = 0; i < COLS.length; i++) if (COLS[i].k === k) return i; return 0; }
  function mxCount(i){ var a = 0, b = 0; CASES.forEach(function(c){ var v = (MX[c.id] || [])[i]; if (v === 1) a++; else if (v === 2) b++; }); return [a, b]; }
  function dotHTML(v){
    var vi = lang === 'vi';
    if (v === 1) return '<span class="d1" role="img" aria-label="' + (vi ? 'Xinh dẫn dắt' : 'Led') + '"></span>';
    if (v === 2) return '<span class="d2" role="img" aria-label="' + (vi ? 'Cùng team' : 'With the team') + '"></span>';
    return '<span class="d0" role="img" aria-label="–"></span>';
  }
  function grpName(col){ var vi = lang === 'vi'; return col.g === 'type' ? (vi ? 'Xinh chạy gì' : 'What I run') : (vi ? 'Xinh gánh tới đâu' : 'How far I take it'); }
  function proofChips(i){
    return CASES.filter(function(c){ return (MX[c.id] || [])[i]; }).map(function(c){ return '<a class="chip" href="#case-' + c.id + '">' + esc(c.brand) + ' ↗</a>'; }).join('');
  }
  function capCard(col, n){
    var i = colIdx(col.k), vi = lang === 'vi';
    return '<article class="win"><div class="win-bar"><b>' + ('0' + (n + 1)).slice(-2) + ' · ' + esc(L(col.t)).toUpperCase() + '</b><span class="ctl"><i></i><i></i><i></i></span></div><div class="win-body">' +
      '<p class="mono" style="color:var(--blue)">' + grpName(col) + '</p>' +
      '<p>' + esc(L(col.d)) + '</p><div class="fit"><b>' + (vi ? 'JD thường ghi' : 'How JDs say it') + '</b>' + esc(L(col.jd)) + '</div><div class="proof">' + proofChips(i) + '</div></div></article>';
  }
  function statBtn(col){
    var n = colIdx(col.k) + 1;
    return '<button class="stat" type="button" data-col="' + col.k + '" aria-pressed="' + (col.k === mxSel ? 'true' : 'false') + '"><span class="ix">' + ('0' + n).slice(-2) + '</span><span class="nm">' + esc(L(col.t)) + '</span><span class="go">→</span></button>';
  }
  function renderMatrix(){
    var vi = lang === 'vi', ci = colIdx(mxSel), col = COLS[ci];
    var item = function(c){ var n = colIdx(c.k) + 1; return '<button class="li" type="button" data-col="' + c.k + '" aria-pressed="' + (c.k === mxSel ? 'true' : 'false') + '"><span class="ix">' + ('0' + n).slice(-2) + '</span>' + esc(L(c.t)) + '<i>→</i></button>'; };
    var list = '<p class="lg">' + (vi ? 'Xinh chạy gì' : 'What I run') + '</p>' + COLS.filter(function(c){ return c.g === 'type'; }).map(item).join('') +
      '<p class="lg">' + (vi ? 'Xinh gánh tới đâu' : 'How far I take it') + '</p>' + COLS.filter(function(c){ return c.g === 'own'; }).map(item).join('');
    var n = CASES.filter(function(c){ return (MX[c.id] || [])[ci]; }).length;
    var card = '<div class="lsp-card" aria-live="polite"><p class="mono">' + grpName(col) + ' · ' + ('0' + (ci + 1)).slice(-2) + '</p><p class="lsp-big">' + n + '<small>/7 ' + (vi ? 'dự án' : 'projects') + '</small></p><h3>' + esc(L(col.t)) + '</h3><p class="lsp-d">' + esc(L(col.d)) + '</p>' +
      '<p class="lsp-jd"><b>' + (vi ? 'JD thường ghi' : 'How JDs say it') + '</b>' + esc(L(col.jd)) + '</p><div class="proof">' + proofChips(ci) + '</div></div>';
    var html = '<div class="lsp"><div class="lsp-stage"><span class="lsp-blob a"></span><span class="lsp-blob b"></span><span class="lsp-blob c"></span>' + card + '</div><div class="lsp-list">' + list + '</div></div>';
    $$('[data-mx]').forEach(function(h){ h.innerHTML = html; });
    var g = $('#skGrid'); if (g) g.innerHTML = COLS.map(capCard).join('');
  }
  document.addEventListener('click', function(e){ var b = e.target.closest('[data-col]'); if (b){ mxSel = b.dataset.col; renderMatrix(); track('skill', mxSel); } });
  document.addEventListener('pointerover', function(e){ var b = e.target.closest && e.target.closest('.lsp-list [data-col]'); if (b && b.dataset.col !== mxSel && finePointer){ mxSel = b.dataset.col; var keep = b.closest('[data-mx]'); renderMatrix(); } });

  /* =====================================================================
     CONTACT
     ===================================================================== */
  function hcmStatus(){
    var now = new Date(), parts = {};
    try{
      new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Ho_Chi_Minh', hour:'2-digit', minute:'2-digit', weekday:'short', hour12:false}).formatToParts(now).forEach(function(p){ parts[p.type] = p.value; });
    }catch(e){ return {on:true, time:'', txt:''}; }
    var h = +parts.hour, wk = ['Sat','Sun'].indexOf(parts.weekday) < 0, on = wk && h >= 9 && h < 18;
    var time = parts.hour + ':' + parts.minute;
    return {on:on, time:time, txt: on
      ? (lang === 'vi' ? 'Đang trong giờ làm việc ở TP.HCM. Gọi hoặc nhắn Zalo là nhanh nhất.' : 'Working hours in Ho Chi Minh City. A call or a Zalo message is fastest.')
      : (lang === 'vi' ? 'Ngoài giờ làm việc ở TP.HCM. Để lại tin Zalo hoặc email nhé.' : 'Outside working hours in Ho Chi Minh City. Leave a Zalo message or an email.')};
  }
  function statusHTML(){ var s = hcmStatus(); return '<i></i><span><b>HCMC ' + esc(s.time) + '</b> · ' + esc(s.txt) + '</span>'; }
  function methodList(){
    var ph = CONTACT.phone.replace(/\s+/g, ''), zl = (CONTACT.zalo || ph).replace(/\s+/g, '');
    return [
      {k:'call', c:'var(--lime)', ic:'i-phone', t:{en:'Call', vi:'Gọi điện'}, v:ph.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3'), href:ph ? 'tel:' + ph : '', copy:ph},
      {k:'zalo', c:'var(--sky)', ic:'i-chat', t:{en:'Zalo', vi:'Zalo'}, v:zl, href:zl ? 'https://zalo.me/' + zl : '', copy:zl},
      {k:'facebook', c:'var(--pink2)', ic:'s-heart', t:{en:'Facebook / Messenger', vi:'Facebook / Messenger'}, v:CONTACT.facebook, href:CONTACT.facebook ? 'https://m.me/' + CONTACT.facebook : ''},
      {k:'linkedin', c:'var(--lilac)', ic:'i-case', t:{en:'LinkedIn', vi:'LinkedIn'}, v:CONTACT.linkedin, href:CONTACT.linkedin ? 'https://www.linkedin.com/in/' + CONTACT.linkedin : ''},
      {k:'email', c:'var(--butter)', ic:'i-mail', t:{en:'Gmail', vi:'Gmail'}, v:CONTACT.email, href:CONTACT.email ? 'mailto:' + CONTACT.email : '', copy:CONTACT.email}
    ];
  }
  function methodsHTML(){
    return methodList().map(function(m){
      if (!m.v) return EDIT ? '<div class="mth off" style="--c:' + m.c + '"><span class="ico2"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="#' + m.ic + '"/></svg></span><div><b>' + esc(L(m.t)) + '</b><span>' + (lang === 'vi' ? 'cần bổ sung' : 'missing') + '</span></div></div>' : '';
      var open = m.href ? '<a href="' + esc(m.href) + '" target="_blank" rel="noopener" data-m="' + m.k + '">' + (m.k === 'call' ? (lang === 'vi' ? 'GỌI' : 'CALL') : m.k === 'email' ? (lang === 'vi' ? 'VIẾT THƯ' : 'WRITE') : (lang === 'vi' ? 'MỞ' : 'OPEN')) + ' ↗</a>' : '';
      var cp = m.copy ? '<button type="button" data-copy="' + esc(m.copy) + '" data-m="' + m.k + '">' + (lang === 'vi' ? 'SAO CHÉP' : 'COPY') + '</button>' : '';
      return '<div class="mth" style="--c:' + m.c + '"><span class="ico2"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="#' + m.ic + '"/></svg></span><div><b>' + esc(L(m.t)) + '</b><span>' + esc(m.v) + '</span></div><div class="go2">' + open + cp + '</div></div>';
    }).join('');
  }
  var WHO = [
    {k:'rec', t:{en:'Recruiter', vi:'Nhà tuyển dụng'}, rec:{en:'Best: LinkedIn or email', vi:'Phù hợp nhất: LinkedIn hoặc email'},
     msg:{en:'Hi Xinh, I’m ___ from ___. We’re hiring a ___ and would love to talk.', vi:'Chào Xinh, mình là ___ từ ___. Bên mình đang tuyển ___ và muốn trao đổi với bạn.'}},
    {k:'brand', t:{en:'Brand / client', vi:'Thương hiệu / khách hàng'}, rec:{en:'Best: Zalo or a call', vi:'Phù hợp nhất: Zalo hoặc gọi điện'},
     msg:{en:'Hi Xinh, I’m ___ from ___. We have a ___ project (launch / always-on / activation) starting around ___.', vi:'Chào Xinh, mình là ___ từ ___. Bên mình có dự án ___ (ra mắt / always-on / activation) dự kiến bắt đầu khoảng ___.'}},
    {k:'agency', t:{en:'Agency / partner', vi:'Agency / đối tác'}, rec:{en:'Best: Zalo or email', vi:'Phù hợp nhất: Zalo hoặc email'},
     msg:{en:'Hi Xinh, I’m ___ from ___. We’d like to work together on ___.', vi:'Chào Xinh, mình là ___ từ ___. Bên mình muốn hợp tác cùng bạn về ___.'}}
  ];
  var whoIdx = 0;
  function renderContact(){
    var s = hcmStatus();
    ['#ctStatus', '#cnStatus', '#deskStatus'].forEach(function(id){ var el = $(id); el.className = 'status' + (s.on ? '' : ' off'); el.innerHTML = statusHTML(); });
    $('#methods').innerHTML = methodsHTML();
    $('#cnMethods').innerHTML = methodsHTML();
    var ms = methodList(), z = ms[1], c = ms[0];
    var acts = [];
    if (z.v) acts.push('<a class="btn lime" href="' + esc(z.href) + '" target="_blank" rel="noopener" data-m="zalo">Zalo ↗</a>');
    if (c.v) acts.push('<a class="btn hot" href="' + esc(c.href) + '" data-m="call">' + (lang === 'vi' ? 'Gọi ngay' : 'Call now') + '</a>');
    if (acts.length < 2) acts.push('<a class="btn lime" href="mailto:' + esc(CONTACT.email) + '" data-m="email">' + (lang === 'vi' ? 'Viết email' : 'Write an email') + ' ↗</a>');
    if (acts.length < 2) acts.push('<button class="btn hot" type="button" data-copy="' + esc(CONTACT.email) + '" data-m="email">' + (lang === 'vi' ? 'Chép email' : 'Copy email') + '</button>');
    if (CV_URL) acts.push('<a class="btn cv" href="' + esc(CV_URL) + '" target="_blank" rel="noopener" data-m="cv">' + (lang === 'vi' ? 'Xem CV' : 'View CV') + ' ↗</a>');
    $('#bigActs').innerHTML = acts.join('');
    var cvBtn = CV_URL ? '<a class="btn" href="' + esc(CV_URL) + '" target="_blank" rel="noopener" data-m="cv">CV ↗</a>' : '';
            $('#tlActs').innerHTML = (CV_URL ? '<a class="btn ink" href="' + esc(CV_URL) + '" target="_blank" rel="noopener" data-m="cv">' + (lang === 'vi' ? 'Xem CV' : 'View CV') + ' ↗</a>' : need(lang === 'vi' ? 'link CV' : 'CV link')) +
      (CONTACT.linkedin ? '<a class="btn" href="https://www.linkedin.com/in/' + esc(CONTACT.linkedin) + '" target="_blank" rel="noopener" data-m="linkedin">LinkedIn ↗</a>' : '') +
      '<a class="btn" href="#align">' + (lang === 'vi' ? 'Xem bằng chứng' : 'See the proof') + ' ↓</a>';
    $('#goalCv').innerHTML = cvBtn;
    var li = $('#deskLi'); if (li){ li.hidden = !CONTACT.linkedin; li.href = 'https://www.linkedin.com/in/' + CONTACT.linkedin; }
    var dcv = $('#deskCv'); if (dcv){ dcv.hidden = !CV_URL; dcv.href = CV_URL; }
    $('#deskFeat').innerHTML = MAIN.map(function(c){ return '<a href="#case-' + c.id + '" data-case="' + c.id + '"><i style="background:' + c.bg + '; color:' + c.fg + '">' + esc(c.brand.split(' ')[0].slice(0, 4).toUpperCase()) + '</i><span><b>' + esc(L(c.t)) + '</b><small>' + esc(c.meta) + '</small></span></a>'; }).join('') + '<a href="#work"><i style="background:var(--white)">+4</i><span><b>' + (lang === 'vi' ? 'Xem cả 7 dự án' : 'See all 7 projects') + '</b><small>WORK/</small></span></a>';
    $('#whoOpts').innerHTML = WHO.map(function(w, i){ return '<button class="chip" type="button" data-who="' + i + '" aria-pressed="' + (i === whoIdx ? 'true' : 'false') + '">' + esc(L(w.t)) + '</button>'; }).join('');
    var w = WHO[whoIdx];
    $('#tpl').innerHTML = '“' + esc(L(w.msg)) + '”<span class="rec2">' + esc(L(w.rec)) + '</span><div style="margin-top:10px"><button class="chip" type="button" data-copy="' + esc(L(w.msg)) + '" data-m="template">' + (lang === 'vi' ? 'Sao chép tin nhắn mẫu' : 'Copy this message') + '</button></div>';
    $('#goalMethods').innerHTML = ms.filter(function(m){ return m.v; }).map(function(m){ return '<span class="chip"><svg class="ico" viewBox="0 0 64 64" aria-hidden="true"><use href="#' + m.ic + '"/></svg>' + esc(L(m.t)) + '</span>'; }).join('');
  }
  document.addEventListener('click', function(e){
    var w = e.target.closest('[data-who]'); if (w){ whoIdx = +w.dataset.who; renderContact(); track('who', WHO[whoIdx].k); return; }
    var cp = e.target.closest('[data-copy]');
    if (cp){
      var text = cp.dataset.copy, out = cp.closest('#connectSheet') ? $('#cnCopied') : $('#copied');
      var vi = lang === 'vi';
      if (cp.dataset.m) track('contact', cp.dataset.m);
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){ out.textContent = vi ? 'Đã sao chép rồi nha!' : 'Copied!'; }, function(){ out.textContent = text; });
      } else { out.textContent = text; }
      return;
    }
    var m = e.target.closest('a[data-m]'); if (m) track('contact', m.dataset.m);
    if (e.target.closest('[data-connect]')){ openSheet($('#connectSheet')); track('connect', 'open'); }
    if (e.target.closest('[data-close]')) closeSheets();
  });

  /* =====================================================================
     SHEETS (case + connect)
     ===================================================================== */
  var lastFocus = null;
  function openSheet(el){ lastFocus = document.activeElement; el.hidden = false; document.body.style.overflow = 'hidden'; var f = el.querySelector('button, a'); if (f) f.focus(); }
  function closeSheets(){ $$('.sheet').forEach(function(s){ s.hidden = true; }); document.body.style.overflow = ''; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  $$('.sheet').forEach(function(s){ s.addEventListener('click', function(e){ if (e.target === s) closeSheets(); }); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeSheets(); });
  function openCase(id){
    var i = CASES.findIndex(function(c){ return c.id === id; }); if (i < 0) return;
    var c = CASES[i], prev = CASES[(i - 1 + CASES.length) % CASES.length], next = CASES[(i + 1) % CASES.length];
    var gal = c.imgs.slice(1).map(function(n){ return ph(n, lang === 'vi' ? 'CHỖ ĐẶT ẢNH' : 'IMAGE SLOT'); }).join('');
    var vi = lang === 'vi', facts = [];
    if (c.role) facts.push('<div><span>' + (vi ? 'Vai trò' : 'My title') + '</span><b>' + esc(c.role) + '</b></div>');
    if (c.period) facts.push('<div><span>' + (vi ? 'Thời gian' : 'When') + '</span><b>' + esc(c.period) + '</b></div>');
    c.scope.forEach(function(x){ facts.push('<div><span>' + (vi ? 'Quy mô' : 'Scope') + '</span><b>' + esc(x) + '</b></div>'); });
    var needs = (!c.role ? need(vi ? 'vai trò' : 'your title') : '') + (!c.period ? need(vi ? 'thời gian' : 'period') : '') + (!c.scope.length ? need(vi ? 'quy mô: team, ngân sách, số deliverable' : 'scope: team, budget, deliverables') : '');
    var factsHTML = (facts.length || needs) ? '<div class="facts">' + facts.join('') + needs + '</div>' : '';
    $('#caseIn').innerHTML = '<div class="sheet-bar"><span class="tag"><b>' + esc(c.brand) + '</b>CASE ' + (i + 1) + '/' + CASES.length + '</span><button class="x" type="button" data-close aria-label="Close">×</button></div>' +
      '<h2 id="csTitle">' + both(c.t) + '</h2><div class="meta"><span>' + esc(c.meta) + '</span>' + c.subs.map(function(s){ return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
      factsHTML + '<div class="gal-hero' + (IMAGES[c.imgs[0]] ? '' : ' slim') + '">' + cover(c) + '</div>' + (gal ? '<div class="gal">' + gal + '</div>' : '') +
      '<div class="story-cols">' +
        (c.ask ? '<div class="blk"><h4>' + both({en:'01 · The ask', vi:'01 · Đề bài'}) + '</h4><p>' + both(c.ask) + '</p></div>' : '') +
        '<div class="blk"><h4>' + both(c.sw ? {en:'02 · ' + c.sw[0].lbl, vi:'02 · ' + c.sw[0].lbl} : {en:'02 · My part', vi:'02 · Phần của tôi'}) + '</h4><p>' + both(c.me) + '</p></div>' +
        (c.team ? '<div class="blk team"><h4>' + both(c.sw ? {en:'03 · ' + c.sw[1].lbl, vi:'03 · ' + c.sw[1].lbl} : {en:'03 · The team', vi:'03 · Phần của team'}) + '</h4><p>' + both(c.team) + '</p></div>' : '') +
        (c.lesson ? '<div class="blk"><h4>' + both({en:'04 · Lesson', vi:'04 · Bài học'}) + '</h4><p>' + both(c.lesson) + '</p></div>' : '') +
        (c.journey ? '<div class="blk"><h4>' + both({en:'Journey', vi:'Hành trình'}) + '</h4><div class="mrow" style="margin-top:8px">' + c.journey.map(function(j){ return '<span class="chip" style="background:transparent;color:#fff;border-color:#fff">' + esc(j) + '</span>'; }).join('') + '</div></div>' : '') +
      '</div>' + resHTML(c.res) + (c.src ? '<p class="src" style="margin-top:8px">' + c.src + '</p>' : '') +
      '<div class="sheet-nav"><button class="btn" type="button" data-case="' + prev.id + '">← ' + esc(prev.brand) + '</button><button class="btn" type="button" data-case="' + next.id + '">' + esc(next.brand) + ' →</button></div>';
    var sh = $('#caseSheet');
    if (sh.hidden) openSheet(sh); else { $('#caseIn').scrollTop = 0; }
    track('case', id); renderSaved();
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-case]'); if (!b) return; e.preventDefault();
    var pic = b.querySelector('.pic, .cc-pic') || (b.closest('.cc') && b.closest('.cc').querySelector('.cc-pic'));
    if (pic && document.startViewTransition && !reduce && $('#caseSheet').hidden){
      pic.style.viewTransitionName = 'case-hero';
      document.startViewTransition(function(){ pic.style.viewTransitionName = ''; openCase(b.dataset.case); var gh = $('#caseIn .gal-hero'); if (gh) gh.style.viewTransitionName = 'case-hero'; })
        .finished.then(function(){ var gh = $('#caseIn .gal-hero'); if (gh) gh.style.viewTransitionName = ''; });
    } else openCase(b.dataset.case);
  });

  /* =====================================================================
     ROUTING (views) + slime wipe
     ===================================================================== */
  var VIEWS = ['story', 'desk', 'work', 'profile', 'skills', 'contact', 'report'];
  var curView = null, isOwner = false, runtimeHere = !!(window.claude && window.claude.use);
  var WIPE = {story:'story', desk:'quick', work:'work', profile:'profile', skills:'skills', contact:'say hi', report:'console'};
  function parseHash(){
    var h = (location.hash || '').slice(1);
    if (h.indexOf('from-') === 0){ setSource(h.slice(5)); try{ history.replaceState(null, '', location.pathname + location.search); }catch(e){} return {view:'story'}; }
    if (h === 'edit' || h === 'edit-off'){
      EDIT = h === 'edit'; root.classList.toggle('edit', EDIT);
      try{ if (EDIT) localStorage.setItem('xinhos-edit', '1'); else localStorage.removeItem('xinhos-edit'); }catch(e){}
      var eb0 = $('#editBadge'); if (EDIT && !eb0){ eb0 = document.createElement('div'); eb0.id = 'editBadge'; eb0.textContent = 'EDIT MODE · #edit-off'; document.body.appendChild(eb0); } else if (!EDIT && eb0) eb0.remove();
      if (typeof renderAll === 'function' && curView) renderAll();
      return {view:'story'};
    }
    if (h.indexOf('case-') === 0) return {view:'work', caseId:h.slice(5)};
    if (VIEWS.indexOf(h) > -1) return {view:h};
    return {view:'story', anchor:h};
  }
  function showView(v){
    $$('.view').forEach(function(s){ s.hidden = s.dataset.view !== v; s.classList.remove('enter'); });
    var el = $('[data-view="' + v + '"]');
    void el.offsetWidth; el.classList.add('enter');
    $$('[data-tab]').forEach(function(a){ if (a.dataset.tab === v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    root.classList.toggle('story-off', v !== 'story');
    if (v !== 'story'){ svg.setAttribute('width', 0); svg.setAttribute('height', 0); }
    curView = v;
    if (typeof dockUpdate === 'function') setTimeout(dockUpdate, 50);
    if (typeof miniGo === 'function' && v !== 'story' && v !== 'report') setTimeout(function(){ miniGo(v); }, 900);
    if (v === 'report') renderReport();
    track('view', v);
    if (v === 'story') rebuild();
  }
  function route(){
    var r = parseHash();
    var go = function(){
      if (r.view !== curView){ showView(r.view); if (!r.anchor) window.scrollTo(0, 0); }
      if (r.anchor){ var t = document.getElementById(r.anchor); if (t) setTimeout(function(){ t.scrollIntoView({behavior: reduce ? 'auto' : 'smooth'}); }, 60); }
      if (r.caseId) openCase(r.caseId);
    };
    if (curView && r.view !== curView && !reduce){ wipe(WIPE[r.view], go); } else go();
  }
  var wipeEl = $('#wipe');
  function wipe(word, mid){
    $('#wipeWord').textContent = word;
    wipeEl.className = ''; void wipeEl.offsetWidth; wipeEl.className = 'in';
    setTimeout(function(){ closeSheets(); mid(); wipeEl.className = 'out'; setTimeout(function(){ wipeEl.className = ''; }, 520); }, 400);
  }
  window.addEventListener('hashchange', route);

  /* =====================================================================
     STORY: tangle, pin, thread
     ===================================================================== */
  var tzCount = $('#tzCount'), tz = $('#brief'), tg = $('#tg'), tgU = $('#tgU'), tgS = $('#tgS'), notes = $$('.notes > span');
  var N = 40, END = {x:300, y:440}, messy = [], neat = [];
  for (var i = 0; i < N; i++){
    var a = i * 0.88, rr = 92 + 70 * Math.sin(i * 1.6);
    var mx = 300 + rr * Math.cos(a) * 1.25 + 40 * Math.sin(i * 0.45);
    var my = 190 + i * 1.6 + rr * 0.9 * Math.sin(a * 1.3);
    if (i === 0){ mx = 60; my = 40; }
    if (i >= N - 5){ var w = (i - (N - 6)) / 5; mx += (END.x - mx) * w; my += (END.y - my) * w; }
    messy.push({x:mx, y:my});
    var u = i / (N - 1);
    neat.push({x:60 + 240 * (1 - Math.pow(1 - u, 3)), y:40 + (END.y - 40) * u});
  }
  function smooth(pts){
    var d = 'M' + pts[0].x.toFixed(1) + ',' + pts[0].y.toFixed(1);
    for (var i = 0; i < pts.length - 1; i++){
      var p0 = pts[i-1] || pts[i], p1 = pts[i], p2 = pts[i+1], p3 = pts[i+2] || p2;
      d += ' C' + (p1.x + (p2.x - p0.x) / 6).toFixed(1) + ',' + (p1.y + (p2.y - p0.y) / 6).toFixed(1) + ' ' +
           (p2.x - (p3.x - p1.x) / 6).toFixed(1) + ',' + (p2.y - (p3.y - p1.y) / 6).toFixed(1) + ' ' + p2.x.toFixed(1) + ',' + p2.y.toFixed(1);
    }
    return d;
  }
  function ease(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }
  var lastT = -1, tangleVis = true;
  function drawTangle(now){
    var r = tz.getBoundingClientRect(), vh = window.innerHeight;
    tangleVis = r.bottom > 0 && r.top < vh;
    if (!tangleVis && lastT >= 0) return;
    var t = reduce ? 1 : clamp((vh * 0.62 - r.top) / (r.height * 0.75), 0, 1);
    var wob = reduce ? 0 : 1 - t;
    if (Math.abs(t - lastT) < 0.0005 && wob === 0) return;
    lastT = t;
    var pts = [];
    for (var i = 0; i < N; i++){
      var k = ease(clamp(t * 1.7 - ((N - 1 - i) / N) * 0.7, 0, 1));
      var j = (i > 0 && i < N - 1) ? Math.sin(now / 560 + i * 1.3) * 4 * wob : 0;
      pts.push({x: messy[i].x + (neat[i].x - messy[i].x) * k + j, y: messy[i].y + (neat[i].y - messy[i].y) * k + j * .6});
    }
    var d = smooth(pts);
    tg.setAttribute('d', d); tgU.setAttribute('d', d); tgS.setAttribute('d', d);
    var open = 0;
    notes.forEach(function(n, i){ var ok = t > 0.3 + i * 0.14; n.classList.toggle('ok', ok); if (!ok) open++; });
    var cl = t > 0.94; tz.classList.toggle('clear', cl);
    var key = lang + open + cl;
    if (tzCount.dataset.k !== key){ tzCount.dataset.k = key; var vi = lang === 'vi';
      tzCount.innerHTML = cl ? (vi ? 'Gỡ xong hết! · <b>kế hoạch đã chốt</b>' : 'All untangled! · <b>plan locked</b>')
        : '<b>' + open + '</b> ' + (vi ? 'câu hỏi chưa có lời giải' : (open === 1 ? 'open question' : 'open questions')); }
  }

  var pin = $('#pin'), pinView = $('#pinView'), trackEl = $('#track');
  var routeLine = $('#routeLine'), routeDone = $('#routeDone'), routeMini = $('#routeMini'), routeLbl = $('#routeLbl');
  var pinned = false, pinDist = 0, stops = [], cards = [];
  function setupStops(){
    cards = $$('.card', trackEl);
    $$('.st', routeLine).forEach(function(s){ s.remove(); }); stops = [];
    cards.forEach(function(c, i){ var s = document.createElement('span'); s.className = 'st'; s.style.left = (i / (cards.length - 1) * 100) + '%'; routeLine.insertBefore(s, routeMini); stops.push(s); });
  }
  function layoutPin(){
    var can = false; /* horizontal scroll-jack removed: cases stack vertically */
    pinned = can; root.classList.toggle('pinned', can);
    trackEl.style.transform = '';
    if (!can){ pin.style.height = ''; cards.forEach(function(c){ c.classList.remove('cur'); }); return; }
    pinDist = Math.max(0, trackEl.scrollWidth - pinView.clientWidth);
    pin.style.height = (pinView.offsetHeight + pinDist) + 'px';
  }
  function updatePin(){
    if (!pinned || curView !== 'story') return;
    var hud = parseFloat(getComputedStyle(root).getPropertyValue('--hud')) || 76;
    var r = pin.getBoundingClientRect(), span = pin.offsetHeight - pinView.offsetHeight;
    var p = span > 0 ? clamp((hud - r.top) / span, 0, 1) : 0;
    trackEl.style.transform = 'translate3d(' + (-p * pinDist).toFixed(1) + 'px,0,0)';
    var idx = Math.round(p * (cards.length - 1));
    cards.forEach(function(c, i){ c.classList.toggle('cur', i === idx); });
    stops.forEach(function(s, i){ s.classList.toggle('on', i <= idx); });
    routeDone.style.width = (p * 100) + '%'; routeMini.style.left = (p * 100) + '%';
    routeLbl.textContent = 'STOP ' + (idx + 1) + '/' + cards.length;
  }

  var svg = $('#threadSvg'), base = $('#tBase'), under = $('#tUnder'), live = $('#tLive'), shine = $('#tShine');
  var player = $('#player'), fill = $('#hudFill'), pips = $$('[data-pip]');
  var samples = [], total = 0, nodes = [], drawn = 0, ready = false, pinRange = null, stage = 0;
  var stageNames = {en:['LV.0','LV.1 WHO','LV.2 HOW','LV.3 PROOF','LV.4 RESULTS','LV.5 YOU GET','END'], vi:['LV.0','LV.1 AI LÀM','LV.2 CÁCH LÀM','LV.3 BẰNG CHỨNG','LV.4 KẾT QUẢ','LV.5 BẠN NHẬN','KẾT']};
  function build(){
    if (curView !== 'story') return;
    layoutPin();
    svg.setAttribute('height', 0); svg.setAttribute('width', 0);
    var W = root.clientWidth, H = Math.max(document.body.scrollHeight, root.scrollHeight);
    svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var els = $$('#v-story [data-node]').filter(function(el){ return !(pinned && el.closest('.track')) && el.getClientRects().length > 0; });
    var sx = window.scrollX, sy = window.scrollY;
    var pts = els.map(function(el){ var r = el.getBoundingClientRect(); return {x:r.left + r.width/2 + sx, y:r.top + r.height/2 + sy, el:el}; });
    if (pts.length < 2) return;
    var d = 'M' + pts[0].x.toFixed(1) + ',' + pts[0].y.toFixed(1);
    for (var i = 1; i < pts.length; i++){
      var a = pts[i-1], b = pts[i], dy = b.y - a.y, k = Math.max(20, Math.abs(dy) * 0.5);
      d += ' C' + a.x.toFixed(1) + ',' + (a.y + k).toFixed(1) + ' ' + b.x.toFixed(1) + ',' + (b.y - k).toFixed(1) + ' ' + b.x.toFixed(1) + ',' + b.y.toFixed(1);
    }
    [base, under, live, shine].forEach(function(p){ p.setAttribute('d', d); });
    total = live.getTotalLength();
    samples = [];
    for (var l = 0; l < total; l += 6){ var p = live.getPointAtLength(l); samples.push([l, p.x, p.y]); }
    var pe = live.getPointAtLength(total); samples.push([total, pe.x, pe.y]);
    var si = 0;
    nodes = pts.map(function(p){
      var best = si, bd = Infinity;
      for (var j = si; j < samples.length; j++){
        var dx = samples[j][1] - p.x, dyy = samples[j][2] - p.y, dd = dx*dx + dyy*dyy;
        if (dd < bd){ bd = dd; best = j; }
        if (bd < 16 && dd > 250000) break;
      }
      si = best;
      return {el:p.el, len:samples[best][0], cp:p.el.hasAttribute('data-cp') ? +p.el.getAttribute('data-cp') : -1, reach:p.el.closest('[data-reach]')};
    });
    var cp4 = nodes.filter(function(n){ return n.cp === 4; })[0];
    var after = cp4 ? nodes[nodes.indexOf(cp4) + 1] : null;
    pinRange = (pinned && cp4 && after) ? [cp4.len + 40, after.len - 40] : null;
    [under, live, shine].forEach(function(p){ p.style.strokeDasharray = total + ' ' + total; });
    ready = true; drawn = Math.min(drawn, total);
    schedule();
  }
  function lenForY(y){
    if (!samples.length || y <= samples[0][2]) return 0;
    for (var j = 0; j < samples.length; j++){ if (samples[j][2] >= y) return samples[j][0]; }
    return total;
  }
  function setStage(s, force){
    if (s === stage && !force) return;
    stage = s; root.setAttribute('data-stage', s);
    $('#now').textContent = stageNames[lang][s];
    pips.forEach(function(p){ var n = +p.dataset.pip; p.classList.toggle('done', n < s); p.classList.toggle('cur', n === s); });
    track('lv', s);
    if (typeof renderSaved === 'function') renderSaved();
    if (typeof miniGo === 'function' && curView === 'story' && booted) miniGo(s);
  }
  var raf = 0, animating = false;
  function schedule(){ if (!raf) raf = requestAnimationFrame(frame); }
  function frame(now){
    raf = 0;
    if (curView !== 'story') return;
    drawTangle(now || 0);
    updatePin();
    if (ready){
      var target = reduce ? total : lenForY(window.scrollY + window.innerHeight * 0.62);
      if (window.scrollY + window.innerHeight >= root.scrollHeight - 4) target = total;
      drawn += (target - drawn) * (reduce ? 1 : 0.16);
      if (Math.abs(target - drawn) < 0.6) drawn = target;
      var off = (total - drawn).toFixed(1);
      under.style.strokeDashoffset = off; live.style.strokeDashoffset = off; shine.style.strokeDashoffset = off;
      var pt = live.getPointAtLength(drawn);
      player.style.transform = 'translate(' + pt.x.toFixed(1) + 'px,' + pt.y.toFixed(1) + 'px)';
      player.classList.toggle('hide', !!(pinRange && drawn > pinRange[0] && drawn < pinRange[1]) || (!tz.classList.contains('clear') && drawn < 4));
      var s = 0;
      nodes.forEach(function(n){
        var on = drawn >= n.len - 3;
        n.el.classList.toggle('on', on);
        if (n.reach) n.reach.classList.toggle('reached', on);
        if (on && n.cp > s) s = n.cp;
      });
      setStage(s);
      fill.style.width = (total ? drawn / total * 100 : 0) + '%';
      animating = drawn !== target;
    }
    if (animating || (!reduce && tangleVis && lastT < 0.999)) schedule();
  }
  window.addEventListener('scroll', schedule, {passive:true});
  var rt = 0;
  function rebuild(){ clearTimeout(rt); rt = setTimeout(build, 140); }
  window.addEventListener('resize', rebuild);
  if ('ResizeObserver' in window){ new ResizeObserver(rebuild).observe($('main')); }
  if (document.fonts && document.fonts.ready){ document.fonts.ready.then(rebuild); }
  window.addEventListener('load', rebuild);

  /* reveal + counters */
  function countUp(el){
    var to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '', suf = el.dataset.suf || '', sep = el.dataset.sep;
    var t0 = performance.now(), dur = 1300;
    function fmt(v){ var s = v.toFixed(dec); if (sep) s = Number(s).toLocaleString('en-US'); return pre + s + suf; }
    (function step(t){ var k = clamp((t - t0) / dur, 0, 1); k = 1 - Math.pow(1 - k, 3); el.textContent = fmt(to * k); if (k < 1) requestAnimationFrame(step); })(t0);
  }
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (!e.isIntersecting) return; e.target.classList.add('in'); var b = e.target.querySelector('[data-to]'); if (b) countUp(b); io.unobserve(e.target); });
    }, {rootMargin:'0px 0px -12% 0px'});
    $$('.rv').forEach(function(el){ io.observe(el); });
  } else { $$('.rv').forEach(function(el){ el.classList.add('in'); }); }

  /* slime drips */
  $$('[data-slime]').forEach(function(s, k){
    var n = 9, html = '';
    for (var i = 0; i < n; i++){
      var x = 6 + (i * 88 / (n - 1)) + Math.sin(i * 7 + k) * 3, w = 14 + ((i * 13 + k * 7) % 22), h = 18 + ((i * 29 + k * 11) % 46);
      html += '<span style="left:' + x.toFixed(1) + '%; --w:' + w + 'px; --h:' + h + 'px; --t:' + (4 + (i % 4)) + 's; --dl:-' + (i * .7).toFixed(1) + 's"></span>';
    }
    s.innerHTML = html;
  });

  function burst(){}

  /* draggable stickers */
  $$('[data-drag]').forEach(function(el){
    var sx, sy, ox = 0, oy = 0, id = null;
    el.addEventListener('pointerdown', function(e){ id = e.pointerId; el.setPointerCapture(id); el.classList.add('drag'); sx = e.clientX - ox; sy = e.clientY - oy; e.preventDefault(); });
    el.addEventListener('pointermove', function(e){ if (e.pointerId !== id) return; ox = e.clientX - sx; oy = e.clientY - sy; el.style.translate = ox + 'px ' + oy + 'px'; });
    function end(e){ if (e.pointerId !== id) return; id = null; el.classList.remove('drag'); burst(e.clientX, e.clientY, 8); track('sticker', 1); }
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  });

  /* tooltip */
  var tip = $('#tip');
  document.addEventListener('pointerover', function(e){ var t = e.target.closest('[data-tip]'); if (!t){ tip.hidden = true; return; } tip.textContent = t.dataset.tip; tip.hidden = false; });
  document.addEventListener('pointermove', function(e){ if (!tip.hidden){ tip.style.left = e.clientX + 'px'; tip.style.top = e.clientY + 'px'; } }, {passive:true});

  /* =====================================================================
     ANALYTICS — one session record per visit
     ===================================================================== */
  function rid(){ return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }
  var did = null;
  try{ did = localStorage.getItem('xinhos-did'); if (!did){ did = rid(); localStorage.setItem('xinhos-did', did); } }catch(e){ did = rid(); }
  var refHost = '';
  try{ if (document.referrer){ var rh = new URL(document.referrer).hostname; if (rh && rh !== location.hostname) refHost = rh.replace(/^www\./, ''); } }catch(e){}
  var utm = ''; try{ utm = new URLSearchParams(location.search).get('utm_source') || ''; }catch(e){}
  var S = {sid:rid(), did:did, src: utm ? utm.toLowerCase() : (refHost || 'direct'), start:Date.now(), last:Date.now(), dur:0, dev: innerWidth < 760 ? 'mobile' : (innerWidth < 1100 ? 'tablet' : 'desktop'), lang:'en', path:[], dwell:{}, maxLv:0, cases:[], contacts:[]};
  function setSource(s){ S.src = String(s).toLowerCase().replace(/[^a-z0-9_.~-]/g, '').slice(0, 30) || 'direct'; }
  var dbRef = null, userNs = null, uid = null, dbDenied = false, writing = false, pendingWrite = false, startedDb = false;
  function track(kind, val){
    if (kind === 'view'){ if (!S.path.length || S.path[S.path.length - 1].v !== val){ S.path.push({v:val, t:Math.round((Date.now() - S.start) / 1000)}); if (S.path.length > 80) S.path.shift(); } }
    else if (kind === 'lv'){ if (val > S.maxLv) S.maxLv = val; else return; }
    else if (kind === 'case'){ if (S.cases.indexOf(val) < 0) S.cases.push(val); }
    else if (kind === 'contact'){ S.contacts.push(val); if (S.contacts.length > 40) S.contacts.shift(); }
    else if (kind === 'connect'){ S.contacts.push('connect-open'); }
    else if (kind === 'mode'){ S.mode = val; }
    else return;
    saveLocal(); saveDb();
    gcEvent(kind, val);
  }
  setInterval(function(){
    if (document.hidden) return;
    S.dur++; S.last = Date.now();
    if (curView) S.dwell[curView] = (S.dwell[curView] || 0) + 1;
    if (S.dur % 10 === 0) saveLocal();
  }, 1000);
  document.addEventListener('visibilitychange', function(){ if (document.hidden){ saveLocal(); saveDb(); } });
  window.addEventListener('pagehide', function(){ saveLocal(); saveDb(); });
  function loadLocal(){ try{ return JSON.parse(localStorage.getItem('xinhos-log') || '[]') || []; }catch(e){ return []; } }
  function saveLocal(){
    S.lang = lang;
    try{ var log = loadLocal().filter(function(x){ return x.sid !== S.sid; }); log.push(S); if (log.length > 300) log = log.slice(-300); localStorage.setItem('xinhos-log', JSON.stringify(log)); }catch(e){}
  }
  function saveDb(){
    if (!dbRef || !uid || isOwner || dbDenied) return;
    if (writing){ pendingWrite = true; return; }
    writing = true;
    var body = JSON.parse(JSON.stringify(S));
    var p = startedDb ? Promise.resolve() : dbRef.doc('visits/' + uid).set({last:Date.now()}).then(function(){ startedDb = true; });
    p.then(function(){ return dbRef.doc('visits/' + uid + '/s/' + S.sid).set(body); })
     .catch(function(e){ if (e && (e.code === 'invalid_argument' || e.code === 'revoked' || e.code === 'not_granted' || e.code === 'quota_exceeded')) dbDenied = true; })
     .then(function(){ writing = false; if (pendingWrite){ pendingWrite = false; saveDb(); } });
  }
  /* GoatCounter (only when hosted outside claude.ai and configured) */
  function gcEvent(kind, val){
    if (!GOATCOUNTER || runtimeHere || !window.goatcounter || !window.goatcounter.count) return;
    try{ window.goatcounter.count({path: kind === 'view' ? '/' + val : kind + '-' + val, title: kind, event: kind !== 'view'}); }catch(e){}
  }
  if (GOATCOUNTER && !runtimeHere){
    var gs = document.createElement('script'); gs.async = true; gs.src = 'https://gc.zgo.at/count.js'; gs.setAttribute('data-goatcounter', GOATCOUNTER); gs.setAttribute('data-goatcounter-settings', '{"no_onload":true}');
    gs.onload = function(){ gcEvent('view', curView || 'story'); }; document.head.appendChild(gs);
  }

  /* =====================================================================
     REPORT
     ===================================================================== */
  var rpSource = 'all', rpRange = 30, dbSessions = null, dbErr = '';
  function fetchDb(){
    if (!dbRef){ dbSessions = []; return Promise.resolve(); }
    return dbRef.collection('visits').get().then(function(q){
      return Promise.all(q.docs.map(function(d){ return dbRef.collection('visits/' + d.id + '/s').get().then(function(s){ return s.docs.map(function(x){ return x.data(); }); }); }));
    }).then(function(arr){ dbSessions = [].concat.apply([], arr); dbErr = ''; }).catch(function(e){ dbSessions = []; dbErr = (e && e.code) || 'error'; });
  }
  function sampleData(){
    var seed = 7; function rnd(){ seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    var srcs = ['linkedin','linkedin','linkedin','cv','cv','zalo','facebook','direct','direct','email'], out = [], now = Date.now();
    for (var i = 0; i < 74; i++){
      var dayAgo = Math.floor(Math.pow(rnd(), 1.4) * 30), hour = [9,10,11,14,15,16,20,21,22][Math.floor(rnd() * 9)];
      var st = new Date(now - dayAgo * 864e5); st.setHours(hour, Math.floor(rnd() * 60));
      var v = ['story']; var mx = Math.floor(rnd() * 7); var path = [{v:'story', t:0}], dw = {story: 20 + Math.floor(rnd() * 160)};
      if (rnd() < .55){ path.push({v:'work', t:dw.story}); dw.work = 15 + Math.floor(rnd() * 120); }
      if (rnd() < .3){ path.push({v:'profile', t:60}); dw.profile = 10 + Math.floor(rnd() * 60); }
      if (rnd() < .28){ path.push({v:'contact', t:90}); dw.contact = 8 + Math.floor(rnd() * 40); }
      var cs = ['vib','msb','cake','poca','digimi'].filter(function(){ return rnd() < .25; });
      var ct = path.some(function(p){ return p.v === 'contact'; }) && rnd() < .6 ? [['zalo','email','linkedin','call'][Math.floor(rnd() * 4)]] : [];
      var dur = Object.keys(dw).reduce(function(a, k){ return a + dw[k]; }, 0);
      out.push({mode: rnd() < .45 ? 'quick' : 'story', sid:'s' + i, did:'d' + Math.floor(rnd() * 52), src:srcs[Math.floor(rnd() * srcs.length)], start:st.getTime(), dur:dur, dev: rnd() < .58 ? 'mobile' : 'desktop', lang: rnd() < .7 ? 'vi' : 'en', path:path, dwell:dw, maxLv:mx, cases:cs, contacts:ct});
    }
    return out;
  }
  function agg(list){
    var cutoff = rpRange ? Date.now() - rpRange * 864e5 : 0;
    var ss = list.filter(function(s){ return s && s.start >= cutoff; });
    var A = {n:ss.length, vis:{}, dur:0, contact:0, done:0, days:{}, heat:[], src:{}, funnel:[0,0,0,0,0,0,0], modes:{}, trans:{}, dwell:{}, dwellN:{}, cases:{}, contacts:{}, dev:{}, lang:{}, recent:ss.slice().sort(function(a, b){ return b.start - a.start; }).slice(0, 12)};
    for (var d = 0; d < 7; d++){ A.heat.push([]); for (var h = 0; h < 24; h++) A.heat[d].push(0); }
    ss.forEach(function(s){
      A.vis[s.uid || s.did] = 1; A.dur += s.dur || 0;
      var cts = (s.contacts || []).filter(function(c){ return c !== 'connect-open' && c !== 'template'; });
      if (cts.length) A.contact++;
      if ((s.maxLv || 0) >= 6) A.done++;
      if (s.mode) A.modes[s.mode] = (A.modes[s.mode] || 0) + 1;
      var dt = new Date(s.start), key = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
      A.days[key] = (A.days[key] || 0) + 1;
      A.heat[(dt.getDay() + 6) % 7][dt.getHours()]++;
      A.src[s.src || 'direct'] = (A.src[s.src || 'direct'] || 0) + 1;
      for (var l = 0; l <= Math.min(6, s.maxLv || 0); l++) A.funnel[l]++;
      var p = s.path || [];
      for (var i = 1; i < p.length; i++){ var k = p[i-1].v + ' → ' + p[i].v; A.trans[k] = (A.trans[k] || 0) + 1; }
      Object.keys(s.dwell || {}).forEach(function(v){ A.dwell[v] = (A.dwell[v] || 0) + s.dwell[v]; A.dwellN[v] = (A.dwellN[v] || 0) + 1; });
      (s.cases || []).forEach(function(c){ A.cases[c] = (A.cases[c] || 0) + 1; });
      cts.forEach(function(c){ A.contacts[c] = (A.contacts[c] || 0) + 1; });
      A.dev[s.dev || '?'] = (A.dev[s.dev || '?'] || 0) + 1;
      A.lang[s.lang || '?'] = (A.lang[s.lang || '?'] || 0) + 1;
    });
    A.visN = Object.keys(A.vis).length;
    return A;
  }
  function mmss(s){ s = Math.round(s || 0); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  function pct(a, b){ return b ? Math.round(a / b * 100) + '%' : '–'; }
  function barList(obj, fmt, labels){
    var ks = Object.keys(obj).sort(function(a, b){ return obj[b] - obj[a]; });
    if (!ks.length) return '<div class="empty-st">' + (lang === 'vi' ? 'Chưa có dữ liệu' : 'No data yet') + '</div>';
    var mx = obj[ks[0]] || 1;
    return '<div class="bl">' + ks.slice(0, 8).map(function(k){
      var v = obj[k], lb = labels && labels[k] ? labels[k] : k;
      return '<div class="r" data-tip="' + esc(lb + ': ' + (fmt ? fmt(v) : v)) + '"><span class="lb">' + esc(lb) + '</span><span class="tr"><i style="width:' + (v / mx * 100).toFixed(1) + '%"></i></span><span class="v">' + (fmt ? fmt(v) : v) + '</span></div>';
    }).join('') + '</div>';
  }
  function missingItems(){
    var vi = lang === 'vi', m = [];
    function add(sec, item){ m.push([sec, item]); }
    if (!IMAGES['portrait.png']) add('Hero · Profile', vi ? 'portrait.png: ảnh chân dung dọc 4:5' : 'portrait.png: portrait photo, 4:5');
    if (!CV_URL) add(vi ? '30 giây · Liên hệ' : '30s · Contact', vi ? 'Link CV (PDF)' : 'CV link (PDF)');
    [['phone', vi ? 'Số điện thoại' : 'Phone'], ['linkedin', 'LinkedIn'], ['facebook', 'Facebook']].forEach(function(k){ if (!CONTACT[k[0]]) add(vi ? 'Liên hệ' : 'Contact', k[1]); });
    CASES.forEach(function(c){
      var sec = 'Case · ' + c.brand, imgs = c.imgs.filter(function(n){ return !IMAGES[n]; });
      if (imgs.length) add(sec, (vi ? 'Ảnh: ' : 'Images: ') + imgs.join(', '));
      if (!c.role) add(sec, vi ? 'Vai trò của bạn trong dự án' : 'Your title on the project');
      if (!c.period) add(sec, vi ? 'Thời gian (tháng/năm)' : 'Period (month/year)');
      if (!c.scope.length) add(sec, vi ? 'Quy mô: team, ngân sách, số deliverable' : 'Scope: team, budget, deliverables');
      if (c.res.some(function(r){ return r.empty; })) add(sec, vi ? 'Một số liệu kết quả gắn với phần bạn làm' : 'One result tied to your part');
    });
    add(vi ? 'Năng lực' : 'Skills', vi ? 'Xác nhận dự án nào có từng đầu việc trong 9 đầu việc' : 'Confirm which projects include each of the 9 capabilities');
    return m;
  }
  function missingHTML(){
    var m = missingItems(), vi = lang === 'vi', groups = {};
    m.forEach(function(x){ (groups[x[0]] = groups[x[0]] || []).push(x[1]); });
    var body = Object.keys(groups).map(function(g){ return '<div><span>' + esc(g) + '</span><b>' + groups[g].map(esc).join(' · ') + '</b></div>'; }).join('');
    return '<div class="panel wide"><h3>' + (vi ? 'Nội dung còn thiếu' : 'Missing content') + ' · ' + m.length + '</h3><p class="sub">' + (vi ? 'Người xem không thấy các chỗ trống này. Mở link với #edit để thấy vị trí từng ô.' : 'Visitors never see these gaps. Open the link with #edit to see where each one goes.') + '</p><div class="body miss">' + (body || '<div>✓</div>') + '</div></div>';
  }
  var VIEW_LBL = {story:'Story', desk:'Quick', work:'Work', profile:'Profile', skills:'Skills', contact:'Contact', report:'Report'};
  function renderReport(){
    var host = $('#report'), vi = lang === 'vi';
    if (runtimeHere && !isOwner){
      host.innerHTML = '<div class="locked"><p class="h2" style="font-size:32px">' + (vi ? 'Khu vực này chỉ dành cho chủ trang.' : 'This console is for the owner only.') + '</p><p class="lead" style="margin-inline:auto">' + (vi ? 'Bạn có thể quay lại xem dự án.' : 'Head back to the work.') + '</p><p><a class="btn hot" href="#work">' + (vi ? 'Xem dự án' : 'See the work') + '</a></p></div>';
      return;
    }
    if (rpSource === 'all' && dbSessions === null){ host.innerHTML = '<div class="empty-st">' + (vi ? 'Đang tải số liệu…' : 'Loading…') + '</div>'; fetchDb().then(renderReport); return; }
    var list = rpSource === 'sample' ? sampleData() : rpSource === 'local' ? loadLocal() : (dbSessions || []);
    var A = agg(list);
    var seg = function(name, opts, cur){ return '<div class="segb" role="group">' + opts.map(function(o){ return '<button type="button" data-' + name + '="' + o[0] + '" aria-pressed="' + (String(o[0]) === String(cur) ? 'true' : 'false') + '">' + o[1] + '</button>'; }).join('') + '</div>'; };
    var note = rpSource === 'sample'
      ? '<span class="sample-flag">' + (vi ? 'DỮ LIỆU MẪU' : 'SAMPLE DATA') + '</span> ' + (vi ? 'Số liệu tạo ngẫu nhiên để xem bố cục. Không phải lượt xem thật.' : 'Made-up numbers to preview the layout. Not real visits.')
      : rpSource === 'local'
      ? (vi ? '<b>Thiết bị này:</b> chỉ các lượt bạn mở trang trên trình duyệt này.' : '<b>This device:</b> only visits made in this browser.')
      : (vi ? '<b>Tất cả người xem:</b> trên claude.ai, nền tảng chỉ cho người đã đăng nhập và có quyền Contributor trở lên ghi dữ liệu, nên khách xem qua link công khai chưa được đếm. Khi đưa web lên GitHub Pages và gắn GoatCounter, mọi lượt xem công khai sẽ được đếm.' : '<b>All viewers:</b> on claude.ai only signed-in people with Contributor access or above can record data, so public-link visitors are not counted yet. Host on GitHub Pages with GoatCounter to count every public visit.') + (dbErr ? ' (' + esc(dbErr) + ')' : '');
    var days = rpRange || 30, dayBars = '', mxd = 1, dk = [];
    for (var i = days - 1; i >= 0; i--){ var dt = new Date(Date.now() - i * 864e5), key = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate(); dk.push([dt, A.days[key] || 0]); }
    dk.forEach(function(x){ if (x[1] > mxd) mxd = x[1]; });
    dayBars = dk.map(function(x){ return '<div data-tip="' + x[0].getDate() + '/' + (x[0].getMonth() + 1) + ': ' + x[1] + (vi ? ' lượt' : ' visits') + '"><i style="height:' + (x[1] / mxd * 100).toFixed(1) + '%"></i></div>'; }).join('');
    var mxh = 1; A.heat.forEach(function(r){ r.forEach(function(v){ if (v > mxh) mxh = v; }); });
    var dn = vi ? ['T2','T3','T4','T5','T6','T7','CN'] : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var heat = A.heat.map(function(r, d){ return '<span class="lb">' + dn[d] + '</span>' + r.map(function(v, h){ var k = v / mxh; return '<span class="c" style="background:' + (v ? 'color-mix(in srgb, var(--blue) ' + Math.round(15 + k * 85) + '%, #eef0fb)' : '#eef0fb') + '" data-tip="' + dn[d] + ' ' + h + 'h: ' + v + '"></span>'; }).join(''); }).join('');
    var fl = vi ? ['Vào story','LV.1 Ai làm','LV.2 Cách làm','LV.3 Bằng chứng','LV.4 Kết quả','LV.5 Bạn nhận','Kết · liên hệ'] : ['Story start','LV.1 Who','LV.2 How','LV.3 Proof','LV.4 Results','LV.5 You get','End · contact'];
    var funnel = A.n ? A.funnel.map(function(v, i){ var prev = i ? A.funnel[i - 1] : v; return '<div class="r" data-tip="' + fl[i] + ': ' + v + '"><span>' + fl[i] + '</span><span class="tr"><i style="width:' + (v / (A.funnel[0] || 1) * 100).toFixed(1) + '%"></i></span><span class="v">' + v + ' · ' + pct(v, A.funnel[0]) + (i && prev ? '<small>−' + pct(prev - v, prev) + '</small>' : '') + '</span></div>'; }).join('') : '<div class="empty-st">' + (vi ? 'Chưa có dữ liệu' : 'No data yet') + '</div>';
    var tk = Object.keys(A.trans).sort(function(a, b){ return A.trans[b] - A.trans[a]; }).slice(0, 6);
    var flows = tk.length ? tk.map(function(k){ return '<div><span>' + esc(k.replace(/\w+/g, function(w){ return VIEW_LBL[w] || w; })) + '</span><b>' + A.trans[k] + '</b></div>'; }).join('') : '<div class="empty-st">' + (vi ? 'Chưa có lượt chuyển tab' : 'No tab switches yet') + '</div>';
    var dwellAvg = {}; Object.keys(A.dwell).forEach(function(v){ dwellAvg[VIEW_LBL[v] || v] = A.dwell[v] / A.dwellN[v]; });
    var caseLbl = {}; CASES.forEach(function(c){ caseLbl[c.id] = c.brand; });
    var base = runtimeHere ? ARTIFACT_URL : (location.origin + location.pathname);
    var links = ['linkedin','cv','zalo','facebook','email','instagram'].map(function(s){ var u = base + '#from-' + s; return '<div><span class="mono">' + s + '</span><code>' + esc(u) + '</code><button type="button" data-copy="' + esc(u) + '">' + (vi ? 'Chép' : 'Copy') + '</button></div>'; }).join('');
    var rows = A.recent.map(function(s){ var d = new Date(s.start); return '<tr><td>' + d.getDate() + '/' + (d.getMonth() + 1) + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + '</td><td>' + esc(s.src) + '</td><td>' + esc(s.dev) + '</td><td>' + mmss(s.dur) + '</td><td>' + esc((s.path || []).map(function(p){ return VIEW_LBL[p.v] || p.v; }).join(' → ')) + '</td><td>LV.' + (s.maxLv || 0) + '</td><td>' + esc((s.contacts || []).filter(function(c){ return c !== 'connect-open'; }).join(', ') || '–') + '</td></tr>'; }).join('');
    var topK = function(o){ var ks = Object.keys(o).sort(function(a, b){ return o[b] - o[a]; }); return ks[0] ? [ks[0], o[ks[0]]] : null; };
    var tSrc = topK(A.src), tCase = topK(A.cases), tCt = topK(A.contacts), qN = A.modes.quick || 0, sN = A.modes.story || 0;
    var ins = A.n ? [
      (vi ? A.n + ' lượt xem từ ' + A.visN + ' người, trung bình ' + mmss(A.dur / A.n) + ' mỗi lượt.' : A.n + ' visits from ' + A.visN + ' people, ' + mmss(A.dur / A.n) + ' per visit on average.'),
      tSrc ? (vi ? 'Nguồn nhiều nhất: ' + tSrc[0] + ' (' + pct(tSrc[1], A.n) + ').' : 'Top source: ' + tSrc[0] + ' (' + pct(tSrc[1], A.n) + ').') : '',
      (qN + sN) ? (vi ? pct(qN, qN + sN) + ' chọn Quick mode, ' + pct(sN, qN + sN) + ' chọn Story mode.' : pct(qN, qN + sN) + ' picked Quick mode, ' + pct(sN, qN + sN) + ' picked Story mode.') : '',
      (vi ? pct(A.contact, A.n) + ' lượt có bấm liên hệ' : pct(A.contact, A.n) + ' of visits clicked a contact') + (tCt ? (vi ? ', nhiều nhất qua ' + tCt[0] + '.' : ', mostly via ' + tCt[0] + '.') : '.'),
      tCase ? (vi ? 'Dự án được mở nhiều nhất: ' + (caseLbl[tCase[0]] || tCase[0]) + '.' : 'Most opened project: ' + (caseLbl[tCase[0]] || tCase[0]) + '.') : ''
    ].filter(Boolean) : [vi ? 'Chưa có lượt xem nào trong khoảng này.' : 'No visits in this range yet.'];
    host.innerHTML =
      '<div class="console-note"><span class="lockt">● ' + (vi ? 'RIÊNG TƯ · KHÔNG HIỆN VỚI NGƯỜI XEM' : 'PRIVATE · HIDDEN FROM VISITORS') + '</span></div>' +
      '<div class="insight"><h3>' + (vi ? 'Tóm tắt nhanh' : 'In short') + '</h3><ul>' + ins.map(function(t){ return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="rp-top">' + seg('rps', [['all', vi ? 'Tất cả người xem' : 'All viewers'], ['local', vi ? 'Thiết bị này' : 'This device'], ['sample', vi ? 'Dữ liệu mẫu' : 'Sample data']], rpSource) +
      seg('rpr', [[7, '7D'], [30, '30D'], [0, vi ? 'TẤT CẢ' : 'ALL']], rpRange) + '</div>' +
      '<p class="rp-note">' + note + '</p>' +
      '<div class="kpis">' +
        '<div class="kpi"><span>' + (vi ? 'Lượt xem' : 'Visits') + '</span><b>' + A.n + '</b><small>' + (vi ? 'phiên truy cập' : 'sessions') + '</small></div>' +
        '<div class="kpi"><span>' + (vi ? 'Người xem' : 'Visitors') + '</span><b>' + A.visN + '</b><small>' + (vi ? 'thiết bị / tài khoản' : 'devices / accounts') + '</small></div>' +
        '<div class="kpi"><span>' + (vi ? 'Thời gian TB' : 'Avg time') + '</span><b>' + mmss(A.n ? A.dur / A.n : 0) + '</b><small>' + (vi ? 'phút:giây mỗi lượt' : 'min:sec per visit') + '</small></div>' +
        '<div class="kpi"><span>' + (vi ? 'Liên hệ' : 'Contacted') + '</span><b>' + pct(A.contact, A.n) + '</b><small>' + A.contact + (vi ? ' lượt bấm liên hệ' : ' visits clicked a contact') + '</small></div>' +
        '<div class="kpi"><span>' + (vi ? 'Xem hết story' : 'Story finished') + '</span><b>' + pct(A.done, A.n) + '</b><small>' + (vi ? 'chạm tới lá cờ đích' : 'reached the goal flag') + '</small></div>' +
      '</div>' +
      '<div class="panels">' + missingHTML() +
        '<div class="panel wide"><h3>' + (vi ? 'Lượt xem theo ngày' : 'Visits per day') + '</h3><p class="sub">' + (vi ? 'Tần suất trong ' : 'Frequency over ') + days + (vi ? ' ngày gần nhất' : ' days') + '</p><div class="body"><div class="days">' + dayBars + '</div><div class="dx"><span>' + dk[0][0].getDate() + '/' + (dk[0][0].getMonth() + 1) + '</span><span>' + (vi ? 'hôm nay' : 'today') + '</span></div></div></div>' +
        '<div class="panel"><h3>' + (vi ? 'Nguồn xem' : 'Sources') + '</h3><p class="sub">' + (vi ? 'Từ link #from-… hoặc trang giới thiệu' : 'From #from-… links or the referring site') + '</p><div class="body">' + barList(A.src) + '</div></div>' +
        '<div class="panel"><h3>' + (vi ? 'Giờ xem trong tuần' : 'When people visit') + '</h3><p class="sub">' + (vi ? 'Theo giờ địa phương của người xem' : 'Viewer local time') + '</p><div class="body"><div class="heat">' + heat + '</div><div class="heat-x"><span></span>' + Array.apply(null, Array(24)).map(function(_, h){ return '<span>' + (h % 6 === 0 ? h : '') + '</span>'; }).join('') + '</div><div class="legend"><span>' + (vi ? 'ít' : 'fewer') + '</span><i style="background:#eef0fb"></i><i style="background:color-mix(in srgb, var(--blue) 40%, #eef0fb)"></i><i style="background:color-mix(in srgb, var(--blue) 70%, #eef0fb)"></i><i style="background:var(--blue)"></i><span>' + (vi ? 'nhiều' : 'more') + '</span></div></div></div>' +
        '<div class="panel"><h3>' + (vi ? 'Flow story: đi được tới đâu' : 'Story flow: how far people get') + '</h3><p class="sub">' + (vi ? 'Số lượt chạm từng level, kèm tỉ lệ rơi' : 'Visits reaching each level, with drop-off') + '</p><div class="body"><div class="funnel">' + funnel + '</div></div></div>' +
        '<div class="panel"><h3>' + (vi ? 'Flow giữa các tab' : 'Flow between tabs') + '</h3><p class="sub">' + (vi ? 'Đường đi phổ biến nhất' : 'Most common moves') + '</p><div class="body"><div class="flows">' + flows + '</div></div></div>' +
        '<div class="panel"><h3>' + (vi ? 'Thời gian ở mỗi tab' : 'Time on each tab') + '</h3><p class="sub">' + (vi ? 'Trung bình mỗi lượt có ghé tab đó' : 'Average per visit that opened it') + '</p><div class="body">' + barList(dwellAvg, mmss) + '</div></div>' +
        '<div class="panel"><h3>' + (vi ? 'Case được mở' : 'Cases opened') + '</h3><p class="sub">' + (vi ? 'Dự án được quan tâm nhất' : 'Most opened projects') + '</p><div class="body">' + barList(A.cases, null, caseLbl) + '</div></div>' +
        '<div class="panel"><h3>' + (vi ? 'Kênh liên hệ được bấm' : 'Contact channels clicked') + '</h3><p class="sub">Call · Zalo · Facebook · LinkedIn · Gmail</p><div class="body">' + barList(A.contacts) + '</div></div>' +
        '<div class="panel"><h3>' + (vi ? 'Thiết bị & ngôn ngữ' : 'Devices & language') + '</h3><p class="sub">' + (vi ? 'Lượt xem theo thiết bị, rồi theo ngôn ngữ' : 'Visits by device, then by language') + '</p><div class="body">' + barList(A.dev) + '<div style="height:12px"></div>' + barList(A.lang) + '</div></div>' +
        '<div class="panel wide"><h3>' + (vi ? 'Lượt xem gần đây' : 'Recent visits') + '</h3><p class="sub">' + (vi ? '12 lượt mới nhất' : 'Latest 12') + '</p><div class="body tscroll"><table class="ses"><thead><tr><th>' + (vi ? 'THỜI ĐIỂM' : 'WHEN') + '</th><th>' + (vi ? 'NGUỒN' : 'SOURCE') + '</th><th>' + (vi ? 'THIẾT BỊ' : 'DEVICE') + '</th><th>' + (vi ? 'THỜI GIAN' : 'TIME') + '</th><th>FLOW</th><th>' + (vi ? 'XA NHẤT' : 'FURTHEST') + '</th><th>' + (vi ? 'LIÊN HỆ' : 'CONTACT') + '</th></tr></thead><tbody>' + (rows || '<tr><td colspan="7">' + (vi ? 'Chưa có lượt xem' : 'No visits yet') + '</td></tr>') + '</tbody></table></div></div>' +
        '<div class="panel wide"><h3>' + (vi ? 'Link theo nguồn' : 'Links by source') + '</h3><p class="sub">' + (vi ? 'Gửi đúng link cho từng kênh để biết người xem đến từ đâu' : 'Share a different link per channel to see where viewers come from') + '</p><div class="body links">' + links + '</div><p class="copied" id="rpCopied"></p></div>' +
      '</div>';
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest('[data-rps]'); if (a){ rpSource = a.dataset.rps; if (rpSource === 'all') dbSessions = null; renderReport(); return; }
    var b = e.target.closest('[data-rpr]'); if (b){ rpRange = +b.dataset.rpr; renderReport(); }
  });

  /* =====================================================================
     DOCK (top / end) + TOAST (resume, recruiter shortcut)
     ===================================================================== */
  var goTop = $('#goTop'), goEnd = $('#goEnd'), toastEl = $('#toast'), toastFn = null, toastT = 0, posT = 0;
  function dockUpdate(){
    var y = window.scrollY, max = root.scrollHeight - window.innerHeight;
    goTop.hidden = y < window.innerHeight * 0.7;
    goEnd.hidden = y > max - window.innerHeight * 0.5;
  }
  goTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); });
  goEnd.addEventListener('click', function(){
    var f = curView === 'story' ? $('#finish') : null;
    if (f) f.scrollIntoView({behavior: reduce ? 'auto' : 'smooth'}); else window.scrollTo({top:root.scrollHeight, behavior: reduce ? 'auto' : 'smooth'});
  });
  window.addEventListener('scroll', function(){
    dockUpdate();
    if (toastEl.classList.contains('show') && window.scrollY > window.innerHeight * 1.2 && !toastEl.dataset.keep) hideToast();
    clearTimeout(posT);
    posT = setTimeout(function(){ if (curView === 'story' && stage > 0){ try{ localStorage.setItem('xinhos-pos', JSON.stringify({s:stage, t:Date.now()})); }catch(e){} } }, 700);
  }, {passive:true});
  window.addEventListener('resize', dockUpdate);
  function showToast(msg, lbl, fn){
    $('#toastTxt').innerHTML = both(msg); $('#toastGo').innerHTML = both(lbl); toastFn = fn;
    toastEl.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(hideToast, 12000);
  }
  function hideToast(){ toastEl.classList.remove('show'); }
  $('#toastGo').addEventListener('click', function(){ hideToast(); if (toastFn) toastFn(); track('toast', 'go'); });
  $('#toastX').addEventListener('click', hideToast);
  var FXSET = ['s-flower', 's-sun', 's-star', 's-spark', 's-heart'];
  function burstFx(x, y, n){
    if (reduce || !document.body.animate) return;
    for (var i = 0; i < n; i++){
      var w = document.createElement('div'); w.innerHTML = '<svg class="fxburst" viewBox="0 0 64 64" aria-hidden="true"><use href="#' + FXSET[i % FXSET.length] + '"/></svg>';
      var im = w.firstChild; im.style.left = (x - 20) + 'px'; im.style.top = (y - 20) + 'px'; document.body.appendChild(im);
      var a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 140;
      im.animate([{transform:'translate(0,0) scale(.3) rotate(0deg)', opacity:1}, {transform:'translate(' + (Math.cos(a) * d).toFixed(0) + 'px,' + (Math.sin(a) * d - 60).toFixed(0) + 'px) scale(1) rotate(' + (Math.random() * 360 - 180).toFixed(0) + 'deg)', opacity:0}], {duration:1100 + Math.random() * 500, easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish = (function(el){ return function(){ el.remove(); }; })(im);
    }
  }

  /* QUIZ: a small corner for people with time */
  var QUIZ = [
    {ic:'i-bag', q:{en:'A 1+1 promo that only starts at 5pm. Would you come back right on time?', vi:'Thấy CTKM 1+1 mà 5 giờ chiều mới áp dụng. Bạn có canh đúng giờ quay lại mua hông?'},
     a:{en:'I would, after asking for the fine print. Same with briefs: ask till it’s clear, show up on time.', vi:'Xinh thì có, còn hỏi kỹ thể lệ trước nữa. Brief cũng vậy: hỏi cho rõ, hẹn là tới.'}},
    {ic:'i-bubbles', q:{en:'Project’s done. Still in touch with the partners and the client, or is it “job over, bye”?', vi:'Xong dự án rồi, bạn còn giữ liên lạc với đối tác, khách hàng không, hay “hết job là hết thân”?'},
     a:{en:'I keep them all. Every relationship is a shortcut for the next project: the right people faster, better rates, quality I’ve already seen. When it’s urgent, someone always picks up.', vi:'Xinh giữ hết. Mỗi mối quan hệ là một lối tắt cho dự án sau: tìm đúng người nhanh hơn, giá tốt hơn, chất lượng đã kiểm chứng. Lúc cần gấp, gọi là có người bắt máy.'}},
    {ic:'s-flower', q:{en:'Your last day at a job. Did the company post your goodbye on its page?', vi:'Ngày nghỉ việc, công ty có đăng lời tạm biệt của bạn lên fanpage hông?'},
     a:{en:'Mine did. I hand over properly: files, contacts, lessons learned, so nothing breaks after I leave. Leaving well is part of owning it.', vi:'Của Xinh thì có. Vì Xinh bàn giao trọn: hồ sơ dự án, đầu mối, bài học, để người sau tiếp nối không bị đứt. Đi cho đẹp cũng là một phần của làm chủ.'}}
  ];
  var qi = 0, qPick = null, quizEl = $('#quiz');
  function renderQuiz(){
    var vi = lang === 'vi', b = $('#quizBody');
    if (qi >= QUIZ.length){
      b.innerHTML = '<svg class="ico q" viewBox="0 0 64 64" aria-hidden="true"><use href="#i-coin"/></svg><p class="goalq">' + (vi ? 'Bonus nè: mục tiêu đi làm của Xinh là làm cho trọn vẹn, và kiếm tiềnnn.' : 'Bonus: my work goal is to finish things properly, and earn moneyyy.') + '</p>' +
        '<div class="row"><button class="btn hot" type="button" data-connect>' + (vi ? 'Say hi với Xinh' : 'Say hi to Xinh') + '</button><button class="btn" type="button" data-qrestart>' + (vi ? 'Chơi lại' : 'Replay') + '</button></div>';
      return;
    }
    var q = QUIZ[qi];
    b.innerHTML = '<p class="qn">' + (vi ? 'CÂU ' : 'QUESTION ') + (qi + 1) + '/' + QUIZ.length + '</p><svg class="ico q" viewBox="0 0 64 64" aria-hidden="true"><use href="#' + q.ic + '"/></svg><p class="q">' + esc(L(q.q)) + '</p>' +
      (qPick === null ? '<div class="row"><button class="btn lime" type="button" data-qa="1">' + (vi ? 'Có nha' : 'Yep') + '</button><button class="btn" type="button" data-qa="0">' + (vi ? 'Hông luôn' : 'Nope') + '</button></div>'
        : '<div class="ans"><b>' + (qPick ? (vi ? 'Ủa giống Xinh!' : 'Twins!') : (vi ? 'Không sao, có Xinh lo!' : 'No worries, I\u2019ve got it.')) + '</b>' + esc(L(q.a)) + '</div><div class="row"><button class="btn lime" type="button" data-qnext>' + (qi < QUIZ.length - 1 ? (vi ? 'Câu tiếp →' : 'Next →') : (vi ? 'Xem bonus →' : 'Bonus →')) + '</button></div>');
    quizEl.classList.toggle('shown', qPick !== null);
  }
  document.addEventListener('click', function(e){
    if (e.target.closest('[data-quiz]')){ quizEl.hidden = false; renderQuiz(); track('quiz', 'open'); var f = quizEl.querySelector('button'); if (f) f.focus(); return; }
    var a = e.target.closest('[data-qa]'); if (a){ qPick = a.dataset.qa === '1'; renderQuiz(); var r = a.getBoundingClientRect(); burstFx(r.left + 40, r.top, 6); return; }
    if (e.target.closest('[data-qnext]')){ qi++; qPick = null; renderQuiz(); return; }
    if (e.target.closest('[data-qrestart]')){ qi = 0; qPick = null; renderQuiz(); return; }
    if (e.target.closest('#quizX')){ quizEl.hidden = true; }
  });

  /* VALUE: squad formation per project type */
  var SQUAD = [
    {k:'imc', t:{en:'IMC', vi:'IMC'}, crew:[{en:'Creative & content', vi:'Ý tưởng & content'}, {en:'Design / KV', vi:'Thiết kế / KV'}, {en:'KOL / KOC', vi:'KOL / KOC'}, {en:'Media buying', vi:'Media'}, {en:'Production house', vi:'Production house'}]},
    {k:'social', t:{en:'Social', vi:'Social'}, crew:[{en:'Content writer', vi:'Content writer'}, {en:'Designer', vi:'Designer'}, {en:'Video editor', vi:'Dựng video'}, {en:'Community & ads', vi:'Cộng đồng & ads'}]},
    {k:'act', t:{en:'Activation', vi:'Activation'}, crew:[{en:'Event & booth', vi:'Sự kiện & booth'}, {en:'Production', vi:'Sản xuất'}, {en:'MC / talent', vi:'MC / talent'}, {en:'On-ground staff', vi:'Nhân sự tại điểm'}]},
    {k:'prod', t:{en:'Production', vi:'Sản xuất'}, crew:[{en:'Idea & script', vi:'Ý tưởng & kịch bản'}, {en:'Director', vi:'Đạo diễn'}, {en:'Production house', vi:'Production house'}, {en:'KOL / talent', vi:'KOL / talent'}]}
  ];
  var sqIdx = 0;
  function renderSquad(){
    var vi = lang === 'vi', sq = SQUAD[sqIdx];
    $('#squadOpts').innerHTML = SQUAD.map(function(x, i){ return '<button class="chip" type="button" data-sq="' + i + '" aria-pressed="' + (i === sqIdx ? 'true' : 'false') + '">' + esc(L(x.t)) + '</button>'; }).join('');
    $('#crew').innerHTML = '<span class="lead">Xinh · ' + (vi ? 'chịu trách nhiệm' : 'accountable lead') + '</span>' + sq.crew.map(function(c, i){ return '<span style="animation-delay:' + (i * 60) + 'ms">+ ' + esc(L(c)) + '</span>'; }).join('');
  }
  document.addEventListener('click', function(e){ var b = e.target.closest('[data-sq]'); if (b){ sqIdx = +b.dataset.sq; renderSquad(); track('squad', SQUAD[sqIdx].k); } });

  /* END: game-saved summary */
  function renderSaved(){
    var el = $('#saved'); if (!el) return; var vi = lang === 'vi';
    el.innerHTML = '<span>LV ' + Math.min(S.maxLv, 6) + '/6 ✓</span><span>' + S.cases.length + (vi ? ' dự án đã mở' : ' projects opened') + '</span><span>' + mmss(S.dur) + (vi ? ' phút cùng Xinh' : ' min with Xinh') + '</span>';
  }
  var logoHits = 0, logoT = 0;
  $('.logo').addEventListener('click', function(e){
    logoHits++; clearTimeout(logoT); logoT = setTimeout(function(){ logoHits = 0; }, 1600);
    if (logoHits >= 5){ logoHits = 0; var r = this.getBoundingClientRect(); burstFx(r.left + 40, r.top + 20, 14); track('egg', 1);
      showToast({en:'Psst, you found the secret! My work goal: finish things properly, and earn moneyyy.', vi:'Psst, bạn tìm ra góc bí mật rồi! Mục tiêu đi làm của Xinh: làm trọn vẹn, và kiếm tiềnnn.'}, {en:'Say hi', vi:'Say hi luôn'}, function(){ openSheet($('#connectSheet')); }); }
  });
  function smartStart(){
    if (curView !== 'story' || (location.hash && location.hash.length > 1)) return;
    var prev = null; try{ prev = JSON.parse(localStorage.getItem('xinhos-pos') || 'null'); }catch(e){}
    var ids = {1:'clarify', 2:'structure', 3:'align', 4:'deliver', 5:'value'};
    if (prev && ids[prev.s] && Date.now() - prev.t < 30 * 864e5){
      setTimeout(function(){ showToast({en:'Oh hi again! Pick up at level ' + prev.s + '?', vi:'Ơ, bạn quay lại rồi! Xem tiếp từ level ' + prev.s + ' nha?'}, {en:'Continue', vi:'Xem tiếp'}, function(){ var t = document.getElementById(ids[prev.s]); if (t) t.scrollIntoView({behavior: reduce ? 'auto' : 'smooth'}); }); }, 1200);
      return;
    }
  }

  /* =====================================================================
     TECH-GLASS: cursor spotlight on cards, 3D tilt, mascot that watches you
     ===================================================================== */
  var SPOT = '.win,.how-card,.badge,.role,.mth,.card,.stamp,.tl4 article,.mode';
  var pmRaf = 0, pmE = null;
  document.addEventListener('pointermove', function(e){ pmE = e; if (!pmRaf) pmRaf = requestAnimationFrame(pmFrame); }, {passive:true});
  function pmFrame(){
    pmRaf = 0; var e = pmE; if (!e) return;
    var c = e.target.closest && e.target.closest(SPOT);
    if (c){ var r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); }
    var t = !reduce && finePointer && e.target.closest && e.target.closest('[data-tilt]');
    if (t){ var q = t.getBoundingClientRect(), x = (e.clientX - q.left) / q.width - .5, y = (e.clientY - q.top) / q.height - .5; t.style.transform = 'perspective(800px) rotateX(' + (-y * 10).toFixed(2) + 'deg) rotateY(' + (x * 12).toFixed(2) + 'deg) translateY(-4px)'; }
    var m = $('#mini');
    if (m && !m.classList.contains('drag')){ var mr = $('#miniBody').getBoundingClientRect(), dx = e.clientX - (mr.left + mr.width * .5), dy = e.clientY - (mr.top + mr.height * .42), d = Math.max(1, Math.hypot(dx, dy)), ux = dx / d, uy = dy / d;
      var hd = $('.mg-head', m), ey = $('.mg-eyes', m), ce = $('.mg-ceyes', m);
      if (hd) hd.style.transform = 'translate(' + (ux * 2.5).toFixed(1) + 'px,' + (uy * 1.5).toFixed(1) + 'px) rotate(' + (ux * 6).toFixed(1) + 'deg)';
      if (ey) ey.style.transform = 'translate(' + (ux * 2.4).toFixed(1) + 'px,' + (uy * 2).toFixed(1) + 'px)';
      if (ce) ce.style.transform = 'translate(' + (ux * 1.6).toFixed(1) + 'px,' + (uy * 1.2).toFixed(1) + 'px)'; }
  }
  document.addEventListener('pointerout', function(e){ var t = e.target.closest && e.target.closest('[data-tilt]'); if (t && !t.contains(e.relatedTarget)) t.style.transform = ''; });
  /* hanging ID cards: wire + clip + pendulum, holo shimmer, 3D flip */
  function initHang(){
    $$('#roleTabs .hc').forEach(function(h){
      if (h._init) return; h._init = 1;
      var card = $('.hc-card', h), ang = 0, vel = 0, raf = 0, lastX = null;
      function loop(){ vel += -ang * .05; vel *= .93; ang += vel; h.style.setProperty('--sw', ang.toFixed(2) + 'deg'); raf = (Math.abs(vel) > .01 || Math.abs(ang) > .02) ? requestAnimationFrame(loop) : 0; }
      function push(v){ if (reduce) return; vel += v; if (!raf) raf = requestAnimationFrame(loop); }
      card.addEventListener('pointerenter', function(e){ lastX = e.clientX; push(e.movementX ? Math.max(-3, Math.min(3, e.movementX * .4)) : 1.6); });
      card.addEventListener('pointermove', function(e){
        var r = card.getBoundingClientRect(); card.style.setProperty('--hx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); card.style.setProperty('--hy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
        if (lastX !== null){ var dx = e.clientX - lastX; if (Math.abs(dx) > 2) push(Math.max(-.6, Math.min(.6, dx * .03))); } lastX = e.clientX;
      });
      card.addEventListener('pointerleave', function(){ lastX = null; });
      card.addEventListener('click', function(){ var on = h.classList.toggle('flipped'); push(on ? 2.4 : -2.4); seenRoles[+h.dataset.hc] = 1; track('role', h.dataset.hc); });
    });
    if (!reduce && 'IntersectionObserver' in window && !$('#hang')._io){
      $('#hang')._io = new IntersectionObserver(function(es){ if (es[0].isIntersecting){ $$('#roleTabs .hc-card').forEach(function(c, i){ setTimeout(function(){ c.dispatchEvent(new PointerEvent('pointerenter')); }, i * 140); }); } }, {threshold:.45});
      $('#hang')._io.observe($('#hang'));
    }
  }
  /* lanyard badge: spring pendulum you can drag, holo shimmer, flip */
  (function(){
    var lan = $('#lanyard'), card = $('#badge3d'); if (!lan || !card) return;
    var ang = 0, vel = 0, target = 0, drag = null, raf = 0, flipped = false, moved = false;
    function loop(){ vel += (target - ang) * .06; vel *= .9; ang += vel; lan.style.setProperty('--sw', ang.toFixed(2) + 'deg'); if (Math.abs(vel) > .02 || Math.abs(target - ang) > .05 || drag) raf = requestAnimationFrame(loop); else raf = 0; }
    function kick(){ if (!raf) raf = requestAnimationFrame(loop); }
    card.addEventListener('pointerdown', function(e){ drag = e.clientX; moved = false; card.setPointerCapture(e.pointerId); kick(); });
    card.addEventListener('pointermove', function(e){
      var r = card.getBoundingClientRect(); card.style.setProperty('--hx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); card.style.setProperty('--hy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      if (drag !== null){ var dx = e.clientX - drag; if (Math.abs(dx) > 5) moved = true; target = Math.max(-28, Math.min(28, dx * .25)); kick(); }
    });
    function up(){ if (drag === null) return; drag = null; target = 0; kick(); }
    card.addEventListener('pointerup', up); card.addEventListener('pointercancel', up);
    card.addEventListener('click', function(){ if (moved) return; flipped = !flipped; card.classList.toggle('flipped', flipped); vel += 2.5; kick(); track('badge', flipped ? 'back' : 'front'); });
    if (!reduce && 'IntersectionObserver' in window) new IntersectionObserver(function(es){ if (es[0].isIntersecting){ vel = 3.2; kick(); } }, {threshold:.5}).observe(lan);
  })();
  /* fanned photo stack: hover spreads, tap brings one to the front */
  var FAN = [
    {t:'Say-hi mode', d:{en:'First meeting, warm and curious.', vi:'Gặp lần đầu, thân thiện và tò mò.'}},
    {t:'Work mode', d:{en:'Brief open, thinking it through.', vi:'Mở brief ra, nghĩ cho thấu.'}},
    {t:'On-the-go mode', d:{en:'Between client, shoot and event.', vi:'Chạy giữa khách, set quay và sự kiện.'}},
    {t:'Chill mode', d:{en:'Recharging for the next level.', vi:'Sạc pin cho level tiếp theo.'}}
  ], fanTop = 0;
  function renderFan(){
    return;
    var cards = $$('#fan .fc'); if (!cards.length) return;
    cards.forEach(function(c){ var i = +c.dataset.fc, k = (i - fanTop + 4) % 4; c.style.setProperty('--k', k); c.classList.toggle('top', k === 0); });
    var f = FAN[fanTop]; $('#fanCap').innerHTML = '<b>' + f.t + '</b> ' + esc(L(f.d)) + ' <span>' + (lang === 'vi' ? 'Chạm ảnh để đổi' : 'Tap a photo to shuffle') + '</span>';
  }
  document.addEventListener('click', function(e){ var c = e.target.closest('.stackx > *'); if (c){ var p = c.parentElement; $$(':scope > *', p).forEach(function(x){ x.classList.toggle('on', x === c && !c.classList.contains('on')); }); track('stack', 1); } });
  /* ===== Xinh mini: a roaming guide that recaps each section and nudges to say hi ===== */
  var RECAP = {
    0:{t:{en:'Hi hi! I’m Xinh mini, and this is Mochi. Come along, we’ll walk you through it!', vi:'Hi hi! Em là Xinh mini, còn đây là bé Mochi. Đi cùng em hết hành trình nha!'}, c:[{l:{en:'Let’s go', vi:'Đi thôi'}, a:'#brief'}]},
    1:{t:{en:'Recap: 4 roles in 4 years, from reading the numbers to running the whole project.', vi:'Tóm lại nè: 4 năm, 4 vai trò, từ đọc số liệu tới cầm trịch cả dự án.'}, c:[{l:{en:'View CV', vi:'Xem CV'}, a:'cv'}, {l:{en:'Say hi', vi:'Liên hệ em nha'}, a:'connect'}]},
    2:{t:{en:'Recap: clarify, structure, coordinate, follow through. Want a quick quiz?', vi:'Tóm lại nè: làm rõ, cấu trúc, điều phối, theo tới kết quả. Chơi quiz 30 giây hông?'}, c:[{l:{en:'Play quiz', vi:'Chơi quiz'}, a:'quiz'}, {l:{en:'Say hi', vi:'Liên hệ em nha'}, a:'connect'}]},
    3:{t:{en:'Recap: 4 kinds of project, 5 parts of owning one. Every claim has a real project behind it.', vi:'Tóm lại nè: 4 mảng dự án, 5 phần việc, mục nào cũng có dự án thật làm chứng.'}, c:[{l:{en:'Say hi', vi:'Liên hệ em nha'}, a:'connect'}]},
    4:{t:{en:'7 projects, banking to consumer. Like one? Ask me about it!', vi:'7 dự án, từ ngân hàng tới tiêu dùng. Thích dự án nào, hỏi em liền nha!'}, c:[{l:{en:'All projects', vi:'Xem cả 7'}, a:'#work'}, {l:{en:'Say hi', vi:'Liên hệ em nha'}, a:'connect'}]},
    5:{t:{en:'One owner, the right crew, a promise to the end. What’s your brief?', vi:'Một người, một đội, một lời cam kết. Còn brief của bạn thì sao nè?'}, c:[{l:{en:'Tell me', vi:'Kể em nghe'}, a:'connect'}]},
    6:{t:{en:'Your turn! I’ll be waiting for your hi.', vi:'Tới lượt bạn rồi đó! Em chờ tin bạn nha.'}, c:[{l:{en:'Say hi now', vi:'Liên hệ em nha'}, a:'connect'}]},
    work:{t:{en:'Hover a project to peek, click to open.', vi:'Rê chuột để xem nhanh, bấm để mở dự án nha.'}, c:[{l:{en:'Say hi', vi:'Liên hệ em nha'}, a:'connect'}]},
    profile:{t:{en:'Drag my ID card to swing it, tap to flip!', vi:'Kéo thẻ của em cho đung đưa, chạm để lật nha!'}, c:[{l:{en:'Play quiz', vi:'Chơi quiz'}, a:'quiz'}]},
    skills:{t:{en:'Tap any capability to see the proof.', vi:'Bấm một đầu việc là ra bằng chứng liền.'}, c:[{l:{en:'Say hi', vi:'Liên hệ em nha'}, a:'connect'}]},
    desk:{t:{en:'Short on time? Everything’s on this desk.', vi:'Bận quá? Mọi thứ nằm gọn trên desktop này nè.'}, c:[{l:{en:'Say hi', vi:'Liên hệ em nha'}, a:'connect'}]},
    contact:{t:{en:'Pick any channel, I reply fast!', vi:'Chọn kênh nào tiện, em trả lời liền nha!'}, c:[]}
  };
  var SPOTS = {0:[.86,.62], 1:[.04,.6], 2:[.86,.56], 3:[.04,.64], 4:[.86,.62], 5:[.04,.58], 6:[.84,.5]};
  var mini = $('#mini'), miniSay = $('#miniSay'), miniKey = null, miniT = 0, miniFree = 0, miniPos = null;
  function miniPlace(x, y, hop){
    var w = window.innerWidth, h = window.innerHeight, mw = mini.offsetWidth || 90, mh = mini.offsetHeight || 100;
    var px = Math.max(8, Math.min(w - mw - 8, x * w)), py = Math.max(80, Math.min(h - mh - (w < 760 ? 90 : 16), y * h));
    miniPos = [px, py]; mini.style.transform = 'translate(' + px.toFixed(0) + 'px,' + py.toFixed(0) + 'px)';
    mini.classList.toggle('right', px > w / 2);
    if (hop && !reduce){ mini.classList.remove('hop'); void mini.offsetWidth; mini.classList.add('hop'); }
  }
  function miniTalk(key, open){
    var r = RECAP[key]; if (!r) return; miniKey = key;
    miniSay.innerHTML = '<button class="ms-x" type="button" data-mini-x aria-label="Close">✕</button><p>' + both(r.t) + '</p>' +
      (r.c.length ? '<div class="ms-cta">' + r.c.map(function(c, i){ return '<button type="button" class="' + (i === r.c.length - 1 ? 'hot' : '') + '" data-mini-a="' + c.a + '">' + both(c.l) + '</button>'; }).join('') + '</div>' : '');
    if (open !== false){ mini.classList.add('talk'); clearTimeout(miniT); miniT = setTimeout(function(){ mini.classList.remove('talk'); }, 9000); }
  }
  function miniGo(key){
    if (!mini || !booted) return;
    if (Date.now() > miniFree){ var sp = SPOTS[key] || [.86, .6]; if (window.innerWidth < 760) sp = [sp[0] > .5 ? .78 : .02, .62]; miniPlace(sp[0], sp[1], true); }
    miniTalk(key);
  }
  function mascotSay(k){ miniGo(k === 'view' ? curView : k); }
  document.addEventListener('click', function(e){
    var a = e.target.closest('[data-mini-a]');
    if (a){ var v = a.dataset.miniA; mini.classList.remove('talk');
      if (v === 'connect') openSheet($('#connectSheet')); else if (v === 'quiz'){ quizEl.hidden = false; renderQuiz(); } else if (v === 'cv'){ if (CV_URL) window.open(CV_URL, '_blank', 'noopener'); } else location.hash = v.slice(1);
      track('mini', v); return; }
    if (e.target.closest('[data-mini-x]')){ mini.classList.remove('talk'); }
  });
  (function(){
    var body = $('#miniBody'), sx, sy, ox, oy, drag = false, moved = false; if (!body) return;
    body.addEventListener('pointerdown', function(e){ drag = true; moved = false; sx = e.clientX; sy = e.clientY; ox = miniPos ? miniPos[0] : 0; oy = miniPos ? miniPos[1] : 0; body.setPointerCapture(e.pointerId); });
    body.addEventListener('pointermove', function(e){ if (!drag) return; var dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 6){ moved = true; mini.classList.add('drag'); miniPlace((ox + dx) / window.innerWidth, (oy + dy) / window.innerHeight, false); } });
    body.addEventListener('pointerup', function(){ drag = false; mini.classList.remove('drag'); if (moved){ miniFree = Date.now() + 25000; } });
    body.addEventListener('click', function(){ if (moved) return; if (mini.classList.contains('talk')) mini.classList.remove('talk'); else miniTalk(miniKey == null ? 0 : miniKey); });
    window.addEventListener('resize', function(){ if (miniPos) miniPlace(miniPos[0] / window.innerWidth, miniPos[1] / window.innerHeight, false); });
  })();

  /* =====================================================================
     BOOT (the open) · clocks · restart (the end loops back)
     ===================================================================== */
  var bootEl = $('#boot'), booted = false;
  function hcmClock(){ try{ return new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Ho_Chi_Minh', hour:'2-digit', minute:'2-digit', hour12:false}).format(new Date()); }catch(e){ return ''; } }
  function tickClock(){ var t = hcmClock(); $('#navClock').innerHTML = 'HCMC <b>' + t + '</b>'; $('#bootClock').textContent = 'HCMC ' + t; }
  var t0 = Date.now();
  setInterval(function(){ var s = Math.floor((Date.now() - t0) / 1000), el = $('#recTc'); if (el) el.textContent = ('0' + Math.floor(s / 3600)).slice(-2) + ':' + ('0' + Math.floor(s / 60) % 60).slice(-2) + ':' + ('0' + s % 60).slice(-2); }, 1000);
  function runBootBar(){
    var p = 0, bar = $('#bootBar'), pct = $('#bootPct');
    if (reduce){ bar.style.width = '100%'; pct.textContent = 'EM XINH IS READY · 100%'; return; }
    (function step(){ p = Math.min(100, p + 4 + Math.random() * 9); bar.style.width = p + '%'; pct.textContent = (p < 100 ? 'BOOTING EM XINH… ' : 'EM XINH IS READY · ') + Math.round(p) + '%'; if (p < 100) setTimeout(step, 70); })();
  }
  function openBoot(){
    bootEl.hidden = false; bootEl.classList.remove('out'); document.body.classList.add('booting'); booted = false;
    var last = null; try{ last = localStorage.getItem('xinhos-mode'); }catch(e){}
    runBootBar();
    setTimeout(function(){ var m = $('.mode.' + (last === 'quick' ? 'quick' : 'story')); if (m) m.focus({preventScroll:true}); }, 400);
  }
  function chooseMode(m){
    if (booted) return; booted = true;
    try{ localStorage.setItem('xinhos-mode', m); }catch(e){}
    track('mode', m);
    var fl = $('#flash'); fl.classList.remove('on'); void fl.offsetWidth; if (!reduce) fl.classList.add('on');
    bootEl.classList.add('out'); document.body.classList.remove('booting');
    if (m === 'quick'){ location.hash = 'desk'; }
    else { if (curView !== 'story') location.hash = 'story'; window.scrollTo(0, 0); setTimeout(smartStart, 900); }
    setTimeout(function(){ bootEl.hidden = true; rebuild(); setTimeout(function(){ miniGo(m === 'story' ? 0 : 'desk'); }, 300); }, reduce ? 0 : 800);
  }
  document.addEventListener('click', function(e){
    var m = e.target.closest('[data-mode]'); if (m){ chooseMode(m.dataset.mode); return; }
    var bl = e.target.closest('[data-boot-lang]'); if (bl){ setLang(bl.dataset.bootLang); }
  });
  document.addEventListener('keydown', function(e){ if (!bootEl.hidden && !booted && (e.key === 'Escape' || (e.key === 'Enter' && !e.target.closest('button')))){ e.preventDefault(); chooseMode('story'); } });
  $('#restart').addEventListener('click', function(){
    var sd = $('#shutdown'); track('restart', 1);
    if (reduce){ window.scrollTo(0, 0); openBoot(); return; }
    sd.classList.remove('on'); void sd.offsetWidth; sd.classList.add('on');
    setTimeout(function(){ try{ history.replaceState(null, '', location.pathname + location.search); }catch(e){} window.scrollTo(0, 0); openBoot(); sd.classList.remove('on'); }, 650);
  });

  /* =====================================================================
     LANGUAGE + BOOT
     ===================================================================== */
  $$('.zone .head, #structure .head').forEach(function(h){ var b = $('.tag b', h); if (b) h.setAttribute('data-n', b.textContent.replace('LV.', '0')); });
  if (!reduce && 'IntersectionObserver' in window){
    var GL = '!<>-_\\/[]{}=+*^?#01';
    var sio = new IntersectionObserver(function(es){ es.forEach(function(en){ if (!en.isIntersecting) return; sio.unobserve(en.target);
      $$('.en, .vi', en.target).concat([en.target]).forEach(function(el){ if (el.children.length) return; var fin = el.textContent, f = 0, n = fin.length;
        (function tick(){ f++; el.textContent = fin.split('').map(function(ch, i){ return (i < f * n / 14 || ch === ' ') ? ch : GL[Math.floor(Math.random() * GL.length)]; }).join(''); if (f < 14) setTimeout(tick, 38); else el.textContent = fin; })(); });
    }); }, {threshold:.6});
    $$('.head .tag > span:not(:first-child), .head .tag > span').forEach(function(el){ if (!el.querySelector('b')) sio.observe(el); });
  }
  function renderAll(){ if (typeof renderFan === 'function') renderFan(); renderRoles(); renderSteps(); renderMatrix(); renderStoryCases(); setupStops(); renderWork(); renderContact(); renderSquad(); renderSaved(); if (!quizEl.hidden) renderQuiz(); if (curView === 'report') renderReport(); hydrateImgs(); }
  function setLang(l){
    lang = l; S.lang = l;
    root.setAttribute('data-lang', l); root.setAttribute('lang', l);
    $$('.lang button').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.set === l ? 'true' : 'false'); });
    $$('[data-boot-lang]').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.bootLang === l ? 'true' : 'false'); });
    try{ localStorage.setItem('xinhos-lang', l); }catch(e){}
    $('#now').textContent = stageNames[l][stage];
    renderAll(); rebuild();
  }
  $$('.lang button').forEach(function(b){ b.addEventListener('click', function(){ setLang(b.dataset.set); }); });
  var saved = 'en';
  try{ saved = localStorage.getItem('xinhos-lang') || 'en'; }catch(e){}
  setLang(saved === 'vi' ? 'vi' : 'en');
  setStage(0, true);
  if (EDIT){ var eb = document.createElement('div'); eb.id = 'editBadge'; eb.textContent = 'EDIT MODE · #edit-off'; document.body.appendChild(eb); }
  route();
  dockUpdate();
  tickClock();
  /* the open: boot unless the link points straight at a view, a case or an anchor */
  var h0 = (location.hash || '').slice(1);
  if (!h0 || h0 === 'story' || h0 === 'start') openBoot(); else { bootEl.hidden = true; booted = true; }
  setInterval(function(){ tickClock(); if (curView === 'contact' || curView === 'desk' || !$('#connectSheet').hidden) { ['#ctStatus', '#cnStatus', '#deskStatus'].forEach(function(id){ var s = hcmStatus(), el = $(id); el.className = 'status' + (s.on ? '' : ' off'); el.innerHTML = statusHTML(); }); } }, 30000);

  /* capabilities light up later */
  if (runtimeHere){
    window.claude.use('user').then(function(u){
      userNs = u; if (!u) return null;
      return u.isOwner().then(function(o){ isOwner = !!o; $$('[data-tab="report"]').forEach(function(a){ a.hidden = !isOwner; }); if (curView === 'report') renderReport(); return u.id(); }).then(function(id){ uid = id; S.uid = id || undefined; });
    }).catch(function(){}).then(function(){
      return window.claude.use('db');
    }).then(function(db){ dbRef = db; if (db && uid && !isOwner) saveDb(); }).catch(function(){});
  } else {
    $$('[data-tab="report"]').forEach(function(a){ a.hidden = location.hash !== '#report'; });
  }
})();
