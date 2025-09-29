import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@DEVJDR",
    icon: Icons.gitHub,
    link: "https://github.com/DEVJDR",
  },
  {
    name: "LinkedIn",
    username: "ARUN J DEV",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/devjdr/",
  },
  {
    name: "Twitter",
    username: "@Arun",
    icon: Icons.xLogo,
    link: "https://x.com/ArrunJDR",
  },
  {
    name: "Gmail",
    username: "Arun.Arun02",
    icon: Icons.gmail,
    link: "mailto:arunjdev26@gmail.com",
  },
];
