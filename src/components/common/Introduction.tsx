import Logo from 'data/logo.svg';
import phrases from 'data/phrases';

const Introduction = () => {
  return (
    <div className="mt-5 mb-14 flex w-full flex-col items-center justify-around fill-current text-primary-500 dark:text-primary-300 lg:flex-row-reverse">
      <div className="mb-6 flex flex-1 items-center justify-center">
        <Logo className="h-32 w-32" />
      </div>
      <div className="flex-1">
        <h2 className="basic-text my-3 w-full text-4xl font-extrabold">
          {phrases.Main.name}
        </h2>
        <p className="my-3 font-medium text-gray-600 duration-500 dark:text-gray-300">
          {phrases.Main.description}
        </p>
        {phrases.Main.subDescription && (
          <p className="font-medium leading-none text-gray-400 duration-500 dark:text-gray-500">
            {phrases.Main.subDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default Introduction;
