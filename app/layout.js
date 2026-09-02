import './globals.css';

export const metadata = {
  title: 'Tamgar — защитная спецодежда и B2B-текстиль',
  description: 'Производство защитной спецодежды и B2B-текстиля полного цикла в Казахстане.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
