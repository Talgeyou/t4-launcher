import { useMemo } from 'react';
import routes from 'renderer/shared/lib/routes';

export default function useSidebarItems() {
  const links = useMemo(
    () => [
      {
        href: routes.Dashboard,
        label: 'Dashboard',
      },
      {
        href: routes.Account,
        label: 'Account',
      },
      {
        href: routes.Profiles,
        label: 'Profiles',
      },
    ],
    []
  );

  return useMemo(
    () => ({
      links,
    }),
    [links]
  );
}
