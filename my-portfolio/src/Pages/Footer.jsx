export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 font-extrabold  border:shadow-white-800 rounded-lg  py-6 mt-0">
      <div className="container mx-auto px-4">
        <p className="text-center font-sans text-lg">
         <span className="text-blue-400">©</span> {new Date().getFullYear()} <span className="text-yellow-400 hover:text-blue-500 animate___animated animate-pulse">Mohit Sharma</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}