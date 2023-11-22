'use client';

import { cn } from '@repo/ui/cn';
import { buttonVariants } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@repo/ui/components/dialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '@repo/ui/components/tooltip';
import {
  Share,
  CheckCircle2 as CheckCircle2Icon,
  Clipboard as ClipboardIcon,
} from '@repo/ui/icons';
import { Checkbox } from '@repo/ui/components/checkbox';
import lzstring from 'lz-string';
import { useCallback, useState } from 'react';
import { useLocalStorage } from '~/utils/useLocalStorage';

interface ShareChallengeProps {
  slug: string;
}

export function ShareChallenge({ slug }: ShareChallengeProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(buttonVariants({ variant: 'secondary', size: 'xs' }), 'rounded-full')}
            >
              <Share className="h-4 w-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <ShareForm slug={slug} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ShareFormProps {
  slug: string;
}

function ShareForm({ slug }: ShareFormProps) {
  const [copied, setCopied] = useState(false);
  const [copyWithCode, setCopyWithCode] = useState(false);
  const [codeToCompress] = useLocalStorage(`challenge-${slug}`, '');
  const url = `${window.location.origin}/challenge/${slug}`;

  const copyToClipboard = useCallback(async () => {
    let url = `${window.location.origin}/challenge/${slug}`;
    if (copyWithCode && codeToCompress) {
      const compressedCode = lzstring.compressToEncodedURIComponent(codeToCompress);
      url += `?code=${compressedCode}`;
    }

    try {
      if (navigator.clipboard && !copied) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 3000);
      }
    } catch (e) {
      console.error('copyToClipboard', e);
      setCopied(false);
    }
  }, [slug, copied, copyWithCode, codeToCompress]);

  const onCopyWithCodeChange = useCallback((checked: boolean) => {
    setCopyWithCode(checked);
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <p>Copy this challenge url to share with your friends!</p>
      <code className="rounded-lg border border-black/20 px-4 py-2 dark:border-white/20">
        {url}
      </code>

      <DialogFooter>
        <div className="flex items-center justify-end gap-2">
          {Boolean(codeToCompress) && (
            <div className="flex h-fit items-center justify-center gap-2 text-xs">
              <Checkbox
                id="copy-with-code"
                checked={copyWithCode}
                onCheckedChange={onCopyWithCodeChange}
              />
              <label htmlFor="copy-with-code">Copy with code</label>
            </div>
          )}
          <button
            className={`flex items-center justify-between space-x-2 rounded-lg px-2 py-1 duration-300 active:scale-75
        ${
          copied
            ? 'border border-green-500 text-green-500 dark:border-green-700 dark:bg-green-700 dark:text-white'
            : 'border border-black/20  text-black hover:bg-gray-100 dark:bg-white'
        }`}
            onClick={copyToClipboard}
          >
            <span>{copied ? 'Copied!' : 'Copy'}</span>
            {copied ? (
              <CheckCircle2Icon className="h-4 w-4" />
            ) : (
              <ClipboardIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </DialogFooter>
    </div>
  );
}
