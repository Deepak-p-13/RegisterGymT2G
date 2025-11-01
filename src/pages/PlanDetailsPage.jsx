import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaCloudUploadAlt, FaImage, FaVideo, FaTimes, FaCheck } from 'react-icons/fa'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

function PlanDetailsPage() {
  const { plan } = useParams()
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState(parseInt(plan))
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.SUBSCRIPTIONS)
        setSubscriptions(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching subscriptions:', error)
        setLoading(false)
      }
    }
    
    fetchSubscriptions()
  }, [])

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
      const selectedSubscription = subscriptions.find(sub => sub.subscriptionId === selectedPlan)
      const payload = {
        name: formData.name,
        gymName: formData.gymName,
        email: formData.email,
        planType: selectedSubscription?.subscriptionName || 'Premium',
        phoneNumber: formData.phoneNo,
        officeNumber: formData.officeNo,
        location: formData.address,
        active: true,
        subscription: {
          subscriptionId: selectedPlan
        }
      };
      await axios.post(API_ENDPOINTS.GYM_REGISTER, payload);
      navigate('/payment');
    } catch (error) {
      console.error('Error registering gym:', error);
      alert('Failed to register gym. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffff] to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Complete Your Registration</h1>
          {!loading && subscriptions.length > 0 && (
            <div className="inline-block bg-black text-white px-6 py-2 rounded-full text-lg font-semibold mb-4">
              Selected Plan: {subscriptions.find(s => s.subscriptionId === selectedPlan)?.subscriptionName}
            </div>
          )}
          <p className="text-gray-600">Fill in your details to get started with your fitness journey</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            <p className="mt-4 text-gray-600">Loading subscription plans...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Plan Selection */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
                Confirm or Change Your Plan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subscriptions.map((subscription) => (
                  <div
                    key={subscription.subscriptionId}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
                      ${selectedPlan === subscription.subscriptionId 
                        ? 'border-black bg-black text-white shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-black'}`}
                    onClick={() => setSelectedPlan(subscription.subscriptionId)}
                  >
                    {selectedPlan === subscription.subscriptionId && (
                      <div className="absolute top-3 right-3">
                        <FaCheck className="w-5 h-5" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2">{subscription.subscriptionName}</h3>
                    <p className="text-2xl font-bold mb-1">₹{subscription.subscriptionAmount}</p>
                    <p className="text-sm mb-4 opacity-80">
                      for {subscription.subscriptionMonths} {subscription.subscriptionMonths === 1 ? 'month' : 'months'}
                    </p>
                    <ul className="space-y-2 text-sm">
                      {subscription.details.map((detail) => (
                        <li key={detail.subscriptionDetailsId} className="flex items-start">
                          <FaCheck className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{detail.details}</span>
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
        )}
      </div>
    </div>
  )
}

export default PlanDetailsPage