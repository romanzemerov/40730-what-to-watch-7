import { LoadingStatus } from './const';

export const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res;
};

export const isLoadingFinish = (loadingStatus) => loadingStatus === LoadingStatus.SUCCEEDED || loadingStatus === LoadingStatus.FAILED;
