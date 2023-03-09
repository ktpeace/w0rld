import ThemeSwitcher from "../../components/ThemeSwitcher";

const Profile = () => {
  return (
    <main className="flex flex-col items-center min-h-screen mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Profile</h1>
      <ThemeSwitcher />
    </main>
  );
};

export default Profile;
