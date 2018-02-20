import * as kt from 'karma-typescript/src/api/transforms';
import * as log4js from 'log4js';
import * as sinon from 'sinon';
import * as test from 'tape';

import * as transform from './transform';

let logOptions: kt.TransformInitializeLogOptions = {
  appenders: [{
    layout: {
      pattern: '%[%d{DATE}:%p [%c]: %]%m',
      type: 'pattern'
    },
    type: 'console'
  }],
  level: 'INFO'
};

let createContext = (source: string): any => {
  return {
    ts: true,
    config: {},
    filename: 'template.haml',
    module: 'module',
    source
  };
};

let mockLogger = {
  debug: sinon.spy()
};

let getLoggerSpy = sinon.stub(log4js, 'getLogger').returns(mockLogger);
let setGlobalLogLevelSpy = sinon.spy(log4js, 'setGlobalLogLevel');
let configureSpy = sinon.spy(log4js, 'configure');

transform.initialize(logOptions);

test('transformer should initialize log level', (t) => {
  t.isEqual(setGlobalLogLevelSpy.args[0][0], logOptions.level);
  t.end();
});

test('transformer should initialize log appenders', (t) => {
  t.deepEqual(configureSpy.args[0][0], { appenders: logOptions.appenders });
  t.end();
});

test('transformer should initialize log category', (t) => {
  t.deepEqual(getLoggerSpy.args[0][0], 'haml-transform.karma-typescript');
  t.end();
});

test('transformer should check ts property', (t) => {
  t.plan(1);

  let context = createContext('%p');
  context.ts = undefined;

  transform(context, (error: Error, result: kt.TransformResult | boolean) => {
    if (error) {
      t.fail();
    }
    else {
      let dirty: boolean = !!result;
      t.false(dirty);
    }
  });
});

test('transformer should set the dirty flag', (t) => {
  t.plan(1);

  let context = createContext('%p');

  transform(context, (error: Error, result: kt.TransformResult | boolean) => {
    if (error) {
      t.fail();
    }
    t.true(result);
  });
});

test('transformer should transform multiline haml template', (t) => {
  t.plan(1);

  let context = createContext(`.template
    %p First line
    %span
      Another line`);

  transform(context, () => {
    t.isEqual(context.source, '.template\n    %p First line\n    %span\n      Another line');
  });
});

test('tranform should skip non haml files', (t) => {
  t.plan(1);

  let context = createContext('%p');
  context.filename = 'template.html';

  transform(context, (error: Error, result: kt.TransformResult | boolean) => {
    if (error) {
      t.fail();
    }
    let dirty: boolean = !!result;
    t.false(dirty);
  });
});

test('transformer should not process empty files', (t) => {
  t.plan(2);

  let context = createContext('');

  transform(context, (error: Error, result: kt.TransformResult | boolean) => {
    t.isEqual(error.message, 'File is empty');
    t.false(!!result);
  });
});

test('transformer should throw error for incorrect haml templating', (t) => {
  t.plan(2);

  let context = createContext(`.template
    %p First line
        %span
          Another line`);

  transform(context, (error: Error, result: kt.TransformResult | boolean) => {
    t.true(error.message.indexOf('Illegal nesting') !== -1);
    t.false(!!result);
  });
});
