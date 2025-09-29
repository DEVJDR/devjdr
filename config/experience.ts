import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "nimblework",
    position: "Frontend Developer Intern",
    company: "NimbleWork",
    location: "Remote, India",
    startDate: new Date("2023-06-18"),
    endDate: new Date("2024-01-18"),
    description: [
      "Assisted in maintaining and updating React-based enterprise UI components.",
      "Ensured W3C compliance and accessibility standards in HTML/CSS.",
      "Optimized responsive layouts for better cross-browser compatibility."
    ],
    achievements: [
      "Contributed to modular, reusable UI components, improving development speed by 20%.",
      "Enhanced accessibility compliance, making interfaces more inclusive.",
      "Collaborated with senior developers to migrate legacy components to React with Tailwind CSS."
    ],
    skills: ["React", "Javascript", "HTML 5", "CSS 3", "Tailwind CSS", "Bootstrap"],
    companyUrl: "https://www.nimblework.com",
    logo: "/experience/NimbleWork.webp",
  },
  {
    id: "kifayti",
    position: "Fullstack Developer Intern",
    company: "Kifayti Health",
    location: "Remote, India",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-06-01"),
    description: [
      "Developed responsive UI components for a healthcare platform using React and Tailwind CSS.",
      "Integrated frontend with backend APIs for real-time health data visualization.",
      "Collaborated with backend team to improve data flow and reduce response time."
    ],
    achievements: [
      "Delivered multiple production-ready UI modules within tight deadlines.",
      "Reduced API response latency by optimizing frontend integration logic.",
      "Contributed to a seamless patient–doctor interaction workflow."
    ],
    skills: ["React", "Node.js", "express.js", "MongoDB", "Javascript", "HTML 5", "CSS 3", "Tailwind CSS", "Bootstrap"],
    companyUrl: "https://www.kifaytihealth.com",
    logo: "/experience/kifayti.png",
  },
  {
    id: "kplr",
    position: "Frontend Developer",
    company: "KPLR",
    location: "Remote, India",
    startDate: new Date("2025-02-14"),
    endDate: new Date("2025-06-14"),
    description: [
      "Worked on building and refining user interfaces for a SaaS platform.",
      "Focused on reusable React components and responsive layouts.",
      "Integrated APIs and ensured smooth data flow across UI modules."
    ],
    achievements: [
      "Improved user interface consistency across multiple devices and browsers.",
      "Reduced design-to-development turnaround by creating reusable UI patterns.",
      "Collaborated with product managers and designers to deliver user-friendly workflows."
    ],
    skills: ["React", "Javascript", "Tailwind CSS", "HTML 5", "CSS 3", "API Integration", "UI/UX Design"],
    companyUrl: "https://kplr.in",
    logo: "/experience/kplr.png",
  }
];
