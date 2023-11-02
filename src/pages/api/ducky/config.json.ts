export const prerender = true;
import { getCollection } from "astro:content";
import config from "../../../config/Ducky";



export async function GET() {
    return new Response(
        JSON.stringify({ ...config }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "max-age=0, s-maxage=3600",
            "Content-Disposition": "inline",
        }
    });
}