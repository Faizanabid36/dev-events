import Link from "next/link";

const User = () => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];

  return (
    <div>
      {users.map((user) => (
        <Link key={user.id} href={`/dashboard/user/${user.id}`}>
          {user.name}
        </Link>
      ))}
    </div>
  );
};

export default User;
