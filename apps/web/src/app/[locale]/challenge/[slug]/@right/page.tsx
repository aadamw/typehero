import { auth, type Session } from '@repo/auth/server';
import { redirect } from 'next/navigation';
import { buildMetaForChallenge } from '~/app/metadata';
import { getRelativeTime } from '~/utils/relativeTime';
import { isBetaUser } from '~/utils/server/is-beta-user';
import { getChallengeRouteData } from '../getChallengeRouteData';
import { Wrapper } from '../wrapper';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params: { slug } }: Props) {
  const { challenge } = await getChallengeRouteData(slug, null);
  const description = `Unlock your TypeScript potential by solving the ${challenge.name} challenge on TypeHero.`;

  return buildMetaForChallenge({
    title: `${challenge.name} | TypeHero`,
    description,
    username: challenge.user.name,
    difficulty: challenge.difficulty,
    date: getRelativeTime(challenge.createdAt),
  });
}

export default async function Challenges({ params: { slug } }: Props) {
  // early access you must be authorized
  const session = await auth();
  const isBeta = await isBetaUser(session);

  if (!isBeta) {
    return redirect('/claim');
  }

  const { challenge, track } = await getChallengeRouteData(slug, session);

  return <Wrapper track={track} challenge={challenge} />;
}

export function isAuthor(session: Session | null, userId?: string | null) {
  return userId && session?.user?.id && userId === session?.user?.id;
}
