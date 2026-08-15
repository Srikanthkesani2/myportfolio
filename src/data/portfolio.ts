import resumeAsset from "@/assets/Srikanthreddy.pdf.asset.json";

export const profile = {
  name: "Kesani Srikanth Reddy",
  domain: "SRIKS.DEV",
  role: "AI/ML Student · Full-Stack Developer",
  tagline:
    "AI and Data Analytics enthusiast building intelligent applications with Python, SQL and modern web engineering.",
  location: "Hyderabad, India",
  email: "kesanisrikanthreddy5@gmail.com",
  about: [
    "I'm Kesani Srikanth Reddy — a B.Tech student in Artificial Intelligence and Machine Learning at Sreenidhi Institute of Science and Technology, Hyderabad, currently holding a CGPA of 8.69.",
    "I work across AI and data analytics — Python, SQL, Excel and machine learning — and turn that work into intelligent applications people can actually use.",
    "Alongside my degree I lead the Student Developers Community as President, where the focus is simple: get students building, shipping and learning from each other.",
  ],
  education: {
    school: "Sreenidhi Institute of Science and Technology, Hyderabad",
    degree: "B.Tech in Artificial Intelligence and Machine Learning",
    cgpa: "8.69",
    period: "2023 – Present",
  },
  stats: [
    { label: "CGPA", value: "8.69" },
    { label: "Community members", value: "2000+" },
    { label: "Core team", value: "25" },
    { label: "Technical events", value: "30+" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/Srikanthkesani2" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kesani-srikanth-reddy" },
  ],
  resume: resumeAsset,
};

export const capabilities = [
  {
    title: "Programming",
    body: "Core languages I write day to day, from systems fundamentals to data and the web.",
    items: ["C", "C++", "Java", "Python", "JavaScript", "SQL"],
  },
  {
    title: "Data Analytics",
    body: "Turning raw data into clean datasets, readable dashboards and decisions.",
    items: [
      "Data Analysis",
      "Data Cleaning",
      "Data Visualization",
      "Reporting",
      "Dashboarding",
      "MS Excel",
      "Google Sheets",
      "Power BI (Basics)",
    ],
  },
  {
    title: "Frameworks & Libraries",
    body: "The stack I build interfaces, APIs and machine learning workflows with.",
    items: [
      "React.js",
      "Node.js",
      "Express.js",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Pandas",
      "NumPy",
      "Scikit-learn",
    ],
  },
  {
    title: "Tools & Databases",
    body: "Everything around the code — version control, design, deployment and data stores.",
    items: [
      "Git",
      "GitHub",
      "MongoDB Compass",
      "Postman",
      "Jupyter Notebook",
      "VS Code",
      "Figma",
      "Netlify",
      "Vercel",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
    ],
  },
];

import projectFindit from "@/assets/project-findit.jpg";
import projectRecruiter from "@/assets/project-recruiter.jpg";
import projectThreat from "@/assets/project-threat.jpg";

export const projects = [
  {
    name: "FindIt – AI Powered Lost & Found Platform",
    category: "AI / FULL STACK",
    year: "",
    summary:
      "A platform to manage and track lost and found items, with AI-based image similarity matching and full authentication, messaging and database workflows.",
    highlights: [
      "Developed a platform to manage and track lost and found items.",
      "Implemented AI-based image similarity matching using Hugging Face models.",
      "Built authentication, messaging, and database workflows using Supabase.",
    ],
    tech: ["React.js", "TypeScript", "Supabase", "SQL", "Hugging Face"],
    image: projectFindit,
    github: "https://github.com/Srikanthkesani2/lost-and-found-match",
    demo: null,
  },
  {
    name: "AI Recruiter Agent",
    category: "AI / AUTOMATION",
    year: "",
    summary:
      "An automated recruitment workflow that screens resumes, manages candidate information and handles communication with AI-driven interactions.",
    highlights: [
      "Built an automated recruitment workflow for resume screening and candidate management.",
      "Processed candidate information and automated communication workflows.",
      "Integrated AI models for intelligent candidate interactions.",
    ],
    tech: ["Python", "PostgreSQL", "n8n", "Groq", "Gemini"],
    image: projectRecruiter,
    github: "https://github.com/Srikanthkesani2/AI-Recuriter",
    demo: null,
  },
  {
    name: "Real-Time Website Threat Detection & AI Cyber Security Assistant",
    category: "AI / CYBER SECURITY",
    year: "",
    summary:
      "A phishing website detection system built with machine learning, paired with an assistant that generates AI-powered threat reports and security insights.",
    highlights: [
      "Developed a phishing website detection system using machine learning techniques.",
      "Performed data preprocessing and feature extraction on URL datasets.",
      "Generated AI-powered threat reports and security insights.",
    ],
    tech: ["Python", "Flask", "SQL", "Scikit-learn", "Gemini API"],
    image: projectThreat,
    github: "https://github.com/Srikanthkesani2/Realtime-website-fraud-detection-",
    demo: null,
  },
];

export const experience = [
  {
    role: "Tech Lead Intern",
    org: "Swecha Telangana",
    location: "Gachibowli, Hyderabad",
    period: "November 2025",
    points: [
      "Developed AI and NLP solutions using Python and machine learning techniques.",
      "Worked on dataset preparation, model evaluation, and scalable AI applications.",
      "Collaborated with teams to build technology solutions for regional language initiatives.",
    ],
  },
];

export const journey = [
  {
    period: "2023",
    markers: ["START"],
    notes: [
      "Started my B.Tech in Artificial Intelligence and Machine Learning at Sreenidhi Institute of Science and Technology.",
      "Started my journey with the Student Developers Community and took on the role of President in March 2023.",
    ],
  },
  { period: "2024", markers: ["BUILD"], notes: [] },
  {
    period: "2025",
    markers: ["AI / ML", "PROJECTS", "EXPERIENCE"],
    notes: ["Tech Lead Intern at Swecha Telangana, Gachibowli, Hyderabad — November 2025."],
  },
  { period: "2026", markers: ["LEAD", "BUILD", "COMMUNITY", "HACKATHONS"], notes: [] }
];

export const communityNetwork = {
  role: "President",
  org: "Student Developers Community — SDC SNIST",
  period: "March 2023 – Present",
  body:
    "As President of the Student Developers Community at SNIST, I lead a 25-member core team and run technical events for a 2000+ student community — workshops, hackathons, bootcamps and industry interaction sessions.",
  nodes: [
    { label: "Students" },
    { label: "Events" },
    { label: "Hackathons" },
    { label: "Workshops" },
    { label: "Bootcamps" },
    { label: "Industry Interaction" },
  ],
  stats: [
    { value: "2000+", label: "Student Community" },
    { value: "25", label: "Core Team" },
    { value: "30+", label: "Technical Events" },
  ],
};

export const community = {
  title: "Student Developers Community",
  body: "A builder-first community where students learn by shipping.",
  pillars: [
    { title: "Workshops", detail: "Hands-on technical sessions across AI, web and data." },
    { title: "Hackathons", detail: "Themed builds with real problem statements." },
    { title: "Bootcamps", detail: "Multi-day programs that take beginners to shipping." },
    { title: "Industry Interaction", detail: "Sessions connecting students with practitioners." },
  ],
};

export const missions = [
  {
    title: "Hashit-out Hackathon",
    category: "Hackathon" as const,
    location: "SNIST campus",
  },
  {
    title: "Digital India Hackathon",
    category: "Hackathon" as const,
    location: "SNIST campus",
  },
  {
    title: "Launchpad",
    category: "Bootcamp" as const,
    location: "SNIST campus",
  },
  {
    title: "Uxplosion Hackathon",
    category: "Hackathon" as const,
    location: "SNIST campus",
  },
];

export const certifications = [
  { name: "Deloitte Technology Job Simulation", issuer: "Deloitte" },
  { name: "Data Visualization: Empowering Business", issuer: "Tata Forage" },
  { name: "Artificial Intelligence", issuer: "Agratas Academy" },
  { name: "Python Programming", issuer: "Microsoft (Skill India)" },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Journey", href: "#journey" },
  { label: "Community", href: "#community" },
  { label: "Missions", href: "#missions" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
