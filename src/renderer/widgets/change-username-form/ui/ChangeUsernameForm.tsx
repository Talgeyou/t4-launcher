import React, { memo, useCallback, useRef } from 'react';
import {
  accountActions,
  selectAccountUsername,
} from 'renderer/entities/account';
import useAppDispatch from 'renderer/shared/hooks/useAppDispatch';
import useAppSelector from 'renderer/shared/hooks/useAppSelector';
import useMinecraftRoot from 'renderer/shared/lib/useMinecraftRoot';
import Button from 'renderer/shared/ui/button';
import TextField from 'renderer/shared/ui/text-field';

function ChangeUsernameForm() {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectAccountUsername);
  const usernameRef = useRef<HTMLInputElement>(null);
  const minecraftRoot = useMinecraftRoot();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (usernameRef.current?.value) {
        dispatch(
          accountActions.setUsername({
            minecraftRoot,
            username: usernameRef.current.value,
          })
        );
        usernameRef.current.blur();
      }
    },
    [dispatch, minecraftRoot]
  );

  return (
    <form className="grid gap-4 w-64" onSubmit={handleSubmit}>
      <h2 className="text-xl w-full">Change username</h2>
      <TextField ref={usernameRef} className="w-full" defaultValue={username} />
      <Button type="submit">Change</Button>
    </form>
  );
}

export default memo(ChangeUsernameForm);
