/**
 * A2Z Media - High-End Digital Experience Engine
 * Three.js 3D WebGL Visualization, 3D Gyro Tilt, PWA Integration, Bilingual Engine
 */

(function () {
  'use strict';

  // State Management
  const AppState = {
    lang: localStorage.getItem('a2z_lang') || 'ar',
    theme: localStorage.getItem('a2z_theme') || 'dark',
    soundEnabled: localStorage.getItem('a2z_sound') !== 'false',
    deferredInstallPrompt: null,
    audioCtx: null
  };

  // i18n Translations Dictionary
  const I18N = {
    ar: {
      site_title: "A2Z | إدارة المنصات الرقمية وصناعة الصورة الذهنية",
      badge_header: "حلول إعلامية واقتصادية",
      nav_home: "الرئيسية",
      nav_methodology: "المنهجية",
      nav_platforms: "منظومة المنصات",
      nav_simulator: "محاكي الأثر",
      nav_cases: "قصص النجاح",
      nav_faq: "الأسئلة الشائعة",
      nav_contact: "ابدأ تأثيرك",
      install_app: "تثبيت التطبيق 📲",
      
      hero_badge: "وكالة إعلامية استراتيجية متكاملة | المملكة العربية السعودية",
      hero_title_1: "إدارة المنصات الرقمية",
      hero_title_2: "بمنهجية تصنع الأثر",
      hero_title_3: "وترسّخ الصورة الذهنية",
      
      statement_tag: "الرسالة الاستراتيجية للخدمة",
      statement_body: "ندير المنصات الرقمية وفق منهجية ترتكز على بناء الحضور وتعزيز التفاعل عبر محتوى وتواصل يعكسان هوية الجهة ويسهمان في تعزيز الصورة الذهنية بشكل أكثر رسوخاً.",
      
      hero_cta_explore: "استكشف المنهجية التفاعلية",
      hero_cta_sim: "محاكي الأثر وصناعة الهوية",
      
      stat_clients: "عميل استراتيجي",
      stat_projects: "مشروع إعلامي نوعي",
      stat_consistency: "مؤشر اتساق الهوية",
      stat_growth: "متوسط نمو التفاعل الحي",
      
      card_float_1_title: "مصفوفة النبرة المؤسسية",
      card_float_1_desc: "حوكمة الخطاب الرقمي وفق هوية الجهة",
      card_float_2_title: "رصد وتفاعل لحظي",
      card_float_2_desc: "تحليل المشاعر وبناء مجتمعات حية",
      card_float_3_title: "صياغة المحتوى الاقتصادي",
      card_float_3_desc: "تبسيط الأثر وصناعة القناعة",
      
      methodology_tag: "منهجية A2Z الحصرية",
      methodology_title: "أربع ركائز استراتيجية لتحويل المنصات إلى أصول ذات قيمة",
      methodology_subtitle: "لا نكتفي بجدولة المنشورات؛ بل نؤسس منظومة اتصال متكاملة تعكس ثقل الجهة وتضمن رسوخ مكانتها في السوق السعودي والإقليمي.",
      
      p1_num: "01",
      p1_title: "تفكيك الهوية والترميز المؤسسي",
      p1_desc: "دراسة عميقة لجذور الجهة، أهدافها الاستراتيجية، ومحدداتها التنظيمية لصياغة نبرة خطاب متفردة تعبر عن جوهرها الحقيقي وتمنحها هيبة لا تشبه سواها.",
      p1_f1: "تدقيق شامل للأصول الرقمية والانطباعات السابقة",
      p1_f2: "صياغة دليل النبرة الصوتية (Tone of Voice Manual)",
      p1_f3: "تحديد ركائز المحتوى ومصفوفة الرسائل الجوهرية",
      
      p2_num: "02",
      p2_title: "هندسة الحضور متعدد القنوات",
      p2_desc: "تصميم حضور رقمي متزن ومستدام يتجاوز مجرد النشر الروتيني، ليتمركز بذكاء على المنصات الأكثر تأثيراً في صناع القرار والمجتمع المستهدف.",
      p2_f1: "توزيع مخصص للمحتوى عبر X، لينكد إن، وبودكاست A2Z",
      p2_f2: "مواءمة المحتوى الاقتصادي والبيانات التفاعلية",
      p2_f3: "توقيت استراتيجي مدفوع بسلوك وتحركات الجمهور",
      
      p3_num: "03",
      p3_title: "محرك التفاعل وبناء المجتمعات الحية",
      p3_desc: "تحويل المتابعين السلبيين إلى مجتمعات متفاعلة وسفراء للعلامة، عبر حوارات هادفة وتفاعل فوري يعزز مشاعر الانتماء والموثوقية.",
      p3_f1: "إدارة التفاعل والردود الحية على مدار الساعة",
      p3_f2: "مواكبة استباقية للمستجدات والترندات الوطنية الهادفة",
      p3_f3: "إدارة مساحات النقاش وغرف الحوار الاقتصادي",
      
      p4_num: "04",
      p4_title: "ترسيخ الصورة الذهنية وقياس الأثر",
      p4_desc: "رصد مستمر لتحولات الرأي العام وانطباعات المستفيدين للتأكد من أن ما يُبث عبر المنصات يترسخ كصورة ذهنية ثابتة تعزز القيمة السوقية والمكانة المؤسسية.",
      p4_f1: "تحليل ذكي للمشاعر والانطباعات (Sentiment Analysis)",
      p4_f2: "مؤشر دوري لدرجة اتساق الهوية عبر كافة القنوات",
      p4_f3: "تقارير أثر تنفيذية تدعم اتخاذ القرارات العليا",
      
      eco_tag: "تكامل المنظومة",
      eco_title: "كيف ننقل هويتكم عبر كل نافذة رقمية؟",
      eco_subtitle: "تطبيق عملي للمنهجية: لكل منصة لغتها وجمهورها، ولكن الهوية واحدة لا تتجزأ.",
      
      sim_tag: "محاكي الأثر الرقمي",
      sim_title: "احسب النقلة النوعية في حضورك وتفاعلك",
      sim_subtitle: "قارن بين نتائج الإدارة التقليدية العشوائية وبين منهجية A2Z الممنهجة لبناء الصورة الذهنية.",
      
      faq_tag: "إجابات الخبراء",
      faq_title: "الأسئلة الشائعة حول منهجية إدارة المنصات",
      faq_subtitle: "كل ما يهمك معرفته حول كيف نصنع الفارق للجهات الكبرى.",
      
      contact_tag: "ابدأ تأثيرك اليوم",
      contact_title: "جاهزون لقيادة حضوركم الرقمي نحو آفاق جديدة؟",
      contact_subtitle: "تواصل مع مستشارينا للحصول على تدقيق رقمي أولي مجاني لهويتكم ومنصاتكم الحالية.",
      
      btn_send_consultation: "إرسال طلب الاستشارة الاستراتيجية",
      btn_whatsapp: "محادثة فورية عبر واتساب",
      
      dock_home: "الرئيسية",
      dock_method: "المنهجية",
      dock_sim: "المحاكي",
      dock_platforms: "المنصات",
      dock_contact: "تواصل",
      
      pwa_modal_title: "تثبيت تطبيق A2Z Media",
      pwa_modal_desc: "احصل على وصول فوري ومباشر إلى محاكي الأثر، دراسات الحالة، واستشارات الإعلام الاقتصادي كتطبيق مستقل على جهازك.",
      pwa_modal_btn: "تثبيت الآن",
      pwa_modal_cancel: "لاحقاً"
    },
    en: {
      site_title: "A2Z | Digital Platform Management & Mindshare Architecture",
      badge_header: "Economic Media Solutions",
      nav_home: "Home",
      nav_methodology: "Methodology",
      nav_platforms: "Platform Ecosystem",
      nav_simulator: "Impact Simulator",
      nav_cases: "Case Studies",
      nav_faq: "FAQ",
      nav_contact: "Start Impact",
      install_app: "Install App 📲",
      
      hero_badge: "Integrated Strategic Media Agency | Kingdom of Saudi Arabia",
      hero_title_1: "Managing Digital Platforms",
      hero_title_2: "With Impact-Driven Methodology",
      hero_title_3: "To Solidify Mindshare",
      
      statement_tag: "Core Strategic Mission",
      statement_body: "Managing digital platforms using a methodology focused on building presence and boosting engagement through content and communication that reflect the entity's identity and drive a more consistent brand image.",
      
      hero_cta_explore: "Explore 3D Methodology",
      hero_cta_sim: "Digital Presence Simulator",
      
      stat_clients: "Strategic Clients",
      stat_projects: "Signature Media Projects",
      stat_consistency: "Brand Consistency Score",
      stat_growth: "Avg. Engagement Growth",
      
      card_float_1_title: "Corporate Tone Matrix",
      card_float_1_desc: "Governed narrative tailored to entity DNA",
      card_float_2_title: "Real-time Dialogue",
      card_float_2_desc: "Sentiment tracking & community advocacy",
      card_float_3_title: "Economic Content Creation",
      card_float_3_desc: "Transforming complexity into conviction",
      
      methodology_tag: "A2Z Proprietary Framework",
      methodology_title: "Four Strategic Pillars Turning Platforms Into High-Yield Assets",
      methodology_subtitle: "We don't merely schedule posts; we build an institutional communication infrastructure that reflects your authority and cements your market leadership.",
      
      p1_num: "01",
      p1_title: "Identity Decoding & Institutional Encoding",
      p1_desc: "In-depth immersion into your institutional roots, strategic mandate, and regulatory landscape to craft an unmistakable voice representing your authentic truth.",
      p1_f1: "Holistic digital presence & perception audit",
      p1_f2: "Tone of Voice & institutional styleguide formulation",
      p1_f3: "Content pillars & core thematic narrative matrix",
      
      p2_num: "02",
      p2_title: "Omnichannel Presence Engineering",
      p2_desc: "Engineering an authoritative, sustainable presence that transcends routine posting, strategically deploying across key platforms that shape decision-makers.",
      p2_f1: "Segmented distribution across X, LinkedIn & A2Z Podcasts",
      p2_f2: "Economic data storytelling & interactive infomedia",
      p2_f3: "Predictive timing calibrated to stakeholder behavior",
      
      p3_num: "03",
      p3_title: "Engagement Velocity & Community Cultivation",
      p3_desc: "Transforming passive spectators into loyal brand ambassadors through purposeful dialogues and rapid responsiveness that foster institutional trust.",
      p3_f1: "24/7 proactive community engagement & moderated replies",
      p3_f2: "Strategic resonance with high-impact national trends",
      p3_f3: "Executive economic rooms and thought leadership spaces",
      
      p4_num: "04",
      p4_title: "Mindshare Solidification & Perception Analytics",
      p4_desc: "Continuous real-time tracking of public sentiment to ensure digital narratives crystallize into an enduring mental image that enhances organizational brand equity.",
      p4_f1: "AI-powered Arabic sentiment & perception analysis",
      p4_f2: "Cross-channel brand consistency index metrics",
      p4_f3: "C-suite executive reports guiding strategic communications",
      
      eco_tag: "Ecosystem Integration",
      eco_title: "How We Translate Your Identity Across Every Digital Window",
      eco_subtitle: "A practical demonstration: Each channel has its dialect, but your institutional identity remains singular and steadfast.",
      
      sim_tag: "Digital Impact Simulator",
      sim_title: "Calculate Your Transformational Shift in Presence & Engagement",
      sim_subtitle: "Compare traditional fragmented publishing against A2Z's strategic mindshare methodology.",
      
      faq_tag: "Executive Insights",
      faq_title: "Frequently Asked Questions",
      faq_subtitle: "Everything you need to know about our approach to digital platform leadership.",
      
      contact_tag: "Elevate Your Impact",
      contact_title: "Ready to Architect an Enduring Digital Presence?",
      contact_subtitle: "Consult with our senior media strategists for a complimentary initial digital diagnosis of your current platforms.",
      
      btn_send_consultation: "Submit Strategy Consultation Request",
      btn_whatsapp: "Direct WhatsApp Dialogue",
      
      dock_home: "Home",
      dock_method: "Method",
      dock_sim: "Simulator",
      dock_platforms: "Platforms",
      dock_contact: "Contact",
      
      pwa_modal_title: "Install A2Z Media Web App",
      pwa_modal_desc: "Get instant, offline-capable access to our executive simulator, case studies, and media consultation right from your home screen.",
      pwa_modal_btn: "Install Now",
      pwa_modal_cancel: "Later"
    }
  };

  // Mockup Data for Platforms
  const PlatformMockups = {
    x: {
      ar: {
        author: "A2Z للحلول الإعلامية والاقتصادية",
        handle: "@A2Z_MediaSA",
        tag: "المنهجية: حضور استباقي وموثوق",
        text: "وفق رؤية المملكة 2030؛ لم تعد إدارة المنصات الرقمية مجرد نشر عشوائي للأخبار، بل هي منهجية قيادية ترتكز على بناء الحضور، تعزيز التفاعل الحي، وتوحيد النبرة بما يرسّخ الصورة الذهنية الأكثر ثقة وموثوقية في السوق الاقتصادي. 📊✨",
        metrics: { retweets: "1.4K", quotes: "389", likes: "4.8K", views: "128K" }
      },
      en: {
        author: "A2Z Economic Media Solutions",
        handle: "@A2Z_MediaSA",
        tag: "Methodology: Authoritative Presence",
        text: "Under Saudi Vision 2030, digital platform management has evolved beyond vanity posts into a strategic discipline. Our methodology harmonizes institutional identity, ignites meaningful engagement, and anchors a prestigious mental image in the financial market. 📊✨",
        metrics: { retweets: "1.4K", quotes: "389", likes: "4.8K", views: "128K" }
      }
    },
    linkedin: {
      ar: {
        author: "A2Z Media & Communications",
        handle: "14,800 متابع • ريادة الفكر الاقتصادي",
        tag: "المنهجية: ريادة فكرية واستقطاب شركاء",
        text: "كيف تتحول هوية الجهة من مجرد شعار بصري إلى صورة ذهنية راسخة تقود قرارات الشركاء والمستثمرين؟\n\nنستعرض في هذا التحليل الميداني كيف مكنت منهجية A2Z كبرى الهيئات والمؤسسات المالية من رفع معدل التفاعل النوعي بنسبة 340% عبر صياغة محتوى اقتصادي متخصص يخاطب العقول ويعزز الثقة طويلة الأمد.",
        metrics: { retweets: "924", quotes: "142", likes: "3.2K", views: "64K" }
      },
      en: {
        author: "A2Z Media & Communications",
        handle: "14,800 followers • Thought Leadership",
        tag: "Methodology: Thought Leadership & Investor Trust",
        text: "How does an institutional identity evolve from a graphic badge into an enduring mindshare anchor that steers partner and investor decisions?\n\nIn this field analysis, discover how A2Z's methodology empowered premier Saudi economic entities to achieve a +340% surge in high-value engagement through rigorous economic storytelling and unified communication tone.",
        metrics: { retweets: "924", quotes: "142", likes: "3.2K", views: "64K" }
      }
    },
    instagram: {
      ar: {
        author: "a2z.media | إعلام واقتصاد",
        handle: "الرياض، المملكة العربية السعودية",
        tag: "المنهجية: سرد بصري وتجربة علامة متسقة",
        text: "الصورة الذهنية لا تُبنى بكلمات عابرة، بل بتناغم بصري ولغوي يعكس هيبة الكيان وطموحه. في كل تغطية، تقرير، وإنفوجرافيك اقتصادي، نحرص أن تتحدث كل تفصيلة بلغة هويتكم الأصيلة.",
        metrics: { retweets: "680", quotes: "94", likes: "6.1K", views: "98K" }
      },
      en: {
        author: "a2z.media | Economic Media",
        handle: "Riyadh, Saudi Arabia",
        tag: "Methodology: Visual Storytelling & Cohesive Experience",
        text: "Mindshare is not formed by transient posts, but by visual and narrative harmony that personifies institutional stature. Every infographic, high-end motion reel, and economic coverage is meticulously engineered to radiate your brand's true identity.",
        metrics: { retweets: "680", quotes: "94", likes: "6.1K", views: "98K" }
      }
    },
    podcast: {
      ar: {
        author: "بودكاست A2Z الاقتصادي",
        handle: "الحلقة 42 • قيادة الصورة الذهنية الرقمية",
        tag: "المنهجية: صناعة الرأي العام والعمق المعرفي",
        text: "حوار خاص مع قادة الاتصال الاستراتيجي حول: كيف تقود المؤسسات الرأي العام الإيجابي وتهيئ الجمهور للقرارات والمبادرات الكبرى قبل إطلاقها، ودور إدارة المنصات كخط الدفاع الأول عن السمعة المؤسسية.",
        metrics: { retweets: "2.1K", quotes: "480", likes: "8.4K", views: "240K" }
      },
      en: {
        author: "A2Z Economic Podcast",
        handle: "Ep. 42 • Shaping Digital Mindshare",
        tag: "Methodology: Shaping Public Opinion & Knowledge Depth",
        text: "An executive dialogue on how leading institutions cultivate positive public sentiment, prepare audiences for major regulatory milestones, and deploy digital platforms as the foremost line of institutional reputation defense.",
        metrics: { retweets: "2.1K", quotes: "480", likes: "8.4K", views: "240K" }
      }
    }
  };

  // Sound Synthesizer via Web Audio API (No External Audio Files Needed)
  function playUiSound(type = 'click') {
    if (!AppState.soundEnabled) return;
    try {
      if (!AppState.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        AppState.audioCtx = new AudioContext();
      }
      if (AppState.audioCtx.state === 'suspended') {
        AppState.audioCtx.resume();
      }

      const ctx = AppState.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'swoosh') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      }
    } catch (e) {
      // Audio not permitted or supported
    }
  }

  // ==========================================================================
  // Three.js 3D Interactive Brand Nucleus & Platform Orbit Scene
  // ==========================================================================
  function initThreeHeroScene() {
    const canvas = document.getElementById('threejs-hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const parent = canvas.parentElement;
    let width = parent.clientWidth || 500;
    let height = parent.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 9.5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Central Brand Nucleus (Multi-layered Icosahedron + Wireframe)
    const nucleusGroup = new THREE.Group();
    scene.add(nucleusGroup);

    // Inner Core Solid
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x4141af,
      emissive: 0x1e1e62,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: 0.88
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    nucleusGroup.add(coreMesh);

    // Wireframe Glow Layer
    const wireGeo = new THREE.IcosahedronGeometry(1.62, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    nucleusGroup.add(wireMesh);

    // Dynamic Orbital Rings
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    function createOrbitalRing(radius, tubeRadius, color, rotX, rotY) {
      const ringGeo = new THREE.TorusGeometry(radius, tubeRadius, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.45
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    }

    const ring1 = createOrbitalRing(2.9, 0.02, 0x0ea5c9, Math.PI / 3, Math.PI / 6);
    const ring2 = createOrbitalRing(3.6, 0.018, 0x8b5cf6, -Math.PI / 4, Math.PI / 4);
    const ring3 = createOrbitalRing(4.3, 0.015, 0x00f0ff, Math.PI / 2.2, -Math.PI / 8);
    ringsGroup.add(ring1, ring2, ring3);

    // Platform Satellite Nodes
    const satellites = [];
    const platformData = [
      { name: 'X', color: 0x00f0ff, radius: 2.9, speed: 0.8, offset: 0 },
      { name: 'LinkedIn', color: 0x0a66c2, radius: 3.6, speed: 0.6, offset: Math.PI / 3 },
      { name: 'Instagram', color: 0xec4899, radius: 4.3, speed: 0.5, offset: Math.PI * 0.8 },
      { name: 'Podcast', color: 0x8b5cf6, radius: 3.2, speed: 0.7, offset: Math.PI * 1.3 },
      { name: 'YouTube', color: 0xff0000, radius: 4.0, speed: 0.55, offset: Math.PI * 1.7 },
      { name: 'Portal', color: 0x10b981, radius: 3.8, speed: 0.65, offset: Math.PI * 0.4 }
    ];

    platformData.forEach((p) => {
      const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: p.color,
        emissive: p.color,
        emissiveIntensity: 0.6,
        roughness: 0.2
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      satellites.push({
        mesh: nodeMesh,
        radius: p.radius,
        speed: p.speed,
        offset: p.offset,
        color: p.color
      });
      scene.add(nodeMesh);
    });

    // Particle Swarm Cloud
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 1.0);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    // Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    });

    // Resize Handler
    function onResize() {
      width = parent.clientWidth || 500;
      height = parent.clientHeight || 550;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Nucleus subtle rotation & breathing
      nucleusGroup.rotation.y += 0.4 * delta;
      nucleusGroup.rotation.x += 0.2 * delta;
      const breathScale = 1 + Math.sin(elapsedTime * 2.2) * 0.05;
      nucleusGroup.scale.set(breathScale, breathScale, breathScale);

      // Rings Rotation
      ring1.rotation.z += 0.3 * delta;
      ring2.rotation.z -= 0.25 * delta;
      ring3.rotation.z += 0.2 * delta;

      // Camera parallax tilt
      camera.position.x = currentMouseX * 1.8;
      camera.position.y = -currentMouseY * 1.8;
      camera.lookAt(0, 0, 0);

      // Satellite Orbits
      satellites.forEach((sat) => {
        const angle = elapsedTime * sat.speed + sat.offset;
        sat.mesh.position.x = Math.cos(angle) * sat.radius;
        sat.mesh.position.y = Math.sin(angle * 1.3) * (sat.radius * 0.4);
        sat.mesh.position.z = Math.sin(angle) * sat.radius;
      });

      // Particle subtle drift
      particleCloud.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    }

    animate();
  }

  // ==========================================================================
  // 3D Card Gyroscope & Mouse Tilt Physics
  // ==========================================================================
  function initCard3DTilt() {
    const tiltCards = document.querySelectorAll('[data-tilt="true"]');
    if (!tiltCards.length) return;

    tiltCards.forEach((card) => {
      let bounds = null;

      function onMouseEnter() {
        bounds = card.getBoundingClientRect();
      }

      function onMouseMove(e) {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = mouseX / bounds.width;
        const yPct = mouseY / bounds.height;

        const rotateX = ((yPct - 0.5) * -16).toFixed(2);
        const rotateY = ((xPct - 0.5) * 16).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--mouse-x', `${(xPct * 100).toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${(yPct * 100).toFixed(1)}%`);
      }

      function onMouseLeave() {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        bounds = null;
      }

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
    });
  }

  // ==========================================================================
  // Omnichannel Platform Switcher
  // ==========================================================================
  function initPlatformSwitcher() {
    const tabButtons = document.querySelectorAll('.platform-tab-btn');
    const authorEl = document.getElementById('mockup-author');
    const handleEl = document.getElementById('mockup-handle');
    const tagEl = document.getElementById('mockup-tag');
    const bodyEl = document.getElementById('mockup-body-text');
    const metricRt = document.getElementById('metric-rt');
    const metricQuote = document.getElementById('metric-quote');
    const metricLike = document.getElementById('metric-like');
    const metricViews = document.getElementById('metric-views');
    const cardEl = document.querySelector('.live-mockup-card');

    if (!tabButtons.length) return;

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const platform = btn.getAttribute('data-platform');
        if (!platform || !PlatformMockups[platform]) return;

        tabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        playUiSound('swoosh');

        // Animate card transition
        if (cardEl) {
          cardEl.style.opacity = '0.4';
          cardEl.style.transform = 'translateY(10px) scale(0.98)';
        }

        setTimeout(() => {
          const lang = AppState.lang;
          const data = PlatformMockups[platform][lang] || PlatformMockups[platform]['ar'];

          if (authorEl) authorEl.textContent = data.author;
          if (handleEl) handleEl.textContent = data.handle;
          if (tagEl) tagEl.textContent = data.tag;
          if (bodyEl) bodyEl.textContent = data.text;
          if (metricRt) metricRt.textContent = data.metrics.retweets;
          if (metricQuote) metricQuote.textContent = data.metrics.quotes;
          if (metricLike) metricLike.textContent = data.metrics.likes;
          if (metricViews) metricViews.textContent = data.metrics.views;

          if (cardEl) {
            cardEl.style.opacity = '1';
            cardEl.style.transform = 'translateY(0) scale(1)';
          }
        }, 150);
      });
    });
  }

  // ==========================================================================
  // Executive ROI & Mindshare Simulator
  // ==========================================================================
  function initImpactSimulator() {
    const platformCountInput = document.getElementById('sim-platform-count');
    const postingFreqInput = document.getElementById('sim-posting-freq');
    const platformCountVal = document.getElementById('sim-platform-val');
    const postingFreqVal = document.getElementById('sim-freq-val');

    const entityChips = document.querySelectorAll('.sim-chip-btn');

    // Outputs
    const meterConsistency = document.getElementById('meter-consistency');
    const meterEngagement = document.getElementById('meter-engagement');
    const meterRiskShield = document.getElementById('meter-risk-shield');
    const textConsistency = document.getElementById('val-consistency');
    const textEngagement = document.getElementById('val-engagement');
    const textRiskShield = document.getElementById('val-risk-shield');
    const summaryText = document.getElementById('sim-summary-content');

    let currentEntity = 'gov';

    function calculateMetrics() {
      const platforms = parseInt(platformCountInput ? platformCountInput.value : 3, 10);
      const freq = parseInt(postingFreqInput ? postingFreqInput.value : 5, 10);

      if (platformCountVal) platformCountVal.textContent = `${platforms} ${AppState.lang === 'ar' ? 'منصات' : 'Platforms'}`;
      if (postingFreqVal) postingFreqVal.textContent = `${freq}x ${AppState.lang === 'ar' ? 'أسبوعياً' : '/week'}`;

      // Entity Multipliers
      let baseConsistency = 82;
      let baseEngagement = 190;
      let baseShield = 88;

      if (currentEntity === 'gov') {
        baseConsistency += 8;
        baseShield += 8;
      } else if (currentEntity === 'corp') {
        baseConsistency += 10;
        baseEngagement += 60;
      } else if (currentEntity === 'brand') {
        baseEngagement += 120;
      } else if (currentEntity === 'executive') {
        baseConsistency += 12;
        baseShield += 6;
      }

      // Calculation logic
      const consistencyScore = Math.min(99.4, (baseConsistency + (platforms * 1.5) + (freq * 0.8))).toFixed(1);
      const engagementBoost = Math.min(420, (baseEngagement + (platforms * 22) + (freq * 18))).toFixed(0);
      const shieldScore = Math.min(99.8, (baseShield + (platforms * 1.8) + (freq * 0.5))).toFixed(1);

      // Animate progress bars
      if (meterConsistency) meterConsistency.style.width = `${consistencyScore}%`;
      if (meterEngagement) meterEngagement.style.width = `${Math.min(100, engagementBoost / 4)}%`;
      if (meterRiskShield) meterRiskShield.style.width = `${shieldScore}%`;

      if (textConsistency) textConsistency.textContent = `${consistencyScore}%`;
      if (textEngagement) textEngagement.textContent = `+${engagementBoost}%`;
      if (textRiskShield) textRiskShield.textContent = `${shieldScore}%`;

      if (summaryText) {
        if (AppState.lang === 'ar') {
          summaryText.innerHTML = `بناءً على اختيار <strong>${platforms} منصات</strong> بنشاط <strong>${freq} مرات أسبوعياً</strong>، توفر منهجية A2Z قفزة بنسبة <strong>+${engagementBoost}%</strong> في التفاعل الحي مع صناع القرار، مع حماية سمعة مؤسسية بنسبة <strong>${shieldScore}%</strong>، مما يضمن رسوخ الصورة الذهنية للكيان.`;
        } else {
          summaryText.innerHTML = `Based on <strong>${platforms} active platforms</strong> publishing <strong>${freq}x weekly</strong>, A2Z's strategic framework drives a <strong>+${engagementBoost}%</strong> lift in high-value engagement and delivers <strong>${shieldScore}%</strong> reputation shielding.`;
        }
      }
    }

    if (platformCountInput) platformCountInput.addEventListener('input', calculateMetrics);
    if (postingFreqInput) postingFreqInput.addEventListener('input', calculateMetrics);

    entityChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        entityChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        currentEntity = chip.getAttribute('data-entity') || 'gov';
        playUiSound('click');
        calculateMetrics();
      });
    });

    calculateMetrics();
  }

  // ==========================================================================
  // Bilingual i18n Engine
  // ==========================================================================
  function updateLanguage(newLang) {
    AppState.lang = newLang;
    localStorage.setItem('a2z_lang', newLang);
    document.documentElement.lang = newLang;
    document.body.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');

    const dict = I18N[newLang] || I18N['ar'];

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update Language Toggle Button Text
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.textContent = newLang === 'ar' ? 'English' : 'العربية';
    }

    // Refresh Mockups and Simulator
    const activePlatformBtn = document.querySelector('.platform-tab-btn.active');
    if (activePlatformBtn) {
      activePlatformBtn.click();
    }
  }

  function initLanguageSwitcher() {
    const toggleBtn = document.getElementById('btn-lang-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        playUiSound('click');
        const nextLang = AppState.lang === 'ar' ? 'en' : 'ar';
        updateLanguage(nextLang);
      });
    }
    // Set initial
    updateLanguage(AppState.lang);
  }

  // ==========================================================================
  // Theme Switcher (Dark & Light Mode)
  // ==========================================================================
  function initThemeSwitcher() {
    const themeBtn = document.getElementById('btn-theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    function applyTheme(theme) {
      AppState.theme = theme;
      localStorage.setItem('a2z_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);

      if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      }
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        playUiSound('click');
        const nextTheme = AppState.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    applyTheme(AppState.theme);
  }

  // ==========================================================================
  // Audio Mute/Unmute Toggle
  // ==========================================================================
  function initSoundToggle() {
    const soundBtn = document.getElementById('btn-sound-toggle');
    const soundIcon = document.getElementById('sound-icon');

    function updateSoundUi() {
      if (soundIcon) {
        soundIcon.className = AppState.soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      }
    }

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        AppState.soundEnabled = !AppState.soundEnabled;
        localStorage.setItem('a2z_sound', AppState.soundEnabled);
        updateSoundUi();
        if (AppState.soundEnabled) playUiSound('success');
      });
    }
    updateSoundUi();
  }

  // ==========================================================================
  // Progressive Web App (PWA) Controller & Installation Modal
  // ==========================================================================
  function initPwaController() {
    const installButtons = document.querySelectorAll('.btn-install-trigger');
    const modalBackdrop = document.getElementById('pwa-modal');
    const btnModalInstall = document.getElementById('pwa-modal-install-btn');
    const btnModalCancel = document.getElementById('pwa-modal-cancel-btn');
    const iosGuide = document.getElementById('pwa-ios-guide');
    const offlineBanner = document.getElementById('offline-banner');

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }

    // Capture Native Install Prompt (Chromium / Android)
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      AppState.deferredInstallPrompt = e;
      installButtons.forEach((b) => b.classList.add('visible'));
    });

    // Detect if already installed / standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) {
      installButtons.forEach((b) => {
        b.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>مثبت كتطبيق ✓</span>';
        b.style.pointerEvents = 'none';
      });
    }

    // Is iOS Safari check
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    function openModal() {
      playUiSound('click');
      if (modalBackdrop) modalBackdrop.classList.add('open');
      if (isIos && iosGuide) {
        iosGuide.style.display = 'block';
        if (btnModalInstall) btnModalInstall.style.display = 'none';
      }
    }

    function closeModal() {
      if (modalBackdrop) modalBackdrop.classList.remove('open');
    }

    installButtons.forEach((btn) => btn.addEventListener('click', openModal));

    if (btnModalCancel) btnModalCancel.addEventListener('click', closeModal);
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
    }

    if (btnModalInstall) {
      btnModalInstall.addEventListener('click', async () => {
        playUiSound('click');
        if (AppState.deferredInstallPrompt) {
          AppState.deferredInstallPrompt.prompt();
          const { outcome } = await AppState.deferredInstallPrompt.userChoice;
          console.log('[PWA] User response to install:', outcome);
          AppState.deferredInstallPrompt = null;
          closeModal();
        } else {
          // If native prompt not available, explain addition
          alert(AppState.lang === 'ar' ? 'يمكنك تثبيت الموقع كتطبيق من خلال خيارات المتصفح (تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية)' : 'You can install this app from your browser menu ("Install app" or "Add to Home Screen").');
          closeModal();
        }
      });
    }

    // Offline / Online Detection
    function handleConnectionChange() {
      if (offlineBanner) {
        if (!navigator.onLine) {
          offlineBanner.classList.add('active');
        } else {
          offlineBanner.classList.remove('active');
        }
      }
    }
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    handleConnectionChange();
  }

  // ==========================================================================
  // Strategic FAQ Accordion
  // ==========================================================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-question-btn');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        playUiSound('click');

        // Close other items
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ==========================================================================
  // Scroll Progress & Header Scroll Dynamics
  // ==========================================================================
  function initScrollDynamics() {
    const header = document.querySelector('.site-header');
    const progressBar = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? winScroll / height : 0;

      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrolled})`;
      }

      if (header) {
        if (winScroll > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  }

  // ==========================================================================
  // Consultation Form & Direct WhatsApp Link Generator
  // ==========================================================================
  function initConsultationForm() {
    const form = document.getElementById('consultation-form');
    const whatsappBtn = document.getElementById('btn-whatsapp-direct');

    function buildWhatsAppUrl() {
      const name = document.getElementById('contact-name')?.value || '';
      const org = document.getElementById('contact-org')?.value || '';
      const msg = document.getElementById('contact-message')?.value || '';

      const text = AppState.lang === 'ar'
        ? `السلام عليكم، أود حجز استشارة استراتيجية لإدارة المنصات وبناء الصورة الذهنية لدى A2Z.%0Aالاسم: ${encodeURIComponent(name)}%0Aالجهة: ${encodeURIComponent(org)}%0Aتفاصيل الطلب: ${encodeURIComponent(msg)}`
        : `Hello, I would like to request an executive digital presence consultation with A2Z Media.%0AName: ${encodeURIComponent(name)}%0AEntity: ${encodeURIComponent(org)}%0AMessage: ${encodeURIComponent(msg)}`;

      return `https://wa.me/966555000000?text=${text}`;
    }

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        playUiSound('click');
        window.open(buildWhatsAppUrl(), '_blank');
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        playUiSound('success');
        alert(AppState.lang === 'ar' ? 'شكراً لتواصلكم مع A2Z للحلول الإعلامية والاقتصادية. تم استلام طلبكم وسيتواصل معكم أحد مستشارينا خلال ساعتين عمل.' : 'Thank you for reaching out to A2Z Media. Your request has been received, and our senior strategist will contact you within two business hours.');
        form.reset();
      });
    }
  }

  // ==========================================================================
  // Initialization on DOM Ready
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initThreeHeroScene();
    initCard3DTilt();
    initPlatformSwitcher();
    initImpactSimulator();
    initLanguageSwitcher();
    initThemeSwitcher();
    initSoundToggle();
    initPwaController();
    initFaqAccordion();
    initScrollDynamics();
    initConsultationForm();
  });

})();
