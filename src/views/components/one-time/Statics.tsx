interface StaticsProps {
  header: string;
  statics: number;
}

const Statics = ({ header, statics }: StaticsProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md max-w-sm">
      <h1 className="text-lg font-bold text-gray-600">{header}</h1>
      <p className="text-2xl font-semibold ml-1 text-black">{statics}</p>
    </div>
  );
};

export default Statics;
