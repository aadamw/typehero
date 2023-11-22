import { ChallengeNavigationTabs } from './_components/challenge-navigation-tabs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col">
      <ChallengeNavigationTabs slug="hello-world">{children}</ChallengeNavigationTabs>
    </div>
  );
}
