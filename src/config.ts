import type { Site, Locale, NavMenu, MdConfig } from "@/types";
import { Github } from "lucide-react";

export const SITE: Site = {
    url: "https://example.com/",
    author: "hexWers",
    describe: "A minimal, responsive and SEO-friendly Astro blog theme.",
    title: "Sehnsucht",
    lightAndDarkMode: true,
    mail: "mail@example.com"
};

export const LOCALE: Locale = {
    lang: "zh",
    langTag: "zh-cn"
} as const;

export const MDCONFIG: MdConfig = {
    show: true,
    max: 1,
    min: 3,
}

export const NAVMENU: NavMenu[] = [
    {
        id: '1',
        name: 'ACM介绍',
        url: '/acm/',
    },
    {
        id: '2',
        name: '竞赛规则',
        url: '/rule/',
    },
    {
        id: '3',
        name: '竞赛要求',
        url: '/game/',
    },
    {
        id: '4',
        name: '校队介绍',
        url: '/team/',
    },
    {
        id: '5',
        name: '获奖情况',
        url: '/ACM简介/',
    },
    {
        id: '6',
        name: '历届毕业',
        url: '/ACM简介/',
    },
    {
        id: '7',
        name: 'WeJudgeOJ',
        url: 'https://oj.bnuz.edu.cn',
    },
]

