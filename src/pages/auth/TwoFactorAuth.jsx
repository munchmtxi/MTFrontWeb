import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSetup2FA, useVerify2FA } from '../../api/authApi';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react'; // Correct named import

const setupSchema = yup.object({});
const verifySchema = yup.object({
  token: yup.string().required('2FA token is required'),
});

export default function TwoFactorAuth() {
  const [step, setStep] = useState('setup');
  const [qrCode, setQrCode] = useState(null);
  const [secret, setSecret] = useState(null);
  const { token } = useSelector((state) => state.auth); // Still included, will address ESLint next
  const { mutate: setup2FA, isLoading: setupLoading } = useSetup2FA();
  const { mutate: verify2FA, isLoading: verifyLoading } = useVerify2FA();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(step === 'setup' ? setupSchema : verifySchema),
  });

  const handleSetup = () => {
    setup2FA(
      {},
      {
        onSuccess: (response) => {
          setQrCode(response.qrCode);
          setSecret(response.secret);
          setStep('verify');
        },
        onError: (error) => {
          console.error('2FA Setup Error:', error);
        },
      }
    );
  };

  const handleVerify = (data) => {
    verify2FA(
      { token: data.token },
      {
        onSuccess: () => {
          alert('2FA verification successful!');
        },
        onError: (error) => {
          console.error('2FA Verify Error:', error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          {step === 'setup' ? 'Setup 2FA' : 'Verify 2FA'}
        </h2>
        {step === 'setup' ? (
          <div className="space-y-4">
            <p>Scan the QR code with your authenticator app or enter the secret manually.</p>
            {token ? (
              <button
                onClick={handleSetup}
                disabled={setupLoading}
                className="w-full p-2 bg-blue-500 text-white rounded"
              >
                {setupLoading ? 'Setting up...' : 'Generate QR Code'}
              </button>
            ) : (
              <p className="text-red-500">Please log in to set up 2FA.</p>
            )}
          </div>
        ) : (
          // Rest of the form unchanged
          <form onSubmit={handleSubmit(handleVerify)} className="space-y-4">
            {qrCode && (
              <div className="flex justify-center">
                <QRCodeSVG value={qrCode} size={200} />
              </div>
            )}
            {secret && <p>Secret: {secret}</p>}
            <input
              {...register('token')}
              placeholder="Enter 2FA Token"
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500">{errors.token?.message}</p>
            <button
              type="submit"
              disabled={verifyLoading}
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              {verifyLoading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}