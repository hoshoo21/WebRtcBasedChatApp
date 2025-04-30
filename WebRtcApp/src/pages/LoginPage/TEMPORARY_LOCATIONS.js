const fake_locations =[
    {
        position: {
            latitude: 45.516,
            longitude: -122.636,
        },

    },
    {
        position: {
            latitude:  9.07643, 
            longitude: 135.97311,
        },
    },
    {
        position: {
            latitude: -58.67656, 
            longitude: 56.70621,
        },
    },
    {
        position: {
            latitude: -23.90779, 
            longitude: 137.10303,
        },
    },
    {
        position: {
            latitude: -75.84398, 
            longitude: 122.57813,
        },
    },
    {
        position: {
            latitude:  7.92261, 
            longitude: -82.56195,
        },
    }

]

export const getFakeLocation =()=>{
    return fake_locations[Math.floor(Math.random()*fake_locations.length)];
}