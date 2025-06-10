"use client";

import Cookies from "universal-cookie";
import createClient from "openapi-fetch";
import {paths} from "@/data-domain/schema";

interface GetRssFeedUrlResult {
    success: boolean;
    rssFeedUrl?: string;
    errorMessage?: string;
}

export default async function GetRssFeedUrl(): Promise<GetRssFeedUrlResult> {
    const token = new Cookies().get('accessToken');
    const client = createClient<paths>();
    return client.GET(
        "/rest/rss/getFeedUrl",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then(res => {
            if (!res.response.ok) {
                return {
                    success: false,
                    errorMessage: "Es ist ein Fehler aufgetreten.",
                }
            }
            return {
                rssFeedUrl: window.location.origin + res.data?.url,
                success: true,
            }
        }).catch(() => {
            return {
                success: false,
                errorMessage: "Es ist ein Fehler aufgetreten.",
            }
        })
}