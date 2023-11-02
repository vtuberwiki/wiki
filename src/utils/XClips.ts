import puppeteer from 'puppeteer-core';
import { getCollection } from 'astro:content';
import axios from 'axios';
import cron from 'node-cron';

export interface Clip {
  name: string;
  url: string;
  time: string;
  video: string;
  game: {
    name: string;
    url: string;
  };
  clipper: string;
  views: string;
  clip_duration: string;
}

const EMPTY_DATA: Clip = {
  name: '',
  url: '',
  time: '',
  video: '',
  game: {
    name: '',
    url: '',
  },
  clipper: '',
  views: '',
  clip_duration: '',
};

const clips: Record<string, Clip> = {};



export async function GetClip(url: string): Promise<any> {
  try {

    if (!url.startsWith("https://www.twitch.tv/")) url = `https://www.twitch.tv/${url.split("/")[0]}/clip/${url.split("/").pop()}`


    const BASED_URL = url.replace("https://www.twitch.tv/", "").replace("/clip", "");

    if (clips[BASED_URL]) return clips[BASED_URL];

    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io/?token=${import.meta.env.BROWSERLESS_TOKEN}`,
    });

    const page = await browser.newPage();

    await page.goto(url);

    // Get the item with the class "video-ref"

    const clip = page.evaluate(async () => {
      const videoDiv = document.querySelector(`.video-ref`);

      if (!videoDiv) return EMPTY_DATA; // Provide default values

      const video = videoDiv?.querySelector('video');

      if (!video) return EMPTY_DATA; // Provide default values

      const clipData = document.querySelector(`.metadata-layout__split-top`);

      const time = clipData?.querySelector(".CoreText-sc-1txzju1-0")?.textContent || '';
      const name = clipData?.querySelector("h2")?.textContent || '';
      const gameName = clipData?.querySelectorAll(".ScCoreLink-sc-16kq0mq-0")[0]?.textContent || '';
      const gameUrl = clipData?.querySelectorAll(".ScCoreLink-sc-16kq0mq-0")[0]?.getAttribute('href') || '';
      const clipper = clipData?.querySelectorAll(".ScCoreLink-sc-16kq0mq-0")[1]?.textContent || '';
      const _views = clipData?.querySelectorAll(".CoreText-sc-1txzju1-0");
      //@ts-ignore
      const views = _views[_views.length - 1]?.textContent || '';
      const url = window.location.href; // Get the URL from the window object

      return {
        video: video.src,
        name,
        time,
        url,
        game: {
          name: gameName,
          url: gameUrl
        },
        clipper,
        views: views,
        clip_duration: new Date(video.duration * 1000).toISOString().substr(11, 8),
      }
    });

    clips[BASED_URL] = await clip;

    await browser.close();

    return clip;
  } catch (error) {
    console.log(error);
  }
}

export async function GetClipData(url: string) {

  return clips[url] || await GetClip(url);
}

export async function GetClipFromCollection() {

  const data = await getCollection("clips");

  for (const clip of data) {
    await GetClip(clip.data.url);
  }

  console.log("Loaded " + Object.keys(clips).length + " clips");

  return clips;
}

export async function StartCron() {
  cron.schedule("*/5 * * * *", async () => {
    await GetClipFromCollection();
  });
}