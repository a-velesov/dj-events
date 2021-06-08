import Layout from '@/components/Layout';
import {parseCookies} from '@/helpers/index';
import {API_URL} from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';

const Dashboard = ({events}) => {
    const deleteEvent = () => {

    }
    return (
        <Layout title="User Dashboard">
            <div className={styles.dashboard}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>
                {
                    events.map((e) => (
                        <DashboardEvent evt={e} key={e.id} handleDelete={deleteEvent} />
                    ))
                }
            </div>
        </Layout>
    );
};

export default Dashboard;

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req);

    const res = await fetch(`${API_URL}/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const events = await res.json();

    return {
        props: {
            events
        }
    };
}