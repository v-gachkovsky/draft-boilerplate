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

export const get = url => {
  console.log(`mocked API request on the URL ${url} fired!`);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(items);
    }, 2000);
  });
};
