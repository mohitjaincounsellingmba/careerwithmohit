import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Validate that it looks like an NTA URL
        if (!url.includes('digialm.com') && !url.includes('nta.ac.in')) {
            return NextResponse.json({ error: 'Please provide a valid NTA Response Sheet URL.' }, { status: 400 });
        }

        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch the response sheet. The link might be expired or protected.' }, { status: 400 });
        }

        const html = await response.text();

        // Regex patterns for NTA response sheets
        // Question ID : </td><td class="tf">(\d+)</td>
        // Status : </td><td class="tf">(Answered|Not Answered)</td>
        // Chosen Option : </td><td class="tf">(\d+| -- )</td>

        const questionMatches = html.matchAll(/Question ID ?: ?<\/td><td[^>]*>(\d+)<\/td>/g);
        const statusMatches = html.matchAll(/Status ?: ?<\/td><td[^>]*>(Answered|Not Answered|Marked for Review)<\/td>/g);
        const optionMatches = html.matchAll(/Chosen Option ?: ?<\/td><td[^>]*>(\d+| -- |&nbsp;)<\/td>/g);

        const questions = Array.from(questionMatches).map(m => m[1]);
        const statuses = Array.from(statusMatches).map(m => m[1]);
        const options = Array.from(optionMatches).map(m => m[1].trim());

        if (questions.length === 0) {
            return NextResponse.json({ error: 'Could not find question data in the provided URL. Make sure it is the correct response sheet page.' }, { status: 400 });
        }

        const answeredCount = statuses.filter(s => s === 'Answered').length;

        return NextResponse.json({
            success: true,
            data: {
                totalFetched: questions.length,
                answeredCount: answeredCount,
                unansweredCount: questions.length - answeredCount,
                questions: questions.map((qId, i) => ({
                    questionId: qId,
                    status: statuses[i] || 'Unknown',
                    chosenOption: options[i] || '--'
                }))
            }
        });

    } catch (error: any) {
        console.error('Analysis Error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred during analysis.' }, { status: 500 });
    }
}
