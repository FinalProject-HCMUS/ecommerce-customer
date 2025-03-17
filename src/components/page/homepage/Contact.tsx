import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"

const Contact = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-8">Say something to start a live chat!</p>

            <div className="space-y-6">
              <div className="flex items-center">
                <FiPhone className="w-6 h-6 mr-4 text-gray-600" />
                <span>+1012 3456 789</span>
              </div>
              <div className="flex items-center">
                <FiMail className="w-6 h-6 mr-4 text-gray-600" />
                <span>demo@gmail.com</span>
              </div>
              <div className="flex items-start">
                <FiMapPin className="w-6 h-6 mr-4 text-gray-600 mt-1" />
                <span>132 Dartmouth Street Boston, Massachusetts 02156 United States</span>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Write your message..."
              />
            </div>

            <div className="text-right">
              <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact