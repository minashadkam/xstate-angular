import { createMachine } from "xstate";

const LogInMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBsD2UCWA7AdGqMEA+qgK4AuAxPtgNoAMAuoqAA6qwbkapYsgAPRACYAjPRwA2YQFYANCACeiUQHZ6AXw0KaufISLZq6MuQbMkIdp269+QhKIAcAZimyFyhDJwyt2kCxUCDh+XX5rLh4+SwcAWklPRDinYS0ddGw8dANTCI4ou1jEABZhJIQnVV9XFzr6hpd0kF1sgkhDGLYC2y7BEQBOURwBpxKXVXklRAGJelrGhpL-DSA */
    id:'login',
    initial:'logged_out',
    states:{
        'logged_out':{
            on:{
                'login':{
                    target:'logged_in'
                }
            }
        },
        'logged_in':{
            type:'compound',
            on:{
                'logout':{
                    target:'#login.logged_out'
                }
            }
        }
    }
})