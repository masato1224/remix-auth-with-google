import type { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { AUTH0_LOGOUT_URL, AUTH0_CLIENT_ID, AUTH0_RETURN_TO_URL } from "~/constants/index.server";
import { getSession, destroySession } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  const logoutURL = new URL(AUTH0_LOGOUT_URL);
  logoutURL.searchParams.set("client_id", AUTH0_CLIENT_ID);
  logoutURL.searchParams.set("returnTo", AUTH0_RETURN_TO_URL);

  return redirect(logoutURL.toString(), {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
