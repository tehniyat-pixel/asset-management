import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssetForm = () => {
  const [assetData, setAssetData] = useState({
    name: '',
    cost: '',
    purchaseDate: '',
    deliveryDate: '',
    depreciationValue: '',
  });

  // Load Google Font dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData({ ...assetData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
};
const AssetForm = () => {
  const [assetData, setAssetData] = useState({
    name: '',
    cost: '',
    purchaseDate: '',
    deliveryDate: '',
    depreciationValue: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Create axios instance with base config
axios.post('https://8cd5f3c1-5355-4a95-907b-8bac60157245.e1-us-east-azure.choreoapps.dev/api/assets', data, {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData({ ...assetData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.post('/assets', assetData);
      
      if (response.status === 201) {
        alert('Asset created successfully!');
        setAssetData({
          name: '',
          cost: '',
          purchaseDate: '',
          deliveryDate: '',
          depreciationValue: '',
        });
      }
    } catch (error) {
      console.error('Error creating asset:', error);
      
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(`Error: ${error.response.data.message || 'Failed to create asset'}`);
      } else if (error.request) {
        // Request was made but no response received
        alert('Network error - please check your connection');
      } else {
        // Something happened in setting up the request
        alert('Error: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Styles (same as your original)
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    fontFamily: '"Poppins", sans-serif',
    padding: '20px',
  };

  const formStyle = {
    width: '100%',
    maxWidth: '500px',
    background: '#fff',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  };

  const labelStyle = {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    display: 'block',
  };

  const inputStyle = {
    width: '93%',
    padding: "20px",
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    background: isLoading ? '#ccc' : 'rgba(154, 36, 119)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
          🚀 Add New Asset
        </h2>

        {/* Form fields remain the same */}
        <label htmlFor="name" style={labelStyle}>Asset Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={assetData.name}
          onChange={handleChange}
          placeholder="Enter asset name"
          style={inputStyle}
          required
          disabled={isLoading}
        />

        <label htmlFor="cost" style={labelStyle}>Asset Cost</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={assetData.cost}
          onChange={handleChange}
          placeholder="Enter cost"
          style={inputStyle}
          required
          disabled={isLoading}
        />

        <label htmlFor="purchaseDate" style={labelStyle}>Date of Purchase</label>
        <input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          value={assetData.purchaseDate}
          onChange={handleChange}
          style={inputStyle}
          required
          disabled={isLoading}
        />

        <label htmlFor="deliveryDate" style={labelStyle}>Date of Delivery</label>
        <input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          value={assetData.deliveryDate}
          onChange={handleChange}
          style={inputStyle}
          required
          disabled={isLoading}
        />

        <label htmlFor="depreciationValue" style={labelStyle}>Depreciation Value</label>
        <input
          type="number"
          id="depreciationValue"
          name="depreciationValue"
          value={assetData.depreciationValue}
          onChange={handleChange}
          placeholder="Enter depreciation value"
          style={inputStyle}
          required
          disabled={isLoading}
        />

        <button 
          type="submit" 
          style={buttonStyle}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Asset'}
        </button>
      </form>
    </div>
  );
};

export default AssetForm;
    try {
      const response = await axios.post('https://8cd5f3c1-5355-4a95-907b-8bac60157245.e1-us-east-azure.choreoapps.dev/api/assets', assetData);
      alert('Asset created successfully!');
      setAssetData({
        name: '',
        cost: '',
        purchaseDate: '',
        deliveryDate: '',
        depreciationValue: '',
      });
    } catch (error) {
      console.error('Error creating asset:', error);
      alert('Error creating asset.');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    fontFamily: '"Poppins", sans-serif',
    padding: '20px',
  };

  const formStyle = {
    width: '100%',
    maxWidth: '500px',
    background: '#fff',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  };

  const labelStyle = {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    display: 'block',
  };

  const inputStyle = {
    width: '93%',
    padding : "20px",
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    background: 'rgba(154, 36, 119)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
          🚀 Add New Asset
        </h2>

        <label htmlFor="name" style={labelStyle}>Asset Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={assetData.name}
          onChange={handleChange}
          placeholder="Enter asset name"
          style={inputStyle}
          required
        />

        <label htmlFor="cost" style={labelStyle}>Asset Cost</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={assetData.cost}
          onChange={handleChange}
          placeholder="Enter cost"
          style={inputStyle}
          required
        />

        <label htmlFor="purchaseDate" style={labelStyle}>Date of Purchase</label>
        <input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          value={assetData.purchaseDate}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label htmlFor="deliveryDate" style={labelStyle}>Date of Delivery</label>
        <input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          value={assetData.deliveryDate}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label htmlFor="depreciationValue" style={labelStyle}>Depreciation Value</label>
        <input
          type="number"
          id="depreciationValue"
          name="depreciationValue"
          value={assetData.depreciationValue}
          onChange={handleChange}
          placeholder="Enter depreciation value"
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>Submit Asset</button>
      </form>
    </div>
  );
};

export default AssetForm;
