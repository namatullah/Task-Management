type PageProps = {
  params: {
    id: string;
  };
};

const page = ({ params }: PageProps) => {
  const { id } = params;

  return <div>Project ID: {id}</div>;
};

export default page;
