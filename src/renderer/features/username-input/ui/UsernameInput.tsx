import React, { useCallback, useId, useState } from 'react';

type Props = {
  initialUsername?: string;
  onChange?: (username: string) => void;
};

function UsernameInput({ initialUsername, onChange }: Props) {
  const id = useId();
  const [username, setUsername] = useState(initialUsername);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);

      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange]
  );
  return (
    <div className="grid">
      <label className="text-lg font-bold" htmlFor={id}>
        Username
      </label>
      <input
        className="p-2 border border-slate-900 rounded-lg"
        value={username}
        onChange={handleChange}
      />
    </div>
  );
}

UsernameInput.defaultProps = {
  initialUsername: 'Player',
};

export default UsernameInput;
