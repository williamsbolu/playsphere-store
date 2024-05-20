import UpdatePasswordForm from '../authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../authentication/UpdateUserDataForm';

function Profile() {
  return (
    <div className="space-y-14">
      <div className="space-y-10">
        <h3 className="text-body font-heading text-[17px] font-medium">
          Personal Information
        </h3>
        <UpdateUserDataForm />
      </div>

      <div className="space-y-10">
        <h3 className="text-body font-heading text-[17px] font-medium">
          Change password
        </h3>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}

export default Profile;
