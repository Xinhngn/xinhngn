// @ts-nocheck
// XINH.OS page logic, moved verbatim from the old single-file page (src/page.html).
// Type checking is off for this file for now; move pieces into typed modules over time.
// CONFIG (contacts, image slots, CV link) is at the top of the function below.
import './styles.css';
import { mountHead3D } from './head3d';

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
  function sm(k){ k = clamp(k, 0, 1); return k * k * (3 - 2 * k); }
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
    if (src) return '<div class="ph"><img src="' + esc(src) + '" alt="Xinh Nguyễn" loading="lazy" decoding="async"></div>';
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
    {t:{en:'Clarify', vi:'Làm rõ'}, k:{en:'Understand it right before starting.', vi:'Hiểu đúng trước khi bắt đầu.'}, d:{en:'Clarify the goal, context, scope and what success looks like.', vi:'Làm rõ mục tiêu, bối cảnh, phạm vi và tiêu chí thành công.'}},
    {t:{en:'Structure', vi:'Cấu trúc'}, k:{en:'Turn the problem into a plan.', vi:'Biến bài toán thành kế hoạch.'}, d:{en:'Break down the work, set priorities and build a workable way to deliver it.', vi:'Phân rã đầu việc, xác định thứ tự ưu tiên và xây dựng cách triển khai khả thi.'}},
    {t:{en:'Manage execution', vi:'Quản lý triển khai'}, k:{en:'Turn the plan into action.', vi:'Biến kế hoạch thành hành động.'}, d:{en:'Organise the work, allocate resources and manage everyone involved so the plan runs in the right direction.', vi:'Chủ động tổ chức công việc, phân bổ nguồn lực và quản lý các bên tham gia để kế hoạch được triển khai đúng hướng.'}},
    {t:{en:'Follow through', vi:'Theo đến kết quả'}, k:{en:'Stay on it until it is solved.', vi:'Theo sát đến khi vấn đề được xử lý.'}, d:{en:'Control timeline and quality, handle issues as they come up and adjust the approach when needed.', vi:'Kiểm soát tiến độ, chất lượng; chủ động xử lý phát sinh và điều chỉnh cách làm khi cần.'}}
  ];
  /* One benchmark for every project: four kinds of work, five parts of owning it.
     1 = I led it, 2 = part of the team, 0 = not in scope. Not every capability applies to every project. */
  /* one rAF per scroll for every pinned scene: separate listeners read and wrote layout in turn, which forced
     a layout per scene per scroll event and froze phones */
  var scrollFns = [], scrollQueued = false;
  function onScrollFrame(fn){
    scrollFns.push(fn);
    if (scrollFns.length > 1) return;
    window.addEventListener('scroll', function(){
      if (scrollQueued) return; scrollQueued = true;
      requestAnimationFrame(function(){ scrollQueued = false; for (var i = 0; i < scrollFns.length; i++) scrollFns[i](); });
    }, {passive:true});
  }
  /* looping CSS animations (spinners, blinkers, the ticker) only run in sections on screen */
  if ('IntersectionObserver' in window){
    var offIO = new IntersectionObserver(function(es){ es.forEach(function(e){ e.target.toggleAttribute('data-off', !e.isIntersecting); }); }, {rootMargin:'100px 0px'});
    document.querySelectorAll('main section, .band, #player, .boot').forEach(function(el){ offIO.observe(el); });
  }
  var COLS = [
    {k:'imc', g:'type', t:{en:'IMC campaign', vi:'Chiến dịch IMC'},
     d:{en:'Integrated campaigns and launches: one big idea carried across paid, owned, earned, KOL and on-ground, from plan to report.', vi:'Chiến dịch tích hợp và ra mắt: một ý tưởng lớn chạy xuyên paid, owned, earned, KOL và on-ground, từ kế hoạch đến báo cáo.'}},
    {k:'awo', g:'type', t:{en:'Social management', vi:'Quản lý social'},
     d:{en:'Running brand channels month after month: content pillars, calendar, production flow, community and the monthly report.', vi:'Vận hành kênh thương hiệu tháng này qua tháng khác: trụ cột nội dung, lịch đăng, quy trình sản xuất, cộng đồng và báo cáo tháng.'}},
    {k:'act', g:'type', t:{en:'Activation & event', vi:'Activation & sự kiện'},
     d:{en:'Taking the brand offline and tying the experience to an action you can count: sign-ups, trials, sales.', vi:'Đưa thương hiệu ra đời thực và gắn trải nghiệm với hành động đếm được: đăng ký, dùng thử, mua hàng.'}},
    {k:'prod', g:'type', t:{en:'Production', vi:'Sản xuất'},
     d:{en:'Video, key visuals and social content: script, shoot and edit with production houses and talent, every asset checked before it goes live.', vi:'Video, key visual và nội dung social: kịch bản, quay dựng cùng production house và talent, duyệt từng sản phẩm trước khi lên sóng.'}},
    {k:'pitch', g:'own', t:{en:'Pitch & proposal', vi:'Pitching & proposal'},
     d:{en:'Reading the real business need, then shaping the proposal and the pitch around it.', vi:'Đọc ra nhu cầu kinh doanh thật, rồi định hình proposal và buổi pitch quanh nó.'}},
    {k:'exec', g:'own', t:{en:'Plan → execution', vi:'Từ kế hoạch đến triển khai'},
     d:{en:'Writing the plan, then running it myself through to sign-off.', vi:'Lên kế hoạch, rồi trực tiếp triển khai đến nghiệm thu.'}},
    {k:'stake', g:'own', t:{en:'Client & stakeholders', vi:'Quản lý khách hàng & các bên liên quan'},
     d:{en:'Main point of contact: expectations, feedback and issues, with internal teams, agencies and partners aligned.', vi:'Đầu mối chính: kỳ vọng, feedback và phát sinh, giữ team nội bộ, agency và đối tác cùng nhịp.'}},
    {k:'ctrl', g:'own', t:{en:'Timeline · budget · quality', vi:'Quản lý tiến độ · ngân sách · chất lượng'},
     d:{en:'Keeping scope, money, dates and quality under control while the work moves.', vi:'Giữ phạm vi, ngân sách, tiến độ và chất lượng trong tầm kiểm soát khi dự án chạy.'}},
    {k:'paper', g:'own', t:{en:'Paperwork & reporting', vi:'Hồ sơ & báo cáo'},
     d:{en:'Briefs, quotes, contracts, acceptance and the report that closes the loop.', vi:'Brief, báo giá, hợp đồng, nghiệm thu và báo cáo khép lại dự án.'}}
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
  /* Five core cases (story carousel, in this order) + other projects that stay in the Work archive.
     title: the case-sheet heading; t: the short tagline on cards and tiles; out: the outcome line (team vs. personal stays explicit). */
  var CASES = [
    {id:'msb', core:true, brand:'MSB', cats:['bank','awo','pitch'], size:'big', grad:'linear-gradient(135deg,#ffd9c2,#ffe45c 70%)',
     subs:['SOCIAL AWO','2025–2027'], meta:'BANKING · ALWAYS-ON · PRODUCTION · MEDIA',
     title:{en:'From Pitching to Multi-channel Operations', vi:'Từ pitching đến vận hành đa kênh'},
     t:{en:'Fixing how the work works.', vi:'Sửa cách làm việc, không chỉ nội dung.'},
     ask:{en:'A clearer long-term direction for social after three years, and fewer process pains.', vi:'Định hướng social dài hạn rõ hơn sau ba năm, và bớt điểm nghẽn quy trình.'},
     me:{en:'Framed the proposal around the client’s real worries. After kick-off, kept checking how they saw quality and turned feedback into fixes.', vi:'Định hình proposal quanh mối lo thật của client. Sau kick-off, liên tục hỏi cảm nhận về chất lượng và biến feedback thành điều chỉnh.'},
     team:{en:'Strategy and proposal were built with the team: channel roles, platform tone, analytical reports, an idea pipeline.', vi:'Chiến lược và proposal xây cùng team: vai trò kênh, giọng điệu theo nền tảng, báo cáo phân tích, nguồn ý tưởng.'},
     out:{en:'The partnership was extended from 3 to 5 years. A partnership outcome, shared with the team.', vi:'Mối hợp tác được mở rộng từ 3 lên 5 năm. Đây là kết quả hợp tác chung, cùng với team.'},
     res:[{b:'3 → 5', l:{en:'years of partnership', vi:'năm hợp tác'}}, {empty:true, l:{en:'add a channel metric', vi:'thêm chỉ số kênh'}}],
     imgs:['msb_feed.jpg','msb_post_01.jpg','msb_post_02.jpg','msb_report.jpg']},
    {id:'vib', core:true, brand:'VIB', cats:['bank','pitch','act'], size:'mid', grad:'linear-gradient(135deg,#ffe7a3,#ffd3ec 60%,#cfd8ff)',
     subs:['IVY CARD','ANH TRAI SAY HI','ACTIVATION'], meta:'BANKING · PITCH → EXECUTION',
     title:{en:'One Pitch, a Long-term Partner', vi:'Một lần pitch, một đối tác dài hạn'},
     t:{en:'One pitch, a long-term partner.', vi:'Một lần pitch, một đối tác dài hạn.'},
     ask:{en:'A catchy Ivy Card message that fits the positioning and drives new card opens.', vi:'Thông điệp bắt tai cho Ivy Card, đúng định vị, kéo KPI mở thẻ.'},
     me:{en:'Found the core need, shaped the proposal, coordinated specialists. Then led pitching and management for Anh Trai Say Hi and the Ivy Card activation.', vi:'Tìm nhu cầu cốt lõi, định hướng proposal, điều phối team chuyên môn. Sau đó dẫn pitch và quản lý Anh Trai Say Hi, activation Ivy Card.'},
     team:{en:'The pitch was a team effort with specialist teams.', vi:'Pitch là nỗ lực chung với các team chuyên môn.'},
     lesson:{en:'A good proposal starts with the real objective. The product message is a means, not the goal.', vi:'Proposal tốt bắt đầu từ mục tiêu thật. Thông điệp sản phẩm là phương tiện, không phải đích đến.'},
     journey:['VIB Ivy Card','Anh Trai Say Hi','Bộ Tứ Báo Thủ · video','Ngày hội không tiền mặt','Sound Notification for MAX'],
     out:{en:'One pitch grew into a longer-term relationship with multiple follow-on projects.', vi:'Từ một lần pitch, mối hợp tác kéo dài hơn và mở ra nhiều dự án tiếp theo.'},
     res:[{line:true, b:{en:'Multiple projects', vi:'Nhiều dự án'}, l:{en:'from one pitch', vi:'từ một lần pitch'}}, {empty:true, l:{en:'add a result', vi:'thêm kết quả'}}],
     imgs:['vib_ivy_kv.jpg','anh_trai_say_hi.jpg','bo_tu_bao_thu.jpg','cashless_day.jpg']},
    {id:'cake', core:true, brand:'Cake', cats:['bank','pitch'], size:'mid', grad:'linear-gradient(135deg,#ffd3ec,#ff8fc6 60%,#ddd6ff)',
     subs:['BY VPBANK','NEW BUSINESS'], meta:'DIGITAL BANK · NEW BUSINESS',
     title:{en:'Trust Opens New Doors', vi:'Niềm tin mở ra cánh cửa mới'},
     t:{en:'A relationship that opened the next door.', vi:'Một mối quan hệ mở ra cánh cửa mới.'},
     ask:{en:'Grow Gen Y without diluting a Gen Z identity.', vi:'Mở rộng Gen Y mà không làm loãng chất Gen Z.'},
     me:{en:'A client from Digimi moved to Cake and invited me into the pitch. I reconnected and contributed to pitching.', vi:'Một client cũ ở Digimi chuyển sang Cake và mời tôi vào pitch. Tôi kết nối lại và góp sức vào quá trình pitching.'},
     team:{en:'Creative (Cake AI-land, comment-led play, WeChoice photo series, Gato mascot) was agency team work.', vi:'Sáng tạo (Cake AI-land, tương tác bình luận, bộ ảnh WeChoice, mascot Gato) là của team agency.'},
     out:{en:'The team won the social retainer.', vi:'Team giành được social retainer.'},
     res:[{line:true, b:{en:'Social retainer won', vi:'Giành social retainer'}, l:{en:'the relationship opened the door, the team won the pitch', vi:'quan hệ mở cửa, team thắng pitch'}}],
     imgs:['cake_ai_land.jpg','cake_gato.jpg','cake_wechoice.jpg','cake_comments.jpg']},
    {id:'poca', core:true, brand:'Poca Yummy', cats:['fmcg','launch'], size:'', grad:'linear-gradient(135deg,#fff3a6,#ffe45c 50%,#ffb06b)',
     subs:['QUẨY-VERSE','2023'], meta:'FMCG · INTEGRATED LAUNCH · 2023',
     title:{en:'School Break, Now a Brand Moment', vi:'Giờ ra chơi thành khoảnh khắc thương hiệu'},
     t:{en:'School break, now a brand moment.', vi:'Giờ ra chơi thành khoảnh khắc thương hiệu.'},
     ask:{en:'Launch a new sub-brand into a crowded snacking moment.', vi:'Ra mắt sub-brand mới giữa thị trường snack đông đúc.'},
     me:{en:'Coordinated the key workstreams: hero MV, CapCut challenge, TikTok creators, community and comic pages.', vi:'Điều phối các hạng mục chính: MV chính, CapCut challenge, TikToker, cộng đồng và trang comic.'},
     journey:['Thế giới vui nhộn','Poca - Thế giới pháp thuật vui nhộn','Poca Yummy - Launching campaign'],
     out:{en:'Campaign results for the whole launch, not personal results.', vi:'Đây là kết quả của cả chiến dịch, không phải kết quả cá nhân.'},
     res:[{b:'266K+', l:{en:'FB engagements', vi:'tương tác FB'}}, {b:'45.7K+', l:{en:'website clicks', vi:'click website'}}], src:'SOURCE: XANH CREDENTIAL 2024',
     imgs:['poca_quay_verse_mv.jpg','poca_capcut.jpg','poca_tiktok.jpg','poca_comic.jpg']},
    {id:'digimi', core:true, brand:'Digimi × BVBank', cats:['bank','act','awo'], size:'', grad:'linear-gradient(135deg,#d2fff3,#9be8b0 55%,#8ec9ff)',
     subs:['SOCIAL AWO','BIRTHDAY','COFFEE TRUCK','CSR'], meta:'DIGITAL BANKING · ACTIVATION · SOCIAL',
     title:{en:'From Account Foundations to Project Ownership', vi:'Từ nền tảng Account đến Project Ownership'},
     t:{en:'From a cup of coffee to an app sign-up.', vi:'Từ ly cà phê đến lượt đăng ký app.'},
     ask:{en:'BVBank was one of the early clients of my career. Digimi × BVBank is where I learned digital banking work, across social always-on, a birthday campaign, activation and CSR.', vi:'BVBank là một trong những khách hàng đầu tiên trong sự nghiệp của Xinh. Digimi × BVBank là nơi Xinh làm quen với mảng ngân hàng số, qua social always-on, chiến dịch sinh nhật, activation và CSR.'},
     sw:[{k:'me', lbl:'ACTIVATION'}, {k:'team', lbl:'ALWAYS-ON'}],
     me:{en:'A coffee truck used a familiar moment to introduce Digimi: experience → engagement → sign-up.', vi:'Xe cà phê dùng khoảnh khắc quen thuộc để giới thiệu Digimi: trải nghiệm → tương tác → đăng ký.'},
     team:{en:'Content calendars, image and video production, stakeholder alignment, quality review: anticipate → coordinate → review → improve.', vi:'Lịch nội dung, sản xuất hình ảnh và video, thống nhất các bên, kiểm tra chất lượng: dự trù → điều phối → review → cải thiện.'},
     journey:['Social AWO','Tròn một tuổi – Đầy Thank Xuân','Coffee Truck','CSR · Vì một thế hệ vươn tầm'],
     out:{en:'Campaign results, each tied to its own activity. Not personal results.', vi:'Kết quả chiến dịch, gắn với từng hoạt động. Không phải kết quả cá nhân.'},
     res:[{b:'~2,000', l:{en:'booth visitors · Coffee Truck', vi:'lượt ghé booth · Coffee Truck'}}, {b:'268', l:{en:'sign-ups · Coffee Truck', vi:'đăng ký · Coffee Truck'}}, {b:'140', l:{en:'conversions · Coffee Truck', vi:'chuyển đổi · Coffee Truck'}},
          {b:'500+', l:{en:'event attendees · Birthday campaign', vi:'người tham dự sự kiện · Sinh nhật'}}, {b:'450', l:{en:'Digimi accounts opened offline · Birthday campaign', vi:'tài khoản Digimi mở offline · Sinh nhật'}}, {b:'1.5M', l:{en:'online reach · Birthday campaign', vi:'reach online · Sinh nhật'}}],
     imgs:['digimi_coffee_truck.jpg','digimi_booth.jpg','bvbank_post.jpg','digimi_signup.jpg']},
    {id:'duytan', brand:'Nhựa Duy Tân', cats:['fmcg','pitch','awo'], size:'', grad:'linear-gradient(135deg,#ff9a9a,#ffe45c)', small:true,
     subs:['TẾT 2025'], meta:'OTHER PROJECT · CONSUMER · TẾT 2025',
     t:{en:'A Tết plan from pitch to media.', vi:'Kế hoạch Tết từ pitch đến media.'},
     me:{en:'Communication plan, pitching, always-on, production, booking and media.', vi:'Kế hoạch truyền thông, pitching, always-on, production, booking và media.'},
     res:[{line:true, b:{en:'Pitch won', vi:'Thắng pitch'}, l:{en:'with the team', vi:'cùng team'}}], imgs:['duytan_tet_2025.jpg','duytan_02.jpg','duytan_03.jpg','duytan_04.jpg']},
    {id:'cindy', brand:'Cindy Bloom', cats:['fmcg','pitch','launch'], size:'', grad:'linear-gradient(135deg,#ffd3ec,#ddd6ff)', small:true,
     subs:['LAUNCH'], meta:'OTHER PROJECT · CONSUMER · LAUNCH CAMPAIGN',
     t:{en:'A launch from pitch to execution.', vi:'Một đợt ra mắt từ pitch đến triển khai.'},
     me:{en:'Pitch to execution, production and the social campaign.', vi:'Từ pitch đến triển khai, production và social campaign.'},
     res:[{empty:true, l:{en:'add a result', vi:'thêm kết quả'}}], imgs:['cindy_bloom_kv.jpg','cindy_02.jpg','cindy_03.jpg','cindy_04.jpg']}
  ];
  /* Cover colours when there is no photo yet */
  var LOOK = {vib:['linear-gradient(100deg,#f4f5f8,#c9ccd6 40%,#8d92a2 52%,#e8eaf0 70%,#fff)','#0e0f14'], msb:['linear-gradient(170deg,#5d9de3,#9cc8f2 55%,#dcecf9)','#ffffff'], cake:['#f3eee6','#0e0f14'], poca:['#ff8fc0','#0e0f14'],
              digimi:['linear-gradient(160deg,#d9d4f5,#f6d9e7)','#0e0f14'], duytan:['#ffd3e4','#0e0f14'], cindy:['linear-gradient(160deg,#cfe3f7,#ffd3e4)','#0e0f14']};
  /* Facts per case — fill these in. Empty values stay hidden for visitors.
     role: your title on the project · period: e.g. '03/2024 – 12/2024' · scope: short facts, e.g. ['Team 6', '3 agencies', '40 posts / month'] */
  var FACTS = {
    vib:    {role:{en:'Pitching → overall management', vi:'Từ pitching đến quản lý chung'}, period:'', scope:[]},
    msb:    {role:{en:'Pitching → execution', vi:'Từ pitching đến triển khai'}, period:'2025 – 2027', scope:['AWO · Production · Booking · Media']},
    cake:   {role:{en:'Contributed to the pitch', vi:'Góp sức vào quá trình pitching'}, period:'', scope:[]},
    poca:   {role:{en:'Coordinated the key workstreams', vi:'Điều phối các hạng mục chính'}, period:'2023', scope:[]},
    digimi: {role:'', period:'', scope:['Social AWO · Birthday campaign · Coffee Truck · CSR', 'Production · Social content · OOH / Community / KOL / TikTok booking']},
    duytan: {role:{en:'Communication plan · Pitching', vi:'Kế hoạch truyền thông · Pitching'}, period:'Tết 2025', scope:['AWO · Production · Booking · Media']},
    cindy:  {role:{en:'Pitching → execution', vi:'Từ pitching đến triển khai'}, period:'', scope:['Production · Social campaign']}
  };
  CASES.forEach(function(c){ var l = LOOK[c.id] || ['var(--ink)','var(--lime)'], f = FACTS[c.id] || {}; c.bg = l[0]; c.fg = l[1]; c.role = f.role || ''; c.period = f.period || ''; c.scope = f.scope || [];
    var m = MX[c.id] || []; c.cats = [c.cats.indexOf('bank') > -1 ? 'bank' : 'fmcg'].concat(COLS.filter(function(col, i){ return (col.g === 'type' || col.k === 'pitch') && m[i]; }).map(function(col){ return col.k; })); });
  var FEATURED = ['msb', 'vib', 'digimi'];
  var MAIN = CASES.filter(function(c){ return FEATURED.indexOf(c.id) > -1; });
  var CORE = CASES.filter(function(c){ return c.core; });

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

  /* LV.4: the five core cases as a horizontal accordion (ref: an editorial index; one open panel with a big number,
     the client name set huge along the bottom; the other cases fold into narrow strips you open by hover or tap).
     The client name is the artwork; the metric is a small footnote. Phones get the same accordion, vertical. */
  var accIdx = 0;
  function renderStoryCases(){
    var vi = lang === 'vi';
    var NAME = {cake:'Cake by VPBank'};
    var LOOKS = ['a-ink', 'a-pink', 'a-cream', 'a-chrome', 'a-ink2'];
    var NOTE = {vib:{en:'1 pitch, then multiple projects', vi:'1 lần pitch, rồi nhiều dự án tiếp theo'}, msb:{en:'3→5 years of partnership', vi:'3→5 năm hợp tác'}, cake:{en:'Social retainer, won by the team', vi:'Team giành social retainer'}, poca:{en:'266K+ Facebook engagements', vi:'266K+ tương tác Facebook'}, digimi:{en:'268 app sign-ups · Coffee Truck', vi:'268 lượt đăng ký app · Coffee Truck'}};
    var ORDER = ['msb', 'vib', 'cake', 'poca', 'digimi'], byId = {}; CORE.forEach(function(c){ byId[c.id] = c; });
    var panel = function(id, i){
      var c = byId[id]; if (!c) return '';
      var nm = NAME[id] || c.brand, no = '0' + (i + 1), fs = Math.min(24, 150 / nm.length).toFixed(1);
      return '<article class="ac ' + LOOKS[i] + (i === accIdx ? ' on' : '') + '" data-ac="' + i + '">' +
        '<button type="button" class="ac-strip" aria-expanded="' + (i === accIdx ? 'true' : 'false') + '" aria-label="' + esc(nm) + '"><b>' + no + '</b><span>' + esc(nm) + '</span></button>' +
        '<div class="ac-body">' +
          '<div class="ac-top"><p class="ac-no">' + no + '</p><p class="ac-sub">' + esc(c.subs.join(' · ')) + '<br>' + esc(c.meta.split(' · ').slice(0, 2).join(' · ')) + '</p></div>' +
          '<div class="ac-mid"><div class="ac-txt">' + (c.ask ? '<p><b>' + (vi ? 'Bài toán' : 'The ask') + '</b>' + esc(L(c.ask)) + '</p>' : '') + (c.role ? '<p><b>' + (vi ? 'Vai trò' : 'Role') + '</b>' + esc(L(c.role)) + '</p>' : '') + '</div>' +
            '<div class="ac-media"><p class="ac-t">' + both(c.t) + '</p><p class="ac-k"><i></i>' + esc(L(NOTE[id] || {en:'', vi:''})) + '</p>' +
            '<button type="button" class="ac-open" data-case="' + id + '">' + (vi ? 'Xem chi tiết' : 'Open case') + ' ↗</button></div></div>' +
          '<p class="ac-name" style="--fs:' + fs + 'cqi" aria-hidden="true">' + esc(nm) + '</p>' +
        '</div></article>';
    };
    $('#track').innerHTML = '<div class="acc" aria-label="' + (vi ? 'Năm dự án chính' : 'Five core cases') + '">' + ORDER.map(panel).join('') +
      '<a class="ac ac-more" href="#work"><span class="ac-strip"><b>+2</b><span>' + (vi ? 'Cả 7 dự án →' : 'All 7 projects →') + '</span></span></a></div>';
  }
  var accLock = 0, accHover = 0;
  function accSet(i){ accIdx = i; accLock = Date.now() + 800; $$('#track .ac[data-ac]').forEach(function(a, k){ a.classList.toggle('on', k === i); var s = $('.ac-strip', a); if (s) s.setAttribute('aria-expanded', k === i ? 'true' : 'false'); }); }
  document.addEventListener('click', function(e){ var s = e.target.closest && e.target.closest('#track .ac[data-ac] .ac-strip'); if (s){ accSet(+s.closest('.ac').dataset.ac); track('case-peek', s.getAttribute('aria-label')); } });
  /* hover opens a strip only after the pointer rests on it, and never while the panels are still moving */
  document.addEventListener('pointerover', function(e){
    if (!finePointer || window.innerWidth < 760) return; clearTimeout(accHover);
    var a = e.target.closest && e.target.closest('#track .ac[data-ac]'); if (!a || a.classList.contains('on')) return;
    accHover = setTimeout(function(){ if (Date.now() > accLock && a.matches(':hover')) accSet(+a.dataset.ac); }, 260);
  });
  /* =====================================================================
     WORK (v15g): an editorial campaign index (ref: OUS Worldwide), sorted two ways:
     by kind of work or by client. A row opens a glass intro card; "details" opens an editorial page
     (ref: Stüssy "All about…") with text columns and a collage of image slots.
     Facts come only from the approved brief; anything not confirmed shows as a "+ Xinh to add" slot.
     ===================================================================== */
  var TY = [
    {k:'imc', t:{en:'IMC & launch', vi:'IMC & ra mắt'}, d:COLS[0].d},
    {k:'awo', t:{en:'Social & always-on', vi:'Social & always-on'}, d:COLS[1].d},
    {k:'act', t:{en:'Activation & event', vi:'Activation & sự kiện'}, d:COLS[2].d},
    {k:'prod', t:{en:'Production', vi:'Sản xuất'}, d:COLS[3].d},
    {k:'pitch', t:{en:'Pitch & proposal', vi:'Pitch & proposal'}, d:COLS[4].d},
    {k:'tbd', t:{en:'To be classified', vi:'Cần phân loại'}, d:{en:'Projects in the portfolio list whose kind of work Xinh will confirm.', vi:'Dự án có trong danh sách portfolio, Xinh sẽ xác nhận tính chất sau.'}}
  ];
  var CLIENTS = [
    {k:'msb', n:'MSB', ind:{en:'Banking', vi:'Ngân hàng'}},
    {k:'vib', n:'VIB', ind:{en:'Banking', vi:'Ngân hàng'}, note:{en:'One pitch led to multiple projects.', vi:'Từ một lần pitch mở ra nhiều dự án.'}},
    {k:'cake', n:'Cake by VPBank', ind:{en:'Digital bank', vi:'Ngân hàng số'}},
    {k:'digimi', n:'Digimi × BVBank', ind:{en:'Digital banking', vi:'Ngân hàng số'}},
    {k:'tpbank', n:'TPBank', ind:{en:'Banking', vi:'Ngân hàng'}},
    {k:'ncb', n:'NCB', ind:{en:'Banking', vi:'Ngân hàng'}},
    {k:'poca', n:'Poca', ind:{en:'FMCG · snacks', vi:'FMCG · snack'}},
    {k:'masan', n:'Masan', ind:{en:'FMCG · brands in the same group', vi:'FMCG · các nhãn cùng tập đoàn'}},
    {k:'meatdeli', n:'MEATDeli', ind:{en:'FMCG', vi:'FMCG'}},
    {k:'duytan', n:'Nhựa Duy Tân', ind:{en:'Consumer', vi:'Tiêu dùng'}},
    {k:'cindy', n:'Cindy Bloom', ind:{en:'Consumer', vi:'Tiêu dùng'}}
  ];
  /* c: client key · cs: full case study id · n: campaign name · y: year ('' = to fill) · ty: kinds of work
     ctx / me / team: from the brief (null = to fill) · res: results tied to this campaign only · out: outcome line */
  var CS = {}; CASES.forEach(function(c){ CS[c.id] = c; });
  var JOBS = [
    {id:'msb-awo', sc:'pe', c:'msb', cs:'msb', n:{en:'Social Always On', vi:'Social Always On'}, y:'2025–2027', ty:['awo','pitch','prod'],
     ctx:CS.msb.ask, role:FACTS.msb.role, me:CS.msb.me, team:CS.msb.team, out:CS.msb.out, res:[{b:'3 → 5', l:{en:'years of partnership', vi:'năm hợp tác'}}]},
    {id:'vib-ivy', sc:'pe', c:'vib', cs:'vib', n:{en:'VIB Ivy Card', vi:'VIB Ivy Card'}, y:'', ty:['pitch','imc'], ctx:CS.vib.ask, role:FACTS.vib.role, me:CS.vib.me, team:CS.vib.team, out:CS.vib.out},
    {id:'vib-ats', sc:'pe', c:'vib', cs:'vib', n:{en:'Anh Trai Say Hi', vi:'Anh Trai Say Hi'}, y:'', ty:['act'],
     me:{en:'Led pitching and management for Anh Trai Say Hi.', vi:'Dẫn pitch và quản lý Anh Trai Say Hi.'}},
    {id:'vib-btbt', c:'vib', cs:'vib', n:{en:'Bộ Tứ Báo Thủ · video', vi:'Bộ Tứ Báo Thủ · video'}, y:'', ty:['prod']},
    {id:'vib-cashless', c:'vib', cs:'vib', n:{en:'Ngày hội không tiền mặt', vi:'Ngày hội không tiền mặt'}, y:'', ty:['act']},
    {id:'vib-max', c:'vib', cs:'vib', n:{en:'Sound Notification for MAX', vi:'Sound Notification for MAX'}, y:'', ty:['tbd']},
    {id:'cake-social', sc:'p', c:'cake', cs:'cake', n:{en:'Social retainer pitch', vi:'Pitch social retainer'}, y:'', ty:['pitch','awo'],
     ctx:CS.cake.ask, role:FACTS.cake.role, me:CS.cake.me, team:CS.cake.team, out:CS.cake.out},
    {id:'digimi-awo', c:'digimi', cs:'digimi', n:{en:'Social AWO', vi:'Social AWO'}, y:'', ty:['awo','prod'], ctx:CS.digimi.ask, team:CS.digimi.team},
    {id:'digimi-bday', c:'digimi', cs:'digimi', n:{en:'Tròn một tuổi – Đầy Thank Xuân', vi:'Tròn một tuổi – Đầy Thank Xuân'}, y:'', ty:['act','imc'],
     res:[{b:'500+', l:{en:'event attendees', vi:'người tham dự sự kiện'}}, {b:'450', l:{en:'Digimi accounts opened offline', vi:'tài khoản Digimi mở offline'}}, {b:'1.5M', l:{en:'online reach', vi:'reach online'}}]},
    {id:'digimi-truck', c:'digimi', cs:'digimi', n:{en:'Coffee Truck', vi:'Coffee Truck'}, y:'', ty:['act'], me:CS.digimi.me,
     res:[{b:'~2,000', l:{en:'booth visitors', vi:'lượt ghé booth'}}, {b:'268', l:{en:'sign-ups', vi:'đăng ký'}}, {b:'140', l:{en:'conversions', vi:'chuyển đổi'}}]},
    {id:'digimi-csr', c:'digimi', cs:'digimi', n:{en:'CSR · Vì một thế hệ vươn tầm', vi:'CSR · Vì một thế hệ vươn tầm'}, y:'', ty:['tbd']},
    {id:'tpbank-concert', sc:'pe', c:'tpbank', n:{en:'Em Xinh Say Hi Concert 1', vi:'Em Xinh Say Hi Concert 1'}, y:'', ty:['pitch','act'],
     role:{en:'Pitching → execution', vi:'Từ pitching đến triển khai'}},
    {id:'ncb-awo', c:'ncb', n:{en:'Social Always On 2025', vi:'Social Always On 2025'}, y:'2025', ty:['awo'],
     me:{en:'Ran the initial phase. Saw the client’s problem had not been clarified, stepped in to clarify it, brought the project back on track, then handed it back to Account.', vi:'Chạy giai đoạn đầu. Nhận ra vấn đề của khách hàng chưa được làm rõ, vào cuộc làm rõ, đưa dự án về đúng hướng rồi bàn giao lại cho Account.'}},
    {id:'poca-launch', c:'poca', cs:'poca', n:{en:'Poca Yummy · QUẨY-VERSE launch', vi:'Poca Yummy · ra mắt QUẨY-VERSE'}, y:'2023', ty:['imc','prod'],
     ctx:CS.poca.ask, role:FACTS.poca.role, me:CS.poca.me, out:CS.poca.out, res:CS.poca.res, src:CS.poca.src},
    {id:'poca-tgvn', c:'poca', cs:'poca', n:{en:'Thế giới vui nhộn', vi:'Thế giới vui nhộn'}, y:'', ty:['tbd']},
    {id:'poca-magic', c:'poca', cs:'poca', n:{en:'Poca – Thế giới pháp thuật vui nhộn', vi:'Poca – Thế giới pháp thuật vui nhộn'}, y:'', ty:['tbd']},
    {id:'masan-chante', c:'masan', n:{en:'Chanté · Social Always On', vi:'Chanté · Social Always On'}, y:'', ty:['awo']},
    {id:'masan-vihawa', c:'masan', n:{en:'Vihawa · Social Campaign 2025', vi:'Vihawa · Social Campaign 2025'}, y:'2025', ty:['awo']},
    {id:'masan-wakeup', c:'masan', n:{en:'Wake-Up Tây Nguyên · Social Campaign', vi:'Wake-Up Tây Nguyên · Social Campaign'}, y:'', ty:['awo']},
    {id:'meatdeli-q4', sc:'p', c:'meatdeli', n:{en:'Social Campaign Q4.2025', vi:'Social Campaign Q4.2025'}, y:'2025', ty:['pitch','awo'],
     role:{en:'Pitching, then handed to Account', vi:'Pitching, sau đó bàn giao cho Account'}},
    {id:'duytan-tet', sc:'p', c:'duytan', cs:'duytan', n:{en:'Tết 2025', vi:'Tết 2025'}, y:'2025', ty:['pitch','awo','prod'],
     role:FACTS.duytan.role, me:CS.duytan.me, out:{en:'Pitch won, with the team.', vi:'Thắng pitch, cùng team.'}},
    {id:'cindy-launch', sc:'pe', c:'cindy', cs:'cindy', n:{en:'Launch campaign', vi:'Chiến dịch ra mắt'}, y:'', ty:['imc','pitch','prod'], role:FACTS.cindy.role, me:CS.cindy.me}
  ];
  var CL = {}; CLIENTS.forEach(function(c){ CL[c.k] = c; });
  var TYK = {}; TY.forEach(function(t){ TYK[t.k] = t; });
  /* WORK (v16c, ref toyfight.co/work, screen recording from Xinh): boxed labels "<filter>" + "Projects (n)"
     top-left, a FILTER list on the right, one horizontal strip of project tiles drifting across the middle.
     A tile opens the project with a stair-step block wipe + "LOADING · PLS · WAIT" pills; the project page is
     two columns (facts left, media right). At the end of a project: "Up next" in the same filter, and
     scrolling past the end pulls the next one in, so you never go back out to the index to keep browsing. */
  var wxF = 'feat', wxList = [], jxIdx = -1;
  function toFill(txt){ return '<span class="fill">+ ' + esc(txt) + '</span>'; }
  function wkTone(j){ return j.ty[0] || 'tbd'; }
  function wkFil(){
    var vi = lang === 'vi';
    return [{k:'feat', n:vi ? 'Nổi bật' : 'Featured'}, {k:'all', n:vi ? 'Tất cả' : 'All'}].concat(TY.filter(function(t){ return t.k !== 'pitch' && t.k !== 'tbd'; }).map(function(t){ return {k:t.k, n:L(t.t)}; }))
      .map(function(f){ f.list = wkList(f.k); return f; });
  }
  function wkList(k){ k = k || wxF; return JOBS.filter(function(j){ return k === 'all' || (k === 'feat' ? !!(j.cs && (j.ctx || j.me)) : j.ty.indexOf(k) > -1); }); }
  function wkName(k){ var f = wkFil().filter(function(x){ return x.k === k; })[0]; return f ? f.n : ''; }
  var TF_SZ = [[200,150],[150,190],[230,140],[170,170],[210,180],[140,150],[250,160]];
  /* scope tag from the brief: pitched only, or pitched and then ran it */
  function wkScope(j){ var vi = lang === 'vi'; return j.sc === 'pe' ? 'Pitching & execution' : j.sc === 'p' ? 'Pitching' : ''; }
  function wkProj(j){ var n = L(j.n), c = CL[j.c].n; return n.indexOf(c + ' ') === 0 ? n.slice(c.length + 1) : n; }
  function tfTile(j, i, dup){
    var c = CL[j.c], z = TF_SZ[JOBS.indexOf(j) % TF_SZ.length], sc = wkScope(j);
    return '<button class="tf-t t-' + wkTone(j) + '" type="button" data-job="' + j.id + '" style="--w:' + z[0] + 'px;--h:' + z[1] + 'px;--wi:' + i + '"' + (dup ? ' tabindex="-1" aria-hidden="true"' : '') + '>' +
      (sc ? '<span class="tf-sc' + (j.sc === 'pe' ? ' pe' : '') + '">' + sc + '</span>' : '') +
      '<span class="tf-nm"><b>' + esc(c.n) + '</b><span>' + esc(wkProj(j)) + '</span></span></button>';
  }
  function renderWork(){
    var host = $('#wxIndex'); if (!host) return; var vi = lang === 'vi';
    wxList = wkList();
    $('#wxN').textContent = '(' + wxList.length + ')';
    $('#tfCur').textContent = wkName(wxF);
    $('#wxFil').innerHTML = wkFil().filter(function(f){ return f.list.length; }).map(function(f){
      return '<button type="button" data-wxf="' + f.k + '" aria-pressed="' + (wxF === f.k) + '">' + esc(f.n) + '</button>'; }).join('');
    var one = wxList.map(function(j, i){ return tfTile(j, i); }).join('');
    /* repeat the set so the strip can loop without a seam */
    var reps = Math.max(2, Math.ceil(14 / Math.max(1, wxList.length)));
    var more = ''; for (var r = 1; r < reps; r++) more += wxList.map(function(j, i){ return tfTile(j, i + r * wxList.length, true); }).join('');
    host.innerHTML = '<div class="tf-set">' + one + '</div><div class="tf-set" aria-hidden="true">' + more + '</div>';
    tfX = 0;
  }
  /* strip motion: slow drift, wheel / drag moves it, hover pauses */
  var tfX = 0, tfV = 0, tfHover = false, tfDrag = null, tfOn = false;
  function tfLoop(){
    var st = $('#tfStrip'), tr = $('#wxIndex');
    if (!st || curView !== 'work' || !$('#jobSheet').hidden){ tfOn = false; return; }
    var set = $('.tf-set', tr), wSet = set ? set.offsetWidth : 0, total = tr.scrollWidth;
    if (!tfDrag) tfX += tfV + (tfHover || reduce ? 0 : 0.35);
    tfV *= 0.92;
    var period = total / Math.max(1, Math.round(total / Math.max(1, wSet)));
    if (period > 0){ while (tfX >= period) tfX -= period; while (tfX < 0) tfX += period; }
    tr.style.transform = 'translate3d(' + (-tfX).toFixed(1) + 'px,0,0)';
    requestAnimationFrame(tfLoop);
  }
  function tfStart(){ if (!tfOn){ tfOn = true; requestAnimationFrame(tfLoop); } }
  (function(){
    var st = $('#tfStrip'); if (!st) return;
    st.addEventListener('wheel', function(e){ e.preventDefault(); tfV += (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 0.06; tfStart(); }, {passive:false});
    st.addEventListener('pointerenter', function(e){ if (e.pointerType === 'mouse') tfHover = true; });
    st.addEventListener('pointerleave', function(){ tfHover = false; });
    st.addEventListener('pointerdown', function(e){ tfDrag = {x:e.clientX, x0:tfX, moved:false, t:Date.now()}; });
    window.addEventListener('pointermove', function(e){ if (!tfDrag) return; var dx = e.clientX - tfDrag.x; if (Math.abs(dx) > 6) tfDrag.moved = true; var nx = tfDrag.x0 - dx; tfV = (nx - tfX) * 0.5; tfX = nx; });
    window.addEventListener('pointerup', function(){ if (tfDrag && tfDrag.moved){ st.dataset.dragged = '1'; setTimeout(function(){ st.dataset.dragged = ''; }, 50); } tfDrag = null; });
    new MutationObserver(function(){ if (!$('#v-work').hidden) tfStart(); }).observe($('#v-work'), {attributes:true, attributeFilter:['hidden']});
  })();
  function setFilter(f){
    if (!f || f === wxF) return; var tr = $('#wxIndex');
    if (reduce){ wxF = f; renderWork(); return; }
    tr.classList.add('out');
    setTimeout(function(){ wxF = f; renderWork(); tr.classList.remove('out'); }, 260);
  }
  /* stair-step wipe between index and project pages */
  function tfWipe(swap){
    var w = $('#tfWipe');
    if (reduce || !w){ swap(); return; }
    w.hidden = false; w.className = 'tf-wipe'; void w.offsetWidth; w.classList.add('in');
    setTimeout(function(){ w.classList.add('load'); swap(); }, 560);
    setTimeout(function(){ w.classList.remove('in', 'load'); w.classList.add('out'); }, 1050);
    setTimeout(function(){ w.hidden = true; w.className = 'tf-wipe'; }, 1650);
  }
  function jobChips(j){ return j.ty.filter(function(k){ return k !== 'pitch' && k !== 'tbd'; }).map(function(k){ return '<span class="tf-pill sm">' + esc(L(TYK[k].t)) + '</span>'; }).join(''); }
  function jobRes(j){ return (j.res || []).map(function(r){ return '<div class="jr"><b>' + esc(r.b) + '</b><span>' + both(r.l) + '</span></div>'; }).join(''); }
  function jxHtml(j){
    var vi = lang === 'vi', c = CL[j.c], n = wxList.length, nx = wxList[(jxIdx + 1) % n];
    function sec(lbl, body, ask){ return '<div class="tfp-s"><h4>' + esc(lbl) + '</h4>' + (body ? '<p>' + both(body) + '</p>' : '<p>' + toFill(ask) + '</p>') + '</div>'; }
    var role = j.role ? (typeof j.role === 'string' ? {en:j.role, vi:j.role} : j.role) : null;
    var slots = ['a','b','c','d','e','f'].map(function(k, i){ return '<figure class="jd-ph p' + k + '"><span>' + (vi ? '+ Ảnh thành phẩm ' : '+ Final work image ') + (i + 1) + '</span></figure>'; }).join('');
    var fname = wkName(wxF), ups = [];
    for (var u = 1; u < Math.min(n, 4); u++) ups.push(wxList[(jxIdx + u) % n]);
    return '<div class="tfp">' +
      '<aside class="tfp-l"><div class="tfp-top"><button type="button" class="tfp-back" data-jxclose aria-label="' + (vi ? 'Về danh sách dự án' : 'Back to all projects') + '">←</button>' +
        '<span class="tfp-ct">' + ('0' + (jxIdx + 1)).slice(-2) + ' / ' + ('0' + n).slice(-2) + '</span>' +
        '<span class="tfp-ar"><button type="button" data-jxgo="-1" aria-label="' + (vi ? 'Dự án trước' : 'Previous project') + '">←</button><button type="button" data-jxgo="1" aria-label="' + (vi ? 'Dự án kế tiếp' : 'Next project') + '">→</button></span></div>' +
        '<h2 class="tf-pill big" id="jdTitle">' + esc(c.n) + '</h2><p class="tf-pill">' + esc(wkProj(j)) + '</p>' +
        '<div class="tfp-tags">' + (wkScope(j) ? '<span class="tf-sc' + (j.sc === 'pe' ? ' pe' : '') + '">' + wkScope(j) + '</span>' : '') + jobChips(j) + '<span class="tf-pill sm">' + (j.y ? esc(j.y) : (vi ? '+ năm' : '+ year')) + '</span><span class="tf-pill sm">' + esc(L(c.ind)) + '</span></div>' +
        '<div class="tfp-txt">' + sec(vi ? 'Bối cảnh' : 'Context', j.ctx, vi ? 'bối cảnh & bài toán' : 'context & problem') +
          sec(vi ? 'Vai trò' : 'Role', role, vi ? 'vai trò của Xinh' : 'Xinh’s role') +
          sec(vi ? 'Xinh đã làm' : 'What Xinh did', j.me, vi ? 'phần Xinh trực tiếp làm' : 'what Xinh did directly') +
          (j.team ? sec(vi ? 'Phần của team' : 'Team’s part', j.team) : '') +
          sec(vi ? 'Kết quả' : 'Outcome', j.out, vi ? 'kết quả đã xác nhận' : 'confirmed result') + '</div>' +
        (j.cs && CS[j.cs] ? '<button class="tfp-cta" type="button" data-case="' + j.cs + '"><i>→</i>' + (vi ? 'Xem case study' : 'Open case study') + '</button>' : '') + '</aside>' +
      '<div class="tfp-r"><div class="tfp-hero t-' + wkTone(j) + '"><b>' + esc(c.n) + '</b><em>' + esc(wkProj(j)) + '</em></div>' +
        (j.res ? '<div class="tfp-res">' + jobRes(j) + (j.src ? '<p class="src">' + esc(j.src) + '</p>' : '') + '</div>' : '') +
        '<div class="jd-gal">' + slots + '</div>' +
        (n > 1 ? '<section class="tfp-up"><p class="tfp-uk">' + (vi ? 'Xem tiếp' : 'Up next') + ' · <b>' + esc(fname) + '</b> <span>(' + n + ')</span></p>' +
          '<div class="tfp-ul">' + ups.map(function(x){ return '<button type="button" class="tfp-u" data-jxto="' + x.id + '"><span class="tfp-uc t-' + wkTone(x) + '"><b>' + esc(CL[x.c].n) + '</b></span><span class="tfp-un">' + esc(wkProj(x)) + '</span></button>'; }).join('') + '</div>' +
          '<button type="button" class="jx-next t-' + wkTone(nx) + '" data-jxgo="1"><span class="jx-bar2"><i></i></span><span class="jx-nk">' + (vi ? 'Dự án kế tiếp' : 'Next project') + '</span><b>' + esc(CL[nx.c].n) + '</b><em>' + esc(wkProj(nx)) + '</em>' +
          '<span class="jx-nh">' + (vi ? 'Cuộn tiếp để sang luôn ↓' : 'Keep scrolling to go straight there ↓') + '</span></button></section>' : '') +
      '</div></div>';
  }
  function jxRender(){ var inn = $('#jdIn'), j = wxList[jxIdx]; inn.innerHTML = jxHtml(j); inn.scrollTop = 0; var r = $('.tfp-r', inn); if (r) r.scrollTop = 0; jxSetPull(0); track('jobd', j.id); }
  function openJob(id){
    wxList = wkList(); jxIdx = -1; wxList.forEach(function(j, i){ if (j.id === id) jxIdx = i; });
    if (jxIdx < 0){ wxF = 'all'; renderWork(); wxList.forEach(function(j, i){ if (j.id === id) jxIdx = i; }); }
    if (jxIdx < 0) return;
    var sh = $('#jobSheet');
    tfWipe(function(){ jxRender(); $$('.sheet').forEach(function(s){ if (s.id !== 'jobSheet') s.hidden = true; }); if (sh.hidden) openSheet(sh); });
  }
  var openJobDetail = openJob;
  var jxBusy = false;
  function jxTo(i){
    var n = wxList.length; if (n < 2 || jxBusy) return; jxBusy = true;
    jxIdx = ((i % n) + n) % n;
    tfWipe(jxRender); setTimeout(function(){ jxBusy = false; }, reduce ? 0 : 1100);
  }
  function jxGo(d){ jxTo(jxIdx + d); }
  function jxClose(){ var sh = $('#jobSheet'); if (sh.hidden) return; tfWipe(function(){ closeSheets(); tfStart(); }); }
  /* pull past the end of a project to load the next one */
  var jxPull = 0, jxPullT = 0;
  function jxSetPull(v){ jxPull = clamp(v, 0, 1); var b = $('#jdIn .jx-bar2 i'); if (b) b.style.transform = 'scaleX(' + jxPull.toFixed(3) + ')'; }
  function jxScroller(){ var inn = $('#jdIn'), r = $('.tfp-r', inn); return r && r.scrollHeight > r.clientHeight + 2 ? r : inn; }
  (function(){
    var inn = $('#jdIn'); if (!inn) return; var ty = 0, sx = 0, sy = 0;
    function feed(d){
      var s = jxScroller(); if (!s || !$('.jx-next', inn) || s.scrollTop + s.clientHeight < s.scrollHeight - 4 || jxBusy) return;
      jxSetPull(jxPull + d); clearTimeout(jxPullT);
      if (jxPull >= 1){ jxGo(1); return; }
      jxPullT = setTimeout(function(){ jxSetPull(0); }, 650);
    }
    inn.addEventListener('wheel', function(e){ if (e.deltaY > 0) feed(e.deltaY / 700); }, {passive:true});
    inn.addEventListener('touchstart', function(e){ ty = sy = e.touches[0].clientY; sx = e.touches[0].clientX; }, {passive:true});
    inn.addEventListener('touchmove', function(e){ var y = e.touches[0].clientY, d = ty - y; ty = y; if (d > 0) feed(d / 260); }, {passive:true});
    inn.addEventListener('touchend', function(e){ var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.8) jxGo(dx < 0 ? 1 : -1); }, {passive:true});
  })();
  document.addEventListener('keydown', function(e){
    if ($('#jobSheet').hidden) return;
    if (e.key === 'Escape'){ e.stopImmediatePropagation(); jxClose(); }
    else if (e.key === 'ArrowRight'){ jxGo(1); } else if (e.key === 'ArrowLeft'){ jxGo(-1); }
  });
  document.addEventListener('click', function(e){
    var f = e.target.closest('[data-wxf]'); if (f){ setFilter(f.dataset.wxf); track('wx', f.dataset.wxf); return; }
    if (e.target.closest('[data-jxclose]')){ jxClose(); return; }
    var g = e.target.closest('[data-jxgo]'); if (g){ jxGo(+g.dataset.jxgo); return; }
    var t = e.target.closest('[data-jxto]'); if (t){ wxList.forEach(function(j, i){ if (j.id === t.dataset.jxto) jxTo(i); }); return; }
    var d = e.target.closest('[data-jobd]'); if (d){ openJob(d.dataset.jobd); return; }
    var r = e.target.closest('[data-job]'); if (r){ if ($('#tfStrip').dataset.dragged) return; openJob(r.dataset.job); }
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
  /* LV.2 · the four steps as a deck you swipe (Xinh: "like Tinder"). Scrolling (or dragging the top
     card) flicks it off to the right; it tucks in at the back of the deck, so after step 04 the
     deck has looped round under "Problem solved." The headline stays beside the deck. */
  var HW_TAG = [{en:'Real goal found', vi:'Đã rõ mục tiêu thật'}, {en:'Priorities set', vi:'Đã chốt thứ tự ưu tiên'}, {en:'Everyone aligned', vi:'Các bên đã khớp'}, {en:'Issue handled', vi:'Đã xử lý phát sinh'}];
  var HW_END = {k:{en:'Problem solved.', vi:'Vấn đề đã được giải quyết.'}, d:{en:'Then the loop starts again on the next brief.', vi:'Rồi vòng lặp bắt đầu lại với đề bài tiếp theo.'}};
  var hw = $('#hw'), hwStage = $('#hwStage'), hwS = 0, hwIdx = -2, hwAnim = false, hwDrag = 0, hwCards = [];
  function renderSteps(){
    var vi = lang === 'vi';
    hwStage.innerHTML = '<div class="dk">' + STEPS.map(function(st, i){
        return '<article class="dk-c" data-s="' + i + '"><p class="dk-top"><b>0' + (i + 1) + '</b><span>' + esc(L(st.t)) + '</span><i>0' + (i + 1) + ' / 04</i></p>' +
          '<h3>' + esc(L(st.k)) + '</h3><p class="dk-d">' + esc(L(st.d)) + '</p><p class="dk-out">✓ ' + esc(L(HW_TAG[i])) + '</p></article>';
      }).join('') +
      '<article class="dk-c dk-end" data-s="4"><p class="dk-top"><b>↻</b><span>' + (vi ? 'Khép vòng' : 'Loop closed') + '</span></p><h3>' + esc(L(HW_END.k)) + '</h3><p class="dk-d">' + esc(L(HW_END.d)) + '</p>' +
        '<p class="dk-outs">' + HW_TAG.map(function(g){ return '<span>✓ ' + esc(L(g)) + '</span>'; }).join('') + '</p></article>' +
      '<p class="dk-hint" aria-hidden="true">' + (vi ? 'Cuộn hoặc kéo sang phải' : 'Scroll or drag right') + ' →</p></div>';
    hwCards = $$('.dk-c', hwStage);
    $('#hwNow').innerHTML = STEPS.map(function(st, i){ return '<i style="--i:' + i + '"></i>'; }).join('') + '<span>' + (vi ? 'Một vòng, bốn bước' : 'One loop, four steps') + '</span>';
    hwIdx = -2; drawHow(true);
    $('#steps4').innerHTML = STEPS.map(function(s, i){ return '<article class="how-card"><span class="n">0' + (i + 1) + '</span><h3>' + esc(L(s.t)) + '</h3><p class="k">' + esc(L(s.k)) + '</p><p>' + esc(L(s.d)) + '</p></article>'; }).join('');
    $('#steps4').classList.add('stackx');
    if (!hwStage._wired){
      hwStage._wired = true;
      /* drag the top card: past a third of its width it flicks and the page scrolls to the next card */
      var x0 = 0, dragging = false;
      hwStage.addEventListener('pointerdown', function(e){ if (!e.target.closest('.dk-c.top')) return; dragging = true; x0 = e.clientX; hwStage.setPointerCapture(e.pointerId); hw.classList.add('drag'); });
      hwStage.addEventListener('pointermove', function(e){ if (!dragging) return; hwDrag = Math.max(-40, e.clientX - x0); drawHow(true); });
      var end = function(){
        if (!dragging) return; dragging = false; hw.classList.remove('drag');
        var w = hwCards[0].offsetWidth, go = hwDrag > w * 0.33 ? 1 : 0; hwDrag = 0;
        if (go && hwIdx < 4) hwGo(hwIdx + 1); else drawHow(true);
      };
      hwStage.addEventListener('pointerup', end); hwStage.addEventListener('pointercancel', end);
      onScrollFrame(drawHow);
      window.addEventListener('resize', function(){ drawHow(true); });
    }
  }
  function hwGo(i){
    var top = hw.getBoundingClientRect().top + window.scrollY, span = hw.offsetHeight - window.innerHeight;
    window.scrollTo({top: top + span * (i + 0.15) / 4.6, behavior: reduce ? 'auto' : 'smooth'});
  }
  function hwFrame(){ hwAnim = false; drawHow(); }
  function drawHow(force){
    if (curView !== 'story' && !force) return;
    var r = hw.getBoundingClientRect(), vh = window.innerHeight;
    if (!force && (r.bottom < -50 || r.top > vh + 50)) return;
    /* scroll → 0..4 with a rest on every card, so each one is read before it flies */
    var t = reduce ? 0 : clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
    var raw = clamp(t * 4.6, 0, 4), base = Math.min(3, Math.floor(raw)), f = raw - base;
    var target = raw >= 4 ? 4 : base + sm((f - 0.45) / 0.55);
    hwS += (target - hwS) * (reduce || force ? 1 : 0.15);
    if (Math.abs(target - hwS) < 0.001) hwS = target; else if (!hwAnim){ hwAnim = true; requestAnimationFrame(hwFrame); }
    hw.style.setProperty('--p', (hwS / 4).toFixed(4));
    var W = hwCards.length ? hwCards[0].offsetWidth : 360, n = hwCards.length;
    hwCards.forEach(function(c, i){
      var d = i - hwS;
      if (i < 4 && d <= -1) d += n;            /* swiped cards tuck in behind: the loop */
      var x = 0, y = 0, rot = 0, sc = 1, op = 1, z = 10 - Math.round(d * 2);
      if (d < 0){                               /* flying out to the right */
        var k = -d; x = k * W * 1.25; y = -k * 30; rot = k * 18; op = 1 - sm((k - 0.55) / 0.45);
        z = 20;
      } else {
        var dd = Math.min(d, 3);
        y = dd * 16; sc = 1 - dd * 0.05; rot = dd === 0 ? 0 : (i % 2 ? -1 : 1) * dd * 1.6; op = d > 3 ? 0 : 1 - Math.max(0, d - 2) ;
      }
      if (d >= 0 && d < 0.5 && hwDrag){ x = hwDrag; rot = hwDrag / W * 14; }
      c.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + rot.toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
      c.style.opacity = clamp(op, 0, 1).toFixed(3);
      c.style.zIndex = z;
      c.classList.toggle('top', d >= -0.5 && d < 0.5);
      c.classList.toggle('back', d >= 0.5);
    });
    var idx = Math.round(hwS);
    if (idx !== hwIdx){ hwIdx = idx; hw.setAttribute('data-step', idx); hw.classList.toggle('solved', idx === 4); }
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
      '<p class="mono">' + grpName(col) + '</p>' +
      '<p>' + esc(L(col.d)) + '</p><div class="fit"><b>' + (vi ? 'Thể hiện qua' : 'Shown in') + '</b><div class="proof">' + proofChips(i) + '</div></div></div></article>';
  }
  function statBtn(col){
    var n = colIdx(col.k) + 1;
    return '<button class="stat" type="button" data-col="' + col.k + '" aria-pressed="' + (col.k === mxSel ? 'true' : 'false') + '"><span class="ix">' + ('0' + n).slice(-2) + '</span><span class="nm">' + esc(L(col.t)) + '</span><span class="go">→</span></button>';
  }
  /* LV.3 · proof as one zoom (ref: podium.global — the page keeps pulling you in).
     Scroll pulls the camera through the "0" of "20 brands" into the brand wall; the wall settles
     as one layout, then the camera dives into its centre tile, which opens into what Xinh runs and
     how far she takes it. JS only sets transforms/opacity from one smoothed progress value. */
  var narrowPf = window.matchMedia('(max-width:760px)').matches;
  var PF_IDS = ['msb', 'vib', 'cake', 'poca', 'digimi', 'duytan', 'cindy'];
  var pf = $('#pf'), pfStage = $('#pfStage'), pfA = $('#pfA'), pfB = $('#pfB'), pfC = $('#pfC'), pfZ = 0, pfAnim = false, pfGeo = null;
  function pfCase(id){ for (var i = 0; i < CASES.length; i++) if (CASES[i].id === id) return CASES[i]; return null; }
  function renderProof(){
    var vi = lang === 'vi', tiles = PF_IDS.map(pfCase).filter(Boolean).map(function(c){
      var m = (c.meta || '').split(' · ').filter(function(x){ return x !== 'OTHER PROJECT'; }).slice(0, 2).join(' · ');
      return '<a class="pz-t" href="#case-' + c.id + '"><span class="pz-m">' + esc(m) + '</span><b>' + esc(c.brand) + '</b><span class="pz-tl">' + esc(L(c.t)) + '</span></a>';
    });
    tiles.splice(4, 0, '<div class="pz-core" id="pfCore"><span class="pz-m">LV.3 · ' + (vi ? 'Năng lực' : 'Capabilities') + '</span><b>' + (vi ? 'Xinh chạy gì,<br>gánh tới đâu' : 'What I run,<br>how far I take it') + '</b></div>');
    tiles.push('<div class="pz-t pz-more"><b>+13</b><span class="pz-tl">' + (vi ? 'thương hiệu khác trong portfolio' : 'more brands in the portfolio') + '</span></div>');
    $('#pfGrid').innerHTML = tiles.join('');
    /* inside the tile: the nine capabilities on their own, not split by brand (Xinh: every one is a strength).
       What I run = four glossy cards; how far I take it = one chrome rail from pitch to sign-off. */
    var cards = skCards(true), rail = skRail();
    pfC.innerHTML = '<div class="wrap pz-cin sk">' +
      '<p class="sk-k">LV.3 · ' + (vi ? 'Năng lực' : 'Capabilities') + '</p>' +
      '<h3 class="sk-h">' + (vi ? 'Xinh chạy gì, <em>gánh tới đâu.</em>' : 'What I run, <em>how far I take it.</em>') + '</h3>' +
      '<p class="sk-g">' + (vi ? 'Xinh chạy gì' : 'What I run') + '</p><div class="sk-cards">' + cards + '</div>' +
      '<p class="sk-g">' + (vi ? 'Xinh gánh tới đâu · từ pitch đến nghiệm thu' : 'How far I take it · from pitch to sign-off') + '</p><ol class="sk-rail">' + rail + '</ol>' +
      '<p class="sk-f"><a class="more-link" href="#profile">' + (vi ? 'Thêm về Xinh' : 'More about Xinh') + ' →</a></p></div>';
    pfGeo = null; drawProof(true);
  }
  function pfMeasure(){
    var st = pfStage.getBoundingClientRect(), keepA = pfA.style.transform, keepB = pfB.style.transform;
    pfA.style.transform = 'none'; pfB.style.transform = 'none';
    var z = $('#pf0').getBoundingClientRect(), core = $('#pfCore').getBoundingClientRect();
    pfGeo = {W: st.width, H: st.height,
      ax: z.left + z.width / 2 - st.left, ay: z.top + z.height / 2 - st.top,
      bx: core.left + core.width / 2 - st.left, by: core.top + core.height / 2 - st.top,
      fill: Math.max(st.width / core.width, st.height / core.height) * 1.08};
    pfA.style.transform = keepA; pfB.style.transform = keepB;
  }
  function pfFrame(){ pfAnim = false; drawProof(); }
  function drawProof(force){
    if (!pf || (curView !== 'story' && !force)) return;
    if (reduce){ pf.classList.add('still'); return; }
    var r = pf.getBoundingClientRect(), vh = window.innerHeight;
    if (!force && (r.bottom < -50 || r.top > vh + 50)) return;
    if (!pfGeo || force) pfMeasure();
    var target = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
    pfZ += (target - pfZ) * (force ? 1 : 0.12);
    if (Math.abs(target - pfZ) < 0.0004) pfZ = target; else if (!pfAnim){ pfAnim = true; requestAnimationFrame(pfFrame); }
    var g = pfGeo, k1 = clamp(pfZ / 0.34, 0, 1), k2 = clamp((pfZ - 0.56) / 0.3, 0, 1);
    /* 1 · through the 0 */
    var sA = Math.min(Math.pow(70, k1 * k1), narrowPf ? 24 : 70);
    pfA.style.transformOrigin = g.ax.toFixed(1) + 'px ' + g.ay.toFixed(1) + 'px';
    pfA.style.transform = 'scale(' + sA.toFixed(3) + ')';
    pfA.style.opacity = (1 - clamp((k1 - 0.55) / 0.3, 0, 1)).toFixed(3);
    pfA.style.visibility = k1 >= 0.86 ? 'hidden' : '';
    $$('.pz-cap,.pf-yr', pfA).forEach(function(el){ el.style.opacity = (1 - clamp(k1 / 0.3, 0, 1)).toFixed(3); });
    /* 2 · the wall: grows in behind the 0, drifts, then dives into the centre tile */
    var drift = clamp((pfZ - 0.34) / 0.22, 0, 1);
    var sB = k2 > 0 ? 1.04 * Math.pow(g.fill / 1.04, sm(k2) * 0.35 + k2 * k2 * 0.65) : (0.55 + 0.45 * sm(k1)) * (1 + drift * 0.04);
    pfB.style.transformOrigin = g.bx.toFixed(1) + 'px ' + g.by.toFixed(1) + 'px';
    pfB.style.transform = 'scale(' + sB.toFixed(4) + ')';
    pfB.style.opacity = clamp((k1 - 0.42) / 0.38, 0, 1).toFixed(3);
    pfB.style.visibility = k2 >= 1 ? 'hidden' : '';
    pfStage.style.setProperty('--k2', k2.toFixed(3));
    /* 3 · inside the tile */
    var kc = clamp((k2 - 0.72) / 0.28, 0, 1);
    pfC.style.opacity = kc.toFixed(3);
    pfC.style.transform = 'scale(' + (0.94 + 0.06 * sm(kc)).toFixed(4) + ')';
    pfC.style.pointerEvents = kc > 0.9 ? 'auto' : 'none';
    pfC.style.setProperty('--out', clamp((pfZ - 0.9) / 0.1, 0, 1).toFixed(3));
    pf.setAttribute('data-beat', k2 >= 1 ? 3 : k1 >= 1 ? 2 : 1);
  }
  onScrollFrame(drawProof);
  window.addEventListener('resize', function(){ pfGeo = null; drawProof(true); });

  /* LV.5 · what you get, as one pinned scene (ref: a statement on a sky bloom, ticket cards fly
     up and land, then the page pulls back into an OS window). The promise is the strip that ties
     both tickets together. JS only feeds four smoothed phases: --a statement, --b tickets,
     --c promise, --d pull-back. */
  var vx = $('#vx'), vxP = 0, vxAnim = false;
  function vxFrame(){ vxAnim = false; drawValue(); }
  function drawValue(force){
    if (!vx || (curView !== 'story' && !force)) return;
    if (reduce){ vx.classList.add('still'); ['--a','--b','--c','--d'].forEach(function(k){ vx.style.setProperty(k, k === '--d' ? 0 : 1); }); return; }
    var r = vx.getBoundingClientRect(), vh = window.innerHeight;
    if (!force && (r.bottom < -50 || r.top > vh + 50)) return;
    var target = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
    vxP += (target - vxP) * (force ? 1 : 0.13);
    if (Math.abs(target - vxP) < 0.0004) vxP = target; else if (!vxAnim){ vxAnim = true; requestAnimationFrame(vxFrame); }
    var ph = function(a, b){ return sm((vxP - a) / (b - a)).toFixed(4); };
    vx.style.setProperty('--a', ph(-0.02, 0.16));
    vx.style.setProperty('--b', ph(0.16, 0.46));
    vx.style.setProperty('--b2', ph(0.22, 0.52));
    vx.style.setProperty('--c', ph(0.5, 0.7));
    vx.style.setProperty('--d', ph(0.78, 0.96));
  }
  onScrollFrame(drawValue);
  window.addEventListener('resize', function(){ drawValue(true); });
  drawValue(true);

  /* One atmosphere for the whole story (ref: neutomni — colours change but always blend).
     The story sections are transparent; a fixed layer behind them mixes each section's palette
     into the next as the viewport centre crosses from one to the other. [base, glow left, glow right] */
  var ATMO = [
    ['start',     ['#f3eee6', '#ffdcea', '#dfe9f6']],
    ['brief',     ['#f4eef2', '#ffc8df', '#d9d1f5']],
    ['clarify',   ['#f3eee6', '#ffe0ec', '#e8e2f4']],
    ['structure', ['#f3eee6', '#ffd3e6', '#e3dcf5']],
    ['align',     ['#ecebf0', '#f7d0e2', '#dde3f0']],
    ['deliver',   ['#d6e6f7', '#9cc6f0', '#f7d4e5']],
    ['value',     ['#eef0f8', '#ffd9e8', '#d6e3f6']],
    ['finish',    ['#f6dde8', '#ffbfd8', '#cfc6f2']]
  ].map(function(a){ return {el: document.getElementById(a[0]), c: a[1].map(function(h){ return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; })}; }).filter(function(a){ return a.el; });
  var atmoKey = '';
  function mixC(a, b, k){ return 'rgb(' + [0,1,2].map(function(i){ return Math.round(a[i] + (b[i] - a[i]) * k); }).join(',') + ')'; }
  var atmoEl = null;
  function drawAtmo(){
    if (curView !== 'story' || !ATMO.length) return;
    var yc = window.innerHeight / 2, i = 0, f = 0;
    for (var j = 0; j < ATMO.length; j++){ var r = ATMO[j].el.getBoundingClientRect(); if (r.top <= yc){ i = j; f = clamp((yc - r.top) / Math.max(1, r.height), 0, 1); } }
    var a = ATMO[i].c, b = a, k = 0;
    if (f > 0.75 && ATMO[i + 1]){ b = ATMO[i + 1].c; k = sm((f - 0.75) / 0.25) * 0.5; }
    else if (f < 0.25 && ATMO[i - 1]){ b = ATMO[i - 1].c; k = sm((0.25 - f) / 0.25) * 0.5; }
    var v = [0,1,2].map(function(n){ return mixC(a[n], b[n], k); }), key = v.join();
    if (key === atmoKey) return; atmoKey = key;
    /* set on #atmo itself: a custom property on <html> would restyle the whole document on every scroll */
    var at = atmoEl || (atmoEl = $('#atmo')); if (!at) return;
    at.style.setProperty('--at0', v[0]); at.style.setProperty('--at1', v[1]); at.style.setProperty('--at2', v[2]);
  }
  onScrollFrame(drawAtmo);
  window.addEventListener('resize', function(){ drawAtmo(); });

  /* the nine capabilities on their own (Xinh: every one is a strength, so no split by brand).
     Shared by LV.3 and About me: four glossy cards + one rail from pitch to sign-off. */
  var SK_SPH = ['pearl', 'pink', 'peach', 'lilac'];
  function skCards(link){
    var tag = link ? 'a' : 'div';
    return COLS.filter(function(c){ return c.g === 'type'; }).map(function(col, j){
      var i = colIdx(col.k);
      return '<' + tag + ' class="sk-c"' + (link ? ' href="#skills"' : '') + ' style="--j:' + j + '"><i class="sk-o ' + SK_SPH[j % 4] + '" aria-hidden="true"></i><span class="sk-n">' + ('0' + (i + 1)).slice(-2) + '</span><b>' + esc(L(col.t)) + '</b><span class="sk-d">' + esc(L(col.d)) + '</span></' + tag + '>';
    }).join('');
  }
  function skRail(){
    return COLS.filter(function(c){ return c.g === 'own'; }).map(function(col, j){
      var i = colIdx(col.k);
      return '<li class="sk-s" style="--j:' + j + '"><i class="sk-dot" aria-hidden="true"></i><span class="sk-n">' + ('0' + (i + 1)).slice(-2) + '</span><b>' + esc(L(col.t)) + '</b><span class="sk-d">' + esc(L(col.d)) + '</span></li>';
    }).join('');
  }
  function renderMatrix(){
    var vi = lang === 'vi', ci = colIdx(mxSel), col = COLS[ci];
    var item = function(c){ var n = colIdx(c.k) + 1; return '<button class="li" type="button" data-col="' + c.k + '" aria-pressed="' + (c.k === mxSel ? 'true' : 'false') + '"><span class="ix">' + ('0' + n).slice(-2) + '</span>' + esc(L(c.t)) + '<i>→</i></button>'; };
    var list = '<p class="lg">' + (vi ? 'Xinh chạy gì' : 'What I run') + '</p>' + COLS.filter(function(c){ return c.g === 'type'; }).map(item).join('') +
      '<p class="lg">' + (vi ? 'Xinh gánh tới đâu' : 'How far I take it') + '</p>' + COLS.filter(function(c){ return c.g === 'own'; }).map(item).join('');
    var card = '<div class="lsp-card" aria-live="polite"><p class="mono">' + grpName(col) + ' · ' + ('0' + (ci + 1)).slice(-2) + '</p><h3>' + esc(L(col.t)) + '</h3><p class="lsp-d">' + esc(L(col.d)) + '</p>' +
      '<p class="lsp-jd"><b>' + (vi ? 'Dự án liên quan' : 'Related projects') + '</b></p><div class="proof">' + proofChips(ci) + '</div></div>';
    var html = '<div class="lsp"><div class="lsp-list">' + list + '</div><div class="lsp-stage">' + card + '</div></div>';
    $$('[data-mx]').forEach(function(h){ h.innerHTML = html; });
    var g = $('#skGrid'), vi = lang === 'vi';
    if (g) g.innerHTML = '<p class="sk-g">' + (vi ? 'Xinh chạy gì' : 'What I run') + '</p><div class="sk-cards">' + skCards(false) + '</div>' +
      '<p class="sk-g">' + (vi ? 'Xinh gánh tới đâu · từ pitch đến nghiệm thu' : 'How far I take it · from pitch to sign-off') + '</p><ol class="sk-rail">' + skRail() + '</ol>';
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
    ['#ctStatus', '#cnStatus'].forEach(function(id){ var el = $(id); if (!el) return; el.className = 'status' + (s.on ? '' : ' off'); el.innerHTML = statusHTML(); });
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
    $('#goalCv').innerHTML = cvBtn;
    $('#whoOpts').innerHTML = WHO.map(function(w, i){ return '<button class="chip" type="button" data-who="' + i + '" aria-pressed="' + (i === whoIdx ? 'true' : 'false') + '">' + esc(L(w.t)) + '</button>'; }).join('');
    var w = WHO[whoIdx];
    $('#tpl').innerHTML = '“' + esc(L(w.msg)) + '”<span class="rec2">' + esc(L(w.rec)) + '</span><div style="margin-top:10px"><button class="chip" type="button" data-copy="' + esc(L(w.msg)) + '" data-m="template">' + (lang === 'vi' ? 'Sao chép tin nhắn mẫu' : 'Copy this message') + '</button></div>';
    $('#goalMethods').innerHTML = ms.filter(function(m){ return m.v && m.href; }).map(function(m){ return '<a class="ch" href="' + esc(m.href) + '"' + (m.href.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + ' data-m="' + m.k + '"><span class="ch-ic"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="#' + m.ic + '"/></svg></span><b>' + esc(L(m.t)) + '</b><small>' + esc(m.v) + '</small><i aria-hidden="true">↗</i></a>'; }).join('');
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
    ['#jobSheet'].forEach(function(q){ var x = $(q); if (x) x.hidden = true; });
    var gal = c.imgs.slice(1).map(function(n){ return ph(n, lang === 'vi' ? 'CHỖ ĐẶT ẢNH' : 'IMAGE SLOT'); }).join('');
    var vi = lang === 'vi', facts = [];
    if (c.period) facts.push('<div><span>' + (vi ? 'Thời gian' : 'When') + '</span><b>' + esc(c.period) + '</b></div>');
    c.scope.forEach(function(x){ facts.push('<div><span>' + (vi ? 'Quy mô' : 'Scope') + '</span><b>' + esc(x) + '</b></div>'); });
    var needs = (!c.role ? need(vi ? 'vai trò' : 'your title') : '') + (!c.period ? need(vi ? 'thời gian' : 'period') : '') + (!c.scope.length ? need(vi ? 'quy mô: team, ngân sách, số deliverable' : 'scope: team, budget, deliverables') : '');
    var factsHTML = (facts.length || needs) ? '<div class="facts">' + facts.join('') + needs + '</div>' : '';
    /* Shared case format: context · role · contribution (mine, then the team's) · outcome */
    var k = 0, ci = CORE.indexOf(c);
    function blk(lbl, body, cls){ k++; var n = ('0' + k).slice(-2) + ' · '; return '<div class="blk' + (cls || '') + '"><h4>' + both({en:n + lbl.en, vi:n + lbl.vi}) + '</h4>' + body + '</div>'; }
    var sw = c.sw ? [{en:c.sw[0].lbl, vi:c.sw[0].lbl}, {en:c.sw[1].lbl, vi:c.sw[1].lbl}] : [{en:'Contribution', vi:'Đóng góp'}, {en:'Team contribution', vi:'Phần của team'}];
    var cols = (c.ask ? blk({en:'Context', vi:'Bối cảnh'}, '<p>' + both(c.ask) + '</p>') : '') +
      (c.role ? blk({en:'Role', vi:'Vai trò'}, '<p>' + both(typeof c.role === 'string' ? {en:c.role, vi:c.role} : c.role) + '</p>') : '') +
      blk(sw[0], '<p>' + both(c.me) + '</p>') +
      (c.team ? blk(sw[1], '<p>' + both(c.team) + '</p>', ' team') : '') +
      (c.journey ? '<div class="blk"><h4>' + both({en:'Projects', vi:'Dự án'}) + '</h4><div class="mrow" style="margin-top:8px">' + c.journey.map(function(j){ return '<span class="chip" style="background:transparent;color:#fff;border-color:#fff">' + esc(j) + '</span>'; }).join('') + '</div></div>' : '') +
      (c.out ? blk({en:'Outcome', vi:'Kết quả'}, '<p>' + both(c.out) + '</p>') : '') +
      (c.lesson ? blk({en:'Lesson', vi:'Bài học'}, '<p>' + both(c.lesson) + '</p>') : '');
    $('#caseIn').innerHTML = '<div class="sheet-bar"><span class="tag"><b>' + esc(c.brand) + '</b>' + (ci > -1 ? 'CASE ' + (ci + 1) + '/' + CORE.length : (vi ? 'DỰ ÁN KHÁC' : 'OTHER PROJECT')) + '</span><button class="x" type="button" data-close aria-label="Close">×</button></div>' +
      '<h2 id="csTitle">' + both(c.title || c.t) + '</h2><div class="meta"><span>' + esc(c.meta) + '</span>' + c.subs.map(function(s){ return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
      factsHTML + '<div class="gal-hero' + (IMAGES[c.imgs[0]] ? '' : ' slim') + '">' + cover(c) + '</div>' + (gal ? '<div class="gal">' + gal + '</div>' : '') +
      '<div class="story-cols">' + cols + '</div>' + resHTML(c.res) + (c.src ? '<p class="src" style="margin-top:8px">' + c.src + '</p>' : '') +
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
  var VIEWS = ['story', 'profile', 'work', 'contact', 'report'];
  var curView = null, isOwner = false, runtimeHere = !!(window.claude && window.claude.use);
  var WIPE = {story:'story', work:'work', profile:'profile', contact:'say hi', report:'console'};
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
    /* v15g: Quick view folded into Profile, Skills is a section of Profile */
    if (h === 'desk') return {view:'profile'};
    if (h === 'skills') return {view:'profile', anchor:'pfSkills'};
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
  /* LV.0 · the brief as one search. When the section pins, the question types itself into the bar
     (by time, so it reads at a steady pace), the results drop down with the top hit still
     "searching", scroll ticks the five starting points one at a time, and once all five are
     ticked the top hit resolves to Xinh, with her answer. Tapping a row ticks it. */
  var tzCount = $('#tzCount'), tz = $('#brief'), bfAskT = $('#bfAskT'), bfRows = $$('#brief .sp-row');
  var BF_Q = {en:'A goal. A budget. But where do you start?', vi:'Có mục tiêu. Có ngân sách. Nhưng bắt đầu từ đâu?'};
  var bfFix = [0,0,0,0,0], bfOk = [0,0,0,0,0], briefAnim = false, lastT = -1, tangleVis = true, bfTxt = '';
  var bfTypeAt = 0, bfListAt = 0, bfTickAt = 0;
  bfRows.forEach(function(el){ el.addEventListener('click', function(){ bfFix[+el.dataset.r] = 1; schedule(); }); });
  function drawTangle(){
    var r = tz.getBoundingClientRect(), vh = window.innerHeight;
    if (r.top > vh && bfTypeAt && !reduce){ bfTypeAt = bfListAt = 0; bfOk = [0,0,0,0,0]; }
    tangleVis = r.bottom > 0 && r.top < vh;
    if (!tangleVis && lastT >= 0 && !briefAnim) return;
    var t = reduce ? 1 : clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
    var now = performance.now(), q = BF_Q[lang], i;
    lastT = t; briefAnim = false;
    if (!bfTypeAt && (reduce || r.top < vh * 0.45)) bfTypeAt = now;
    var n = !bfTypeAt ? 0 : reduce ? q.length : Math.min(q.length, Math.floor((now - bfTypeAt) / 34));
    if (bfTypeAt && n < q.length) briefAnim = true;
    var typed = q.slice(0, n);
    if (typed !== bfTxt){ bfTxt = typed; bfAskT.textContent = typed; }
    if (n >= q.length && !bfListAt) bfListAt = now + (reduce ? 0 : 280);
    var listed = (bfListAt && now >= bfListAt) || bfFix.some(Boolean);
    if (bfListAt && now < bfListAt) briefAnim = true;
    /* scroll says how many should be ticked; they land one at a time so the list never jumps */
    for (i = 0; i < 5; i++){
      var want = !!bfFix[i] || (listed && t > 0.3 + i * 0.1);
      if (!want){ bfOk[i] = 0; continue; }
      if (bfOk[i]) continue;
      if (reduce || (now - bfTickAt >= 170 && now - bfListAt >= 450)){ bfOk[i] = 1; bfTickAt = now; }
      else briefAnim = true;
      break;
    }
    var open = 0;
    bfRows.forEach(function(el, j){ el.classList.toggle('ok', !!bfOk[j]); if (!bfOk[j]) open++; });
    var cl = !open && (t > 0.8 || bfFix.every(Boolean));
    if (cl && !reduce && now - bfTickAt < 380){ cl = false; briefAnim = true; }
    tz.classList.toggle('listed', !!listed); tz.classList.toggle('clear', cl);
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
  }
  var raf = 0, animating = false;
  function schedule(){ if (!raf) raf = requestAnimationFrame(frame); }
  function frame(now){
    raf = 0;
    if (curView !== 'story') return;
    drawTangle();
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
    if (animating || briefAnim) schedule();
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
  var VIEW_LBL = {story:'Story', desk:'Quick', work:'Work', profile:'About me', skills:'Skills', contact:'Contact', report:'Report'};
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
  /* Boot playground (v20, ref millascope): a 3D head that turns toward the pointer, objects at
     different depths around it, the wordmark tilting with them. Clicking the head flips it to
     Xinh's other face; clicking an object makes it bounce. */
  var X3_FACES = [{color:'assets/xinh-3d-hi.webp', depth:'assets/xinh-3d-hi-d.webp', say:{en:'hi hi!', vi:'hi hi!'}},
                  {color:'assets/xinh-3d-work.webp', depth:'assets/xinh-3d-work-d.webp', say:{en:'on it!', vi:'để Xinh lo!'}}];
  var x3 = $('#x3'), x3Head = $('#x3Head'), x3Face = 0, head3d = null;
  if (!reduce){
    head3d = mountHead3D($('#x3Cv'), X3_FACES, function(){ x3Head.classList.add('gl'); });
  }
  function x3Aim(nx, ny){
    x3.style.setProperty('--mx', nx.toFixed(3)); x3.style.setProperty('--my', ny.toFixed(3));
    if (head3d) head3d.aim(nx, ny);
  }
  bootEl.addEventListener('pointermove', function(e){
    if (reduce) return;
    var r = x3Head.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * .42;
    x3Aim((e.clientX - cx) / (window.innerWidth * .42), (e.clientY - cy) / (window.innerHeight * .5));
  }, {passive:true});
  bootEl.addEventListener('pointerleave', function(){ x3Aim(0, 0); });
  /* touch screens: the head looks around on its own until touched */
  if (!reduce && !finePointer){
    var x3t0 = performance.now();
    (function idle(t){ if (bootEl.hidden) return; var k = (t - x3t0) / 1000; x3Aim(Math.sin(k * .7) * .55, Math.sin(k * .45) * .25); setTimeout(function(){ requestAnimationFrame(idle); }, 40); })(x3t0);
  }
  bootEl.addEventListener('click', function(e){
    var ob = e.target.closest('.x3o');
    if (ob){ ob.classList.remove('hit'); void ob.offsetWidth; ob.classList.add('hit'); return; }
    if (!e.target.closest('#x3Head')) return;
    x3Face = (x3Face + 1) % X3_FACES.length;
    var say = $('#x3Say'); say.textContent = X3_FACES[x3Face].say[lang === 'vi' ? 'vi' : 'en'];
    x3Head.classList.remove('flip', 'said'); void x3Head.offsetWidth; x3Head.classList.add('flip', 'said');
    setTimeout(function(){ if (head3d) head3d.show(x3Face); $('.x3-img', x3Head).src = X3_FACES[x3Face].color; }, reduce ? 0 : 260);
  });

  function chooseMode(m){
    if (booted) return; booted = true;
    try{ localStorage.setItem('xinhos-mode', m); }catch(e){}
    track('mode', m);
    document.body.classList.remove('booting');
    if (m === 'quick'){ location.hash = 'profile'; }
    else { if (curView !== 'story') location.hash = 'story'; window.scrollTo(0, 0); setTimeout(smartStart, 1400); }
    if (bootClouds(m)) return;
    var fl = $('#flash'); fl.classList.remove('on'); void fl.offsetWidth; if (!reduce) fl.classList.add('on');
    bootEl.classList.add('out');
    setTimeout(function(){ bootEl.hidden = true; rebuild(); }, reduce ? 0 : 800);
  }
  /* leaving the open screen (v20): the objects scatter, Xinh sinks into her cloud, and a bank of
     clouds rises over the whole screen; behind it the page is swapped in, then the clouds keep rising
     and the new page arrives underneath, as if flying up through the sky into the site. */
  function bootClouds(m){
    var cw = $('#cloudWipe');
    if (reduce || !cw) return false;
    bootEl.classList.add('leave');
    cw.hidden = false; cw.classList.remove('go'); void cw.offsetWidth; cw.classList.add('go');
    setTimeout(function(){
      bootEl.hidden = true; bootEl.classList.remove('leave'); rebuild();
      document.body.classList.add('arrive'); if (m === 'quick') document.body.classList.add('arr-q');
    }, 760);
    setTimeout(function(){ cw.classList.remove('go'); cw.hidden = true; document.body.classList.remove('arrive', 'arr-q'); }, 2300);
    return true;
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
  function renderAll(){ if (typeof renderFan === 'function') renderFan(); renderRoles(); renderSteps(); renderMatrix(); renderProof(); renderStoryCases(); setupStops(); renderWork(); renderContact(); renderSquad(); renderSaved(); if (!quizEl.hidden) renderQuiz(); if (curView === 'report') renderReport(); hydrateImgs(); drawAtmo(); }
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
  setInterval(function(){ tickClock(); if (curView === 'contact' || !$('#connectSheet').hidden) { ['#ctStatus', '#cnStatus'].forEach(function(id){ var s = hcmStatus(), el = $(id); if (!el) return; el.className = 'status' + (s.on ? '' : ' off'); el.innerHTML = statusHTML(); }); } }, 30000);

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
