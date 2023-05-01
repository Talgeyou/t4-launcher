import { memo, useCallback } from 'react';
import Button from 'renderer/shared/ui/button';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import routes from 'renderer/shared/lib/routes';
import { Profile } from '../types';

type Props = { id: string; profile: Profile };

function ProfileCard({ id, profile }: Props) {
  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    navigate(`${routes.Profiles}/${id}`);
  }, [id, navigate]);

  return (
    <div className="w-full grid grid-cols-profile-card p-2">
      <div>{profile.name || '<Unnamed Profile>'}</div>
      <div>({profile.lastVersionId})</div>
      <div className="flex items-center gap-2">
        <Button onClick={handleEdit}>
          <FaEdit size={24} />
        </Button>
        <Button onClick={handleEdit} variant="danger">
          <FaTimes size={24} />
        </Button>
      </div>
    </div>
  );
}

export default memo(ProfileCard);
