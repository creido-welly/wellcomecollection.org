// @flow
import title from './parts/title';
import promo from './parts/promo';
import list from './parts/list';
import link from './parts/link';
import number from './parts/number';
import articleBody from './parts/article-body';

const Article = {
  Article: {
    title,
    format: link('Format', 'document', ['article-formats']),
    body: articleBody
  },
  Promo: {
    promo
  },
  Contributors: {
    // TODO: deprecate
    'contributors': {
      'type': 'Slices',
      'fieldset': 'Contributors',
      'config': {
        'choices': {
          'person': {
            'type': 'Slice',
            'fieldset': 'Person',
            'non-repeat': {
              'role': {
                'type': 'Link',
                'config': {
                  'label': 'Role',
                  'select': 'document',
                  'customtypes': [ 'editorial-contributor-roles' ],
                  'tags': [ 'editorial' ]
                }
              },
              'person': {
                'type': 'Link',
                'config': {
                  'label': 'Person',
                  'select': 'document',
                  'customtypes': [ 'people' ],
                  'placeholder': 'Select a person…'
                }
              }
            }
          }
        }
      }
    }
  },
  Series: {
    series: list('Series', {
      series: link('Series', 'document', ['event-series']),
      positionInSeries: number('Position in series')
    })
  },
  Migration: {
    'publishDate': {
      'config': {
        'label': 'Override publish date'
      },
      'type': 'Timestamp'
    },
    'wordpressSlug': {
      'config': {
        'label': 'Wordpress slug'
      },
      'type': 'Text'
    }
  }
};

export default Article;
