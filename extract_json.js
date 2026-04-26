const fs = require('fs');

try {
  const html = fs.readFileSync('shiksha.html', 'utf8');
  
  // Try to find NEXT_DATA or similar
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
  
  if (match && match[1]) {
    const data = JSON.parse(match[1]);
    fs.writeFileSync('shiksha_data.json', JSON.stringify(data, null, 2));
    console.log("Extracted __NEXT_DATA__ to shiksha_data.json");
  } else {
    // maybe try to find initial_state
    const stateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*(.*?);/s);
    if (stateMatch && stateMatch[1]) {
      const data = JSON.parse(stateMatch[1]);
      fs.writeFileSync('shiksha_data.json', JSON.stringify(data, null, 2));
      console.log("Extracted __INITIAL_STATE__ to shiksha_data.json");
    } else {
      console.log("Could not find JSON data in HTML");
      // Let's try to extract specific tokens to help us find the right variable
      const scriptTags = html.match(/<script(.*?)>(.*?)<\/script>/gs);
      if (scriptTags) {
          scriptTags.forEach((tag, idx) => {
              if (tag.includes('window.') && tag.includes('JSON.parse')) {
                  fs.writeFileSync(`script_${idx}.js`, tag);
              }
          })
      }
    }
  }
} catch (e) {
  console.error(e);
}
