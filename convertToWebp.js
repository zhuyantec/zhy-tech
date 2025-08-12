// convertToWebp.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

// Required dependencies: npm install glob sharp

// Configuration
const IMAGE_DIRS = ['public']; // Directories containing images
const CODE_DIRS = ['src']; // Directories containing code files
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png']; // Image formats to convert
const CODE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css']; // File types that might contain image references

// Function to convert images
async function convertImages() {
  // Install image processing library if not exists
  try {
    require('sharp');
  } catch (e) {
    console.log('Installing sharp library...');
    execSync('npm install sharp');
  }

  const sharp = require('sharp');

  // Collect all image paths
  let allImages = [];
  IMAGE_DIRS.forEach(dir => {
    IMAGE_EXTENSIONS.forEach(ext => {
      const images = glob.sync(`${dir}/**/*${ext}`);
      allImages = [...allImages, ...images];
    });
  });

  console.log(`Found ${allImages.length} images to convert`);

  // Convert images and save mapping relationships
  const imageMap = {};

  for (const imagePath of allImages) {
    const parsedPath = path.parse(imagePath);
    const webpPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

    try {
      // Use sharp to convert image to WebP format, 80% quality
      await sharp(imagePath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      console.log(`Converted: ${imagePath} → ${webpPath}`);

      // Save original path to new path mapping
      imageMap[imagePath] = webpPath;

      // Get file sizes
      const originalSize = fs.statSync(imagePath).size;
      const webpSize = fs.statSync(webpPath).size;
      const savings = ((1 - webpSize / originalSize) * 100).toFixed(2);

      console.log(`  Size reduction: ${(originalSize / 1024).toFixed(2)}KB → ${(webpSize / 1024).toFixed(2)}KB (saved ${savings}%)`);
    } catch (error) {
      console.error(`Failed to convert ${imagePath}:`, error);
    }
  }

  return imageMap;
}

// Replace references in code
function replaceReferences(imageMap) {
  // Collect all code files
  let codeFiles = [];
  CODE_DIRS.forEach(dir => {
    CODE_EXTENSIONS.forEach(ext => {
      const files = glob.sync(`${dir}/**/*${ext}`);
      codeFiles = [...codeFiles, ...files];
    });
  });

  console.log(`\nStarting to replace references in ${codeFiles.length} code files...`);

  // Process each file
  for (const filePath of codeFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Replace all image references
    for (const [originalPath, webpPath] of Object.entries(imageMap)) {
      // Create relative path versions for matching (handling different reference styles)
      const relativePath = path.basename(originalPath);
      const relativeWebpPath = path.basename(webpPath);

      // Try to match different reference patterns
      const patterns = [
        originalPath,
        originalPath.replace(/\\/g, '/'),
        `/${originalPath.replace(/\\/g, '/')}`,
        relativePath
      ];

      for (const pattern of patterns) {
        if (content.includes(pattern)) {
          const replacement = pattern === relativePath
            ? relativeWebpPath
            : webpPath.replace(/\\/g, '/');

          // Replace strings
          content = content.split(pattern).join(replacement);
          hasChanges = true;
          console.log(`  In ${filePath} replaced: ${pattern} → ${replacement}`);
        }
      }
    }

    // Save changes
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

// Delete original images
function deleteOriginalImages(imageMap) {
  console.log('\nStarting to delete original images...');

  for (const imagePath of Object.keys(imageMap)) {
    try {
      fs.unlinkSync(imagePath);
      console.log(`  Deleted: ${imagePath}`);
    } catch (error) {
      console.error(`  Unable to delete ${imagePath}:`, error);
    }
  }
}

// Main function
async function main() {
  try {
    console.log('Starting conversion of images to WebP format...\n');

    // Convert images and get mapping
    const imageMap = await convertImages();

    // Replace references
    replaceReferences(imageMap);

    // Delete original images
    deleteOriginalImages(imageMap);

    console.log('\n✅ All operations completed!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();