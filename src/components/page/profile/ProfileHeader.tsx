import { motion, AnimatePresence } from 'framer-motion';

interface ProfileHeaderProps {
  showSavedMessage: boolean;
}

const ProfileHeader = ({
  showSavedMessage,
}: ProfileHeaderProps): JSX.Element => {
  return (
    <>
      {/* Saved message */}
      <AnimatePresence>
        {showSavedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 right-0 mt-4 mr-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md"
          >
            Profile saved successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileHeader;
