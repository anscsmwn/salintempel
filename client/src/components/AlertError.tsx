import { FiAlertTriangle } from 'react-icons/fi';

interface AlertErrorProps {
  errors: string[];
}
const AlertError = ({ errors }: AlertErrorProps) => {
  if (errors.length === 0) return <></>;
  return (
    <div className="bg-red-100 border border-red-600 p-5 rounded-md mt-1 w-full">
      <div className="flex flex-row gap-2 items-center">
        <FiAlertTriangle className="inline-block text-red-700 text-lg" />
        <p className="text-red-700 sm:text-lg text-sm font-semibold">
          Error! Task failed successfully.
        </p>
      </div>
      <ul className="list-disc mt-2 px-5">
        {errors.map((error, idx) => (
          <li key={idx} className="text-xs text-red-600">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertError;
