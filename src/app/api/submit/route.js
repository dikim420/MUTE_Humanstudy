import { google } from "googleapis";

export async function POST(req) {
    try {
        const body = await req.json();

        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet2!A:M",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    new Date().toISOString(),
                    body.affiliation,
                    body.name,
                    body.answers[1],
                    body.answers[2],
                    body.answers[3],
                    body.answers[4],
                    body.answers[5],
                    body.answers[6],
                    body.answers[7],
                    body.answers[8],
                    body.answers[9],
                    body.answers[10],
                ]],
            },
        });

        return Response.json({ success: true });

    } catch (e) {
        console.error(e);
        return Response.json({ error: "fail" }, { status: 500 });
    }
}