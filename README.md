# karma-typescript-haml-transform

[![Travis build status](https://travis-ci.org/mebibou/karma-typescript-haml-transform.svg?branch=master)](https://travis-ci.org/mebibou/karma-typescript-haml-transform)

> Karma-Typescript :heart: Haml

This plugin is a specialized [Haml compiler](http://haml.info/), which transforms haml `require('./template.html.haml')` templates to HTML on the fly when running tests with [karma-typescript](https://github.com/monounity/karma-typescript).
The plugin is using the `haml` gem directly so be sure you have it [installed before](https://github.com/haml/haml#basic-usage).

## Installation

```
$ npm install --save-dev karma-typescript-haml-transform
```

## Configuration

In the `karma-typescript` section of `karma.conf.js`:

```javascript
karmaTypescriptConfig: {
    bundlerOptions: {
        transforms: [
            require("karma-typescript-haml-transform")()
        ]
    }
}
```
