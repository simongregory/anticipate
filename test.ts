import { assert } from 'chai';
import * as sinon from 'sinon';
import anticipate from './';

describe('to retry a function until it succeeds, anticipate()', () => {
  it('calls a syncronous function repeatedly until it stops throwing errors', async () => {
    const block = sinon.stub()
      .onFirstCall().throws()
      .onSecondCall().throws()
      .onThirdCall().returns(true);

    const result = await anticipate(block);
    assert.equal(result, true);
  });

  it('calls an asyncronous function repeatedly until it stops throwing errors', async () => {
    const block = sinon.stub()
      .onFirstCall().throws()
      .onSecondCall().throws()
      .onThirdCall().resolves(true);

    const result = await anticipate(block);
    assert.equal(result, true);
  });

  it('throws when the function throws errors too many times', async () => {
    const block = sinon.stub()
      .onFirstCall().throws()
      .onSecondCall().throws()
      .onThirdCall().throws();

    try {
      await anticipate(block);
      assert.equal(true, false, 'Expected to have thrown')
    } catch (error: any) {
      assert.equal(error.message, 'Waited too long') 
    }
  });

  it('allows the number of retries to be specified', async () => {
    const block = sinon.stub()
      .onCall(0).throws()
      .onCall(1).throws()
      .onCall(2).throws()
      .onCall(3).returns(true);

    const result = await anticipate(block, {tries: 4});
    assert.equal(result, true);
  });

  it('allows the period between retries to be specified', async () => {
    const block = sinon.stub()
      .onCall(0).throws()
      .onCall(1).throws()
      .onCall(2).returns(true);

    const started = new Date().getTime();
    const result = await anticipate(block, {millisecondsBetweenTries: 10});
    const duration = new Date().getTime() - started;

    assert.isAbove(duration, 19);
    assert.isBelow(duration, 29);

    assert.equal(result, true);
  });
});
