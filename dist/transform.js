"use strict";
var haml_1 = require("./haml");
var log4js = require("log4js");
var log;
var transform = function (context, callback) {
    if (context.filename.match(/\.haml$/)) {
        log.debug('Transforming %s', context.filename);
        if (!context.source) {
            return callback(new Error('File is empty'), false);
        }
        haml_1.default(context.source)
            .then(function (compiled) {
            context.source = compiled;
            callback(undefined, true);
        })
            .catch(function (error) {
            callback(new Error(error), false);
        });
    }
    else {
        return callback(undefined, false);
    }
};
var initialize = function (logOptions) {
    log4js.setGlobalLogLevel(logOptions.level);
    log4js.configure({
        appenders: logOptions.appenders
    });
    log = log4js.getLogger('haml-transform.karma-typescript');
};
var exp = Object.assign(transform, { initialize: initialize });
module.exports = exp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQTZCO0FBQzdCLCtCQUFpQztBQUdqQyxJQUFJLEdBQWtCLENBQUM7QUFFdkIsSUFBSSxTQUFTLEdBQWlCLFVBQUMsT0FBNEIsRUFBRSxRQUE4QjtJQUN6RixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRCxjQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzthQUNwQixJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDMUIsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1YsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLElBQUksVUFBVSxHQUEyQixVQUFDLFVBQTRDO0lBQ3BGLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNmLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUztLQUNoQyxDQUFDLENBQUM7SUFDSCxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQzVELENBQUMsQ0FBQztBQUVGLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELGlCQUFTLEdBQUcsQ0FBQyJ9