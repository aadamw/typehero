'use client';

import { cn } from '@repo/ui/cn';
import debounce from 'lodash/debounce';
import { Button } from '@repo/ui/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/components/tooltip';
import { useRef, useState } from 'react';
import { addOrRemoveBookmark } from '~/app/[locale]/challenge/_components/bookmark.action';
import { useSession } from '@repo/auth/react';
import { Bookmark } from '@repo/ui/icons';

interface BookmarkChallengeProps {
  challengeId: number;
  isBookmarked: boolean;
}

export function BookmarkChallenge({ challengeId, isBookmarked }: BookmarkChallengeProps) {
  const [hasBookmarked, setHasBookmarked] = useState(isBookmarked);
  const session = useSession();

  const debouncedBookmark = useRef(
    debounce(async (challengeId: number, userId: string, shouldBookmark: boolean) => {
      try {
        await addOrRemoveBookmark(challengeId, userId, shouldBookmark);
        setHasBookmarked(shouldBookmark);
      } catch (e) {
        console.error(e);
        // it errored so reverse the intended changes
        setHasBookmarked(!shouldBookmark);
      }
    }, 500),
  ).current;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="xs"
          className={cn(
            'border border-transparent [&:not(:disabled)]:hover:border-blue-500 [&:not(:disabled)]:hover:text-blue-500',
            {
              'border-blue-500 text-blue-500': hasBookmarked,
            },
          )}
          disabled={!session.data?.user.id}
          onClick={() => {
            let shouldBookmark = false;
            if (hasBookmarked) {
              shouldBookmark = false;
              setHasBookmarked(false);
            } else {
              shouldBookmark = true;
              setHasBookmarked(true);
            }
            debouncedBookmark(challengeId, session.data?.user.id!, shouldBookmark)?.catch((e) => {
              console.error(e);
            });
          }}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{session.data?.user.id ? 'Bookmark' : 'Login to Bookmark'}</p>
      </TooltipContent>
    </Tooltip>
  );
}
