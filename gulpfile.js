var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var gulpConnect = require("gulp-connect");
var gulpOpen = require("gulp-open");
gulp.task("server",function(){
    return gulpConnect.server({
        port:"6001",
        debug:true
    });
});
gulp.task("openPage",function(){
  var pageUrl = "http://sdk.iqiyi.com:6001/public/main.html";
  return gulp.src('')
    .pipe(gulpOpen({
      uri:pageUrl
    }));
});
gulp.task("dev",gulpSequence(["server","openPage"]));