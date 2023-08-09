import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk";
import { Sqlite } from "@fermyon/spin-sdk";


const encoder = new TextEncoder();

type Response = {
    name: string,
    votes: number,
}[];

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

    const conn = Sqlite.openDefault();
    let result = conn.execute("SELECT name, votes FROM votes WHERE name IN (? , ?)", ["barbie", "oppenheimer"]);

    let jsonObj :Response= [];
    if (result.rows.length) {
        const rows = result.rows as unknown as Array<any>;
        jsonObj = rows.map((row) => {
            return {
                name: row[0] || '',
                votes: row[1] || 0,
            }
        });
    }

    const json = JSON.stringify(jsonObj);

    return {
        status: 200,
        headers: {
            "Content-type": "application/json",
        },
        body: encoder.encode(json).buffer
    }
}
