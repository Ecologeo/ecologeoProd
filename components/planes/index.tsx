import styles from './style.module.scss';



export default function Plans(){
    return(
        <section className={styles.pricePlans} >
		<ul className={styles.plans} >
			<li className={styles.plan}>
				<ul className={styles.planContainer}>
					<li className={styles.title}><h2>Gratis</h2></li>
					<li className={styles.price}><p>$0</p></li>
					<li>
						<ul className={styles.options}>
							<li className={styles.boderLi}>Aparta reciclaje ilimitado durante el dia</li>
							<li className={styles.boderLi}>Aparta 1 reciclaje al tiempo</li>
							<li><span>Cuando llegas al limite(1) de apartar reciclaje, lo habilitas nuevamente recogiendo el reciclaje.</span></li>
							
						</ul>
					</li>
					
				</ul>
			</li>

			<li className={styles.plan}>
				<ul className={styles.planContainer}>
					<li className={styles.title}><h2 className={styles.bestPlanTitle}>Pro</h2></li>
					<li className={styles.price}>
                        <p >
                            $10.000/Mensual <br/> 
                            <em className={styles.planAnual}>$100.000/Anual</em> 
                        </p>
                    </li>
					<li>
						<ul className={styles.options}>
                            <li className={styles.boderLi}>Aparta reciclaje ilimitado durante el dia</li>
							<li className={styles.boderLi}>Aparta 10 reciclajes al tiempo</li>
							<li><span>Cuando llegas al limite(10) de apartar reciclajes, los habilitas nuevamente recogiendo los reciclajes.</span></li>
							
						</ul>
					</li>
					
				</ul>
			</li>

			<li className={styles.plan}>
				<ul className={styles.planContainer}>
                    <li className={styles.title}><h2>Premium</h2></li>
					<li className={styles.price}>
                    <p >
                            $20.000/Mensual <br/> 
                            <em className={styles.planAnual}>$200.000/Anual</em> 
                        </p>
                    </li>
					<li>
						<ul className={styles.options}>
                        <li className={styles.boderLi}>Aparta reciclaje ilimitado durante el dia</li>
							<li className={styles.boderLi}>Aparta 20 reciclajes al tiempo</li>
							<li><span>Cuando llegas al limite(20) de apartar reciclajes, los habilitas nuevamente recogiendo los reciclajes.</span></li>
							
						</ul>
					</li>
				</ul>
			</li>
		</ul> 
	</section>
    )
}

