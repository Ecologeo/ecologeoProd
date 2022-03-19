import styles from '../home/style.module.scss';
import stylesThis from './style.module.scss';
import logo from '../assets/img/logo.png';
import people from '../assets/img/group-of-people.jpg';
import gPlay from '../assets/img/google-play.png';
import celPpost from '../assets/img/cepillosPost.png';
import creamPost from '../assets/img/creamPost.png';
import Footer from '../../components/footer';
import Header from '../../components/header';
import imgMapa from '../assets/img/mapa.png';
import analytics from '../assets/img/analytics-eco.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        
        <div className={ styles.subTitle}>
           <h1>
            <em>Aumentemos la influencia de los compradores ecológicos en el mercado.</em>
           </h1>
        </div>

        {/*<div className={ styles.imgRadius}>
            <img src={people} alt="Ecologeo group people" width={800} height={500} />
    </div> */}


        <div className={ styles.subTitle}>
            <h2>Comparte <span className={styles.green}>recomendaciones</span> de tus productos ecológicos favoritos</h2>
        </div>

        <div className={styles.blockColumns}>
            <div className={styles.blockColumn}>
                <img src={celPpost} alt="Ecologeo Post" width={290} height={530} />
            </div>
            <div className={styles.blockColumn}>
                <p>
                Comparte las recomendaciones de los productos ecológicos que utilizas para que las personas menos informadas tengan más opciones de productos y compren amigablemente con el planeta.
                </p>
                <p>
                O explora las recomendaciones que las personas comparten en Ecologeo y así realiza tus compras más consciente del impacto que tienen en el planeta.
                  
                </p>
                <p>
                Puedes compartir fotos de tus productos ecológicos, y además comentar, aprobar o desaprobar las recomendaciones según tus experiencia con los productos publicados, esto <span className={styles.green}>evita el greenwashing.</span> 
                </p>
            </div>
        </div>

        <div className={ styles.subTitle}>
            <h2>Pide <span className={styles.green}>opiniones</span> acerca de productos ecológicos</h2>
        </div>

        <div className={styles.blockColumns}>
            
            <div className={styles.blockColumn}>
                <p>
                Pide opiniones de los productos ecológicos de los cuales no tengas mucha información, para que toda la comunidad de Ecologeo pueda indicarte si es una buena opción.
                </p>
                <p>
                Los miembros de la comunidad de Ecologeo que tengan más información acerca de un producto o que puedan realizar una investigación de este, al realizar sus comentarios están combatiendo el greenwashing y poniendo a la vista las mejores opciones de productos ecológicos. 
                </p>
            </div>
            <div className={styles.blockColumn}>
                <img src={creamPost} alt="publicacion de opinion" width={290} height={460} />
            </div>
        </div>

        <div className={ styles.subTitle}>
            <h2>Generación de <span className={styles.green}>reportes</span>  para empresas o usuarios interesados en las demandas de los consumidores ecológicos.</h2>
        </div>

        <div className={styles.blockColumns}>

        <div className={styles.blockColumn}>
                <img src={analytics} alt="publicacion de opinion" width={290} height={230} />
            </div>
            
            <div className={styles.blockColumn}>
                <p>
                Luego con todas las recomendaciones subidas a Ecologeo se realizará un análisis de los datos para responder preguntas e inquietudes de las empresas acerca de los productos ecológicos.
                </p>
                <p>
                En este punto es donde la influencia de los miembros de la comunidad de Ecologeo llega a las empresas, pues las empresas tendrán en cuenta estos reportes para tomar decisiones basadas en las verdaderas necesidades de los consumidores ecológicos. 
                </p>
            </div>
            
        </div>

       


      </main>

      <Footer />
    </div>
  )
}