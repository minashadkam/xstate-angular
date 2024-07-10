import { createActor, createMachine } from 'xstate';

const feedbackMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAdAI4CucALgJYD2AdgMRRVUQDaADALqKgAOVsFSrW4gAHogCMANgA0IAJ6IAzAA4ATAF8tcmszgjUGHLhF8BQmiPEIAtBICsEuYoRqALAHZtIQxCx4iUlgLU35BakskMUQ7NiVnZRUJfHtvX38CMgALTBpceCizcOEo6wkJN3w2DyS1ewSEVWTUrQ0gA */
  id: 'feedback',
  initial: 'question',
  // types: {} as {
  //   context: { feedback: string };
  //   events: { type: 'feedback.good' } | { type: 'feedback.bad' };
  //   actions: { type: 'logTelemetry' };
  // },
  entry:{ type:'hello'},
  states: {
    question: {
      on: {
        'good': {  target: 'thanks' },
      },
    },
    thanks: {
      // ...
    },
    // ...
  },
});


const feedbackActor = createActor(feedbackMachine);

feedbackActor.subscribe((state) => {
  console.log(state.value);
});

feedbackActor.start();
// logs 'question'

feedbackActor.send({ type: 'good' });


const customFeedbackMachine = feedbackMachine.provide({
  actions: {
    doSomething: () => {
      console.log('Doing something custom!');
    },
  },
});

const customFeedbackActor = createActor(customFeedbackMachine).start();