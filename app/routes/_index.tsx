import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { User } from "~/model/user";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return { user };
};

export default function Index() {
  const data = useLoaderData<{ user: User }>();

  return (
    <div>
      {data.user && (
        <>
          <form action="logout" method="post">
            <button>Logout</button>
          </form>
          <h1>{data.user.email}</h1>
        </>
      )}
      <h1>Welcome to Remix</h1>
    </div>
  );
}
