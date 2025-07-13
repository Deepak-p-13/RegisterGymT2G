import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaCloudUploadAlt, FaImage, FaVideo, FaTimes, FaCheck } from 'react-icons/fa'
import axios from 'axios'; // Add this import for making API calls

function PlanDetailsPage() {
  const { plan } = useParams()
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState(plan)
  const [formData, setFormData] = useState({
    gymName: '',
    name: '',
    email: '',
    phoneNo: '',
    officeNo: '',
    address: '',
    logo: null,
    photos: [],
    videos: []
  })
  const [previews, setPreviews] = useState({
    logo: null,
    photos: [],
    videos: []
  })

  const plans = [
    {
      name: 'basic',
      title: 'Basic',
      price: '$29',
      features: ['Access to gym floor', 'Basic equipment', 'Locker room access']
    },
    {
      name: 'premium',
      title: 'Premium',
      price: '$49',
      features: ['All Basic features', 'Group classes', 'Personal trainer', 'Nutrition plan']
    },
    {
      name: 'elite',
      title: 'Elite',
      price: '$79',
      features: ['All Premium features', '24/7 access', 'Spa access', 'Guest passes']
    },
    {
      name: 'custom',
      title: 'Custom',
      price: 'Custom',
      features: ['Tailored to your needs', 'Flexible options', 'Custom amenities', 'Priority support']
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (name === 'photos' || name === 'videos') {
      const fileArray = Array.from(files)
      setFormData(prev => ({
        ...prev,
        [name]: [...prev[name], ...fileArray]
      }))

      // Create preview URLs
      const newPreviews = fileArray.map(file => URL.createObjectURL(file))
      setPreviews(prev => ({
        ...prev,
        [name]: [...prev[name], ...newPreviews]
      }))
    } else {
      const file = files[0]
      setFormData(prev => ({
        ...prev,
        [name]: file
      }))
      
      // Create preview URL for logo
      if (file) {
        const previewUrl = URL.createObjectURL(file)
        setPreviews(prev => ({
          ...prev,
          [name]: previewUrl
        }))
      }
    }
  }

  const removeFile = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
    setPreviews(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        gymName: formData.gymName,
        planType: selectedPlan,
        email: formData.email,
        password: 'aki', // Replace with actual password input if needed
        phoneNumber: formData.phoneNo,
        officeNumber: formData.officeNo,
        location: formData.address,
      };
      await axios.post('http://localhost:8080/api/gyms/register', payload);
      navigate('/payment');
    } catch (error) {
      console.error('Error registering gym:', error);
      alert('Failed to register gym. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F1EA] to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Complete Your Registration</h1>
          <div className="inline-block bg-black text-white px-6 py-2 rounded-full text-lg font-semibold mb-4">
            Selected Plan: {plans.find(p => p.name === selectedPlan)?.title}
          </div>
          <p className="text-gray-600">Fill in your details to get started with your fitness journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Plan Selection */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
              Confirm or Change Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((planOption) => (
                <div
                  key={planOption.name}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
                    ${selectedPlan === planOption.name 
                      ? 'border-black bg-black text-white shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-black'}`}
                  onClick={() => setSelectedPlan(planOption.name)}
                >
                  {selectedPlan === planOption.name && (
                    <div className="absolute top-3 right-3">
                      <FaCheck className="w-5 h-5" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{planOption.title}</h3>
                  <p className="text-2xl font-bold mb-4">{planOption.price}</p>
                  <ul className="space-y-2 text-sm">
                    {planOption.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="w-4 h-4 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gym Name</label>
                <input
                  type="text"
                  name="gymName"
                  value={formData.gymName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Office Number</label>
                <input
                  type="tel"
                  name="officeNo"
                  value={formData.officeNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  required
                ></textarea>
              </div>
            </div>
          </div>



          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transform hover:scale-105 transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlanDetailsPage