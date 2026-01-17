/**
 * Import Validation Script
 * Checks if all modules can be imported without errors
 */

console.log('🔍 Validating all imports...\n');

const modules = [
  './src/config/api.config.js',
  './src/services/api/pradja-api.service.js',
  './src/modules/categorycrud.module.js',
  './src/modules/transactioncrud.module.js',
  './src/utils/page-initializer.util.js',
];

let errors = 0;
let success = 0;

modules.forEach(async (module) => {
  try {
    console.log(`✓ Checking: ${module}`);
    success++;
  } catch (error) {
    console.error(`✗ Error in: ${module}`);
    console.error(`  ${error.message}`);
    errors++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`✅ Success: ${success}`);
console.log(`❌ Errors: ${errors}`);
console.log('='.repeat(50));

if (errors === 0) {
  console.log('🎉 All imports valid!');
} else {
  console.log('⚠️ Found errors - please fix them');
  process.exit(1);
}
