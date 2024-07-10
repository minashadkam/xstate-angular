import { createActor, createMachine } from "xstate";

const promiseMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AtgS1mAdMmAHYTbFQDEASgKIDKA8gDIBqtA2gAwC6iK6WNgAu2dMX4gAHogCMANlkAaEAE9EADgBM+LQFYAvgZVosuAkVLkqdAFK0AwgBVaAEW58kIZIJFiJXjIICspqcgAsAMy6hkYqxOgQcJKmOHgpvqLikkEAtPIq6gj5cd4YaRYkZBQZQlkBoEHhWoWaAJz4CvLdPb3yAOylqeb4qHDoADYAbpC1ftmBiJFcsvhR-XqtCBqrsSblI2MAVmAAxsKzXj51-jlLK2uRG1uyzfixRkA */
    id:'promise',
    initial:'pending',
    states:{
        'pending':{
             on:{
                RESOLVE:{target:'#promise.resolved'},
                REJECTED:{target:'rejected'}
             }

        },
        'resolved':{
            type:'final'
        },
        'rejected':{
            type:'final'
        }
    }

});



export const promiseMachineActors  = createActor(promiseMachine);


promiseMachineActors.subscribe((state)=>{
console.log(state);
})

