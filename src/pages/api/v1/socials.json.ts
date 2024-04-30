export const prerender = true;
import { getCollection } from "astro:content";

interface SocialMedia {
    name: string,
    icon: string,
    href: string,
}

const data = [
    {
        name: "X",
        icon: "/static/images/socials/x.{{ext}}",
        href: "https://twitter.com/VtubersWiki",
    },
    {
        name: "Reddit",
        icon: "/static/images/socials/reddit.{{ext}}",
        href: "https://www.reddit.com/r/vtuberwiki/",
    },
    {
        name: "Discord",
        icon: "/static/images/socials/discord.{{ext}}",
        href: "https://discord.gg/zCkbdv4qkW",
    },
    {
        name: "Patreon",
        icon: "/static/images/socials/patreon.{{ext}}",
        href: "https://www.patreon.com/withervt",
    },
    {
        name: "Github",
        icon: "/static/images/socials/github.{{ext}}",
        href: "https://www.github.com/vtuberwiki",
    }
] as SocialMedia[];


export async function GET() {
    try {
        const mappedData = data.map((item) => {
            return {
                name: item.name,
                icon: item.icon.replace("{{ext}}", "svg"),
                href: item.href,
            };
        });

        return new Response(JSON.stringify(mappedData), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return {
            body: JSON.stringify({ status: 500, data: (error as Error).message }),
        };
    }
}
