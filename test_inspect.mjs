import { getActivities } from './src/app/[locale]/(protected)/admin/(with_layout)/activities/actions'

async function test() {
    try {
        const { data } = await getActivities(1, '', 1)
        console.log('Activity row keys:', data.length > 0 ? Object.keys(data[0]) : 'No data')
        console.log('First activity:', data[0])
    } catch (e) {
        console.error('Error:', e)
    }
}

test()
