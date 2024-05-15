
export type Site = {
    url: string;
    author: string;
    describe: string;
    title: string;
    mail: string;
};

export type Locale = {
    lang: string;
    langTag: string;
}

export type MdConfig = {
    show: boolean;
    max: number;
    min: number;
}

export type NavMenu = {
    id: string;
    name: string;
    url: string;
    prefetch?: boolean;
    next?: NavMenu[];
}

export type Prize = {
    year: string;
    game: string;
    type: string;
    prize: string;
    teamName: string;
    players: string;
    other: string;
}

export type Graduate = {
    year: string;
    name: string;
    to: string;
    other: string;
}