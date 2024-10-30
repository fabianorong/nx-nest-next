import { getSession } from '../lib/session';

export default async function Home() {
  const session = await getSession();
  console.log(session);
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center ">
      Home Page
    </div>
  );
}
