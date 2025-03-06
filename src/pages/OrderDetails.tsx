
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Info, 
  User, 
  DollarSign,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample order data - in a real application, this would come from an API
const orderData = {
  "ORD-1001": {
    orderId: "ORD-1001",
    orderedDate: "09/01/2025",
    deliveredDate: "13/01/2025",
    paymentStatus: "Paid",
    paymentDate: "04/01/2025",
    paymentMethod: "UPI",
    referenceNumber: "UTR12345678",
    washType: "Standard Wash",
    customerName: "Mahesh BM",
    customerPhone: "8197739892",
    customerAddress: "306, Vasisthaya Men's PG, Prashant Hills, Hyderabad-500032",
    services: [
      {
        name: "Wash & Fold",
        quantity: "2.5 x 49/kg",
        price: 122.5
      }
    ],
    clothingItems: [
      { name: "Shirt", quantity: 1 },
      { name: "Pant", quantity: 1 }
    ],
    totalAmount: 122.5
  },
  "ORD-1002": {
    orderId: "ORD-1002",
    orderedDate: "10/01/2025",
    deliveredDate: "14/01/2025",
    paymentStatus: "Pending",
    paymentDate: "-",
    paymentMethod: "Cash",
    referenceNumber: "-",
    washType: "Quick Wash",
    customerName: "Emma Wilson",
    customerPhone: "9876543210",
    customerAddress: "42, Lake View Apartments, Jubilee Hills, Hyderabad-500033",
    services: [
      {
        name: "Dry Clean",
        quantity: "3 pieces",
        price: 300
      }
    ],
    clothingItems: [
      { name: "Coat", quantity: 1 },
      { name: "Suit", quantity: 1 },
      { name: "Dress", quantity: 1 }
    ],
    totalAmount: 300
  },
  "ORD-1003": {
    orderId: "ORD-1003",
    orderedDate: "11/01/2025",
    deliveredDate: "15/01/2025",
    paymentStatus: "Paid",
    paymentDate: "11/01/2025",
    paymentMethod: "Card",
    referenceNumber: "TXN987654321",
    washType: "Standard Wash",
    customerName: "Robert Smith",
    customerPhone: "7654321890",
    customerAddress: "128, Green Valley Colony, Banjara Hills, Hyderabad-500034",
    services: [
      {
        name: "Wash & Iron",
        quantity: "2.3Kg",
        price: 182
      }
    ],
    clothingItems: [
      { name: "Shirt", quantity: 3 },
      { name: "Pant", quantity: 2 }
    ],
    totalAmount: 182
  }
};

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  // Find the order data based on the orderId parameter
  const order = orderId ? orderData[orderId] : null;
  
  if (!order) {
    return (
      <div className="container mx-auto p-4 md:p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <p className="mb-4">The order you are looking for does not exist.</p>
        <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
      </div>
    );
  }

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-amber-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getWashTypeColor = (type) => {
    if (type.toLowerCase().includes('standard')) {
      return 'text-blue-600';
    } else if (type.toLowerCase().includes('quick')) {
      return 'text-amber-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold mt-2">Order Details: {order.orderId}</h1>
        <p className="text-gray-500">View details for order {order.orderId}</p>
      </div>

      {/* Order Information Section */}
      <div className="mb-6 border rounded-lg overflow-hidden bg-green-50">
        <div className="px-4 py-3 bg-green-100 flex items-center">
          <Info className="h-5 w-5 text-green-700 mr-2" />
          <h2 className="text-lg font-medium text-green-700">Order Information</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-medium">{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Delivered date</span>
                <span className="font-medium">{order.deliveredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span className={`font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Ordered Date</span>
                <span className="font-medium">{order.orderedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wash Type</span>
                <span className={`font-medium ${getWashTypeColor(order.washType)}`}>
                  {order.washType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date</span>
                <span className="font-medium">{order.paymentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference Number</span>
                <span className="font-medium">{order.referenceNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information Section */}
      <div className="mb-6 border rounded-lg overflow-hidden bg-green-50">
        <div className="px-4 py-3 bg-green-100 flex items-center">
          <User className="h-5 w-5 text-green-700 mr-2" />
          <h2 className="text-lg font-medium text-green-700">Customer Information</h2>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Name</span>
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Number</span>
              <span className="font-medium">{order.customerPhone}</span>
            </div>
            <div className="flex justify-between flex-wrap">
              <span className="text-gray-600">Address</span>
              <span className="font-medium text-right max-w-[60%]">{order.customerAddress}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Information Section */}
      <div className="mb-6 border rounded-lg overflow-hidden bg-green-50">
        <div className="px-4 py-3 bg-green-100 flex items-center">
          <DollarSign className="h-5 w-5 text-green-700 mr-2" />
          <h2 className="text-lg font-medium text-green-700">Services Information</h2>
        </div>
        <div className="p-4">
          <div className="mb-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Wash Type</span>
              <span className={`font-medium ${getWashTypeColor(order.washType)}`}>
                {order.washType}
              </span>
            </div>
          </div>
          
          <p className={`font-medium mb-2 ${getWashTypeColor(order.washType)}`}>
            {order.washType}
          </p>
          
          <div className="border-t border-b py-3">
            <div className="grid grid-cols-3 gap-4 font-medium mb-2">
              <div>Services</div>
              <div>Quantity</div>
              <div className="text-right">Price</div>
            </div>
            
            {order.services.map((service, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div>{index + 1}. {service.name}</div>
                <div>{service.quantity}</div>
                <div className="text-right">₹{service.price.toFixed(1)}</div>
              </div>
            ))}
            
            <div className="mt-2">
              <div className="font-medium mb-1">Clothing Items</div>
              {order.clothingItems.map((item, index) => (
                <div key={index} className="ml-4">
                  {index + 1}. {item.name} ({item.quantity})
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-2 border-t font-medium">
            <span>Total</span>
            <span>₹{order.totalAmount.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          className="bg-cyan-600 hover:bg-cyan-700"
          onClick={() => window.print()}
        >
          Print Order Details
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
