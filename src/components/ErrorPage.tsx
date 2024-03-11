type ErrorPageProps = {
  errorText?: string;
};

const ErrorPage = ({
  errorText = "An error has occurred, please try again later!",
}: ErrorPageProps) => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-y-14 lg:gap-y-20 text-white">
      <h1 className="text-5xl lg:text-9xl">Oops!</h1>
      <h3 className="text-lg lg:text-2xl font-thin">{errorText}</h3>
    </section>
  );
};

export default ErrorPage;
