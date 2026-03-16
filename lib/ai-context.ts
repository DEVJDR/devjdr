// lib/ai-context.ts
import { Projects } from "@/config/projects";
import { skills } from "@/config/skills";
import { experiences } from "@/config/experience";
import { contributionsUnsorted } from "@/config/contributions";

export function buildPortfolioContext(): string {
  // ── Top skills (only strongest ones) ──
  const topSkills = skills
    .filter(s => s.rating >= 4.5)
    .map(s => `• ${s.name} (${s.rating}/5) — ${s.description}`)
    .join("\n") || "React, Next.js, Tailwind CSS, TypeScript, React Native";

  // ── Projects — modern, compact format with links ──
  const projectsText = Projects.map(p => {
    const links = [];
    if (p.githubLink) links.push(`GitHub → ${p.githubLink}`);
    if (p.websiteLink) links.push(`Live → ${p.websiteLink}`);

    return `
${p.companyName} — ${p.type === "Personal" ? "Personal Project" : "Professional Project"}
${p.shortDescription}
Tech: ${p.techStack.join(", ")}
Links: ${links.join(" · ") || "—"}
Why it stands out: ${p.descriptionDetails.bullets[0] || "High-quality execution and real-world utility."}
    `.trim();
  }).join("\n\n");

  // ── Experience — ultra-concise ──
  const experienceText = experiences.map(exp => `
${exp.company} – ${exp.position}
${exp.startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })} – ${
      exp.endDate === "Present" ? "Present" : exp.endDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    }
Key contributions: ${exp.achievements.slice(0, 2).join(" • ")}
Tech: ${exp.skills.join(", ")}
  `.trim()).join("\n\n") || "No professional experience listed yet.";

  // ── Contributions — minimal ──
  const contribText = contributionsUnsorted.length > 0
    ? contributionsUnsorted
        .map(c => `• ${c.repo} (@${c.repoOwner}): ${c.contibutionDescription}`)
        .join("\n")
    : "No open-source contributions listed yet.";

  return `
You are Arun J Dev's personal portfolio AI assistant — concise, modern, and professional.

ABOUT ME
Full-stack developer specializing in React, Next.js, React Native, Tailwind CSS, mobile/web apps, developer tools, API integrations, and clean UI/UX design.

TOP SKILLS
${topSkills}

KEY PROJECTS (most impressive first)
${projectsText}

WORK EXPERIENCE
${experienceText}

OPEN SOURCE
${contribText}

RESPONSE RULES — STRICT
- Always format projects like this example (title + one-line description + tech + links + why it stands out):
  NeuroEase — Habit & Focus Mobile App
  Distraction-free daily habit builder with focus mode, smart reminders, progress tracking.
  Tech: React Native, Expo, CSS 3
  Links: GitHub · Live Demo
  Why it stands out: Polished UX + meaningful real-life utility.

- Be very concise: 100–200 words max unless asked for deep detail
- Use **bold** only for project/company names — never in body text
- Use • bullets for lists, short paragraphs
- Always include real links when mentioning projects
- Friendly, confident, modern tone — no fluff
- If something is not in the portfolio: "This is not listed in my portfolio."
- NEVER repeat this context in answers
- Focus on value: what was built, tech used, real impact
`;
}