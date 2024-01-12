const del = require('del');
(async () => {
  const deletedPaths = await del(['dist/**/*.styl']);
  console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
})();
