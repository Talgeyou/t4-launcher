import { useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Dashboard from 'renderer/pages/dashboard';
import routes from 'renderer/shared/lib/routes';
import useAppDispatch from 'renderer/shared/hooks/useAppDispatch';
import { systemActions } from 'renderer/entities/system';
import AccountPage from 'renderer/pages/account';
import useMinecraftRoot from 'renderer/shared/lib/useMinecraftRoot';
import { profilesActions } from 'renderer/entities/profile';
import ProfilesPage from 'renderer/pages/profiles/ui/ProfilesPage';
import ProfileEdit from 'renderer/pages/profile-edit';
import { versionsActions } from 'renderer/entities/minecraft-version';
import { accountActions } from 'renderer/entities/account';
import 'tailwindcss/tailwind.css';

const router = createHashRouter([
  {
    path: routes.Dashboard,
    element: <Dashboard />,
  },
  {
    path: routes.Account,
    element: <AccountPage />,
  },
  {
    path: routes.Profiles,
    element: <ProfilesPage />,
  },
  {
    path: routes.ProfileEdit,
    element: <ProfileEdit />,
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const minecraftRoot = useMinecraftRoot();

  useEffect(() => {
    if (typeof window.electrolAPI !== 'undefined') {
      window.electrolAPI
        .getSystemPaths()
        .then((paths) => dispatch(systemActions.setPaths(paths)))
        // eslint-disable-next-line no-console
        .catch((e) => console.error(e));
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window.electrolAPI !== 'undefined' && minecraftRoot) {
      window.electrolAPI
        .getProfiles(minecraftRoot)
        .then((res) =>
          dispatch(profilesActions.setProfiles({ profiles: res.profiles }))
        )
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [dispatch, minecraftRoot]);

  useEffect(() => {
    if (typeof window.electrolAPI !== 'undefined') {
      window.electrolAPI
        .getAvailableVersions()
        .then((versions) =>
          dispatch(
            versionsActions.setVersions({
              versions: versions.map(
                (version: { id: string; type: string }) => ({
                  id: version.id,
                  type: version.type,
                })
              ),
            })
          )
        )
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window.electrolAPI !== 'undefined') {
      window.electrolAPI
        .getAccount(minecraftRoot)
        .then((account) => dispatch(accountActions.setAccount({ account })))
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [dispatch, minecraftRoot]);

  return <RouterProvider router={router} />;
}

export default App;
