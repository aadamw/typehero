import { auth } from '@repo/auth/server';
import { getChallengeRouteData } from '../../../[slug]/getChallengeRouteData';
import { Description } from './_components/description';
import { Markdown } from '@repo/ui/components/markdown';

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
  const { challenge } = await getChallengeRouteData(params.slug, session);

  return (
    <Description challenge={challenge}>
      <Markdown>{challenge.description}</Markdown>
    </Description>
  );
}
