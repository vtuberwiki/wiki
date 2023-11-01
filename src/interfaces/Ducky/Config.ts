import { bytesToSize } from 'developer-toolkit-utils';

interface DuckyFileExtensions {
    name: string;
    description: string;
    extension: string;
}

export interface OpenSourceData {
    id: number,
    node_id: string,
    name: string,
    slug: string,
    description: string,
    html_url: string,
    clone_url: string,
    size: string,
    homepage: string,
    stars_count: string,
    open_issues_count: string,
    forks_count: string,
    language: string,
    license: {
        name: string,
        spdx_id: string,
        url: string,
        node_id: string
    },
    topics: string[]
}

export interface AppConfig {
    Version: string;
    FileExtensions: DuckyFileExtensions[];
    OpenSourceData: OpenSourceData;
}