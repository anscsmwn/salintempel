import { FiAlertTriangle } from 'react-icons/fi';

interface AlertErrorProps {
  errors: string[];
}
const AlertError = ({ errors }: AlertErrorProps) => {
  if (errors.length === 0) return <></>;
  return (
    <div className="bg-[#39252b] border border-[#954043] p-5 rounded-md mt-1 w-full">
      <div className="flex flex-row gap-2 items-center">
        <FiAlertTriangle className="inline-block text-white text-lg" />
        <p className="text-white sm:text-lg text-sm font-semibold">
          Error! Task failed successfully.
        </p>
      </div>
      <ul className="list-disc mt-2 px-5">
        {errors.map((error, idx) => (
          <li key={idx} className="text-xs text-white">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertError;
