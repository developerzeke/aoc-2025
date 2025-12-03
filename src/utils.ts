export type Mode = 'sampleOne' | 'challengeOne' | 'sampleTwo' | 'challengeTwo';

export class AdventOfCode<InputType, OutputType> {
  private inputs: {
    challengeInput: InputType;
    sampleInput: InputType;
  };

  private expectations: Partial<Record<Mode, OutputType>>;
  private solution: (
    input: InputType,
    modeInfo: { partOne: boolean; partTwo: boolean }
  ) => OutputType;

  constructor(
    inputs: { challengeInput: InputType; sampleInput: InputType },
    expectations: Partial<Record<Mode, OutputType>>,
    solution: (
      input: InputType,
      modeInfo: { partOne: boolean; partTwo: boolean }
    ) => OutputType
  ) {
    this.inputs = inputs;
    this.expectations = expectations;
    this.solution = solution;
  }

  private run(mode: Mode, customInput?: InputType) {
    const input = customInput ??
      this.inputs[
        mode.startsWith("challenge") ? "challengeInput" : "sampleInput"
        ];

    const expected = this.expectations[mode];

    const before = performance.now();
    const result = this.solution(input, {
      partOne: mode.endsWith("One"),
      partTwo: mode.endsWith("Two"),
    });

    console.log(
      `${Math.round((performance.now() - before) * 100) / 100}ms - ${
        (expected && !customInput) ? (result === expected ? "🎉  " : "❌  ") : ""
      }${customInput ? 'custom' : mode} result:`,
      result
    );

    if (expected && result !== expected) {
      console.log("  Expected:", expected);
    }

    // Return a new runner so the method chain starts fresh again
    return this;
  }

  sampleOne() {
    return this.run('sampleOne')
  }

  challengeOne() {
    return this.run('challengeOne')
  }

  sampleTwo() {
    return this.run('sampleTwo')
  }

  challengeTwo() {
    return this.run('challengeTwo')
  }

  partOne() {
    this.run('sampleOne')
    this.run('challengeOne')
    return this;
  }

  partTwo() {
    this.run('sampleTwo')
    this.run('challengeTwo')
    return this;
  }


  runAll() {
    this.run('sampleOne')
    this.run('challengeOne')
    this.run('sampleTwo')
    this.run('challengeTwo')
    return this;
  }

  customPartOne(input: InputType) {
    return this.run('sampleOne', input)
  }

  customPartTwo(input: InputType) {
    return this.run('sampleTwo', input)
  }
}