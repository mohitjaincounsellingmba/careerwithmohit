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

        const segments = html.split(/Question\s*ID\s*:/i);
        const questionBlocks = segments.slice(1);

        const questionsList = questionBlocks.map((block) => {
            const idMatch = block.match(/(?:<\/td>\s*<td[^>]*>)?\s*(\d+)/i);
            const questionId = idMatch ? idMatch[1] : 'Unknown';

            const statusMatch = block.match(/Status\s*:\s*(?:<\/td>\s*<td[^>]*>)?\s*([^<>\n\r]+?)\s*(?:<\/td>)?(?:\s*<|\s*\n|\s*\r|$)/i);
            const status = statusMatch ? statusMatch[1].replace(/&nbsp;/g, '').trim() : 'Unknown';

            const optionMatch = block.match(/Chosen\s*Option\s*:\s*(?:<\/td>\s*<td[^>]*>)?\s*([^<>\n\r]+?)\s*(?:<\/td>)?(?:\s*<|\s*\n|\s*\r|$)/i);
            const chosenOption = optionMatch ? optionMatch[1].replace(/&nbsp;/g, '').trim() : '--';

            return { questionId, status, chosenOption };
        }).filter(q => q.questionId !== 'Unknown');

        if (questionsList.length === 0) {
            return NextResponse.json({ error: 'No question data found. Please ensure you are pasting the correct Response Sheet URL.' }, { status: 400 });
        }

        const answeredCount = questionsList.filter(q => q.status === 'Answered').length;

        return NextResponse.json({
            success: true,
            data: {
                totalFetched: questionsList.length,
                answeredCount: answeredCount,
                unansweredCount: questionsList.length - answeredCount,
                questions: questionsList
            }
        });

    } catch (error: any) {
        console.error('Analysis Error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred during analysis.' }, { status: 500 });
    }
}
