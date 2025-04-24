const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="mt-1/2">email template {params.id}</h1>
    </div>
  );
};

export default Page;
