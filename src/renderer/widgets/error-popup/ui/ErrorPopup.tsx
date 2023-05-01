import { memo } from 'react';
import { Portal } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';
import Button from 'renderer/shared/ui/button';
import useErrorPopup from '../model';

function ErrorPopup() {
  const { errors, isOpened, close } = useErrorPopup();
  return isOpened ? (
    <Portal>
      <div className="absolute top-12 p-4 left-0 right-0 bottom-0 bg-slate-900/90 text-slate-50 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Error</h1>
          <Button onClick={close}>
            <FaTimes size={24} />
          </Button>
        </div>
        <div className="grid gap-4 flex-grow">
          {errors.map(({ id, error }) => (
            <div key={id} className="text-lg p-2">
              {error}
            </div>
          ))}
        </div>
      </div>
    </Portal>
  ) : null;
}

export default memo(ErrorPopup);
