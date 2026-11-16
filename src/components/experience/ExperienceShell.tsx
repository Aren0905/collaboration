"use client";

import { ExperienceProvider, useExperience } from "@/components/experience/ExperienceContext";
import { SceneBackground } from "@/components/experience/SceneBackground";
import { ScrollOrchestrator } from "@/components/experience/ScrollOrchestrator";
import { ReducedMotionStory } from "@/components/experience/ReducedMotionStory";
import { CinematicNav } from "@/components/ui/CinematicNav";
import { SkipLink } from "@/components/ui/SkipLink";
import { SignalRail } from "@/components/cinematic/SignalRail";
import { SoundToggle } from "@/components/cinematic/SoundToggle";
import { OpeningScene } from "@/components/scenes/OpeningScene";
import { PartnerScene } from "@/components/scenes/PartnerScene";
import { MarketsScene } from "@/components/scenes/MarketsScene";
import { InterviewScene } from "@/components/scenes/InterviewScene";
import { DeliveryScene } from "@/components/scenes/DeliveryScene";
import { SplitScene } from "@/components/scenes/SplitScene";

function ExperienceInner() {
  const { reducedMotion } = useExperience();

  if (reducedMotion) {
    return (
      <>
        <SkipLink />
        <ReducedMotionStory />
      </>
    );
  }

  return (
    <>
      <SkipLink />
      <ScrollOrchestrator />
      <SceneBackground />
      <CinematicNav />
      <SignalRail />
      <SoundToggle />
      <main id="experience" className="relative">
        <OpeningScene />
        <PartnerScene />
        <MarketsScene />
        <InterviewScene />
        <DeliveryScene />
        <SplitScene />
      </main>
    </>
  );
}

export function ExperienceShell() {
  return (
    <ExperienceProvider>
      <ExperienceInner />
    </ExperienceProvider>
  );
}
