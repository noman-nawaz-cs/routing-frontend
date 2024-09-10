import{json, useRouteLoaderData, redirect, defer, Await} from 'react-router-dom'
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import {Suspense} from 'react';

function EventDetails(){
    const {event, events} = useRouteLoaderData('event-detail');
    return (
        <>
            <Suspense fallback = {<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve = {event}>
                    {(loadedEvent) => <EventItem event = {loadedEvent}/>}
                </Await>
            </Suspense>
            <Suspense fallback = {<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve = {events}>
                    {(loadedEvents) => <EventsList events = {loadedEvents}/>}
                </Await>
            </Suspense>
        </>
    )
}

export default EventDetails;

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
        console.log(resData.events)
        return resData.events;
    }
}

async function loadEvent(id, method){
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw json(
            {message: 'Could not fetch event details'},
            {status: 500}
        )
    } else { 
        const resData = await response.json();
        console.log(resData.event)
        return resData.event;
    }
}

export async function loader({request, params}){
    return defer({
        event: await loadEvent(params.eventId),
        events: await loadEvents(),
    })
}

export async function action({params}){
    const response= await fetch('http://localhost:8080/events/' + params.eventId, {
        method: 'DELETE',
    });

    if(!response.ok){
        throw json(
            {message: 'Could not delete event.'},
            {status: 500}
        )
    }
    return redirect('/events');
}