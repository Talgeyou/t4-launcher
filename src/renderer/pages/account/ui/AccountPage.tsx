import { memo } from 'react';
import ChangeUsernameForm from 'renderer/widgets/change-username-form/ui/ChangeUsernameForm';
import Layout from 'renderer/widgets/layout';

function AccountPage() {
  return (
    <Layout>
      <div className="p-4">
        <ChangeUsernameForm />
      </div>
    </Layout>
  );
}

export default memo(AccountPage);
