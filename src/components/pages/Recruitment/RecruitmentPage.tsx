import { Toaster } from 'react-hot-toast';
import RecruitmentHero from './RecruitmentHero';
import PositionsList from './PositionsList';
import WhyJoinUs from './WhyJoinUs';
import ApplicationProcess from './ApplicationProcess';
import Footer from '../../Footer';

export default function RecruitmentPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <main className="flex-grow">
        <RecruitmentHero />
        <PositionsList />
        <WhyJoinUs />
        <ApplicationProcess />
      </main>
      <Footer />
    </div>
  );
}