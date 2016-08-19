/**
 * PLUNKER VERSION (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    var ngVer = '@2.0.0-rc.5'; // lock in the angular package version; do not let it float to current!
    var routerVer = '@3.0.0-rc.1'; // lock router version
    var formsVer = '@0.3.0'; // lock forms version
    var routerDeprecatedVer = '@2.0.0-rc.2'; // temporarily until we update all the guides

    //map tells the System loader where to look for things
    var map = {
        'app': 'app',
        'components': 'components',
        '@angular': 'https://npmcdn.com/@angular',
        'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api',
        'moment': 'https://npmcdn.com/moment@2.14.1',
        'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6',
        'ts': 'https://npmcdn.com/plugin-typescript@4.0.10/lib',
        'typescript': 'https://npmcdn.com/typescript@1.8.10',
    };

    //packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.ts', defaultExtension: 'ts' },
        'components': { main: 'peoplepicker.ts', defaultExtension: 'ts' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'moment': { defaultExtension: 'js', main: 'moment.min.js' },
        'ts': { main: 'plugin.js' },
        'typescript': {
            main: 'lib/typescript.js',
            meta: {
                'lib/typescript.js': {
                    exports: 'ts'
                }
            }
        }
    };

    var ngPackageNames = [
      'common',
      'compiler',
      'core',
      'http',
      'forms',
      'platform-browser',
      'platform-browser-dynamic',
      'router',
      'router-deprecated',
      'upgrade'
    ];

    // Add map entries for each angular package
    // only because we're pinning the version with `ngVer`.
    ngPackageNames.forEach(function (pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
        transpiler: 'ts',
        typescriptOptions: {
            tsconfig: true
        },
        meta: {
            'typescript': {
                "exports": "ts"
            }
        },
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/