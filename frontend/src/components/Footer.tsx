export const Footer = () => {
  return (
    <footer className="py-12 px-6 flex flex-col md:flex-row items-center justify-center gap-6 max-w-[1600px] mx-auto w-full opacity-60">
      <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
        <a href="https://github.com/jackbloo" className="hover:text-indigo-600 transition-colors">Github</a>
        <span className="text-slate-300">/</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          AXIOS POWERED
        </span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">v2.1.0</span>
      </div>
    </footer>
  );
};
