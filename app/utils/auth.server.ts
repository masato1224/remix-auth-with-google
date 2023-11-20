import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { sessionStorage } from "./session.server";
import type { User } from "~/model/user";
import { login } from "~/model/user";
import { AUTH0_CALLBACK_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } from "~/constants/index.server";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<User>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    console.log(profile);

    //
    // 返ってきた情報を利用してDBへ書き込むなどの処理
    // 加工するなどの処理を入れる
    //
    // 今回はユーザーのEmailアドレスを返す関数を返すのみ
    return await login(profile.emails ? profile.emails[0].value : "");
  }
);

authenticator.use(auth0Strategy);
