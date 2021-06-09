import Layout from '@/components/Layout';
import Image from 'next/image';
import {FaPencilAlt, FaTimes} from 'react-icons/fa';
import Link from 'next/link';
import {API_URL} from '@/config/index';
import styles from '@/styles/Event.module.css';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

const EventPage = ({evt}) => {
    return (
        <Layout>
            <div className={styles.event}>
                <span>
                    {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
                </span>
                <h1>{evt.name}</h1>
                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image.formats.medium.url} width={960} height={600}/>
                    </div>
                )}
                <h3>Performers: </h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue:</h3>
                <p>{evt.address}</p>

                <Link href='/events'>
                    <a className={styles.back}>{'<'}Go Back</a>
                </Link>
            </div>
        </Layout>
    );
};

export default EventPage;

export async function getServerSideProps({query: {slug}}) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`);
    const events = await res.json();
    return {
        props: {
            evt: events[0]
        },
    };
}