import * as React from 'react';
import { ChallengeLayout } from './challenge-layout';
import { ChallengeNavigationTabs } from './challenge-navigation-tabs';

interface LayoutProps {
  right: React.ReactNode;
  left: React.ReactNode;
  params: { slug: string };
}

export default function Layout({ right, left, params: { slug } }: LayoutProps) {
  return (
    <ChallengeLayout
      leftComponent={
        <div className="flex h-full w-full flex-col">
          <ChallengeNavigationTabs slug={slug}>{left}</ChallengeNavigationTabs>
        </div>
      }
      rightComponent={right}
    />
  );
}
