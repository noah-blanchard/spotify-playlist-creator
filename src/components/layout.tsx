export default function Layout(props: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 h-screen bg-gradient-to-tr from-blue-500 to-purple-600`}
    >
      {props.children}
    </main>
  );
}
