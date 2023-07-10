import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface Group {
  id: number;
  name: string;
  description: string;
  color_primary: string;
  color_secondary: string;
}

interface ErrorResponse {
  error?: string;
}

export default function Group() {
  const router = useRouter();
  const { id } = router.query;
  const [group, setGroup] = useState<Group>();
  const [error, setError] = useState("");

  async function getGroup() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/group?group_id=${id}`,
        { withCredentials: false }
      );
      setGroup(response.data[0]);
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.status === 404
          ? axiosError.response?.data.error || `No group found with id ${id}`
          : "An unexpected error has occurred";
      setError(errorMessage);
    }
  }

  useEffect(() => {
    id && getGroup();
  }, [id]);

  if (error) {
    return (
      <main className="flex flex-col items-center mt-20 px-12 md:px-32 py-8 gap-5 dark:text-dark">
        <p className="text-center">Error: {error}</p>
      </main>
    );
  }

  if (!group) {
    return (
      <main className="flex flex-col items-center mt-20 px-12 md:px-32 py-8 gap-5 dark:text-dark">
        <p className="text-center">Loading...</p>
      </main>
    );
  }

  const formattedDescription = group.description.split("\n").map((line, i) => (
    <div key={i}>
      {line}
      <br />
    </div>
  ));

  return (
    <main className="flex flex-col items-center mt-20 px-12 md:px-32 py-8 gap-5 dark:text-dark">
      <h2 className="text-2xl text-center">{group.name}</h2>
      <div>{formattedDescription}</div>
    </main>
  );
}
