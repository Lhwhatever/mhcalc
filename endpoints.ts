export interface Endpoint {
    name: string
    path: string
}

const endpoints = {
    calculators: [
        {
            name: 'Valour Rift Simulator',
            path: '/vrift'
        }
    ]
}

export default endpoints
