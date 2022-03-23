import styles from '../home/style.module.scss';
import stylesThis from './style.module.scss';
import logo from '../assets/img/logo.png';
import Footer from '../../components/footer';
import Header from '../../components/header';

export default function Home() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>

                <div className={stylesThis.subTitle}>
                    <h1>
                        Política de privacidad
                    </h1>
                </div>

                <div className={stylesThis.containerText}>
                    <p>Esta política de privacidad rige para todas las aplicaciones móviles para Android creadas por Ecologeo y publicadas en la cuenta de desarrollador con el nombre antes mencionado.</p>
                    <h3>¿Qué tipo de información recolectamos?</h3>
                    <p>Para el correcto funcionamiento de las aplicaciones que construimos o desarrollamos, estos son algunos de los datos que recolectamos:</p>
                    <h4>Ubicación</h4>
                    <p>Para el caso de las aplicaciones que sea necesario accedemos a los datos proporcionados por el GPS. Estos datos no los manejamos nosotros, son directamente manejado por Google Maps (nuestro proveedor de mapas).</p>
                    <h4>Dato de registro</h4>
                    <p>Quiero informarle que cada vez que utiliza mi Servicio, en caso de un error en la aplicación, recopilo datos e información (a través de productos de terceros) en su teléfono llamados Datos de registro. Estos datos de registro pueden incluir información como la dirección del Protocolo de Internet («IP») de su dispositivo, el nombre del dispositivo, la versión del sistema operativo, la configuración de la aplicación cuando utiliza mi Servicio, la hora y la fecha de uso del Servicio y otras estadísticas.</p>
                    <h4>Cookies</h4>
                    <p>Las cookies son archivos con una pequeña cantidad de datos que se usan comúnmente como identificadores únicos anónimos. Estos se envían a su navegador desde los sitios web que visita y se almacenan en la memoria interna de su dispositivo.</p>
                    <p>Este servicio no utiliza estas «cookies» explícitamente. Sin embargo, la aplicación puede usar código de terceros y bibliotecas que usan «cookies» para recopilar información y mejorar sus servicios. Tiene la opción de aceptar o rechazar estas cookies y saber cuándo se envía una cookie a su dispositivo. Si elige rechazar nuestras cookies, es posible que no pueda usar algunas partes de este Servicio.</p>
                    <h4>Proveedores de servicio</h4>
                    <p>Puedo emplear a empresas e individuos de terceros debido a las siguientes razones:</p>
                    <ul><li>Para facilitar nuestro servicio;</li><li>Para proporcionar el Servicio en nuestro nombre;</li><li>Para realizar servicios relacionados con el Servicio; o</li><li>Para ayudarnos a analizar cómo se utiliza nuestro Servicio.</li></ul>
                    <p>Deseo informar a los usuarios de este Servicio que estos terceros tienen acceso a su Información personal. La razón es realizar las tareas que se les asignaron en nuestro nombre. Sin embargo, están obligados a no divulgar ni utilizar la información para ningún otro propósito.</p>
                    <h4>Seguridad</h4>
                    <p>Valoro su confianza en proporcionarnos su información personal, por lo tanto, nos esforzamos por utilizar medios comercialmente aceptables para protegerla. Pero recuerde que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro y confiable, y no puedo garantizar su seguridad absoluta.</p>
                    <h4>Enlaces a otros sitios</h4>
                    <p>Este servicio puede contener enlaces a otros sitios. Si hace clic en un enlace de un tercero, será dirigido a ese sitio. Tenga en cuenta que estos sitios externos no son operados por mí. Por lo tanto, le recomiendo que revise la Política de privacidad de estos sitios web. No tengo control ni asumo ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de sitios o servicios de terceros.</p>
                    <h4>Privacidad de los niños</h4>
                    <p>Estos Servicios no se dirigen a ninguna persona menor de 13 años. No recopilo a sabiendas información de identificación personal de niños menores de 13 años. En el caso de que descubra que un niño menor de 13 años me ha proporcionado información personal, la borro inmediatamente de nuestros servidores. Si usted es padre o tutor y sabe que su hijo nos ha proporcionado información personal, comuníquese conmigo para que pueda realizar las acciones necesarias.</p>
                    <h3>¿Qué hacemos con los datos que recolectamos?</h3>
                    <p>Los datos recolectados son de dos tipos:</p>
                    <ul><li>Datos recolectados por nosotros.</li><li>Datos recolectados por terceros.</li></ul>
                    <h4>Datos recolectados por nosotros</h4>
                    <p>Estos datos se recolectan para obtener un feedback de que es lo que quieren nuestros usuarios y así poder mejorar brindando las correctas mejoras en cada actualización.</p>
                    <p>Los datos son manipulados a nivel de código, luego procesados en grandes cantidades, pero en ningún momento accedemos a datos de un usuario en particular, pues están encriptados y solo el usuario dueño de la información puede acceder a ellos.</p>
                    <h4>Datos recolectados por terceros</h4>
                    <p>En los datos recolectados por terceros están:</p>
                    <ul><li><a href="https://policies.google.com/privacy">Google Play</a></li><li><a href="https://support.google.com/analytics/answer/6004245?hl=en">Google Analytics</a></li><li><a href="https://support.google.com/admob/answer/6128543?hl=en">Google Admob</a></li><li><a href="https://firebase.google.com/support/privacy/?hl=es-419">Firebase</a></li></ul>
                    <p>Puedes dar click a cada uno de los elementos de la lista para acceder a sus políticas de datos.</p>
                </div>

            </main>

            <Footer />
        </div>
    )
}
