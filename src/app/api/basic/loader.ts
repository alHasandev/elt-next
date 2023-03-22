const loader = (dataset: object[], dataSchema: object) => {
  const transformedDataset = [];

  for (let i = 0; i < dataset.length; i++) {
    const transformed = {};

    for (const [originKey, designedKey] of Object.entries(dataSchema)) {
      transformed[designedKey as keyof object] =
        dataset[i][originKey as keyof object] ?? null;
    }

    transformedDataset.push(transformed);
  }

  return transformedDataset;
};

export default loader;
