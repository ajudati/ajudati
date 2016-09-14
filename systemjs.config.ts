declare var System: any;
(function(global){
  System.config({
    paths:{'npm:':'node_modules/'},
    map: {
      "app":"client",
      '@angular/core':                     'npm:@angular/core/bundles/core.umd.min.js',
      '@angular/common':                   'npm:@angular/common/bundles/common.umd.min.js',
      '@angular/compiler':                 'npm:@angular/compiler/bundles/compiler.umd.min.js',
      '@angular/platform-browser':         'npm:@angular/platform-browser/bundles/platform-browser.umd.min.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
      '@angular/http':                     'npm:@angular/http/bundles/http.umd.min.js',
      '@angular/http/testing':             'npm:@angular/http/bundles/http-testing.umd.js',
      '@angular/router':                   'npm:@angular/router/bundles/router.umd.min.js',
      '@angular/forms':                    'npm:@angular/forms/bundles/forms.umd.min.js',
      'angular2-in-memory-web-api':        'npm:angular2-in-memory-web-api',
      "rxjs":                              'npm:rxjs'
    },
    packages:{
      app:{
        main:'./main.js',
        defaultExtension:'js'
      },
      rxjs:{
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: 'index.js', 
        defaultExtension: 'js' 
      },
    }
  });
})(this)
