'use client';
import { Calendar, CheckCircle, Flag } from '@repo/ui/icons';
import Link from 'next/link';
import { type ChallengeRouteData } from '~/app/[locale]/challenge/[slug]/getChallengeRouteData';
import { ReportDialog } from '~/components/ReportDialog';
import { getRelativeTime } from '~/utils/relativeTime';

import { ActionMenu } from '@repo/ui/components/action-menu';
import { TypographyH3 } from '@repo/ui/components/typography/h3';
import { UserBadge } from '@repo/ui/components/user-badge';
import { DifficultyBadge } from '@repo/ui/components/difficulty-badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/components/tooltip';
import { Vote } from '~/app/[locale]/challenge/_components/vote';
import { ShareChallenge } from './share-challenge';
import { BookmarkChallenge } from './bookmark-challenge';
import { useSession } from '@repo/auth/react';

interface DescriptionProps {
  challenge: ChallengeRouteData['challenge'];
  children: React.ReactNode;
}

export function Description({ challenge, children }: DescriptionProps) {
  const session = useSession();

  return (
    <div className="custom-scrollable-element h-full overflow-y-auto px-4 pb-36 pt-3">
      <div className="flex items-center">
        <TypographyH3 className="mr-auto max-w-[75%] items-center truncate text-2xl font-bold">
          {challenge.name}
        </TypographyH3>
        <ReportDialog challengeId={challenge.id} reportType="CHALLENGE">
          <ActionMenu
            items={[
              {
                key: 'feedback',
                label: 'Feedback',
                icon: Flag,
              },
            ]}
            onChange={() => {
              // do nothing
            }}
          />
        </ReportDialog>
      </div>
      {/* Author & Time */}
      <div className="mt-2 flex items-center gap-4">
        <UserBadge username={challenge.user.name} linkComponent={Link} />
        <div className="text-muted-foreground flex items-center gap-2">
          <Calendar className=" h-4 w-4" />
          <span className="text-xs">Last updated {getRelativeTime(challenge.updatedAt)}</span>
        </div>
      </div>
      {/* Difficulty & Action Buttons */}
      <div className="mt-3 flex items-center gap-3">
        <DifficultyBadge difficulty={challenge.difficulty} />
        {challenge.hasSolved ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <CheckCircle className="stroke-green-600 dark:stroke-green-300" size={20} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Solved</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
        <Vote
          voteCount={challenge._count.vote}
          initialHasVoted={challenge.vote.length > 0}
          disabled={!session?.data?.user?.id}
          rootType="CHALLENGE"
          rootId={challenge?.id}
        />
        <ShareChallenge slug={challenge.slug} />
        <BookmarkChallenge challengeId={challenge.id} isBookmarked={!challenge.bookmark.length} />
      </div>
      <div className="prose-invert prose-h3:text-xl mt-6 leading-7">{children}</div>
    </div>
  );
}
