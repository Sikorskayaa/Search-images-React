type Props = {
  error: string;
};

const ErrorMessage: React.FC<Props> = ({ error }) => <p>{error}</p>;

export default ErrorMessage;
