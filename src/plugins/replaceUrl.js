export default function replaceUrl(url) {
  let newUrl = url.replace(/\s/g, '%20');
  return '/images/data/' + newUrl;
};
