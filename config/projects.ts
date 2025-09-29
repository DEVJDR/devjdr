import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
 
  {
  id: "imdb-clone",
  companyName: "IMDB Clone",
  type: "Personal",
  category: ["Web App", "Frontend", "Entertainment"],
  shortDescription:
    "A movie database web application inspired by IMDB, allowing users to explore trending films, search movies, and view detailed information with ratings and trailers.",
  githubLink: "https://github.com/DEVJDR/IMDb-CLONe", 
  websiteLink: "https://reactimdbcloneapp.netlify.app/", 
  techStack: ["React", "Tailwind CSS", "TMDB API", "Javascript"],
  startDate: new Date("2024-01-15"),
  endDate: new Date("2024-02-20"),
  companyLogoImg: "/projects/imdb-clone/logo.png",
  pagesInfoArr: [
    {
      title: "Movie Listings",
      description:
        "Integrated TMDB API to fetch trending, top-rated, and upcoming movies with dynamic UI updates.",
      imgArr: ["/projects/imdb-clone/movie_listings.png"],
    },
    {
      title: "Search & Filter",
      description:
        "Implemented search functionality with filters for genres, release year, and ratings.",
      imgArr: ["/projects/imdb-clone/search_filter.png"],
    },
    {
      title: "Movie Details",
      description:
        "Created a dedicated detail page for each movie including trailer, ratings, and cast info.",
      imgArr: ["/projects/imdb-clone/movie_details.png"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "The IMDB Clone project was built to practice API integration and dynamic UI development. Using the TMDB API, the app provides users with access to real-time movie data, including trending films, top-rated movies, and upcoming releases.",
      "I designed a search and filtering system that lets users explore movies by genre, release year, and rating. Each movie has a dedicated details page showcasing descriptions, trailers, and cast information, providing a complete browsing experience.",
      "This project sharpened my skills in React state management, API handling, and building responsive UIs while mimicking a real-world entertainment platform.",
    ],
    bullets: [
      "Integrated TMDB API to fetch and display live movie data.",
      "Developed search and filter features for personalized discovery.",
      "Designed responsive UI with Tailwind CSS for a clean experience.",
      "Built dynamic movie detail pages including trailers and ratings.",
    ],
  },
}, {
  id: "neuroease-app",
  companyName: "NeuroEase",
  type: "Personal",
  category: [ "Productivity", "Mobile Dev","UI/UX"],
  shortDescription:
    "A mobile app designed to help users build daily habits, stay focused, and reduce distractions with prompts, focus mode, and reminders.",
  githubLink: "https://github.com/DEVJDR/NeuroEaseApp",
  websiteLink: "https://neuro-ease-hazel.vercel.app",
  techStack: ["React Native", "Expo", "CSS 3"],
  startDate: new Date("2024-05-01"),
  endDate: new Date("2024-08-01"),
  companyLogoImg: "/projects/neuroease/task_prompts.png",
  pagesInfoArr: [
    {
      title: "Task Prompts & Reminders",
      description:
        "Created customizable reminders and prompts to encourage users to start and sustain daily habits.",
      imgArr: ["/projects/neuroease/task_prompts.png"],
    },
    {
      title: "Focus Mode",
      description:
        "Developed a distraction-free mode with timers and progress tracking to support deep work and concentration.",
      imgArr: ["/projects/neuroease/focus_mode.png"],
    },
    {
      title: "Seamless User Experience",
      description:
        "Designed an intuitive, accessible interface that adapts to user needs with smooth navigation and consistent UI.",
      imgArr: ["/projects/neuroease/user_experience.avif"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "NeuroEase is a React Native mobile application I built to support habit formation, focus, and productivity. Inspired by the challenges of maintaining consistency in daily routines, I designed the app to make staying on track simple and accessible.",
      "The app features customizable task prompts, focus mode with timers, and smart reminders. It emphasizes cognitive ease and a seamless user journey, ensuring that users can focus on their goals without friction.",
      "This project sharpened my skills in mobile development and UI/UX design, while also reflecting my interest in building tools that genuinely help people improve their everyday lives.",
    ],
    bullets: [
      "Built with React Native and Expo for cross-platform deployment.",
      "Developed focus mode with distraction-free timers and progress tracking.",
      "Implemented customizable reminders and task prompts.",
      "Designed an accessible UI optimized for clarity and ease of use.",
    ],
  },
}
,
{
  id: "asd-adhd-comparison",
  companyName: "Final Year Project",
  type: "Professional",
  category: ["ML", "Deep Learning", "Data Science"],
  shortDescription:
    "Built a deep learning model to compare cognitive patterns in ASD vs ADHD, enhancing diagnostic support.",
  githubLink: "https://github.com/yourrepo/asd-adhd",
  techStack: ["Python", "TensorFlow", "Pandas", "Matplotlib"],
  startDate: new Date("2023-07-01"),
  endDate: new Date("2024-04-01"),
  companyLogoImg: "/projects/asd-adhd/logo.jpg",
  pagesInfoArr: [
    {
      title: "Model Training & Evaluation",
      description: "Implemented CNNs/LSTMs to classify and analyze patterns",
      imgArr: ["/projects/asd-adhd/model_training.png"],
    },
    {
      title: "Data Visualization",
      description: "Exploratory data analysis and feature distribution graphs",
      imgArr: ["/projects/asd-adhd/data_viz.png"],
    },
    {
      title: "Results & Accuracy",
      description: "Achieved significant accuracy in differentiating ASD vs ADHD",
      imgArr: ["/projects/asd-adhd/results.png"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "For my final year project, I developed a deep learning model aimed at distinguishing between Autism Spectrum Disorder (ASD) and Attention Deficit Hyperactivity Disorder (ADHD). This project combined my interests in psychology and technology to address a real-world healthcare challenge.",
      "I used Python, TensorFlow, and Keras to design CNN/LSTM models that analyzed behavioral and neurocognitive datasets. The system provided insights into overlapping symptoms and helped in identifying distinguishing markers.",
      "The project not only improved my expertise in AI/ML but also demonstrated how computational approaches can support mental health diagnostics.",
    ],
    bullets: [
      "Designed and trained deep learning models for ASD vs ADHD classification.",
      "Performed extensive data cleaning, preprocessing, and visualization.",
      "Achieved improved accuracy compared to baseline models.",
      "Integrated psychology domain knowledge into feature selection and interpretation.",
    ],
  },
}
,
{
  id: "kplr-ondc",
  companyName: "KPLR",
  type: "Professional",
  category: ["SaaS", "Frontend", "ONDC"],
  shortDescription:
    "Contributed as a Frontend Developer for a SaaS platform enabling ONDC-powered commerce solutions. Focused on building reusable UI components and integrating APIs to streamline user experience.",
  githubLink: "", 
  websiteLink: "https://kplr.in/",
  techStack: ["React", "Javascript", "Tailwind CSS", "HTML 5", "CSS 3", "API Integration", "UI/UX Design"],
  startDate: new Date("2024-03-01"), 
  endDate: new Date("2024-06-01"),   
  companyLogoImg: "/projects/kplr/logo.png",
  pagesInfoArr: [
    {
      title: "Dashboard UI",
      description:
        "Developed and refined user-facing dashboards for ONDC merchant operations, ensuring responsive design and seamless data integration.",
      imgArr: ["/projects/kplr/dashboard.png"],
    },
    {
      title: "API Integration",
      description:
        "Connected ONDC services with frontend components to display product catalogs, order flows, and analytics in real-time.",
      imgArr: ["/projects/kplr/api_integration.png"],
    },
    {
      title: "Reusable Components",
      description:
        "Built a library of reusable React components, improving consistency and reducing development time across the platform.",
      imgArr: ["/projects/kplr/components.png"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "At KPLR, I worked as a Frontend Developer contributing to a SaaS platform that leverages ONDC (Open Network for Digital Commerce) to empower businesses with scalable commerce solutions.",
      "My primary responsibility was building and refining user interfaces using React and Tailwind CSS, ensuring responsive design across devices. I also integrated APIs for ONDC operations, enabling smooth data flow between backend services and the UI.",
      "This experience strengthened my skills in frontend architecture, API-driven development, and designing user-centric interfaces in a real-world commerce ecosystem.",
    ],
    bullets: [
      "Developed and optimized UI for ONDC-powered merchant operations.",
      "Integrated APIs to support catalog, order, and analytics features.",
      "Built reusable React components for faster and scalable development.",
      "Enhanced user experience through responsive design and UX improvements.",
    ],
  },
},
  {
  id: "runit-code-editor",
  companyName: "RunIt",
  type: "Personal",
  category: ["Web App", "Coding Tools", "Productivity"],
  shortDescription:
    "An online code editor supporting 10+ languages with real-time output, custom input, and a VS Code-inspired interface.",
  githubLink: "https://github.com/DEVJDR/reactcodeditor",
  websiteLink: "https://reactcodeditor.vercel.app",
  techStack: ["React", "Monaco Editor", "Tailwind CSS", "Judge0 API"],
  startDate: new Date("2024-03-01"),
  endDate: new Date("2024-04-15"),
  companyLogoImg: "/projects/runit/logo.png",
  pagesInfoArr: [
    {
      title: "Multi-Language Support",
      description:
        "Integrated Judge0 API to compile and execute code in 10+ programming languages directly in the browser.",
      imgArr: ["/projects/runit/multi_language.png"],
    },
    {
      title: "VS Code-Inspired UI",
      description:
        "Built an intuitive interface with Monaco Editor, offering syntax highlighting and a familiar coding experience.",
      imgArr: ["/projects/runit/logo.png"],
    },
    {
      title: "Real-Time Execution",
      description:
        "Implemented live code execution with input/output panels for smooth and responsive feedback.",
      imgArr: ["/projects/runit/realtime_output.png"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "RunIt is a lightweight yet powerful online code editor I built to simplify the process of writing and testing code directly in the browser. The goal was to create a tool that provides the feel of an IDE without the need for setup or installation.",
      "The project supports 10+ programming languages through Judge0 API integration, while Monaco Editor ensures a polished, VS Code-like experience. Real-time output and custom input panels enhance usability for developers and learners alike.",
      "Building RunIt allowed me to strengthen my expertise in API integration, real-time data handling, and UI/UX design for developer-centric tools.",
    ],
    bullets: [
      "Supports 10+ programming languages with real-time execution.",
      "Integrated Judge0 API for seamless backend compilation.",
      "Implemented Monaco Editor for a VS Code-inspired interface.",
      "Designed responsive UI with Tailwind CSS for accessibility.",
    ],
  },
}
,
 {
  id: "threeD-portfolio",
  companyName: "3D Portfolio",
  type: "Personal",
  category: ["Web App", "Portfolio", "3D Design"],
  shortDescription:
    "A 3D interactive portfolio built with React Three Fiber, creating an immersive and visually captivating browsing experience.",
  githubLink: "https://github.com/DEVJDR/threeDportfolio",
  websiteLink: "https://github.com/DEVJDR/threeDportfolio",
  techStack: ["React Three Fiber", "React Three Drei"],
  startDate: new Date("2024-02-01"),
  endDate: new Date("2024-03-01"),
  companyLogoImg: "/projects/3dportfolio/logo.png",
  pagesInfoArr: [
    {
      title: "Immersive 3D Experience",
      description:
        "Designed interactive 3D scenes with React Three Fiber, making the portfolio more engaging and memorable.",
      imgArr: ["/projects/3dportfolio/3d_experience.png"],
    },
    {
      title: "Smooth Animations",
      description:
        "Implemented dynamic transitions and user interactions using React Three Drei for polished visuals.",
      imgArr: ["/projects/3dportfolio/animations.png"],
    },
    {
      title: "Showcasing Projects",
      description:
        "Transformed the portfolio into a visually striking environment for exploring content and projects.",
      imgArr: ["/projects/3dportfolio/showcase.png"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "3D Portfolio is a creative web project I developed to explore immersive design using React Three Fiber. Instead of a static showcase, this portfolio presents content in a 3D environment, capturing attention and making the browsing experience memorable.",
      "By leveraging React Three Drei for controls, lighting, and animations, I built smooth transitions and engaging interactions that highlight my projects in a dynamic way.",
      "This project not only reflects my technical ability with 3D frameworks but also demonstrates my focus on combining design with technology to create impactful user experiences.",
    ],
    bullets: [
      "Developed interactive 3D portfolio using React Three Fiber.",
      "Used React Three Drei for animations, lighting, and controls.",
      "Created immersive and visually engaging browsing experience.",
      "Showcased projects in an innovative 3D environment.",
    ],
  },
}
,




  
];

export const featuredProjects = Projects.slice(0, 3);
