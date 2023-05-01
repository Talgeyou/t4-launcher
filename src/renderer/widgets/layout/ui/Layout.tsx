import { memo, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = { children?: ReactNode };

function Layout({ children }: Props) {
  return (
    <div className="bg-transparent h-screen rounded-lg flex flex-col overflow-hidden">
      <Header />
      <div className="flex overflow-hidden flex-grow">
        <Sidebar />
        <main className="bg-slate-900/90 text-slate-50 w-full">{children}</main>
      </div>
    </div>
  );
}

export default memo(Layout);
