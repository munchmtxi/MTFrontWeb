 
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRegister } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  phone: yup.string().matches(/^\+\d{9,15}$/, 'Phone must be a valid number with country code').required(),
  country: yup.string().required(),
  merchantType: yup.string().optional(),
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate: registerUser, isLoading } = useRegister();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    registerUser(data, {
      onSuccess: (response) => {
        dispatch(setCredentials({ user: response, token: null, refreshToken: null }));
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('firstName')} placeholder="First Name" className="w-full p-2 border rounded" />
          <p className="text-red-500">{errors.firstName?.message}</p>
          <input {...register('lastName')} placeholder="Last Name" className="w-full p-2 border rounded" />
          <p className="text-red-500">{errors.lastName?.message}</p>
          <input {...register('email')} placeholder="Email" className="w-full p-2 border rounded" />
          <p className="text-red-500">{errors.email?.message}</p>
          <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <p className="text-red-500">{errors.password?.message}</p>
          <input {...register('phone')} placeholder="Phone (e.g., +265888123456)" className="w-full p-2 border rounded" />
          <p className="text-red-500">{errors.phone?.message}</p>
          <input {...register('country')} placeholder="Country" className="w-full p-2 border rounded" />
          <p className="text-red-500">{errors.country?.message}</p>
          <input {...register('merchantType')} placeholder="Merchant Type (optional)" className="w-full p-2 border rounded" />
          <button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}