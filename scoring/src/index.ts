import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk";
import { Sqlite } from "@fermyon/spin-sdk";


const encoder = new TextEncoder()

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

    const conn = Sqlite.openDefault();
    const result = conn.execute("SELECT * FROM votes", []);
    const json = JSON.stringify(result.rows);

    return {
        status: 200,
        headers: {
            "Content-type": "application/json",
        },
        body: encoder.encode(json).buffer
    }
}
