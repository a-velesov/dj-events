import styles from '../styles/Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={ styles.header }>
      <div className={ styles.logo }>
        <Link href='/'>
          DJ Events
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              Events
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;