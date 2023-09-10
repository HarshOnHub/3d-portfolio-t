// rafce
import { motion } from "framer-motion"
import { styles } from "../../style"
import { staggerContainer } from "../utils/motion"


const SectionWrapper = (Component, idName) => 
function HOC() {
    return (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{once: true, amount: 0.25 }} // will show the animation only once for 0.25 sec
            className={`${styles.padding} max-w-7xl mx-auto relative z-0 mt-8`}
        >
            {/* ye span bna ke automatic scroll wala jugaad kese chalne lagg gya? */}
            <span className="hash-span" id={idName}>
                &nbsp;
            </span>

            <Component/>
        </motion.section>
    )
}

export default SectionWrapper
