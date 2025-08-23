import CompanianForm from '@/app/components/compform';
import { CompanionPermission } from '@/app/libs/serveractions';
import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

const Page = async () => {
  const Permission = await CompanionPermission();
console.log(Permission)
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      {Permission ? (
        <div className="w-full max-w-2xl">
          <CompanianForm />
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center max-w-md animate-fade-in">
          <ShieldCheck className="w-16 h-16 text-purple-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Pro Plan Required
          </h2>
          <p className="text-gray-600 mb-6">
            You currently do not have access to create new companions. Upgrade to our Pro Plan to unlock unlimited access to all features and tools.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors shadow-md"
          >
            Upgrade Now <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </section>
  );
};

export default Page;
