const getOption = (key, defaultValue) => {
  const value = CapacitorKV.get(key);
  if (!value?.value) {
    return defaultValue;
  }
  return value.value;
};

const setOption = (key, value) => {
  CapacitorKV.set(key, JSON.stringify(value));
};

const isNotificationEnabled = () => {
  return getOption('enableNotificationNewArticle', false);
};

const getLastPostNotification = () => {
  return getOption('lastPostNotification', null);
};

const setLastPostNotification = (lastPostNotification) => {
  setOption('lastPostNotification', lastPostNotification);
};


const getMockArticle = () => {
  return {
    id: 124,
    title: {
      rendered: 'Mock Article',
    },
  };
};


const getLatestArticle = async () => {
  const url = `https://${'blackellis.eu'}/wp-json/wp/v2/posts?_embed&page=${1}`
  let res
  try {
    res = await fetch(url)
  } catch (e) {
    return null
  }

  if (!res.ok) {
    return null
  }
  const posts = await res.json()
  if (posts && posts.length > 0) {
    return posts[0]
  }
  return null

};

addEventListener('checkLastPost', async (resolve, reject, args) => {
  try {
      const enableNotificationNewArticle = await isNotificationEnabled();
       if (enableNotificationNewArticle) {
        const post = await getLatestArticle();
        const lastPostNotification = await getLastPostNotification();
        const lastPostId = String(post?.id || 0);
        setLastPostNotification(lastPostId);
        if(lastPostNotification === null || !(Number(lastPostId) > Number(lastPostNotification))) {
          resolve();
          return
        }
        CapacitorNotifications.schedule([
          {
            id: Number(lastPostId),
            title: 'New Article',
            body: post?.title?.rendered || '',
            scheduleAt: new Date(Date.now() + 1000),
          },
        ]);
      }
     resolve();
  } catch (err) {
    reject(err);
  }
});