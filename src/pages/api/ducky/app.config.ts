export const prerender = true;
import { getCollection } from "astro:content";
import type AppConfig from "../../../interfaces/Ducky/Config";

const config: AppConfig = {
   Version: "1.0.0",
   UpdateUrl: "https://vtubers.wiki/api/ducky/science/update",
}



export async function GET() {
    return new Response(
        JSON.stringify({ ...config }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}