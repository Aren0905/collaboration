"use client";

import { ExperienceProvider, useExperience } from "@/components/experience/ExperienceContext";
import { SceneBackground } from "@/components/experience/SceneBackground";
import { ScrollOrchestrator } from "@/components/experience/ScrollOrchestrator";
import { ReducedMotionStory } from "@/components/experience/ReducedMotionStory";
import { CinematicNav } from "@/components/ui/CinematicNav";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { SkipLink } from "@/components/ui/SkipLink";
import { StorySignalThroughline } from "@/components/cinematic/StorySignalThroughline";
import { OpeningScene } from "@/components/scenes/OpeningScene";
import { SceneATwoStrengths } from "@/components/scenes/SceneATwoStrengths";
import { SceneBGlobalOpportunities } from "@/components/scenes/SceneBGlobalOpportunities";
import { SceneCFindPrepare } from "@/components/scenes/SceneCFindPrepare";
import { SceneDInterviewSupport } from "@/components/scenes/SceneDInterviewSupport";
import { SceneEProjectDelivery } from "@/components/scenes/SceneEProjectDelivery";
import { SplitScene } from "@/components/scenes/SplitScene";
import { ChemistryScene } from "@/components/scenes/ChemistryScene";

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
      <ProgressIndicator />
      <StorySignalThroughline />
      <main id="experience" className="relative md:pl-6 xl:pl-8">
        <OpeningScene />
        <SceneATwoStrengths />
        <SceneBGlobalOpportunities />
        <SceneCFindPrepare />
        <SceneDInterviewSupport />
        <SceneEProjectDelivery />
        <SplitScene />
        <ChemistryScene />
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
