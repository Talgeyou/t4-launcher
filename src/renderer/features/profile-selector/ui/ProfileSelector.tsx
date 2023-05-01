import { memo, useCallback, useMemo } from 'react';
import {
  profilesActions,
  selectProfiles,
  selectSelectedProfile,
} from 'renderer/entities/profile';
import useAppDispatch from 'renderer/shared/hooks/useAppDispatch';
import useAppSelector from 'renderer/shared/hooks/useAppSelector';
import SelectField, {
  SelectFieldPayload,
} from 'renderer/shared/ui/select-field';

function ProfileSelector() {
  const dispatch = useAppDispatch();
  const selectedProfile = useAppSelector(selectSelectedProfile);
  const profiles = useAppSelector(selectProfiles);

  const handleChange = useCallback(
    (payload: SelectFieldPayload) => {
      dispatch(profilesActions.selectProfile({ profileId: payload.value }));
    },
    [dispatch]
  );

  const options = useMemo(
    () => [
      ...Object.entries(profiles).map(([id, profile]) => ({
        label: profile.name || '<Unnamed profile>',
        description: profile.lastVersionId,
        value: id,
      })),
    ],
    [profiles]
  );

  return (
    <div className="w-full">
      <SelectField
        options={options}
        value={selectedProfile?.id ?? ''}
        onChange={handleChange}
      />
    </div>
  );
}

export default memo(ProfileSelector);
