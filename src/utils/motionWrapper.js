import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const MotionWrapper = ({ children }) => {
  const apiCalling = useSelector((state) => state.apiCalling);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {children}
    </motion.section>
  );
};

export default MotionWrapper;
