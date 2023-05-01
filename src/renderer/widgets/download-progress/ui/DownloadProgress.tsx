import { memo } from 'react';
import clsx from 'clsx';
import useDownloadProgress from '../model';

function DownloadProgress() {
  const { downloadedSize, totalSize } = useDownloadProgress();

  return (
    <div className="w-full h-16 bg-slate-700/90">
      <div
        style={{
          width:
            !downloadedSize || !totalSize
              ? 0
              : `${Math.round((downloadedSize * 100) / totalSize)}%`,
        }}
        className={clsx('max-w-full bg-green-400/90 h-16')}
      />
    </div>
  );
}

export default memo(DownloadProgress);
