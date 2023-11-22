'use client';
import { useState, type ReactNode } from 'react';

import usePanelAdjustments from '../../../_components/usePanelAdjustments';
import { useLayoutPanelsResize } from './challenge-layout.hooks';
import { useFullscreenSettingsStore } from '../../../_components/fullscreen';

interface Props {
  rightComponent: ReactNode;
  leftComponent: ReactNode;
  isPlayground?: boolean;
}

export const MOBILE_BREAKPOINT = 1025;

export function ChallengeLayout({ rightComponent, leftComponent, isPlayground }: Props) {
  const { isDesktop, refs, leftStyle } = useLayoutPanelsResize({ isPlayground });
  const { fssettings, updateFSSettings } = useFullscreenSettingsStore();

  return (
    <div
      className="flex flex-col px-4 pb-4 lg:flex-row"
      ref={refs.parent}
      style={{ height: fssettings.isFullscreen ? '100vh' : 'calc(100vh - 3.5rem)' }}
    >
      <div
        className={`w-full overflow-hidden rounded-2xl border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 ${
          !isPlayground && 'border'
        }`}
        ref={refs.leftSide}
        style={leftStyle}
      >
        {leftComponent}
      </div>
      <div
        className={
          isDesktop
            ? 'resizer group relative cursor-col-resize p-2'
            : 'resizer relative cursor-row-resize p-2'
        }
        ref={refs.resizer}
      >
        <div className="group-hover:bg-primary group-active:bg-primary group-hover:dark:bg-primary absolute left-1/2 top-1/2 h-1 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-400 duration-300 group-active:duration-75 dark:bg-neutral-700 lg:h-24 lg:w-1" />
      </div>
      <div
        className="flex min-h-[90px] w-full flex-1 flex-grow flex-col overflow-hidden rounded-2xl border border-zinc-300 dark:border-zinc-700 lg:min-w-[500px]"
        ref={refs.rightSide}
      >
        {rightComponent}
      </div>
    </div>
  );
}
