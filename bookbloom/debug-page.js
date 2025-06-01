const puppeteer = require('puppeteer');
const fs = require('fs');

async function debugPage() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewport({ width: 1280, height: 800 });
  
  try {
    console.log('Navigating to localhost:3001/dashboard...');
    await page.goto('http://localhost:3001/dashboard', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    // Wait a bit for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get page title and content
    const title = await page.title();
    console.log('Page title:', title);
    
    // Get the HTML content
    const htmlContent = await page.content();
    console.log('HTML Content length:', htmlContent.length);
    
    // Check for any errors in console
    const logs = [];
    page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));
    page.on('pageerror', error => logs.push(`PAGE ERROR: ${error.message}`));
    
    // Take a screenshot
    await page.screenshot({ 
      path: './debug-screenshot.png',
      fullPage: true 
    });
    console.log('Screenshot saved to debug-screenshot.png');
    
    // Get any visible text
    const bodyText = await page.evaluate(() => {
      return document.body.innerText || document.body.textContent || '';
    });
    
    console.log('\n=== PAGE TEXT CONTENT ===');
    console.log(bodyText.substring(0, 1000) + (bodyText.length > 1000 ? '...' : ''));
    
    // Save full text for inspection
    const fs = require('fs');
    fs.writeFileSync('./debug-full-text.txt', bodyText);
    
    console.log('\n=== CONSOLE LOGS ===');
    logs.forEach(log => console.log(log));
    
    // Check for specific elements
    const hasNavigation = await page.$('nav') !== null;
    const hasHeader = await page.$('header') !== null;
    const hasMain = await page.$('main') !== null;
    const hasSidebar = await page.$('aside') !== null;
    
    console.log('\n=== ELEMENTS FOUND ===');
    console.log('Has navigation:', hasNavigation);
    console.log('Has header:', hasHeader);
    console.log('Has main:', hasMain);
    console.log('Has sidebar:', hasSidebar);
    
    // Check for React hydration
    const reactRoot = await page.evaluate(() => {
      return !!window.React || !!document.querySelector('#__next') || !!document.querySelector('[data-reactroot]');
    });
    console.log('React detected:', reactRoot);
    
    // Save HTML content for inspection
    fs.writeFileSync('/Users/nicholasmangubat/bookbloom/debug-html.html', htmlContent);
    console.log('HTML content saved to debug-html.html');
    
  } catch (error) {
    console.error('Error loading page:', error.message);
  }
  
  await browser.close();
}

debugPage().catch(console.error);