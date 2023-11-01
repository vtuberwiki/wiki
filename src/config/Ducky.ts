import axios from "axios";
import { bytesToSize, fNumber } from "developer-toolkit-utils";
import type { AppConfig, OpenSourceData } from "../interfaces/Ducky/Config";

async function GetOpenSourceData() {
  const data = await axios
    .get("https://api.github.com/repos/vtuberwiki/ducky")
    .then((response) => {
      return response.data;
    });

  const obj: OpenSourceData = {
    id: data.id,
    node_id: data.node_id,
    name: data.name,
    slug: data.slug,
    description: data.description || "No description",
    html_url: data.html_url,
    clone_url: data.clone_url,
    size: bytesToSize(data.size),
    homepage: data.homepage || "No homepage",
    stars_count: fNumber(data.stargazers_count),
    open_issues_count: fNumber(data.open_issues),
    forks_count: fNumber(data.forks),
    language: data.language,
    license: {
      name: data.license.name,
      spdx_id: data.license.spdx_id,
      url: data.license.url,
      node_id: data.license.node_id,
    } || {
      name: "None",
      spdx_id: "None",
      url: "None",
      node_id: "None",
    },
    topics: data.topics || [],
  };

  return obj;
}

const config: AppConfig = {
  Version: "1.0.0",
  FileExtensions: [
    {
      name: "Config File",
      description: "Ducky Config File",
      extension: ".dk",
    },
  ],
  OpenSourceData: (await GetOpenSourceData()) as any,
};

export default config;
