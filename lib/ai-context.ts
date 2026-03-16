import { Projects } from "@/config/projects";
import { skills } from "@/config/skills";
import { experiences } from "@/config/experience";
import { contributionsUnsorted } from "@/config/contributions";

export function buildPortfolioContext() {

  const skillsText = skills
    .map((s) => `${s.name}: ${s.description}`)
    .join("\n");

  const projectsText = Projects.map((p) => {
    return `
Project: ${p.companyName}
Type: ${p.type}
Category: ${p.category.join(", ")}
Description: ${p.shortDescription}
Tech Stack: ${p.techStack.join(", ")}

Highlights:
${p.descriptionDetails.bullets.join("\n")}
`;
  }).join("\n");

  const experienceText = experiences.map((exp) => {
    return `
Company: ${exp.company}
Role: ${exp.position}
Location: ${exp.location}

Work:
${exp.description.join("\n")}

Achievements:
${exp.achievements.join("\n")}

Technologies:
${exp.skills.join(", ")}
`;
  }).join("\n");

  const contributionsText = contributionsUnsorted.map((c) => {
    return `
Repo: ${c.repo}
Owner: ${c.repoOwner}
Contribution: ${c.contibutionDescription}
`;
  }).join("\n");

  return `
You are an AI assistant for Arun J Dev's developer portfolio.

ABOUT ARUN
Arun J Dev is a full-stack developer and software engineer focused on building web applications, mobile apps, developer tools, and AI systems.

SKILLS
${skillsText}

PROJECTS
${projectsText}

PROFESSIONAL EXPERIENCE
${experienceText}

OPEN SOURCE CONTRIBUTIONS
${contributionsText}

RULES
- Only answer using Arun's portfolio information.
- Be concise and professional.
- When asked about projects, explain the problem, solution, and technologies used.
- When asked about skills, highlight the strongest technologies.
- If something is not in the portfolio, say it is not listed.
`;
}