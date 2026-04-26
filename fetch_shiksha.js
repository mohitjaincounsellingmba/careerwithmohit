const fs = require('fs');

async function fetchHTML() {
  const url = "https://www.shiksha.com/engineering/ranking/top-engineering-colleges-in-india/44-2-0-0-0?rs[]=1798&rf=filters&co[]=private&uaf[]=college_ownership";
  try {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    });
    const data = await response.text();
    fs.writeFileSync('shiksha.html', data);
    console.log('Saved to shiksha.html');
  } catch (error) {
    console.error(error);
  }
}

fetchHTML();
