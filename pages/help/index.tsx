import styles from '../home/style.module.scss'
import Footer from '../../components/footer';
import Header from '../../components/header';
import Help from '../../components/help';

export default function Home() {
  return (
    <div className={styles.container}>
      
      <Header />
      <main className={styles.main}>
       <Help />
      </main>

      <Footer />
    </div>
  )
}