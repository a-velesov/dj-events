import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import {API_URL, PER_PAGE} from '@/config/index';
import Pagination from '@/components/Pagination';

const EventsPage = ({events, total, page}) => {
    return (
        <Layout>
            <h1>Events</h1>
            {
                events.length === 0 && <h3>No events to show</h3>
            }

            {
                events.map(evt => (
                    <EventItem key={evt.id} evt={evt}/>
                ))
            }
            <Pagination page={page} total={total} />
        </Layout>
    );
};

export default EventsPage;

export async function getServerSideProps({query: {page = 1}}) {
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

    const totalRes = await fetch(`${API_URL}/events/count`);
    const total = await totalRes.json();

    const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
    const events = await eventRes.json();

    return {
        props: {events, page: +page, total},
    };
}