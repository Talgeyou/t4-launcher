import DownloadProgress from 'renderer/widgets/download-progress';
import ErrorPopup from 'renderer/widgets/error-popup';
import LaunchProfile from 'renderer/widgets/launch-profile/ui/LaunchProfile';
import Layout from 'renderer/widgets/layout';
// import LogSection from 'renderer/widgets/log-section';

function Dashboard() {
  return (
    <Layout>
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <LaunchProfile />
        </div>
        {/* <LogSection /> */}
        <DownloadProgress />
      </div>
      <ErrorPopup />
    </Layout>
  );
}

export default Dashboard;
