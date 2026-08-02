type PagesFunction = (context: { request: Request }) => Response | Promise<Response>;

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const { url } = await request.json() as { url?: string };
    if (!url || (!url.includes("digialm.com") && !url.includes("iimcat.ac.in") && !url.includes("nta.ac.in") && !url.includes("tcsion.com"))) {
      return Response.json({ error: "Please provide a valid CAT / NTA Response Sheet URL (e.g., cdn.digialm.com or iimcat.ac.in)." }, { status: 400 });
    }
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) return Response.json({ error: "Failed to access the response sheet." }, { status: 400 });
    const html = await response.text();
    const questions = html.split(/<div\s+class="question-pnl"/i).slice(1).map((block) => {
      const value = (pattern: RegExp, fallback: string) => block.match(pattern)?.[1]?.replace(/&nbsp;/g, "").trim() || fallback;
      return {
        qNum: value(/Q\.\s*(\d+)/i, "Unknown"),
        questionId: value(/Question\s*ID\s*:\s*(?:<\/td>\s*<td[^>]*>)?\s*(\d+)/i, "Unknown"),
        status: value(/Status\s*:\s*(?:<\/td>\s*<td[^>]*>)?\s*([^<>\n\r]+?)/i, "Unknown"),
        chosenOption: value(/Chosen\s*Option\s*:\s*(?:<\/td>\s*<td[^>]*>)?\s*([^<>\n\r]+?)/i, "--"),
      };
    }).filter((question) => question.questionId !== "Unknown");
    if (!questions.length) return Response.json({ error: "No question data found." }, { status: 400 });
    const answeredCount = questions.filter((question) => question.status.toLowerCase().includes("answered") || !["", "--"].includes(question.chosenOption)).length;
    return Response.json({ success: true, data: { totalFetched: questions.length, answeredCount, unansweredCount: questions.length - answeredCount, questions } });
  } catch {
    return Response.json({ error: "An unexpected error occurred during analysis." }, { status: 500 });
  }
};
