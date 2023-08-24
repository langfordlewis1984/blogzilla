import { SignIn } from "@clerk/nextjs";

type RedirectParams = {
  searchParams: { redirect: string };
};

export default function SignInPage({ searchParams }: RedirectParams) {
  return <SignIn redirectUrl={searchParams.redirect} />;
}
