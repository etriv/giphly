import { GiphyFetch } from '@giphy/js-fetch-api'

const gf = new GiphyFetch('tVaJe9QRTL6VZp9xhBkogbNWFTI9hYnJ');

function fetchGifs(search, offset, limit) {
    let newGifs = [];
    return gf.search(search, { sort: 'relevant', offset, limit })
        .then((res) => {
            if (res.meta.status === 200) {
                // console.log(res);
                newGifs = res.data.map(gif => ({
                    title: gif.title,
                    stillUrl: convertToNonEmbededUrl(gif.images.original_still.url),
                    imageUrl: convertToNonEmbededUrl(gif.images.original.url),
                    giphyUrl: gif.url,
                    giphyId: gif.id
                }));

                return { totalCount: res.pagination.total_count,
                    coount: res.pagination.count,
                    offset: res.pagination.offset,
                    newGifs };
            }
            else {
                throw new Error('Giphy bad responese:' + res.meta.msg);
            }
        })
        .catch(err => {
            throw new Error('Giphy fetching error:' + err);
        });
}

function convertToNonEmbededUrl(url) {
    const dotIndex = url.indexOf('.');
    const newUrl = 'i' + url.slice(dotIndex);
    return newUrl;
  }

export { fetchGifs }