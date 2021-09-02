const cleanupIDs = require('svgo/plugins/cleanupIDs');
const removeAttrs = require('svgo/plugins/removeAttrs');
const removeDimensions = require('svgo/plugins/removeDimensions');
const inlineStyles = require('svgo/plugins/inlineStyles');
const inlineDefs = require('@nuxtjs/svg-sprite/lib/plugins/inlineDefs.js');

export function defaultPlugins() {
  removeAttrs.active = true;
  removeAttrs.params.attrs = ['fill', 'stroke'];

  removeDimensions.active = true;

  inlineStyles.active = true;
  inlineStyles.params.onlyMatchedOnce = true;

  return [
    removeDimensions,
    cleanupIDs,
    removeAttrs,
    inlineStyles,
    { inlineDefs },
  ];
}

export const svgoConfig = {
  plugins: defaultPlugins(),
};
