import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin, useMerchantLogin } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const customerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const merchantSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  deviceId: yup.string().optional(),
  deviceType: yup.string().optional(),
  rememberMe: yup.boolean().optional(),
});

export default function Login() {
  const [isMerchant, setIsMerchant] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(isMerchant ? merchantSchema : customerSchema),
  });
  const { mutate: login, isLoading: loginLoading } = useLogin();
  const { mutate: merchantLogin, isLoading: merchantLoading } = useMerchantLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = loginLoading || merchantLoading;

  const onSubmit = (data) => {
    const loginFn = isMerchant ? merchantLogin : login;
    loginFn(data, {
      onSuccess: (response) => {
        dispatch(setCredentials(response));
        // Check if 2FA is required (assuming backend includes a flag, e.g., `twoFactorEnabled`)
        if (response.user.twoFactorEnabled && !response.user.twoFactorVerified) {
          navigate('/2fa');
        } else {
          navigate(isMerchant ? '/merchant/dashboard' : '/customer/dashboard');
        }
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">{isMerchant ? 'Merchant Login' : 'Customer Login'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('email')}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500">{errors.email?.message}</p>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500">{errors.password?.message}</p>
          {isMerchant && (
            <>
              <input
                {...register('deviceId')}
                placeholder="Device ID (optional)"
                className="w-full p-2 border rounded"
              />
              <input
                {...register('deviceType')}
                placeholder="Device Type (optional)"
                className="w-full p-2 border rounded"
              />
              <label className="flex items-center">
                <input {...register('rememberMe')} type="checkbox" className="mr-2" />
                Remember Me
              </label>
            </>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsMerchant(!isMerchant)}
          className="mt-2 text-blue-500 underline"
        >
          Switch to {isMerchant ? 'Customer' : 'Merchant'} Login
        </button>
      </div>
    </div>
  );
}