import { memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Profile,
  profilesActions,
  selectProfileById,
} from 'renderer/entities/profile';
import VersionSelector from 'renderer/features/version-selector/ui/VersionSelector';
import useAppDispatch from 'renderer/shared/hooks/useAppDispatch';
import useAppSelector from 'renderer/shared/hooks/useAppSelector';
import routes from 'renderer/shared/lib/routes';
import useMinecraftRoot from 'renderer/shared/lib/useMinecraftRoot';
import Button from 'renderer/shared/ui/button';
import { SelectFieldPayload } from 'renderer/shared/ui/select-field';
import TextField from 'renderer/shared/ui/text-field';
import Layout from 'renderer/widgets/layout';

function ProfileEdit() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const minecraftRoot = useMinecraftRoot();

  const profile = useAppSelector((store) => selectProfileById(store, id!));

  const [state, setState] = useState<Partial<Profile>>({
    name: profile.name,
    lastVersionId: profile.lastVersionId,
  });

  const handleChangeName = useCallback(({ value }: SelectFieldPayload) => {
    setState((prev) => ({ ...prev, name: value }));
  }, []);

  const handleChangeVersion = useCallback(({ value }: SelectFieldPayload) => {
    setState((prev) => ({ ...prev, lastVersionId: value }));
  }, []);

  const handleSave = useCallback(() => {
    if (minecraftRoot) {
      dispatch(
        profilesActions.updateProfile({
          minecraftRoot,
          profileId: id!,
          profile: state,
        })
      );
      navigate(routes.Profiles);
    }
  }, [dispatch, id, minecraftRoot, navigate, state]);

  return (
    <Layout>
      <div className="grid gap-4 p-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <TextField value={state.name} onChange={handleChangeName} />
        <VersionSelector
          initialVersion={profile.lastVersionId}
          onChange={handleChangeVersion}
        />
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Layout>
  );
}

export default memo(ProfileEdit);
