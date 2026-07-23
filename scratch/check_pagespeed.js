async function checkPageSpeed(strategy) {
  const url = 'https://www.careerwithmohit.online';
  const apiEndpoint = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`;
  
  console.log(`Fetching PageSpeed Insights for ${strategy.toUpperCase()}...`);
  
  try {
    const res = await fetch(apiEndpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    
    const lh = data.lighthouseResult;
    const categories = lh.categories;
    const audits = lh.audits;
    
    const performance = Math.round(categories.performance.score * 100);
    const accessibility = Math.round(categories.accessibility.score * 100);
    const bestPractices = Math.round(categories['best-practices'].score * 100);
    const seo = Math.round(categories.seo.score * 100);
    
    const fcp = audits['first-contentful-paint']?.displayValue || 'N/A';
    const lcp = audits['largest-contentful-paint']?.displayValue || 'N/A';
    const cls = audits['cumulative-layout-shift']?.displayValue || 'N/A';
    const tbt = audits['total-blocking-time']?.displayValue || 'N/A';
    const speedIndex = audits['speed-index']?.displayValue || 'N/A';
    const interactive = audits['interactive']?.displayValue || 'N/A';
    
    console.log(`\n=== RESULTS FOR ${strategy.toUpperCase()} ===`);
    console.log(`Lighthouse Scores:`);
    console.log(`- Performance:     ${performance}/100`);
    console.log(`- Accessibility:   ${accessibility}/100`);
    console.log(`- Best Practices:  ${bestPractices}/100`);
    console.log(`- SEO:             ${seo}/100`);
    console.log(`\nCore Audits / Performance Metrics:`);
    console.log(`- First Contentful Paint (FCP):         ${fcp}`);
    console.log(`- Largest Contentful Paint (LCP):       ${lcp}`);
    console.log(`- Cumulative Layout Shift (CLS):       ${cls}`);
    console.log(`- Total Blocking Time (TBT):            ${tbt}`);
    console.log(`- Speed Index:                          ${speedIndex}`);
    console.log(`- Time to Interactive (TTI):            ${interactive}`);
    console.log(`=========================================\n`);
    
    return {
      strategy,
      scores: { performance, accessibility, bestPractices, seo },
      metrics: { fcp, lcp, cls, tbt, speedIndex, interactive }
    };
  } catch (error) {
    console.error(`Error running PageSpeed for ${strategy}:`, error);
    return null;
  }
}

async function main() {
  const mobileResults = await checkPageSpeed('mobile');
  const desktopResults = await checkPageSpeed('desktop');
  
  if (mobileResults && desktopResults) {
    console.log("PageSpeed analysis finished successfully.");
  } else {
    console.log("PageSpeed analysis completed with errors.");
  }
}

main();
