import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCurrentLocation, updateGPSLocation } from '../../api/geolocationApi';
import { setLocation, setError } from '../../features/common/geolocationSlice'; // Updated path
import { useSocket } from '../../hooks/useSocket';
import '../../styles/globals.css';

export default function Geolocation() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { location, updates, error } = useSelector((state) => state.geolocation);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const socket = useSocket();

  const { isLoading } = useQuery({
    queryKey: ['currentLocation'],
    queryFn: getCurrentLocation,
    enabled: !!token,
    onSuccess: (data) => dispatch(setLocation(data)),
    onError: (err) => dispatch(setError(err.message)),
  });

  const mutation = useMutation({
    mutationFn: updateGPSLocation,
    onSuccess: (data) => {
      dispatch(setLocation(data));
      socket.emit('geolocationUpdate', data);
      setLatitude('');
      setLongitude('');
    },
    onError: (err) => dispatch(setError(err.message)),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ latitude, longitude });
  };

  if (!user) {
    return <div className="p-4 text-red-500">Please log in to view geolocation.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Geolocation Dashboard</h1>

      {/* Current Location */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Current Location</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : location ? (
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        ) : (
          <p>No location data available.</p>
        )}
      </div>

      {/* Update Location Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Update Location</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Latitude:</label>
            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="border p-2 w-full"
              step="any"
              required
            />
          </div>
          <div>
            <label className="block">Longitude:</label>
            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="border p-2 w-full"
              step="any"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Updating...' : 'Update Location'}
          </button>
        </form>
      </div>

      {/* Real-Time Updates */}
      <div>
        <h2 className="text-xl font-semibold">Real-Time Updates</h2>
        {updates.length > 0 ? (
          <ul className="list-disc pl-5">
            {updates.map((update, i) => (
              <li key={i}>
                Lat: {update.latitude}, Lon: {update.longitude}
              </li>
            ))}
          </ul>
        ) : (
          <p>No updates received yet.</p>
        )}
      </div>
    </div>
  );
}