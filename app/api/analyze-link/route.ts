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

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            }
        });
        
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to access the response sheet. NTA servers might be busy or the link is private.' }, { status: 400 });
        }

        const html = await response.text();

        // More robust patterns matching the specific bold class structure
        const questionMatches = Array.from(html.matchAll(/Question ID ?: ?<\/td><td[^>]*>(\d+)<\/td>/g)).map(m => m[1]);
        const statusMatches = Array.from(html.matchAll(/Status ?: ?<\/td><td[^>]*>(Answered|Not Answered|Marked for Review)<\/td>/g)).map(m => m[1]);
        const optionMatches = Array.from(html.matchAll(/Chosen Option ?: ?<\/td><td[^>]*>(.*?)<\/td>/g)).map(m => m[1].replace(/&nbsp;/g, '').trim());

        if (questionMatches.length === 0) {
            return NextResponse.json({ error: 'No question data found. Please ensure you are pasting the correct Response Sheet URL.' }, { status: 400 });
        }

        const answeredCount = statusMatches.filter(s => s === 'Answered').length;

        return NextResponse.json({
            success: true,
            data: {
                totalFetched: questionMatches.length,
                answeredCount: answeredCount,
                unansweredCount: questionMatches.length - answeredCount,
                questions: questionMatches.map((mid, i) => ({
                    questionId: mid,
                    status: statusMatches[i] || 'Unknown',
                    chosenOption: optionMatches[i] || '--'
                }))
            }
        });

    } catch (error: any) {
        console.error('Analysis Error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred during analysis.' }, { status: 500 });
    }
}
