// pages/dashboard.js
import useRequireAuth from "../hooks/useRequireAuth";

export default function Dashboard() {
  const { ready, authed } = useRequireAuth();

  if (!ready) {
    // first render while checking token
    return <p className="text-sm text-gray-600">Checking session…</p>;
  }

  if (!authed) {
    // we already redirect in the hook; returning null avoids flash
    return null;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p className="text-gray-700 mt-2">
        You’re authenticated. Next, we’ll fetch your profile and show your career goal.
      </p>
    </div>
  );
}
