interface asyncFunction {
  (): Promise<any>;
}

interface AnticipationConfig {
  tries: number;
  millisecondsBetweenTries: number;
}

function delay(ms:number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runBlock(block:asyncFunction, maxRepetitions:number, duration:number = 0): Promise<any> {
  if (maxRepetitions > 0) {
    try {
      return await block();
    } catch (error) {
      await delay(duration)
      return await runBlock(block, --maxRepetitions, duration);
    }
  } else {
    throw new Error('Waited too long')
  }
}

const DefaultConfig: AnticipationConfig = {
  tries: 3,
  millisecondsBetweenTries: 0
}

export default async function anticipate(block:asyncFunction, overrides?:Partial<AnticipationConfig>) {
  const config = { ...DefaultConfig, ...overrides };
  return runBlock(block, config.tries, config.millisecondsBetweenTries)
}
