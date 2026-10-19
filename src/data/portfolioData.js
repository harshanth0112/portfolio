/**
 * Centralized Portfolio Data for Harshanth R
 */

export const PERSONAL_INFO = {
  name: "HARSHANTH R",
  firstName: "HARSHANTH",
  lastName: "R",
  logo: "HR/",
  heroTags: "AWS Cloud | AI Engineer | Python Full Stack | Computer Vision",
  tagline: "AI & Data Science",
  badge: "AI & DS\nGraduate\n2026",
  heroDescription:
    "Motivated B.Tech graduate in Artificial Intelligence and Data Science with hands-on experience in developing and deploying AI-powered and cloud-native applications.",
  aboutParagraphs: [
    "I'm a motivated B.Tech graduate in Artificial Intelligence and Data Science with hands-on experience in developing and deploying AI-powered and cloud-native applications.",
    "Skilled in Computer Vision, NLP, Multimodal AI, and Python full-stack development, with practical expertise in AWS services including Lambda, S3, and RDS.",
    "Passionate about building scalable, production-ready solutions and contributing to innovative AI and cloud technologies."
  ],
  stats: [
    { target: 20, suffix: "+", label: "Certifications" },
    { target: 5, suffix: "+", label: "Projects" },
    { target: 4, suffix: "+", label: "Tech Stacks" },
    { target: 2026, suffix: "", label: "Graduated" }
  ],
  contactHeading: "GET IN TOUCH",
  contactSub: "Open to internships, collaborations, and interesting AI projects.",
  phone: "+91 9842584621",
  location: "KRCT · TRICHY",
  footerText: "© 2025 HARSHANTH R · AI & DATA SCIENCE · KRCT · TRICHY",
  avatarImage: "/Picsart_24-09-24_18-37-59-843.jpg"
};

export const SOCIAL_LINKS = {
  linkedin: {
    label: "LinkedIn",
    username: "harshanth0112h",
    url: "https://www.linkedin.com/in/harshanth0112h/"
  },
  github: {
    label: "GitHub",
    username: "harshanth0112",
    url: "https://github.com/harshanth0112"
  },
  huggingface: {
    label: "Hugging Face",
    username: "Harshanth0112",
    url: "https://huggingface.co/Harshanth0112"
  },
  phone: {
    label: "Phone",
    value: "+91 9842584621"
  }
};

export const MARQUEE_ITEMS = [
  "Machine Learning",
  "Computer Vision",
  "Deep Learning",
  "Generative AI",
  "Cloud Computing",
  "Python",
  "NLP",
  "Data Science"
];

export const SKILLS = [
  { category: "Languages", name: "Python, Java, SQL, R" },
  { category: "Full Stack", name: "React, FastAPI, Flask" },
  { category: "Backend", name: "REST APIs, MySQL, PostgreSQL" },
  { category: "AI / ML", name: "PyTorch, TensorFlow, OpenCV" },
  { category: "AI / ML", name: "Hugging Face, YOLO, Transformers" },
  { category: "Cloud", name: "AWS (S3, Lambda, RDS)" },
  { category: "Tools", name: "Git, Roboflow, API Integration" },
  { category: "Deploy", name: "Web Deployment, Serverless" }
];

export const PROJECTS = [
  {
    num: "01",
    title: "Sign Language → Text & Speech",
    description:
      "Computer vision and deep learning system converting hand gestures into text and speech. Integrated Groq API chatbot for interactive conversations.",
    tags: ["Computer Vision", "Deep Learning", "NLP", "Python"],
    githubUrl: "https://github.com/harshanth0112/SEM-6"
  },
  {
    num: "02",
    title: "Edge YOLO Surveillance",
    description:
      "Privacy-preserving real-time surveillance using YOLOv8. Detects weapons and hazards (fire, smoke) locally on edge devices — no cloud uploads.",
    tags: ["YOLOv8", "Edge AI", "Privacy"],
    githubUrl: "https://github.com/harshanth0112/PRIVACY-PRESERVING-AI"
  },
  {
    num: "03",
    title: "Supermarket Sales Analysis",
    description:
      "Flask web app for sales forecasting and visualization. Features interactive dashboards and Apriori frequent itemset mining for data-driven decisions.",
    tags: ["Flask", "Apriori", "Data Viz"],
    githubUrl: "https://github.com/harshanth0112/summa"
  },
  {
    num: "04",
    title: "Nestlé HR Assistant Chatbot",
    description:
      "HR query chatbot using Python, Gradio, and Groq API. Handles company policy questions and employee onboarding interactions.",
    tags: ["Gradio", "Groq API", "LLM"],
    githubUrl: "https://github.com/harshanth0112/nestle-hr-assistant"
  },
  {
    num: "05",
    title: "Personal Portfolio Website",
    description:
      "Interactive portfolio built with modern Web technologies, Tailwind CSS, React, and responsive animations.",
    tags: ["React", "Tailwind CSS", "Vite", "GSAP"],
    githubUrl: "https://github.com/harshanth0112/portfolio-website"
  },
  {
    num: "06",
    title: "Personal Library",
    description:
      "A personal library system to manage and organize collections effectively.",
    tags: ["Python", "Management", "Database"],
    githubUrl: "https://github.com/harshanth0112/personal_library"
  },
  {
    num: "07",
    title: "AgileDev",
    description:
      "An agile development hub designed to streamline workflows and boost team productivity.",
    tags: ["Agile", "Development", "Productivity"],
    githubUrl: "https://github.com/thelaunchpad21-hub/AgileDev"
  },
  {
    num: "08",
    title: "AI-Based Virtual Doctor",
    description:
      "A virtual doctor application utilizing multimodal Large Language Models (LLMs) for AI-assisted medical insights.",
    tags: ["Python", "Multimodal LLM", "AI"],
    githubUrl: "https://github.com/harshanth0112/AI-Based-Virtual-Doctor-using-Multimodal-LLMs-"
  }
];

export const CERTIFICATES = [
  {
    id: "aws-ccp",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Oct 2024",
    category: "Cloud",
    image: "/pdftoimage/AWS Certified Cloud Practitioner certificate-1.jpg"
  },
  {
    id: "wipro-java",
    title: "Java Full Stack Development",
    issuer: "Wipro TalentNext",
    date: "Oct 2025",
    category: "Full Stack",
    image: "/pdftoimage/wipro.png"
  },
  {
    id: "ibm-edunet",
    title: "AI & Cloud Emerging Technologies Internship",
    issuer: "Edunet · AICTE · IBM",
    date: "Jul–Aug 2025",
    category: "AI & Cloud",
    image: "/pdftoimage/edunet ibm internship.jpg"
  },
  {
    id: "shell-edunet",
    title: "AI & Data Analytics — Green Skills",
    issuer: "Shell India · Edunet",
    date: "Jul–Aug 2025",
    category: "AI & Cloud",
    image: "/pdftoimage/edunet shell internship.jpg"
  },
  {
    id: "genai-spec",
    title: "Gen AI Specialization — Course Completed",
    issuer: "Simplilearn",
    date: "Jun 2025",
    category: "Generative AI",
    image: "/pdftoimage/gen ai course completed-1.jpg"
  },
  {
    id: "cisco-python",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Jul 2025",
    category: "Programming",
    image: "/pdftoimage/CISCO (PythonEssentials1)_page-0001.jpg"
  },
  {
    id: "ibm-ai",
    title: "Getting Started with Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    date: "Jul 2025",
    category: "AI & Cloud",
    image: "/pdftoimage/IBM Getting Started with Artificial Intelligence_page-0001.jpg"
  },
  {
    id: "ibm-cloud",
    title: "Journey to Cloud: Envisioning Your Solution",
    issuer: "IBM SkillsBuild",
    date: "Jul 2025",
    category: "Cloud",
    image: "/pdftoimage/IBM Journey to Cloud_page-0001.jpg"
  },
  {
    id: "accenture-analytics",
    title: "Web Analytics",
    issuer: "Accenture",
    date: "2024",
    category: "Data",
    image: "/pdftoimage/digital-skill-web-analytics_certificate_of_achievement_i6j2onw (1)-1.jpg"
  },
  {
    id: "udemy-hadoop",
    title: "Big Data Hadoop",
    issuer: "Udemy",
    date: "2024",
    category: "Data",
    image: "/pdftoimage/hadoop-1.jpg"
  },
  {
    id: "udemy-firebase",
    title: "Firebase & JavaScript",
    issuer: "Udemy",
    date: "2024",
    category: "Full Stack",
    image: "/pdftoimage/javascript-1.jpg"
  },
  {
    id: "genai-mod-7",
    title: "Capstone Project Module",
    issuer: "Simplilearn",
    date: "Jun 2025",
    category: "Generative AI",
    image: "/pdftoimage/GEN AI 7-1.jpg"
  },
  {
    id: "genai-mod-6",
    title: "AI Governance Module",
    issuer: "Simplilearn",
    date: "Jun 2025",
    category: "Generative AI",
    image: "/pdftoimage/GEN AI 6-1.jpg"
  },
  {
    id: "genai-mod-5",
    title: "Image Generation Module",
    issuer: "Simplilearn",
    date: "Jun 2025",
    category: "Generative AI",
    image: "/pdftoimage/GEN AI 5-1.jpg"
  },
  {
    id: "genai-mod-4",
    title: "LLM Applications Module",
    issuer: "Simplilearn",
    date: "Jun 2025",
    category: "Generative AI",
    image: "/pdftoimage/GEN AI 4-1.jpg"
  },
  {
    id: "genai-mod-3",
    title: "Generative AI Models Module",
    issuer: "Simplilearn",
    date: "Feb 2025",
    category: "Generative AI",
    image: "/pdftoimage/GEN AI 3-1.jpg"
  },
  {
    id: "genai-mod-2",
    title: "Prompt Engineering & ChatGPT Module",
    issuer: "Simplilearn",
    date: "Feb 2025",
    category: "Generative AI",
    image: "/pdftoimage/GEN AI 2-1.jpg"
  },
  {
    id: "ozone-security",
    title: "Ethical Hacking Workshop",
    issuer: "Ozone Cyber Security",
    date: "2024",
    category: "Security",
    image: "/pdftoimage/ethical hacking.jpg"
  },
  {
    id: "tnscst-ipr",
    title: "Intellectual Property Rights Workshop",
    issuer: "TNSCST",
    date: "2024",
    category: "Workshops",
    image: "/pdftoimage/intellectual property rights.jpg"
  },
  {
    id: "unstop-comp",
    title: "Competition Participation",
    issuer: "Unstop",
    date: "2024",
    category: "Workshops",
    image: "/pdftoimage/unstop-1.jpg"
  },
  {
    id: "krct-creative",
    title: "Creative Design",
    issuer: "KRCT",
    date: "2024",
    category: "Workshops",
    image: "/pdftoimage/creative design.jpg"
  }
];

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
};
