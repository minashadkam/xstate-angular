import { createMachine, createActor, assign } from 'xstate';

const textMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgCcx0ICoBiAFzAA96TJd6BtABgF1FQABwD2sDrmH4BIJogBMAdjkkAjNwCcAZgUBWADQgAnohVyAHCR0BfKwbRY8hUu3o0GzVjnT4YPfkhARMVdJaVkEAFolA2MEFQtNHRUdADY5a1sQexwCYjZqVx93FhJMYVRUDj9pIPFQgPDE7hIFTQAWbX0jRE0VBRJ1HV70mzsMHKd88SLGEsxvTDAAG2qA2pCpBpMzCxU27jSu2LluTRtM-GEIOGlsx2Ia0TrN0HCI024YxAiU9VU2swdXSjLLje6kChUGiPYISF4yRD7TQDA7pL4IOQdFpyFKpEaZO65ZwFaFrJ4bMImFIkMwpBTxXTouQnEiabhtFJmYHnIA */
  context: {
    committedValue: '',
    value: '',
  },
  initial: 'reading',
  states: {
    reading: {
      on: {
        'text.edit': { target: 'editing' },
      },
    },
    editing: {
      on: {
        'text.change': {
          actions: assign({
            value: ({ event }) => event['value'],
          }),
        },
        'text.commit': {
          actions: assign({
            committedValue: ({ context }) => context.value,
          }),
          target: 'reading',
        },
        'text.cancel': {
          actions: assign({
            value: ({ context }) => context.committedValue,
          }),
          target: 'reading',
        },
      },
    },
  },
});

const textActor = createActor(textMachine).start();

textActor.subscribe((state) => {
  console.log(state.context.value);
});

textActor.send({ type: 'text.edit' });
// logs ''
textActor.send({ type: 'text.change', value: 'Hello' });
// logs 'Hello'
textActor.send({ type: 'text.commit' });
// logs 'Hello'
textActor.send({ type: 'text.edit' });
// logs 'Hello'
textActor.send({ type: 'text.change', value: 'Hello world' });
// logs 'Hello world'
textActor.send({ type: 'text.cancel' });
// logs 'Hello'