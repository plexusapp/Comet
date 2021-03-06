const gulp = require('gulp');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const childProcess = require("child_process");
const electron = require("electron");
const del = require("del");
const builder = require("electron-builder");

gulp.task('start', gulp.series(compile, copy, start));
gulp.task('build', gulp.series(compile, copy, build));
gulp.task('clean', clean);
gulp.task('cbuild', gulp.series(clean, compile, copy, build));

function start(complete) {
    childProcess.spawn(electron, ["app/main.js"], {
        stdio: "inherit"
    }).on("close", function() {
        process.exit();
    });

    complete();
}

function compile(complete) {
    tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("app"));

    complete();
}

function build() {
    return builder.build();
}

function copy(complete) {
    gulp.src(["src/**/*", "!src/**/*.ts"]).pipe(gulp.dest("app"));

    complete();
}

function clean(complete) {
    del("app/**/*");
    del("dist/**/*");

    complete();
}
