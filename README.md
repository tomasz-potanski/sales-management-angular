Start of application:

Author: Tomasz Potanski, tomasz@potanski.pl

Management panel for sales web app.

[See a demo!](WinkFolder/demo.mp4)

Start
-----

```
node server.js
```

Tests:
------

- protractor

```
webdriver-manager start
```

```
protractor protractor.conf.js
```

Dependencies:
-------------

- node

```
npm i
```

- bower

```
bower install
```

Gulp tasks:
- scss

```
gulp scss
```

- scss watch

```
gulp scss:watch
```

Test dependencies:
------------------

```
npm install -g protractor
```

```
webdriver-manager update
```