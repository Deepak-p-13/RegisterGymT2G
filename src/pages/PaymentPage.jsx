import { useNavigate } from 'react-router-dom'

function PaymentPage() {
  const navigate = useNavigate()

  const handlePayment = (e) => {
    e.preventDefault()
    // Here you would integrate with a payment gateway
    alert('Payment processed successfully!')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#fffff] py-12">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Complete Payment</h1>
        
        <form onSubmit={handlePayment} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentPage