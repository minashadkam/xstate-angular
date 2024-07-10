import { createMachine ,createActor, assign } from 'xstate';


const toggleMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEaG2A2gAwC6ioADqrORagQ4gAHogDMzAJw5JAVjEBGAEyyANCACeiALRKxOWQF9D6+llwBBMlVpmmbId179BSEeKVKZANgAcAdjVNRCUpA2NTdHMcKwpqGmFYZCJkXCIAM1SAJwAKUOZmAEo6KOwY62oWdjcnPnIBIVEEJUl-HEUAFn9JBWZZWX8FXzExdS0Ef18cBQ65b2YFBX8JULFjExACVAg4ITswRx46hrcm7W8xnUWFCJB9-GIKg5qjl0bEDvmcFUuEbRnwht7rEbIdnPVXKAmh0lL8FCMcAEjOsgA */
    id: 'toggle',
    initial: 'Inactive',
    context: { count: 0 },
    states: {
      Inactive: {
        on: { toggle: 'Active' },
      },
      Active: {
          entry: assign({ count: ({ context }) => context.count + 1 }),
          on: { toggle: 'Inactive' },
          after: { 2000: 'Inactive' },
      },
    },
  });
  
  
  
  
  // Creates an actor that you can send events to; not started yet!
  const actor = createActor(toggleMachine);
  
  // Subscribe to updated snapshots (emitted state changes) from the actor
  actor.subscribe((snapshot) => {
    console.log('Value:', snapshot.value);
  });
  
  // Start the actor!
  actor.start(); // logs 'Inactive'
  
  // Send events
  actor.send({ type: 'toggle' }); // logs 'Active'
  actor.send({ type: 'toggle' }); // logs 'Inactive'
  

