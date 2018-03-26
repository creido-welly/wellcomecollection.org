import {List} from 'immutable';
import {createPageConfig} from '../model/page-config';
import {getWork, getWorks} from '../services/wellcomecollection-api';
import {createResultsList} from '../model/results-list';
import {PaginationFactory} from '../model/pagination';
import {isFlagEnabled, getFlagValue} from '../utils/flag-status';
import {worksLandingPromos, henryImage} from '../data/works';
import getLicenseInfo from '../filters/get-license-info';
import {getLinkObjects} from '../filters/get-link-objects';

function imageUrlFromMiroId(id) {
  const cleanedMiroId = id.match(/(^\w{1}[0-9]*)+/g, '')[0];
  const miroFolder = `${cleanedMiroId.slice(0, -3)}000`;

  return `https://s3-eu-west-1.amazonaws.com/miro-images-public/${miroFolder}/${id}.jpg`;
}

function encoreLinkFromSierraId(id) {
  return `http://search.wellcomelibrary.org/iii/encore/record/C__R${id}`;
}

function getTruncatedTitle(title) {
  if (title.length <= 20) {
    return title;
  } else {
    return `${title.slice(0, 20)}…`;
  }
}

function getImageIndex(ctx) {
  const [flags] = ctx.intervalCache.get('flags');
  const imageIndex = isFlagEnabled(ctx.featuresCohort, 'imageIndex', flags) && getFlagValue(ctx.featuresCohort, 'imageIndex', flags);
  return imageIndex;
}

function constructCreatorsString(creators) {
  if (creators.length > 0) {
    const creatorsString =  creators.reduce((acc, creator, index) => {
      if (index === 0) {
        return `${acc} ${creator.label}`;
      } else if (index + 1 === creators.length) {
        return `${acc} and ${creator.label}`;
      } else {
        return `${acc}, ${creator.label}`;
      }
    }, 'by');
    return creatorsString;
  } else {
    return '';
  }
}

function constructLicenseString(licenseType) {
  const licenseInfo = getLicenseInfo(licenseType);
  return `<a href="${licenseInfo.url}">${licenseInfo.text}</a>`;
}

function constructAttribution(singleWork, credit, canonicalUri) {
  const title = singleWork.title ? `'${singleWork.title}' ` : '';
  const creators = constructCreatorsString(singleWork.creators);
  const license = constructLicenseString(singleWork.thumbnail.license.licenseType);
  return [`${title} ${creators}. Credit: <a href="${canonicalUri}">${credit}</a>. ${license}`];
}

function createMetaContentArray(singleWork, descriptionArray) {
  const contentArray = [];

  if (singleWork.creators && singleWork.creators.length > 0) {
    contentArray.push({
      type: 'creators',
      heading: 'By',
      links: getLinkObjects(singleWork.creators, 'label', 'creators:')
    });
  }
  if (singleWork.createdDate && singleWork.createdDate.label) {
    contentArray.push({
      heading: 'Date',
      text: [singleWork.createdDate.label]
    });
  }
  if (singleWork.genres && singleWork.genres.length > 0) {
    contentArray.push({
      heading: 'Genre',
      links: getLinkObjects(singleWork.genres, 'label')
    });
  }
  if (singleWork.subjects && singleWork.subjects.length > 0) {
    contentArray.push({
      heading: 'Subject',
      links: getLinkObjects(singleWork.subjects, 'label')
    });
  }
  if (singleWork.lettering && singleWork.lettering.length > 0) {
    contentArray.push({
      heading: 'Lettering',
      text: [singleWork.lettering]
    });
  }
  if (descriptionArray && descriptionArray.length > 0) {
    contentArray.push({
      heading: 'Description',
      text: descriptionArray
    });
  }
  return contentArray;
}

export const work = async(ctx, next) => {
  const id = ctx.params.id;
  const queryString = ctx.search;
  const singleWork = await getWork(id, getImageIndex(ctx));
  const globalAlert = ctx.intervalCache.get('globalAlert');
  const descriptionArray = singleWork.description && singleWork.description.split('\n');
  const truncatedTitle = singleWork.title && getTruncatedTitle(singleWork.title);
  const miroIdObject = singleWork.identifiers.find(identifier => {
    return identifier.identifierScheme === 'miro-image-number';
  });
  const miroId = miroIdObject && miroIdObject.value;
  const sierraIdObject = singleWork.identifiers.find(identifier => {
    return identifier.identifierScheme === 'sierra-system-number';
  });
  const sierraId = sierraIdObject && sierraIdObject.value;
  const imgWidth = '800';
  const imgLink = imageUrlFromMiroId(miroId);
  const encoreLink = sierraId && encoreLinkFromSierraId(sierraId);
  const canonicalUri = `/works/${singleWork.id}`;
  const credit = singleWork.items[0].locations[0].credit;
  const attribution = constructAttribution(singleWork, credit, canonicalUri);
  const metaContent = createMetaContentArray(singleWork, descriptionArray);

  const [iiifImageLocation] = singleWork.items.map(
    item => item.locations.find(
      location => location.locationType === 'iiif-image'
    )
  );
  const iiifInfoUrl = iiifImageLocation && iiifImageLocation.url;

  ctx.render('pages/work', {
    id,
    queryString,
    pageConfig: createPageConfig({
      globalAlert: globalAlert,
      title: truncatedTitle,
      inSection: 'images',
      category: 'collections',
      canonicalUri: canonicalUri
    }),
    work: Object.assign({}, singleWork, {
      descriptionArray,
      imgLink,
      imgWidth,
      encoreLink,
      attribution,
      credit,
      metaContent
    }),
    iiifInfoUrl
  });

  return next();
};

export const search = async (ctx, next) => {
  const { query, page } = ctx.query;
  const queryString = ctx.search;
  const results = query && query.trim() !== ''
    ? await getWorks(query, page && Number(page), getImageIndex(ctx))
    : null;
  const globalAlert = ctx.intervalCache.get('globalAlert');
  const resultsArray = results && results.results || [];
  const pageSize = results && results.pageSize;
  const totalPages = results && results.totalPages;
  const totalResults = (results && results.totalResults) || 0;
  const resultsList = createResultsList({
    results: resultsArray,
    pageSize,
    totalPages,
    totalResults
  });
  const path = ctx.request.url;
  const pagination = PaginationFactory.fromList(List(resultsArray), parseInt(totalResults, 10) || 1, parseInt(page, 10) || 1, pageSize || 1, ctx.query);
  ctx.render('pages/search', {
    pageConfig: createPageConfig({
      globalAlert: globalAlert,
      title: query ? `Collections search: ${query}` : 'Collections search',
      path: path,
      inSection: 'images',
      category: 'collections',
      canonicalUri: `${ctx.globals.rootDomain}/works`
    }),
    resultsList,
    query,
    pagination,
    queryString,
    promos: worksLandingPromos,
    henryImage: henryImage
  });
  return next();
};
