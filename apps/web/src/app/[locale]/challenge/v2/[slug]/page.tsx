import { auth } from '@repo/auth/server';
import { getChallengeRouteData } from '../../[slug]/getChallengeRouteData';
import { Wrapper } from '../../[slug]/wrapper';

export default async function Challenges({ params }: { params: { slug: string } }) {
  const session = await auth();
  const { challenge, track } = await getChallengeRouteData(params.slug, session);
  return <Wrapper track={track} challenge={challenge} />;
}
