
import { useLoaderData,json, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';

function EventsPage() {
    const { events } = useLoaderData();
    
    // if (response.isError) {
    //     return <div>{response.message}</div>;
    // }
    return (
        <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
            <Await resolve = {events}>
                {(loadedEvents) => <EventsList events={loadedEvents}/>}
            </Await>
        </Suspense>
    );
}

export default EventsPage;

async function loadEvents(){
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        // return {isError: true, message: 'Could not fetch Events.'}
        // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {status: 500});
        throw json(
            {message: 'Could not fetch events.'},
            {status: 500}
        )
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export async function loader (){
    return defer({
        events: loadEvents()
    })
}