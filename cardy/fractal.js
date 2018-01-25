const path = require('path');
const Fractal = require('@frctl/fractal');
const mandelbrot = require('@frctl/mandelbrot');
const statuses = require('./config/statuses');
const fractal = Fractal.create();

fractal.set('project.title', 'Design system');
fractal.components.set('path', path.join(__dirname, '../common/views'));

var reactAdapter = require('fractal-react-adapter')({
  babelConfig: {
    extensions: ['.js', '.jsx']
  }
});
fractal.components.engine(reactAdapter);
fractal.components.set('ext', '.js');
fractal.components.set('statuses', statuses);
fractal.components.set('default.status', 'wip');
fractal.components.set('default.preview', '@preview');
fractal.components.set('default.collator', function(markup, item) {
  return (`
    <hr class="divider divider--keyline divider--pumice" style="margin: 6px 0;" />
    <h2 class="styleguide__font__example--HNM5" style="margin-bottom: 24px;">${item.label}</h2>
    <div style="margin-bottom: 24px;">
      ${markup}
    </div>
  `);
});

fractal.web.set('static.path', dir('./../dist'));
fractal.web.set('builder.dest', '.dist');

fractal.docs.set('path', dir('docs'));
fractal.docs.set('ext', '.jsx');
fractal.docs.engine(reactAdapter);

const cardiganTheme = mandelbrot({
  skin: 'teal',
  styles: ['default', '/dist-styles/styleguide.css'],
  favicon: '/cardigan-theme/assets/favicon.ico'
});

cardiganTheme.addLoadPath(dir('cardigan-theme'));
cardiganTheme.addStatic(dir('cardigan-theme'), '/cardigan-theme');
cardiganTheme.addStatic(dir('./../dist/assets/css/'), '/dist-styles');
fractal.web.theme(cardiganTheme);

function dir(relPath) {
  return path.join(__dirname, relPath);
}

module.exports = fractal;