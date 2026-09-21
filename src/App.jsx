import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ChevronRight, ShieldCheck, Ticket, CheckCircle, X, Mic, Zap, Trophy, CreditCard, QrCode, Smartphone } from 'lucide-react';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const TARGET_DATE = new Date('2026-12-12T00:00:00').getTime();

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel inline-block px-4 py-4 md:px-8 md:py-6 rounded-lg mb-8 md:mb-12 border border-white/10 shadow-[0_0_30px_rgba(220,38,38,0.15)] relative overflow-hidden group w-full md:w-auto">
      <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="flex items-center justify-center gap-2 md:gap-6 text-center relative z-10 w-full">
        {[
          { label: 'Hari', value: timeLeft.days },
          { label: 'Jam', value: timeLeft.hours },
          { label: 'Menit', value: timeLeft.minutes },
          { label: 'Detik', value: timeLeft.seconds }
        ].map((item, index, arr) => (
          <React.Fragment key={item.label}>
            <div className="min-w-[50px] md:min-w-[80px]">
              <span className="font-display text-4xl md:text-6xl font-black block text-white text-glow tracking-tighter">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">{item.label}</span>
            </div>
            {index < arr.length - 1 && (
              <div className="text-red-600 font-display text-3xl md:text-5xl font-black mb-4 animate-pulse px-1 md:px-0">:</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const CheckoutModal = ({ isOpen, onClose, ticket }) => {
  const [modalState, setModalState] = useState('checkout');
  const [selectedPayment, setSelectedPayment] = useState('');

  useEffect(() => {
    if (isOpen) {
      setModalState('checkout');
      setSelectedPayment('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="relative w-full max-w-md bg-[#0a0a0a] border border-red-900/50 rounded-xl shadow-[0_0_60px_rgba(220,38,38,0.2)] overflow-hidden max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/20 rounded-full blur-[60px]"></div>

          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20 bg-black/50 p-1 rounded-full border border-white/10">
            <X size={20} />
          </button>

          {modalState === 'checkout' && (
            <div className="p-6 md:p-8 relative z-10">
              <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter text-white mb-6 border-b border-white/10 pb-4">
                Informasi Data Diri
              </h3>
              
              <div className="bg-gradient-to-r from-red-950/40 to-black rounded-lg p-4 mb-6 border border-red-900/30">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Order Summary</p>
                <div className="flex justify-between items-center">
                  <p className="text-white font-bold text-base md:text-lg">{ticket.name}</p>
                  <p className="text-red-500 font-black text-lg md:text-xl font-display tracking-wider">{ticket.price}</p>
                </div>
              </div>

              <form className="space-y-4 md:space-y-5" onSubmit={(e) => { e.preventDefault(); setModalState('payment'); }}>
                <div>
                  <label className="block text-[10px] md:text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium flex items-center gap-2">
                    <ShieldCheck size={14} className="text-red-500"/> Nama Lengkap
                  </label>
                  <input type="text" required className="w-full bg-[#111] border border-white/10 rounded-md py-3 px-4 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors placeholder:text-gray-600 text-sm" placeholder="Sesuai KTP" />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium flex items-center gap-2">
                    <ShieldCheck size={14} className="text-red-500"/> Alamat Email
                  </label>
                  <input type="email" required className="w-full bg-[#111] border border-white/10 rounded-md py-3 px-4 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors placeholder:text-gray-600 text-sm" placeholder="email@contoh.com" />
                </div>
                <button type="submit" className="w-full py-4 mt-6 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs md:text-sm rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.8)] border border-red-500 flex items-center justify-center gap-2">
                  Lanjut Ke Pembayaran <ChevronRight size={16} />
                </button>
              </form>
            </div>
          )}

          {modalState === 'payment' && (
            <div className="p-6 md:p-8 relative z-10">
              <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter text-white mb-6 border-b border-white/10 pb-4">
                Metode Pembayaran
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['QRIS', 'BCA Virtual Account', 'Mandiri VA', 'Kartu Kredit'].map((method) => (
                  <button 
                    key={method}
                    onClick={() => setSelectedPayment(method)}
                    className={`p-3 md:p-4 rounded-md border text-xs md:text-sm font-bold transition-all flex flex-col items-center gap-2 ${
                      selectedPayment === method 
                        ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]' 
                        : 'bg-[#111] border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {method === 'QRIS' ? <QrCode size={20} className={selectedPayment === method ? 'text-red-500' : ''} /> : <CreditCard size={20} className={selectedPayment === method ? 'text-red-500' : ''} />}
                    <span className="text-center leading-tight">{method}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setModalState('success')}
                disabled={!selectedPayment}
                className={`w-full py-4 font-black uppercase tracking-widest text-xs md:text-sm rounded-md transition-all duration-300 border ${
                  selectedPayment 
                    ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.8)]' 
                    : 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                }`}
              >
                Bayar Sekarang
              </button>
            </div>
          )}

          {modalState === 'success' && (
            <div className="p-6 md:p-8 text-center flex flex-col items-center relative z-10">
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              >
                <CheckCircle size={32} className="text-green-400" />
              </motion.div>
              
              <h3 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tighter text-white mb-2 text-shadow-md">
                Pembayaran Berhasil!
              </h3>
              
              <div className="bg-white p-3 md:p-4 rounded-lg my-6 inline-block shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=JOGJAKICKBOXING2026" alt="QR Code" className="w-24 h-24 md:w-32 md:h-32" />
              </div>
              
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-8 font-medium">
                E-Ticket Anda dapat di-screenshot di atas dan salinannya telah dikirim ke Email/WhatsApp Anda.
              </p>

              <button onClick={onClose} className="w-full py-4 bg-[#111] border border-white/20 hover:border-white/50 hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest text-xs md:text-sm rounded-md transition-all duration-300">
                Tutup
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const LandingPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({ name: 'VIP RINGSIDE', price: 'Rp 500.000' });

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full relative overflow-x-hidden">
      
      {/* Global Watermarks & Gradients */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 select-none">
        <h1 className="text-[25vw] font-display font-black text-white/[0.02] whitespace-nowrap rotate-[-10deg] tracking-tighter">
          KICKBOXING
        </h1>
      </div>
      <div className="absolute top-0 left-[-10%] w-[50%] h-[50vh] bg-red-900/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50vh] bg-red-950/15 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ticket={selectedTicket} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Zap className="text-red-600 hidden sm:block" size={20} />
              <span className="font-display font-black text-xl md:text-2xl tracking-tighter text-white">
                JOGJA KICK BOXING <span className="text-red-600 hidden sm:inline">FESTIVAL</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {['Beranda', 'Fighters', 'Jadwal', 'Venue'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white font-medium uppercase text-xs lg:text-sm tracking-widest transition-colors flex items-center gap-1">
                  <ChevronRight size={14} className="text-red-600 opacity-0 hover:opacity-100 transition-opacity" /> {item}
                </a>
              ))}
            </div>
            <div>
              <button onClick={() => openModal({ name: 'VIP RINGSIDE', price: 'Rp 500.000' })} className="bg-red-600 hover:bg-red-700 text-white font-black py-2 px-3 md:py-2.5 md:px-6 rounded-sm uppercase text-[10px] md:text-sm tracking-[0.1em] md:tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center gap-1 md:gap-2 border border-red-500">
                <Ticket size={16} /> <span className="hidden sm:inline">Beli Tiket</span><span className="inline sm:hidden">Tiket</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="beranda" className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 border-b border-white/5 w-full">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-black/60 to-[#030303] z-10 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-red-950/30 z-10 mix-blend-color"></div>
          <img src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000&auto=format&fit=crop" alt="Hero BG" className="w-full h-full object-cover object-center filter grayscale contrast-125 saturate-50 opacity-50" />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto w-full mt-10 md:mt-0">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-1 md:gap-2 mb-4 md:mb-6 border border-red-900/50 bg-red-950/30 px-3 py-1 md:px-4 md:py-1.5 rounded-full backdrop-blur-sm">
              <Zap size={12} className="text-red-500" />
              <span className="text-red-500 font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase text-glow">
                #JOGJAPUNYANYALI
              </span>
            </div>
            
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-[0.85] mb-6 md:mb-8 text-shadow-xl drop-shadow-2xl uppercase">
              JOGJA KICK BOXING<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">FESTIVAL 2026</span>
            </h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-gray-300 mb-8 md:mb-12 font-bold tracking-widest text-[10px] md:text-sm uppercase">
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-sm border border-white/5 backdrop-blur-md">
                <MapPin className="text-red-600" size={16} /> <span>GOR UNY, YOGYAKARTA</span>
              </div>
              <div className="hidden sm:block w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-sm border border-white/5 backdrop-blur-md">
                <Calendar className="text-red-600" size={16} /> <span>12 - 14 DES. 2026</span>
              </div>
            </div>

            <Countdown />

            <div className="mt-2 md:mt-4">
              <button onClick={() => openModal({ name: 'VIP RINGSIDE', price: 'Rp 500.000' })} className="inline-flex items-center justify-center w-full md:w-auto gap-2 md:gap-3 bg-red-600 hover:bg-red-700 text-white font-black py-4 md:py-5 px-6 md:px-12 text-sm md:text-xl uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] border border-red-500/50 rounded-sm group">
                Amankan Tiket Sekarang
                <ChevronRight size={20} className="group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-32 relative z-10 border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-black text-red-900/5 tracking-tighter pointer-events-none whitespace-nowrap">
          ADRENALINE
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ShieldCheck size={40} className="text-red-900/50 mx-auto mb-6 md:mb-8" />
            <h2 className="font-display font-black text-4xl md:text-7xl uppercase tracking-tighter mb-6 md:mb-8 text-white leading-none">
              Di Balik Kalem,<br/><span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">Ada Nyali Besar.</span>
            </h2>
            <div className="w-16 md:w-24 h-1 bg-red-900/50 mx-auto mb-6 md:mb-8 rounded-full"></div>
            <p className="text-base md:text-2xl text-gray-400 leading-relaxed font-light tracking-wide px-2 md:px-0">
              Lebih dari sekadar kompetisi. Ini adalah perpaduan antara adrenalin, hiburan kelas atas, dan kebanggaan lokal. <strong className="text-white font-semibold shadow-white/10">10.000 penonton</strong> akan menjadi saksi lahirnya legenda baru di arena terbesar di Yogyakarta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fighters */}
      <section id="fighters" className="py-20 md:py-32 relative z-10 border-b border-white/5 bg-gradient-to-b from-[#030303] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16 md:mb-24" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display font-black text-4xl md:text-7xl uppercase tracking-tighter text-white mb-2 leading-none">
              Main Event:<br className="block sm:hidden"/><span className="text-red-600 text-glow">The Ultimate Clash</span>
            </h2>
            <div className="w-20 md:w-32 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-4 md:mt-6"></div>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-8">
            <motion.div className="w-full lg:w-2/5 group cursor-pointer relative" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-black">
                <div className="absolute inset-0 bg-red-900/30 mix-blend-multiply z-10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20"></div>
                <img src="https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=800&auto=format&fit=crop" alt="Bima Sutejo" className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:grayscale-[50%] transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-30">
                  <h3 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter text-white leading-[0.8] mb-4 md:mb-6 drop-shadow-xl">
                    Bima<br/><span className="text-red-600">"The Storm"</span><br/>Sutejo
                  </h3>
                  <div className="space-y-2 md:space-y-3 text-[10px] md:text-sm text-gray-300 font-bold uppercase tracking-widest bg-black/60 p-4 md:p-5 rounded-sm backdrop-blur-md border border-white/10">
                    <p className="flex justify-between border-b border-white/10 pb-2 items-center"><span className="flex items-center gap-1 md:gap-2"><Zap size={14} className="text-red-500"/> Kelas</span> <span className="text-white">65kg</span></p>
                    <p className="flex justify-between border-b border-white/10 pb-2 items-center"><span className="flex items-center gap-1 md:gap-2"><Trophy size={14} className="text-red-500"/> Rekor</span> <span className="text-red-500">12-1</span></p>
                    <p className="flex justify-between items-center"><span className="flex items-center gap-1 md:gap-2"><MapPin size={14} className="text-red-500"/> Sasana</span> <span className="text-white">Jogja Camp</span></p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex-shrink-0 w-20 h-20 md:w-32 md:h-32 rounded-full bg-black items-center justify-center border-2 border-red-900 z-30 shadow-[0_0_50px_rgba(220,38,38,0.3)] relative -my-4 lg:my-0 flex">
              <div className="absolute inset-1 md:inset-2 rounded-full border border-dashed border-red-600/50 animate-[spin_10s_linear_infinite]"></div>
              <span className="font-display font-black text-4xl md:text-6xl italic text-red-600 text-glow">VS</span>
            </div>

            <motion.div className="w-full lg:w-2/5 group cursor-pointer relative" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-black">
                <div className="absolute inset-0 bg-red-900/30 mix-blend-multiply z-10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20"></div>
                <img src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop" alt="Reza Pratama" className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:grayscale-[50%] transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-30 text-right">
                  <h3 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter text-white leading-[0.8] mb-4 md:mb-6 drop-shadow-xl">
                    Reza<br/><span className="text-red-600">"Iron"</span><br/>Pratama
                  </h3>
                  <div className="space-y-2 md:space-y-3 text-[10px] md:text-sm text-gray-300 font-bold uppercase tracking-widest bg-black/60 p-4 md:p-5 rounded-sm backdrop-blur-md border border-white/10 text-left">
                    <p className="flex justify-between border-b border-white/10 pb-2 items-center"><span className="flex items-center gap-1 md:gap-2"><Zap size={14} className="text-red-500"/> Kelas</span> <span className="text-white">65kg</span></p>
                    <p className="flex justify-between border-b border-white/10 pb-2 items-center"><span className="flex items-center gap-1 md:gap-2"><Trophy size={14} className="text-red-500"/> Rekor</span> <span className="text-red-500">10-2</span></p>
                    <p className="flex justify-between items-center"><span className="flex items-center gap-1 md:gap-2"><MapPin size={14} className="text-red-500"/> Sasana</span> <span className="text-white">Solo Striker</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="jadwal" className="py-20 md:py-32 border-b border-white/5 relative z-10 overflow-hidden">
        <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-red-950/20 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16 md:mb-20" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display font-black text-4xl md:text-7xl uppercase tracking-tighter text-white mb-4 leading-none">
              3 Hari Menuju <span className="text-red-600 text-glow">Kejayaan</span>
            </h2>
          </motion.div>

          <div className="space-y-4 md:space-y-6 relative">
            <div className="absolute left-[1.75rem] md:left-[3.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-red-900/10 via-red-600/50 to-red-900/10 z-0"></div>

            {[
              { day: "Day 1", date: "12 DES. 2026", title: "Weigh-In & Press Conference (Psywar)", icon: Mic },
              { day: "Day 2", date: "13 DES. 2026", title: "Undercard Matches & Local Heroes", icon: Zap },
              { day: "Day 3", date: "14 DES. 2026", title: "Main Event, Live Performances & Celebrations", icon: Trophy }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-panel p-4 md:p-8 flex flex-row items-center gap-4 md:gap-6 rounded-lg border border-white/5 relative z-10">
                <div className="w-10 h-10 md:w-20 md:h-20 shrink-0 bg-black border border-red-900 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                  <item.icon className="text-red-600 w-4 h-4 md:w-8 md:h-8" />
                </div>
                <div className="flex-shrink-0 w-24 md:w-36">
                  <span className="block text-red-600 font-black font-display text-xl md:text-3xl uppercase tracking-wider">{item.day}</span>
                  <span className="text-[9px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em]">{item.date}</span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm md:text-2xl font-black uppercase tracking-tight md:tracking-wide text-white drop-shadow-md leading-tight">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticketing */}
      <section id="venue" className="py-20 md:py-32 relative border-b border-white/5 z-10 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[150%] md:w-[80%] h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-red-900/15 via-[#030303] to-transparent pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16 md:mb-24" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display font-black text-4xl md:text-7xl uppercase tracking-tighter text-white mb-2 md:mb-4 leading-none">
              Amankan <span className="text-red-600 text-glow">Posisimu</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto tracking-widest text-[10px] md:text-sm uppercase">Pilih kategori yang sesuai dengan adrenalin Anda.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            
            <motion.div variants={fadeUpVariant} className="glass-panel p-6 md:p-8 flex flex-col border border-white/10 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Ticket size={80} /></div>
              <h3 className="font-display font-black text-3xl md:text-4xl uppercase text-white mb-1 md:mb-2 relative z-10">Tribun <span className="text-gray-400 text-lg md:text-2xl">(Festival)</span></h3>
              <p className="text-gray-300 font-black text-2xl md:text-3xl mb-6 md:mb-8 font-display tracking-wider relative z-10">Rp 150.000</p>
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow relative z-10">
                <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">
                  <CheckCircle size={16} className="text-gray-500 shrink-0" /> <span>Pandangan Menyeluruh</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">
                  <CheckCircle size={16} className="text-gray-500 shrink-0" /> <span>Area Festival</span>
                </li>
              </ul>
              <button onClick={() => openModal({ name: 'TRIBUN (FESTIVAL)', price: 'Rp 150.000' })} className="w-full py-3 md:py-4 border border-white/20 text-white font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm hover:bg-white hover:text-black transition-colors rounded-sm relative z-10">
                Pilih Tiket Ini
              </button>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="glass-panel p-6 md:p-10 flex flex-col relative border-red-600/60 shadow-[0_0_50px_rgba(220,38,38,0.2)] bg-gradient-to-b from-red-950/40 to-[#030303] rounded-sm overflow-hidden transform lg:-translate-y-4">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-red-500"><Ticket size={100} /></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900"></div>
              <div className="inline-block self-start mb-3 md:mb-4 bg-red-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] py-1 px-3 md:py-1.5 md:px-4 rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.6)] relative z-10">
                Most Wanted
              </div>
              <h3 className="font-display font-black text-4xl md:text-5xl uppercase text-white mb-1 md:mb-2 text-shadow-md relative z-10">VIP <span className="text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">Ringside</span></h3>
              <p className="text-white font-black text-3xl md:text-4xl mb-6 md:mb-8 font-display tracking-wider relative z-10">Rp 500.000</p>
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow relative z-10">
                <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-200 uppercase tracking-wider font-bold">
                  <CheckCircle size={16} className="text-red-500 shrink-0" /> <span>Dekat Ring</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-200 uppercase tracking-wider font-bold">
                  <CheckCircle size={16} className="text-red-500 shrink-0" /> <span>Jalur Khusus Masuk</span>
                </li>
              </ul>
              <button onClick={() => openModal({ name: 'VIP RINGSIDE', price: 'Rp 500.000' })} className="w-full py-4 md:py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-sm transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] border border-red-500 rounded-sm relative z-10">
                Pilih Tiket Ini
              </button>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="glass-panel p-6 md:p-8 flex flex-col border border-white/10 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Ticket size={80} /></div>
              <h3 className="font-display font-black text-3xl md:text-4xl uppercase text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-gray-500 mb-1 md:mb-2 relative z-10">VVIP Superfan</h3>
              <p className="text-gray-300 font-black text-2xl md:text-3xl mb-6 md:mb-8 font-display tracking-wider relative z-10">Rp 1.000.000</p>
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow relative z-10">
                <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">
                  <CheckCircle size={16} className="text-gray-500 shrink-0" /> <span>Akses Backstage</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">
                  <CheckCircle size={16} className="text-gray-500 shrink-0" /> <span>Meet & Greet</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">
                  <CheckCircle size={16} className="text-gray-500 shrink-0" /> <span>Merchandise Eksklusif</span>
                </li>
              </ul>
              <button onClick={() => openModal({ name: 'VVIP SUPERFAN', price: 'Rp 1.000.000' })} className="w-full py-3 md:py-4 border border-white/20 text-white font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm hover:bg-white hover:text-black transition-colors rounded-sm relative z-10">
                Pilih Tiket Ini
              </button>
            </motion.div>

          </motion.div>

          <div className="mt-12 md:mt-20 max-w-2xl mx-auto text-center flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 text-gray-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase bg-black/50 p-3 md:p-4 rounded-sm border border-white/5 backdrop-blur-sm">
            <ShieldCheck size={16} className="text-red-600 shrink-0" />
            <p>*Transaksi tiket Anda diproses secara aman menggunakan enkripsi tingkat tinggi dari partner ticketing resmi kami.</p>
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 md:py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center md:text-left">
            &copy; 2026 Jogja Kick Boxing Festival. All rights reserved.
          </p>
          <p className="text-gray-600 text-[8px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-sm border border-white/5 text-center">
            Digital Ecosystem Engineered by <span className="text-gray-300 drop-shadow-md">iSee Digital Marketing</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  const [isMobileSimulatorOpen, setIsMobileSimulatorOpen] = useState(false);
  const isSimulator = new URLSearchParams(window.location.search).get('mode') === 'simulator';

  return (
    <div className="font-sans selection:bg-red-600 selection:text-white bg-[#030303] min-h-screen relative overflow-x-hidden">
      
      <LandingPageContent />

      {/* FAB - Only show if NOT in simulator */}
      {!isSimulator && (
        <button 
          onClick={() => setIsMobileSimulatorOpen(true)}
          className="fixed bottom-6 left-6 z-[200] bg-white text-black hover:bg-gray-200 font-bold py-3 px-5 md:py-4 md:px-8 rounded-full shadow-[0_10px_40px_rgba(255,255,255,0.3)] flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 text-xs md:text-sm uppercase tracking-widest border border-white/10"
        >
          <Smartphone size={20} /> <span className="hidden sm:inline">MODE HP</span><span className="inline sm:hidden">HP</span>
        </button>
      )}

      {/* Mobile Simulator Overlay */}
      {!isSimulator && isMobileSimulatorOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <button 
            onClick={() => setIsMobileSimulatorOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors z-[310] bg-white/10 p-2 rounded-full backdrop-blur-sm"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-[375px] h-[812px] max-h-[90vh] bg-black rounded-[3rem] border-[14px] border-black shadow-[0_0_80px_rgba(220,38,38,0.3)] overflow-hidden flex-shrink-0 relative">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-[200] flex justify-center gap-2 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-800/50"></div>
              <div className="w-10 h-1.5 rounded-full bg-gray-800/50"></div>
            </div>
            
            {/* Iframe */}
            <iframe 
              src={`${window.location.pathname}?mode=simulator`}
              className="w-full h-full border-0 bg-[#030303] block"
              title="Mobile Simulator"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
