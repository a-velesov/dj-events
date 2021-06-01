import styles from '@/styles/Header.module.css';
import Link from 'next/link';
import Search from '@/components/Search';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    DJ Events
                </Link>
            </div>

            <Search/>

            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                            <a>Events</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/events/add'>
                            <a>Add Event</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;