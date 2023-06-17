import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [notAuthorizedMessage, setNotAuthorizedMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const isUserAuthorized = async () => {
    const username = localStorage.getItem("user");
    if (id !== undefined) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-auth`,
          {
            params: { id, username },
            withCredentials: true,
          }
        );
        if (response.status === 200) setNotAuthorizedMessage("");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data.message) {
          setNotAuthorizedMessage(error.response.data.message);
        } else {
          setNotAuthorizedMessage(`Error: ${error}`);
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    isUserAuthorized();
  }, [id]);

  if (loading) {
    return (
      <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
        <div>Loading...</div>
      </main>
    );
  }

  if (notAuthorizedMessage.length > 0) {
    return (
      <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
        <h1 className="text-2xl">Edit Profile</h1>
        <p>{notAuthorizedMessage}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Edit Profile</h1>
      <p>Edit some stuff. Like you.</p>
      {/* also check isUserAuthorized on submit */}
      <form></form>
    </main>
  );
};

export default Edit;
