import { memo, useCallback } from 'react';
import { v4 } from 'uuid';
import { DateTime } from 'luxon';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProfileCard, {
  profilesActions,
  selectProfiles,
} from 'renderer/entities/profile';
import useAppDispatch from 'renderer/shared/hooks/useAppDispatch';
import useAppSelector from 'renderer/shared/hooks/useAppSelector';
import useMinecraftRoot from 'renderer/shared/lib/useMinecraftRoot';
import Button from 'renderer/shared/ui/button';
import Layout from 'renderer/widgets/layout';
import { selectVersions } from 'renderer/entities/minecraft-version';
import routes from 'renderer/shared/lib/routes';

function ProfilesPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profiles = useAppSelector(selectProfiles);
  const minecraftRoot = useMinecraftRoot();
  const versions = useAppSelector(selectVersions);

  const handleCreate = useCallback(() => {
    if (minecraftRoot) {
      const id = v4();
      dispatch(
        profilesActions.createProfile({
          minecraftRoot,
          profileId: id,
          profile: {
            created: DateTime.now().toISO()!,
            icon: '',
            lastUsed: DateTime.now().toISO()!,
            lastVersionId: versions[0].id,
            name: '',
            type: 'custom',
          },
        })
      );
      navigate(`${routes.Profiles}/${id}`);
    }
  }, [dispatch, minecraftRoot, navigate, versions]);

  return (
    <Layout>
      <div className="grid gap-4 p-4">
        <Button onClick={handleCreate}>
          <div className="flex items-center gap-4">
            Create Profile <FaPlus size={20} />
          </div>
        </Button>
        <div>
          {Object.entries(profiles).map(([id, profile]) => (
            <ProfileCard key={id} id={id} profile={profile} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default memo(ProfilesPage);
