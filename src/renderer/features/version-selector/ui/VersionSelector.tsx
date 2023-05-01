import { useCallback, useMemo, useState } from 'react';
import { selectVersions } from 'renderer/entities/minecraft-version';
import useAppSelector from 'renderer/shared/hooks/useAppSelector';
import SelectField, {
  SelectFieldPayload,
} from 'renderer/shared/ui/select-field';

type Props = {
  initialVersion?: string;
  onChange?: (payload: SelectFieldPayload) => void;
};

function VersionSelector({ initialVersion = '', onChange }: Props) {
  const versions = useAppSelector(selectVersions);
  const [selectedVersionId, setSelectedVersionId] =
    useState<string>(initialVersion);

  const handleChange = useCallback(
    (payload: SelectFieldPayload) => {
      setSelectedVersionId(payload.value);

      if (onChange) {
        onChange(payload);
      }
    },
    [onChange]
  );

  const options = useMemo(
    () =>
      versions.map((version) => ({
        label: version.id,
        description: version.type,
        value: version.id,
      })),
    [versions]
  );

  return (
    <div className="w-full">
      <p className="col-span-2 text-lg font-bold">Minecraft version</p>
      <SelectField
        options={options}
        value={selectedVersionId}
        onChange={handleChange}
      />
    </div>
  );
}

export default VersionSelector;
