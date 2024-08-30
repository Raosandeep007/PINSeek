import { Button } from "@/components/ui/button";
import { Github } from "@/public/icons/Github";
import { Twitter } from "@/public/icons/Twitter";
import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const saoicalMedia = [
  { name: "Gmail", url: "mailto:yadavsandeep775@gmail.com", icon: Mail },
  {
    name: "Github",
    url: "https://github.com/Raosandeep007",
    icon: Github,
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/sandeep-yadav-828779149/",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    url: "https://x.com/yadavsandeep775",
    icon: Twitter,
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background flex flex-col items-center justify-between gap-2 md:flex-row p-2">
      <p className="text-center text-sm leading-loose text-muted-foreground md:text-left flex items-center gap-1">
        Developed by
        <Link
          href="https://www.linkedin.com/in/sandeep-yadav-828779149/"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Raosandeep.
        </Link>
      </p>
      <div className="flex gap-4">
        {saoicalMedia.map(({ icon: Icon, name, url }) => (
          <Link href={url} target="_blank" rel="noreferrer" key={name}>
            <Button variant="ghost" size="icon">
              <Icon className="h-5 w-5" />
            </Button>
          </Link>
        ))}
      </div>
    </footer>
  );
}
