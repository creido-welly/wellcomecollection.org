import {PageConfig} from '../model/page-config';
import {getPosts, getArticle} from '../services/wordpress';
import {getArtefact} from '../services/artefacts';

export const artefact = async(ctx, next) => {
  const id = ctx.params.id;
  const artefact = await getArtefact(id);

  return artefact ? ctx.render('pages/article', {
    pageConfig: new PageConfig({
      title: artefact.title,
      inSection: 'explore'
    }),
    article: artefact
  }) : next();
};

export const article = async(ctx, next) => {
    const id = ctx.params.id;
    const format = ctx.request.query.format;
    const article = await getArticle(id);

    if (article) {
      if (format === 'json') {
        ctx.body = article;
        return article;
      } else {
        return ctx.render('pages/article', {
          pageConfig: new PageConfig({
            title: article.headline,
            inSection: 'explore'
          }),
          article: article
        });
      }
    } else {
      return next();
    }
};

export const explore = async(ctx) => {
  const wpPosts = await getPosts();
  return ctx.render('pages/explore', {
    pageConfig: new PageConfig({
      title: 'Explore',
      inSection: 'explore'
    }),
    wpPosts
  });
};

export const index = (ctx) => ctx.render('pages/index', {
  pageConfig: new PageConfig({inSection: 'index'})
});

export const healthcheck = (ctx) => ctx.body = 'ok';

export const performanceTest = async(ctx, next) => {
  const articleId = 'a-drop-in-the-ocean-daniel-regan';
  const startTime = process.hrtime();
  const article = await getArticle(articleId);

  ctx.render('pages/article', {
    pageConfig: new PageConfig({inSection: 'explore'}),
    article: article
  });

  const endTime = process.hrtime(startTime);
  const endTimeFormatted = `${endTime[0]}s ${endTime[1]/1000000}ms`;

  ctx.type = 'application/javascript';
  ctx.body = `
    if (console) {
      console.log('Incoming from next.wellcomecollection.org, ${articleId} took ${endTimeFormatted}');
    }
  `;

  return next();
};

export const explosion = (ctx) => {
  const {errorCode} = ctx.params;
  const message = `Forced explosion of type ${errorCode}`;
  ctx.status = parseInt(errorCode, 10);
  ctx.body = { errorCode, message };
};
