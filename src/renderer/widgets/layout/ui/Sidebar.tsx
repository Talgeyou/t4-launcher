import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import useSidebarItems from '../model';

function Sidebar() {
  const { links } = useSidebarItems();

  return (
    <aside className="bg-slate-700/90 text-slate-50">
      <ul className="grid">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                clsx(
                  'block hover:bg-slate-900 w-full p-4 transition-colors focus:bg-blue-500 outline-none',
                  {
                    'bg-purple-900': isActive,
                  }
                )
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default memo(Sidebar);
