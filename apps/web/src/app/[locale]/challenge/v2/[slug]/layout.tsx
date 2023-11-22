'use client';
import * as React from 'react';
import { ChallengeLayout } from './_components/challenge-layout';

interface LayoutProps {
  children: React.ReactNode;
  left: React.ReactNode;
}

export default function Layout({ children, left }: LayoutProps) {
  return <ChallengeLayout leftComponent={left} rightComponent={children} />;
}
