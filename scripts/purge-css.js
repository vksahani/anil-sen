const { PurgeCSS } = require('purgecss');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const purgeCSSConfig = {
  content: [
    './dist/vishal-portfolio/**/*.html',
    './dist/vishal-portfolio/**/*.js'
  ],
  css: [
    './dist/vishal-portfolio/**/*.css'
  ],
  safelist: [
    // Angular Material classes
    /^mat-/,
    /^cdk-/,
    // Bootstrap classes that might be used dynamically
    /^btn-/,
    /^col-/,
    /^row/,
    /^container/,
    // Animation classes
    /^fade/,
    /^slide/,
    /^scale/,
    // Theme classes
    /^theme-/,
    /^dark/,
    /^light/,
    // State classes
    /^active/,
    /^visible/,
    /^expanded/,
    /^loading/,
    // Focus and hover states
    /:hover/,
    /:focus/,
    /:active/,
    // Responsive classes
    /@media/
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
};

async function purgeUnusedCSS() {
  try {
    console.log('🧹 Starting CSS purge process...');
    
    // Check if dist directory exists
    const distPath = path.join(__dirname, '../dist/vishal-portfolio');
    if (!fs.existsSync(distPath)) {
      console.error('❌ Build directory not found. Please run "npm run build:prod" first.');
      process.exit(1);
    }

    // Find all CSS files
    const cssFiles = glob.sync('./dist/vishal-portfolio/**/*.css');
    console.log(`📁 Found ${cssFiles.length} CSS files to process`);

    let totalOriginalSize = 0;
    let totalPurgedSize = 0;

    for (const cssFile of cssFiles) {
      const originalContent = fs.readFileSync(cssFile, 'utf8');
      const originalSize = Buffer.byteLength(originalContent, 'utf8');
      totalOriginalSize += originalSize;

      // Configure PurgeCSS for this specific file
      const result = await new PurgeCSS().purge({
        ...purgeCSSConfig,
        css: [cssFile]
      });

      if (result && result[0]) {
        const purgedContent = result[0].css;
        const purgedSize = Buffer.byteLength(purgedContent, 'utf8');
        totalPurgedSize += purgedSize;

        // Write the purged CSS back to the file
        fs.writeFileSync(cssFile, purgedContent);

        const reduction = ((originalSize - purgedSize) / originalSize * 100).toFixed(1);
        console.log(`✅ ${path.basename(cssFile)}: ${originalSize} → ${purgedSize} bytes (${reduction}% reduction)`);
      }
    }

    const totalReduction = ((totalOriginalSize - totalPurgedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`\n🎉 CSS purge completed!`);
    console.log(`📊 Total size: ${totalOriginalSize} → ${totalPurgedSize} bytes`);
    console.log(`💾 Total reduction: ${totalReduction}%`);

  } catch (error) {
    console.error('❌ Error during CSS purge:', error);
    process.exit(1);
  }
}

// Run the purge process
if (require.main === module) {
  purgeUnusedCSS();
}

module.exports = { purgeUnusedCSS };