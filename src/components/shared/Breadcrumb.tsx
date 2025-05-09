import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}
const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <motion.nav
      className="mb-6 text-sm text-gray-500"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {items.map((item, index) => (
        <span key={item.path}>
          <Link to={item.path} className="hover:underline">
            {item.label}
          </Link>
          {index < items.length - 1 && <span className="mx-1.5"> &gt; </span>}
        </span>
      ))}
    </motion.nav>
  );
};

export default Breadcrumb;
