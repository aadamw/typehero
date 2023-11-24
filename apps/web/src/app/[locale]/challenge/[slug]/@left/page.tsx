import { auth } from '@repo/auth/server';
import { Markdown } from '@repo/ui/components/markdown';
import { Comments } from '../../_components/comments';
import { getChallengeRouteData } from '../getChallengeRouteData';
import { Description } from './_components/description';
import { getPreselectedCommentMetadata } from '../../_components/comments/getCommentRouteData';

interface PageProps {
  params: { slug: string };
  searchParams: { commentId?: string };
}

export default async function Page({ params, searchParams }: PageProps) {
  const session = await auth();
  const { challenge } = await getChallengeRouteData(params.slug, session);

  console.log({ searchParams });
  const preselectedCommentMetadata = await getPreselectedCommentMetadata(
    challenge.id,
    Number(searchParams.commentId),
  );

  return (
    <div className="relative h-full">
      <Description challenge={challenge}>
        <Markdown>{challenge.description}</Markdown>
      </Description>
      <Comments
        expanded={Boolean(preselectedCommentMetadata)}
        rootId={challenge.id}
        type="CHALLENGE"
        preselectedCommentMetadata={preselectedCommentMetadata}
      />
    </div>
  );
}
