export function getNewsByChannel(channel, start = 0, end = 10) {
    return new Promise((resolve, reject) => {
        const api = `https://is.snssdk.com/api/news/feed/v51/?category=${channel}&page=${start}`;
        fetch(api)
            .then(resp => resp.json())
            .then(json => {
                if (json.message === 'success') {
                    const newArr = json.data;
                    let list = [];
                    for (let item of newArr) {
                        list.push(JSON.parse(item.content));
                    }
                    resolve(list);
                } else {
                    throw new Error(json.status);
                }
            })
            .catch(e => {
                reject(e.toString());
            });
    });
}
