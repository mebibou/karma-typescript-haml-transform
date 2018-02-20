import compile from './haml';
import * as log4js from 'log4js';
import * as kt from 'karma-typescript/src/api/transforms';

let log: log4js.Logger;

let transform: kt.Transform = (context: kt.TransformContext, callback: kt.TransformCallback) => {
  if (context.filename.match(/\.haml$/)) {
    log.debug('Transforming %s', context.filename);

    if (!context.source) {
      return callback(new Error('File is empty'), false);
    }

    compile(context.source)
      .then(compiled => {
        context.source = compiled;
        callback(undefined, true);
      })
      .catch(error => {
        callback(new Error(error), false);
      });
  }
  else {
    return callback(undefined, false);
  }
};

let initialize: kt.TransformInitialize = (logOptions: kt.TransformInitializeLogOptions) => {
  log4js.setGlobalLogLevel(logOptions.level);
  log4js.configure({
    appenders: logOptions.appenders
  });
  log = log4js.getLogger('haml-transform.karma-typescript');
};

let exp = Object.assign(transform, { initialize });
export = exp;
