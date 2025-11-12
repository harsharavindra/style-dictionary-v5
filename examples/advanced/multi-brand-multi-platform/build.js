import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';

const { androidColors, androidDimens, androidFontDimens, iosMacros, scssVariables } = formats;
const { web } = transformGroups;

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(brand, platform) {
  return {
    source: [
      `tokens/core/**/*.json`,
      `tokens/brands/nib/**/*.json`,
    ],
    platforms: {
      web: {
        transformGroup: web,
        buildPath: `build/web/nib/`,
        files: [
          {
            destination: 'tokens.scss',
            format: scssVariables,
          },
        ],
      },
      android: {
        transformGroup: 'android',
        buildPath: `build/android/nib/`,
        files: [
          {
            destination: 'tokens.colors.xml',
            format: androidColors,
          },
          {
            destination: 'tokens.dimens.xml',
            format: androidDimens,
          },
          {
            destination: 'tokens.font_dimens.xml',
            format: androidFontDimens,
          },
        ],
      },
      ios: {
        transformGroup: 'ios',
        buildPath: `build/ios/nib/`,
        files: [
          {
            destination: 'tokens.h',
            format: iosMacros,
          },
        ],
      },
    },
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['nib'].map(function (brand) {
  ['web', 'ios', 'android'].map(function (platform) {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${platform}] [nib]`);

    const sd = new StyleDictionary(getStyleDictionaryConfig(brand, platform));
    sd.buildPlatform(platform);
  });
});

console.log('\n==============================================');
console.log('\nBuild completed!');
