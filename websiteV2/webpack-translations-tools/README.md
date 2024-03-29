# :globe_with_meridians: Webpack Translations Tools

This is a [Webpack](https://webpack.js.org/) plugin that creates bundles for each of the existing translations files automatically, with reasonable defaults. 

Using it enables only serving the translations the user needs, therefore increasing performance.

## Usage

### Installation

`npm install --save-dev webpack-translations-plugin`

### Webpack config

```javascript
import WebpackTranslationsPlugin from 'webpack-translations-plugin';

export default {
  ...,
  plugins: [..., new WebpackTranslationsPlugin()]
};
```

`WebpackTranslationsPlugin` takes an optional `options` object for configuration:

| Option         | Description                                                                                      |          Default |
|----------------|--------------------------------------------------------------------------------------------------|-----------------:|
| `directory`    | containing translation JSONs                                                                     |   `translations` |
| `fileNameBase` | for translation JSONs (source file name without the extension)                                   |       `messages` |
| `moduleName`   | will resolve as the translations object                                                          |   `translations` |
| `development`  | if `true`, will double escape the strings to work with webpack-dev-server                        |          `false` |

### Source files

```javascript
import translations from 'translations';

const languages = Object.keys(translations);

if (languages.length === 1) {
  // we only have one translation object
  const language = languages[0];
  console.log(translations[language]['a.translation.key']);
} else {
  // we have all translations objects, so f.e. we can do:
  console.log(translations['en-US']['a.translation.key']);
}
```

### File tree example

#### With translation files

```bash
.
├── node_modules
├── translations
│   ├── messages.json
│   ├── messages.en.json
│   ├── messages.en-US.json
│   └── messages.it.json
├── package.json
└── webpack.config.js
```

* `options.directory` is `'translations'`
* `options.fileNameBase` is `'messages'`
* `options.moduleName` is `'translations'`

As these are all defaults, no `options` object needs to be passed.

This will produce the following:

```bash
.
├── dist
│   ├── main.js
│   ├── main.en.js
│   ├── main.en-US.js
│   └── main.it.js
├── node_modules
├── translations
│   ├── messages.json
│   ├── messages.en.json
│   ├── messages.en-US.json
│   ├── messages.it.json
├── package.json
└── webpack.config.js
```

where `main.js` contain all the translations, so `'translations'` resolves as:

```javascript
{
  "en": {
    ...
  },
  "en-US": {
    ...
  },
  "it": {
    ...
  }
}
```

and `main.en.js`, `main.en-US.js` and `main.it.js` contain only the specific translations, so for `en-US` `'translations'` resolves as:

```javascript
{
  "en-US": {
    ...
  }
}
```

#### With only the source file

```bash
.
├── node_modules
├── translations
│   └── messages.json
├── package.json
└── webpack.config.js
```

No `options` object needs to be passed, as we're using the default values. The following will be built:

```bash
.
├── dist
│   └── main.js
├── node_modules
├── translations
│   └── messages.json
├── package.json
└── webpack.config.js
```

where `main.js` contain the source translations, under the `"source"` key:

```javascript
{
  "source": {
    ...
  }
}
```

## Contributing

1. Run tests with `npm run jest`. `npm test` will check for package and changelog version match, ESLint and Prettier format in addition.
2. Develop.
3. **Bump version number in `package.json` according to [semver](http://semver.org/) and add an item that a release will be based on to `CHANGELOG.md`**.
4. Submit your pull request from a feature branch and get code reviewed.
5. If the pull request is approved and the [CircleCI build](https://circleci.com/gh/transferwise/webpack-translations-plugin) passes, you will be able to squash and merge.
