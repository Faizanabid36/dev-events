const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <div>User Details Page for ID: {id}</div>;
};

export default UserDetailsPage;
