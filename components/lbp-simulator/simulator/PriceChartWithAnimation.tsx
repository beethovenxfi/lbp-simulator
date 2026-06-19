'use client';

import { memo } from 'react';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { useDisplayStep } from '@/lib/hooks/useDisplayStep';
import { PriceChartTab } from './tabs/PriceChartTab';
import type { ChartDataItem } from './SimulatorChartArea';

interface PriceChartWithAnimationProps {
  chartData: ChartDataItem[];
  priceDomain: [number, number] | undefined;
  isPlaying: boolean;
  shouldAnimate: boolean;
}

/**
 * Wraps PriceChartTab with RAF-driven display step so only the chart re-renders
 * every frame during playback; store currentStep still advances at tick cadence.
 */
function PriceChartWithAnimationComponent({
  chartData,
  priceDomain,
  isPlaying,
  shouldAnimate,
}: PriceChartWithAnimationProps) {
  const currentStep = useSimulatorStore((state) => state.currentStep);
  const simulationSpeed = useSimulatorStore((state) => state.simulationSpeed);
  const totalSteps = useSimulatorStore((state) => state.totalSteps);
  const setCurrentStep = useSimulatorStore((state) => state.setCurrentStep);

  const displayStep = useDisplayStep(
    isPlaying,
    simulationSpeed,
    totalSteps,
    currentStep,
    setCurrentStep,
  );

  return (
    <PriceChartTab
      chartData={chartData}
      isPlaying={isPlaying}
      shouldAnimate={shouldAnimate}
      currentStep={displayStep}
      priceDomain={priceDomain}
    />
  );
}

export const PriceChartWithAnimation = memo(PriceChartWithAnimationComponent);
