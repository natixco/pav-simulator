<script lang="ts">
  import { locale } from '$lib/translations';
  import { goto } from '$app/navigation';
  import { onDestroy, onMount } from 'svelte';
  import Button from '../../../../components/Button.svelte';
  import Container from '../../../../components/Container.svelte';
  import { monotonyStore } from '$lib/results';

  type PathDef = {
    d: string;
    stroke: string;
    strokeWidth: number;
    fill: string;
  };
  type ShapeDef = {
    viewBox: string;
    width: number;
    height: number;
    paths: PathDef[];
  };

  const mkPath = (d: string): PathDef => ({
    d,
    stroke: 'red',
    strokeWidth: 5,
    fill: 'transparent',
  });

  const CorrectShape1 = {
    viewBox: '0 0 100 200',
    width: 120,
    height: 200,
    paths: [mkPath('M 0 0 H 100 V 200 H 0 V 0 Z'), mkPath('M 0 100 H 50')],
  };

  const CorrectShape2 = {
    viewBox: '0 0 100 200',
    width: 120,
    height: 200,
    paths: [mkPath('M 0 0 H 100 V 200 H 0 V 0 Z'), mkPath('M 50 0 V 100')],
  };

  const CorrectShape3 = {
    viewBox: '0 0 100 200',
    width: 120,
    height: 200,
    paths: [mkPath('M 0 0 H 100 V 200 H 0 V 0 Z'), mkPath('M 50 100 V 200')],
  };

  const CorrectShape4 = {
    viewBox: '0 0 100 200',
    width: 120,
    height: 200,
    paths: [mkPath('M 0 0 H 100 V 200 H 0 V 0 Z'), mkPath('M 50 100 H 100')],
  };

  const IncorrectShape1 = {
    viewBox: '0 0 100 200',
    width: 120,
    height: 200,
    paths: [
      mkPath('M 0 0 H 100 V 200'),
      mkPath('M 0 0 H 0 V 80'),
      mkPath('M 0 200 H 100 V 0'),
      mkPath('M 50 0 V 100'),
    ],
  };

  const IncorrectShape2 = {
    viewBox: '0 0 100 200',
    width: 120,
    height: 200,
    paths: [
      mkPath('M 0 0 H 100 V 0'),
      mkPath('M 0 0 H 0 V 200'),
      mkPath('M 0 200 H 100 V 100'),
      mkPath('M 50 0 V 100'),
    ],
  };

  const IncorrectShape3 = {
    viewBox: '0 0 100 200',
    width: 120,
    height: 200,
    paths: [
      mkPath('M 0 0 H 100 V 200'),
      mkPath('M 50 100 H 100'),
      mkPath('M 0 200 H 0 V 100'),
      mkPath('M 0 200 H 100'),
    ],
  };

  const IncorrectShape4 = {
    viewBox: '0 0 140 200',
    width: 140,
    height: 200,
    paths: [
      mkPath('M 0 0 H 100 V 200 H 0 V 0 Z'),
      mkPath('M 0 100 H 50'),
      mkPath('M 110 50 V 200'),
      mkPath('M 120 80 V 200'),
    ],
  };

  const CORRECT_SHAPES: ShapeDef[] = [
    CorrectShape1,
    CorrectShape2,
    CorrectShape3,
    CorrectShape4,
  ];
  const INCORRECT_SHAPES: ShapeDef[] = [
    IncorrectShape1,
    IncorrectShape2,
    IncorrectShape3,
    IncorrectShape4,
  ];
  const ALL_SHAPES: ShapeDef[] = [...CORRECT_SHAPES, ...INCORRECT_SHAPES];

  let bottomShapeIndex: number | null = null;
  let testStarted: boolean = false;
  let timeLeft: number = 7 * 60; // seconds
  let score: { correct: number; total: number } = { correct: 0, total: 0 };

  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  function scheduleTick(): void {
    if (timeoutId) clearTimeout(timeoutId);
    if (testStarted && timeLeft > 0) {
      timeoutId = setTimeout(() => {
        timeLeft = timeLeft - 1;
        if (timeLeft === 0) {
          stopTest();
        } else {
          scheduleTick();
        }
      }, 1000);
    }
  }

  onMount(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!testStarted) return;
      const key = event.key?.toLowerCase?.();
      if (key === 'c') {
        handleYes();
      } else if (key === 'm') {
        handleNo();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    startTest();
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  onDestroy(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });

  function startTest(): void {
    testStarted = true;
    timeLeft = 7 * 60;
    score = { correct: 0, total: 0 };
    generateNewBottomShape();
    scheduleTick();
  }

  function generateNewBottomShape(excludeIndex?: number): void {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * ALL_SHAPES.length);
    } while (randomIndex === excludeIndex && ALL_SHAPES.length > 1);
    console.log({ exclude: excludeIndex, new: randomIndex });
    bottomShapeIndex = randomIndex;
  }

  function handleYes(): void {
    if (!testStarted || bottomShapeIndex === null) return;
    const bottomShape = ALL_SHAPES[bottomShapeIndex];
    const isMatch = CORRECT_SHAPES.includes(bottomShape);

    score = { ...score, total: score.total + 1 };
    if (isMatch) {
      score = { ...score, correct: score.correct + 1 };
    }
    generateNewBottomShape(bottomShapeIndex);
  }

  function handleNo(): void {
    if (!testStarted || bottomShapeIndex === null) return;
    const bottomShape = ALL_SHAPES[bottomShapeIndex];
    const isMatch = CORRECT_SHAPES.includes(bottomShape);

    score = { ...score, total: score.total + 1 };
    if (!isMatch) {
      score = { ...score, correct: score.correct + 1 };
    }
    generateNewBottomShape(bottomShapeIndex);
  }

  function stopTest(): void {
    testStarted = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    monotonyStore.add({
      timestamp: Date.now(),
      total: score.total,
      correct: score.correct,
    });
    end();
  }

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function end(): void {
    const url = new URL(window.location.href);
    url.search = '';
    url.pathname = `${locale.get()}/monotony-test`;
    goto(url);
  }
</script>

<Container>
    <div class="flex flex-row items-center justify-between w-full mt-10 mb-40">
        <Button label="Stop" size="base" variant="secondary" onClick={() => stopTest()}/>
        <div class="text-2xl font-mono">
            {formatTime(timeLeft)}
        </div>
    </div>

    <div class="flex flex-col items-center gap-6">
        <div class="flex flex-row flex-wrap items-center gap-4">
            {#each CORRECT_SHAPES as shape, index (index)}
                <div>
                    <svg viewBox={shape.viewBox}
                         width={shape.width}
                         height={shape.height}>
                        {#each shape.paths as p}
                            <path
                                    d={p.d}
                                    stroke={p.stroke}
                                    stroke-width={p.strokeWidth}
                                    fill={p.fill}
                            />
                        {/each}
                    </svg>
                </div>
            {/each}
        </div>

        <div class="mt-20">
            {#if bottomShapeIndex !== null}
                {#key bottomShapeIndex}
                    {#if ALL_SHAPES[bottomShapeIndex]}
                        <svg viewBox={ALL_SHAPES[bottomShapeIndex].viewBox}
                             width={ALL_SHAPES[bottomShapeIndex].width}
                             height={ALL_SHAPES[bottomShapeIndex].height}>
                            {#each ALL_SHAPES[bottomShapeIndex].paths as p}
                                <path d={p.d}
                                      stroke={p.stroke}
                                      stroke-width={p.strokeWidth}
                                      fill={p.fill}
                                />
                            {/each}
                        </svg>
                    {/if}
                {/key}
            {/if}
        </div>
    </div>
</Container>
