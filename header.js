import header from 'gulp-header';

export default function(pkg) {
  return header(`/**
 * ${pkg.name} v${pkg.version}
 * Copyright (c) 2014-2015 ${pkg.author}
 *
 * ${pkg.description}.
 *
 * Licensed under the ${pkg.license} license.
 */\n\n`);
}
