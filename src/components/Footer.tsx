export default function Footer() {
  return (
    <footer className="footer mt-16 dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between">
        <p>&copy; {new Date().getFullYear()} TalentHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
