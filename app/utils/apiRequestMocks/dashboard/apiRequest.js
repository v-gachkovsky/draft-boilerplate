const items = {
  data: [
    {
      id: 1,
      title: 'Item 1',
      description: 'First item'
    },
    {
      id: 2,
      title: 'Item 2',
      description: 'Second item'
    },
    {
      id: 3,
      title: 'Item 3',
      description: 'Third item'
    },
    {
      id: 4,
      title: 'Item 4',
      description: 'Fourth item'
    },
    {
      id: 5,
      title: 'Good',
      description: 'Very nice Item :)'
    },
    {
      id: 6,
      title: 'Metallica',
      description: 'Metal-Thrash band'
    }
  ]
};

const getMaxId = arr => {
  const itemWithMaxId = arr.reduce((prev, current) => {
    if (current.id > prev.id) {
      return current;
    }
    return prev;
  });

  return itemWithMaxId.id;
};

export const get = url => {
  console.log(`mocked API GET request on the URL ${url} is fired!`);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(items);
    }, 2000);
  });
};

export const post = (url, data) => {
  console.log(`mocked API POST request on the URL ${url} is fired!`);

  return new Promise(resolve => {
    setTimeout(() => {
      const lastId = getMaxId(items.data);
      items.data.push({ id: lastId + 1, ...data });

      resolve(items);
    }, 2000);
  });
};
